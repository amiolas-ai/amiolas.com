"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CONTACT_CONFIG } from "@/lib/contact/config";
import { cn } from "@/lib/utils";
import type { ContactMessage } from "@/types/contact";
import { MessageBubble } from "./message-bubble";

type Props = {
  open: boolean;
  onClose: () => void;
  conversationId: string;
  messages: ContactMessage[];
  errorMessage: string | null;
  formAction: (formData: FormData) => void;
  formKey: number;
};

export function WidgetPanel({
  open,
  onClose,
  conversationId,
  messages,
  errorMessage,
  formAction,
  formKey,
}: Props) {
  const scrollRef = useRef<HTMLOListElement>(null);
  const isFirst = !conversationId;

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages.length]);

  return (
    <div
      role="dialog"
      aria-label="Contact"
      aria-hidden={!open}
      className={cn(
        "fixed bottom-0 right-0 z-40 flex flex-col overflow-hidden border-border bg-background shadow-[0_24px_80px_-16px_oklch(0.18_0.012_290/0.28),0_0_0_1px_oklch(0_0_0/0.04)] transition-all duration-200 ease-[cubic-bezier(0.2,0.6,0.2,1)]",
        "inset-0 sm:inset-auto sm:bottom-24 sm:right-7 sm:h-[min(620px,calc(100vh-7rem))] sm:w-[380px] sm:rounded-2xl sm:border",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-line-soft bg-foreground px-5 pb-5 pt-6 text-background sm:rounded-t-2xl">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] opacity-60">
            Amiolas · Contact
          </div>
          <h2 className="mt-2 break-keep font-serif text-[22px] italic leading-[1.2] tracking-[-0.01em]">
            안녕하세요.
            <br />
            도움이 필요하신가요?
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M5 5L13 13M13 5L5 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <ol
        ref={scrollRef}
        className="m-0 flex flex-1 list-none flex-col gap-3 overflow-y-auto p-5"
      >
        {messages.length === 0 && (
          <li className="flex flex-col gap-2 rounded-2xl border border-line-soft bg-surface-soft px-4 py-4 text-[13px] leading-[1.6] text-fg-muted">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-dim">
              First message
            </span>
            <span className="text-foreground">
              메시지를 보내주시면 영업일 기준 1일 이내에 회신드립니다.
            </span>
          </li>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </ol>

      <form
        key={formKey}
        action={formAction}
        className="flex flex-col gap-2.5 border-t border-line-soft bg-background p-4"
      >
        <input
          type="hidden"
          name="conversationId"
          value={conversationId}
          readOnly
        />
        <input
          type="text"
          name="_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {isFirst && (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="name"
              placeholder="이름"
              required
              maxLength={CONTACT_CONFIG.maxNameLen}
              className="h-10 rounded-lg border border-border bg-background px-3 text-[13px] outline-none transition focus:border-foreground"
            />
            <input
              type="email"
              name="email"
              placeholder="이메일"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-[13px] outline-none transition focus:border-foreground"
            />
          </div>
        )}

        <div className="flex items-end gap-2">
          <textarea
            name="text"
            placeholder="메시지를 보내주세요"
            required
            rows={2}
            maxLength={CONTACT_CONFIG.maxMessageLen}
            className="min-h-[44px] flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-[13.5px] leading-[1.5] outline-none transition focus:border-foreground"
          />
          <SubmitButton />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="m-0 mt-1 text-[12px] leading-[1.4] text-destructive"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Send message"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand text-white transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="animate-spin"
        >
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.6"
          />
          <path
            d="M14 8a6 6 0 0 0-6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 8L13 3L8.5 13L7.5 9L3 8Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
      )}
    </button>
  );
}
