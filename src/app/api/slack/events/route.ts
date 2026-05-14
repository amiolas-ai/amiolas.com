import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
  appendMessage,
  getConversationIdByThread,
  markEventProcessed,
  publishMessage,
} from "@/lib/contact/store";
import { verifySlackSignature } from "@/lib/slack/verify";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type SlackMessageEvent = {
  type: "message";
  channel: string;
  user?: string;
  bot_id?: string;
  text?: string;
  ts: string;
  thread_ts?: string;
  subtype?: string;
};

type SlackEnvelope =
  | { type: "url_verification"; challenge: string }
  | {
      type: "event_callback";
      event: SlackMessageEvent;
      event_id: string;
    };

const ok = () => new Response("ok", { status: 200 });

export async function POST(req: Request) {
  const rawBody = await req.text();

  const verified = await verifySlackSignature({
    secret: env.SLACK_SIGNING_SECRET,
    rawBody,
    signature: req.headers.get("x-slack-signature"),
    timestamp: req.headers.get("x-slack-request-timestamp"),
  });
  if (!verified) {
    return new Response("invalid signature", { status: 401 });
  }

  let body: SlackEnvelope;
  try {
    body = JSON.parse(rawBody) as SlackEnvelope;
  } catch {
    return new Response("bad json", { status: 400 });
  }

  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  if (body.type !== "event_callback") return ok();

  const acquired = await markEventProcessed(body.event_id);
  if (!acquired) return ok();

  const event = body.event;
  if (event.type !== "message") return ok();
  if (event.channel !== env.SLACK_INBOX_CHANNEL_ID) return ok();
  if (!event.thread_ts) return ok();
  if (event.bot_id) return ok();
  if (event.subtype && event.subtype !== "thread_broadcast") return ok();
  if (!event.user) return ok();
  const text = event.text?.trim();
  if (!text) return ok();

  const conversationId = await getConversationIdByThread(event.thread_ts);
  if (!conversationId) return ok();

  const operatorMessage = await appendMessage(conversationId, "operator", text);
  await publishMessage(conversationId, operatorMessage);
  return ok();
}
