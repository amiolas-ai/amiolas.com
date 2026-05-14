import "server-only";
import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import { env } from "@/lib/env";
import { CONTACT_CONFIG } from "@/lib/contact/config";
import type {
  ContactMessage,
  Conversation,
  Identity,
  Sender,
} from "@/types/contact";

const redis = new Redis({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

const convKey = (id: string) => `conv:${id}`;
const msgKey = (id: string) => `conv:${id}:msg`;
const threadKey = (ts: string) => `thread:${ts}`;
const rateKey = (key: string) => `rate:${key}`;

export async function getConversation(id: string): Promise<Conversation | null> {
  return redis.get<Conversation>(convKey(id));
}

export async function createConversation(
  identity: Identity,
): Promise<Conversation> {
  const now = Date.now();
  const conv: Conversation = {
    id: nanoid(),
    identity,
    createdAt: now,
    updatedAt: now,
  };
  await redis.set(convKey(conv.id), conv, {
    ex: CONTACT_CONFIG.conversationTtlSec,
  });
  return conv;
}

export async function setThreadTs(
  conversationId: string,
  threadTs: string,
): Promise<void> {
  const conv = await getConversation(conversationId);
  if (!conv) return;
  const next: Conversation = { ...conv, threadTs, updatedAt: Date.now() };
  await Promise.all([
    redis.set(convKey(conversationId), next, {
      ex: CONTACT_CONFIG.conversationTtlSec,
    }),
    redis.set(threadKey(threadTs), conversationId, {
      ex: CONTACT_CONFIG.conversationTtlSec,
    }),
  ]);
}

export async function getConversationIdByThread(
  threadTs: string,
): Promise<string | null> {
  return redis.get<string>(threadKey(threadTs));
}

export async function appendMessage(
  conversationId: string,
  sender: Sender,
  text: string,
): Promise<ContactMessage> {
  const msg: ContactMessage = {
    id: nanoid(),
    sender,
    text,
    createdAt: Date.now(),
  };
  await redis.zadd(msgKey(conversationId), {
    score: msg.createdAt,
    member: JSON.stringify(msg),
  });
  await redis.expire(msgKey(conversationId), CONTACT_CONFIG.conversationTtlSec);
  return msg;
}

export async function getMessagesSince(
  conversationId: string,
  sinceMs: number,
): Promise<ContactMessage[]> {
  const min: `(${number}` | "-inf" =
    sinceMs > 0 ? `(${sinceMs}` : "-inf";
  const raw = await redis.zrange<unknown[]>(
    msgKey(conversationId),
    min,
    "+inf",
    { byScore: true },
  );
  return raw.map((entry) =>
    typeof entry === "string"
      ? (JSON.parse(entry) as ContactMessage)
      : (entry as ContactMessage),
  );
}

export async function incrRateLimit(
  key: string,
): Promise<{ count: number; allowed: boolean }> {
  const k = rateKey(key);
  const count = await redis.incr(k);
  if (count === 1) {
    await redis.expire(k, CONTACT_CONFIG.rateLimitWindowSec);
  }
  return { count, allowed: count <= CONTACT_CONFIG.rateLimitPerMin };
}

export async function markEventProcessed(eventId: string): Promise<boolean> {
  const acquired = await redis.set(`dedup:event:${eventId}`, 1, {
    nx: true,
    ex: 300,
  });
  return acquired === "OK";
}

export function conversationChannel(conversationId: string): string {
  return `conv:${conversationId}`;
}

export async function publishMessage(
  conversationId: string,
  message: ContactMessage,
): Promise<void> {
  await redis.publish(conversationChannel(conversationId), JSON.stringify(message));
}
