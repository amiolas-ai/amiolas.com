"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { CONTACT_CONFIG } from "@/lib/contact/config";
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

  // Polling
  useEffect(() => {
    const conversationId = stored?.conversationId;
    if (!conversationId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      if (cancelled) return;
      if (typeof document !== "undefined" && document.hidden) {
        timer = setTimeout(tick, CONTACT_CONFIG.pollIntervalMs);
        return;
      }
      try {
        const url = `/api/contact/poll?conversationId=${encodeURIComponent(
          conversationId,
        )}&since=${lastSeenRef.current}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = (await res.json()) as { messages: ContactMessage[] };
          if (data.messages.length > 0) {
            setMessages((prev) => {
              const merged = mergeMessages(prev, data.messages);
              const latest = merged[merged.length - 1]?.createdAt ?? 0;
              if (latest > lastSeenRef.current) lastSeenRef.current = latest;
              return merged;
            });
            if (!openRef.current) {
              const operatorCount = data.messages.filter(
                (m) => m.sender === "operator",
              ).length;
              if (operatorCount > 0) {
                setUnread((u) => u + operatorCount);
              }
            }
          }
        }
      } catch {
        /* transient — try again next tick */
      }
      if (!cancelled) {
        timer = setTimeout(tick, CONTACT_CONFIG.pollIntervalMs);
      }
    };

    tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
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
