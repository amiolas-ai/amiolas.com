import { createSubscriber } from "@/lib/contact/realtime";
import {
  conversationChannel,
  getMessagesSince,
} from "@/lib/contact/store";
import type { ContactMessage } from "@/types/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const STREAM_LIFETIME_MS = 25_000;
const HEARTBEAT_MS = 15_000;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");
  if (!conversationId) {
    return new Response("missing conversationId", { status: 400 });
  }

  const sinceFromHeader = parseTs(req.headers.get("last-event-id"));
  const sinceFromUrl = parseTs(url.searchParams.get("since"));
  const since = sinceFromHeader ?? sinceFromUrl ?? 0;

  const encoder = new TextEncoder();
  const channel = conversationChannel(conversationId);

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const close = () => {
        if (closed) return;
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };
      const writeRaw = (chunk: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          closed = true;
        }
      };
      const sendEvent = (data: string) => writeRaw(`data: ${data}\n\n`);
      const sendMessage = (m: ContactMessage) => {
        const payload = JSON.stringify(m);
        writeRaw(
          `id: ${m.createdAt}\ndata: {"type":"message","payload":${payload}}\n\n`,
        );
      };

      sendEvent(JSON.stringify({ type: "open" }));

      try {
        const missed = await getMessagesSince(conversationId, since);
        for (const message of missed) {
          sendMessage(message);
        }
      } catch (err) {
        console.error("[contact/stream] missed-fetch error", err);
      }

      const sub = createSubscriber();
      sub.on("error", (err) => {
        console.error("[contact/stream] redis error", err);
      });

      try {
        await sub.connect();
        await sub.subscribe(channel, (raw) => {
          try {
            const message = JSON.parse(raw) as ContactMessage;
            sendMessage(message);
          } catch {
            /* malformed payload — skip */
          }
        });
      } catch (err) {
        console.error("[contact/stream] subscribe failed", err);
        await sub.disconnect().catch(() => {});
        close();
        return;
      }

      const heartbeat = setInterval(() => {
        sendEvent(JSON.stringify({ type: "ping", t: Date.now() }));
      }, HEARTBEAT_MS);

      const cleanup = async () => {
        clearInterval(heartbeat);
        clearTimeout(lifetime);
        try {
          await sub.unsubscribe(channel);
        } catch {
          /* ignore */
        }
        try {
          await sub.disconnect();
        } catch {
          /* ignore */
        }
      };

      const lifetime = setTimeout(async () => {
        await cleanup();
        close();
      }, STREAM_LIFETIME_MS);

      req.signal.addEventListener("abort", async () => {
        await cleanup();
        close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "x-accel-buffering": "no",
      connection: "keep-alive",
    },
  });
}

function parseTs(value: string | null): number | null {
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}
