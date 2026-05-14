"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { CONTACT_CONFIG } from "@/lib/contact/config";
import {
  appendMessage,
  createConversation,
  getConversation,
  incrRateLimit,
  publishMessage,
  setThreadTs,
} from "@/lib/contact/store";
import { postNewInquiryThread, replyInThread } from "@/lib/slack/client";
import type { ContactMessage, SendMessageResult } from "@/types/contact";

const SendSchema = z.object({
  conversationId: z.string().max(64).optional().default(""),
  text: z
    .string()
    .min(CONTACT_CONFIG.minMessageLen, "메시지를 입력해주세요.")
    .max(CONTACT_CONFIG.maxMessageLen, "메시지가 너무 깁니다."),
  name: z.string().min(1).max(CONTACT_CONFIG.maxNameLen).optional(),
  email: z.string().email("올바른 이메일 주소를 입력해주세요.").optional(),
  honeypot: z.string().optional().default(""),
});

export async function sendContactMessage(
  _prev: SendMessageResult | null,
  formData: FormData,
): Promise<SendMessageResult> {
  const raw = {
    conversationId: (formData.get("conversationId") as string | null) ?? "",
    text: (formData.get("text") as string | null) ?? "",
    name: (formData.get("name") as string | null) || undefined,
    email: (formData.get("email") as string | null) || undefined,
    honeypot: (formData.get("honeypot") as string | null) ?? "",
  };

  const parsed = SendSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      message: parsed.error.issues[0]?.message ?? "올바른 정보를 입력해주세요.",
    };
  }
  const { conversationId, text, name, email, honeypot } = parsed.data;

  if (honeypot.length > 0) {
    return {
      ok: true,
      conversationId: conversationId || "honey",
      messages: [],
    };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";
  const limitKey = conversationId || `ip:${ip}`;
  const rl = await incrRateLimit(limitKey);
  if (!rl.allowed) {
    return {
      ok: false,
      error: "rate_limited",
      message: "잠시 후 다시 시도해주세요.",
    };
  }

  let conv = conversationId ? await getConversation(conversationId) : null;
  const isNewConversation = !conv;

  if (!conv) {
    if (!name || !email) {
      return {
        ok: false,
        error: "missing_identity",
        message: "처음 시작하실 때 이름과 이메일을 알려주세요.",
      };
    }
    conv = await createConversation({ name, email });
    try {
      const threadTs = await postNewInquiryThread({
        identity: conv.identity,
        conversationId: conv.id,
        firstMessage: text,
      });
      await setThreadTs(conv.id, threadTs);
      conv = { ...conv, threadTs };
    } catch {
      return {
        ok: false,
        error: "slack_failed",
        message: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
  } else {
    if (!conv.threadTs) {
      return {
        ok: false,
        error: "internal",
        message: "대화 상태가 손상되었습니다. 새로고침 후 다시 시도해주세요.",
      };
    }
    try {
      await replyInThread({ threadTs: conv.threadTs, text });
    } catch {
      return {
        ok: false,
        error: "slack_failed",
        message: "전송 중 오류가 발생했습니다.",
      };
    }
  }

  const userMessage = await appendMessage(conv.id, "user", text);
  const responseMessages: ContactMessage[] = [userMessage];
  await publishMessage(conv.id, userMessage);

  if (isNewConversation) {
    const ack = await appendMessage(conv.id, "system", CONTACT_CONFIG.ackText);
    responseMessages.push(ack);
    await publishMessage(conv.id, ack);
  }

  return {
    ok: true,
    conversationId: conv.id,
    messages: responseMessages,
  };
}
