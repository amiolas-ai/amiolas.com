"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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

function maxCreatedAt(messages: ContactMessage[]): number {
  let max = 0;
  for (const m of messages) {
    if (m.createdAt > max) max = m.createdAt;
  }
  return max;
}

export function ContactWidget() {
  const { stored, save } = useContactStorage();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [formKey, setFormKey] = useState(0);

  const lastReadTs = stored?.lastReadTs ?? 0;

  const unread = useMemo(
    () =>
      messages.filter(
        (m) => m.sender === "operator" && m.createdAt > lastReadTs,
      ).length,
    [messages, lastReadTs],
  );

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
              lastReadTs: 0,
            });
          }
        }

        if (result.messages.length > 0) {
          setMessages((prev) => mergeMessages(prev, result.messages));
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
    )}&since=0`;
    const es = new EventSource(url);

    es.onmessage = (event) => {
      let parsed: { type: string; payload?: ContactMessage };
      try {
        parsed = JSON.parse(event.data);
      } catch {
        return;
      }
      if (parsed.type !== "message" || !parsed.payload) return;
      setMessages((prev) => mergeMessages(prev, [parsed.payload!]));
    };

    es.onerror = () => {
      // EventSource auto-reconnects using Last-Event-ID; nothing to do.
    };

    return () => {
      es.close();
    };
  }, [stored?.conversationId]);

  // Mark current messages as read whenever widget is open
  useEffect(() => {
    if (!open || !stored) return;
    const maxTs = maxCreatedAt(messages);
    if (maxTs > lastReadTs) {
      save({ ...stored, lastReadTs: maxTs });
    }
  }, [open, messages, lastReadTs, stored, save]);

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
