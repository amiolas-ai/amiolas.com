"use client";

import Image from "next/image";
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
      <header className="relative flex flex-col gap-7 overflow-hidden border-b border-line-soft bg-foreground px-5 pb-6 pt-5 text-background sm:rounded-t-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-brand-light/35 blur-3xl"
        />
        <div className="relative flex items-center justify-between">
          <Image
            src="/logos/logo.png"
            alt="Amiolas"
            width={32}
            height={32}
            className="size-8 brightness-0 invert"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-background/70 transition hover:bg-white/10 hover:text-background"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-background/55">
            Amiolas · Contact
          </div>
          <h2 className="mt-2.5 break-keep font-serif text-[23px] italic leading-[1.2] tracking-[-0.012em]">
            안녕하세요.
            <br />
            도움이 필요하신가요?
          </h2>
        </div>
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
              className="h-10 rounded-lg border border-border bg-background px-3 text-[13px] outline-none transition focus:border-brand-light"
            />
            <input
              type="email"
              name="email"
              placeholder="이메일"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 text-[13px] outline-none transition focus:border-brand-light"
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
            className="min-h-[44px] flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-[13.5px] leading-[1.5] outline-none transition focus:border-brand-light"
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
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--color-brand)_55%,transparent)] transition hover:-translate-y-px hover:bg-brand-light hover:shadow-[0_14px_32px_-8px_color-mix(in_oklab,var(--color-brand)_70%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
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
            d="M8 13V3M8 3L4 7M8 3L12 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
