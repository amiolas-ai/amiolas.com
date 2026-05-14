"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { sendContactMessage } from "@/lib/actions/contact-send";
import { useContactStorage } from "@/hooks/use-contact-storage";
import type { ContactMessage, SendMessageResult } from "@/types/contact";
import { WidgetFab } from "./widget-fab";
import { WidgetPanel } from "./widget-panel";

function mergeMessages(
  prev: ContactMessage[],
  incoming: ContactMessage[],
): ContactMessage[] {
  if (incoming.length === 0) return prev;
  const seen = new Set(prev.map((m) => m.id));
  const fresh = incoming.filter((m) => !seen.has(m.id));
  if (fresh.length === 0) return prev;
  return [...prev, ...fresh].sort((a, b) => a.createdAt - b.createdAt);
}

export function ContactWidget() {
  const { stored, save } = useContactStorage();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [unread, setUnread] = useState(0);
  const [formKey, setFormKey] = useState(0);

  const lastSeenRef = useRef(0);
  const openRef = useRef(open);
  openRef.current = open;

  const handleAction = useCallback(
    async (
      _prev: SendMessageResult | null,
      formData: FormData,
    ): Promise<SendMessageResult> => {
      const result = await sendContactMessage(_prev, formData);

      if (result.ok && result.conversationId !== "honey") {
        if (!stored) {
          const name = formData.get("name")?.toString() ?? "";
          const email = formData.get("email")?.toString() ?? "";
          if (name && email) {
            save({
              conversationId: result.conversationId,
              identity: { name, email },
            });
          }
        }

        if (result.messages.length > 0) {
          setMessages((prev) => {
            const merged = mergeMessages(prev, result.messages);
            const latest = merged[merged.length - 1]?.createdAt ?? 0;
            if (latest > lastSeenRef.current) lastSeenRef.current = latest;
            return merged;
          });
          setFormKey((k) => k + 1);
        }
      }

      return result;
    },
    [save, stored],
  );

  const [state, formAction] = useActionState(handleAction, null);

  // SSE — live messages via /api/contact/stream
  useEffect(() => {
    const conversationId = stored?.conversationId;
    if (!conversationId) return;
    if (typeof EventSource === "undefined") return;

    const url = `/api/contact/stream?conversationId=${encodeURIComponent(
      conversationId,
    )}&since=${lastSeenRef.current}`;
    const es = new EventSource(url);

    es.onmessage = (event) => {
      let parsed: { type: string; payload?: ContactMessage };
      try {
        parsed = JSON.parse(event.data);
      } catch {
        return;
      }
      if (parsed.type !== "message" || !parsed.payload) return;
      const message = parsed.payload;

      setMessages((prev) => {
        const merged = mergeMessages(prev, [message]);
        const latest = merged[merged.length - 1]?.createdAt ?? 0;
        if (latest > lastSeenRef.current) lastSeenRef.current = latest;
        return merged;
      });

      if (!openRef.current && message.sender === "operator") {
        setUnread((u) => u + 1);
      }
    };

    es.onerror = () => {
      // EventSource auto-reconnects using Last-Event-ID; nothing to do.
    };

    return () => {
      es.close();
    };
  }, [stored?.conversationId]);

  // Clear unread on open
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  // Global toggle event (fired from header Contact button)
  useEffect(() => {
    const handler = () => setOpen((o) => !o);
    window.addEventListener("amiolas:contact:toggle", handler);
    return () => window.removeEventListener("amiolas:contact:toggle", handler);
  }, []);

  const conversationId = stored?.conversationId ?? "";
  const errorMessage = state && !state.ok ? state.message : null;

  return (
    <>
      <WidgetFab
        open={open}
        unread={unread}
        onToggle={() => setOpen((o) => !o)}
      />
      <WidgetPanel
        open={open}
        onClose={() => setOpen(false)}
        conversationId={conversationId}
        messages={messages}
        errorMessage={errorMessage}
        formAction={formAction}
        formKey={formKey}
      />
    </>
  );
}
