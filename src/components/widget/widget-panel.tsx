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

// 위젯 폼 입력 필드 공통 스타일 — 화이트 필드 + 옅은 소프트 엣지 + 리프트 섀도(경계는 또렷, 딱딱한 보더는 회피), 포커스 시 violet 링+글로우
const fieldClass =
  "h-11 rounded-xl bg-white px-3.5 text-body-sm text-foreground placeholder:text-fg-dim outline-none " +
  "shadow-[0_0_0_1px_oklch(0.45_0.015_290/0.12),0_1px_2px_oklch(0.3_0.02_290/0.06),0_4px_12px_-3px_oklch(0.3_0.02_290/0.10)] " +
  "transition-shadow duration-200 " +
  "hover:shadow-[0_0_0_1px_oklch(0.45_0.015_290/0.18),0_2px_5px_oklch(0.3_0.02_290/0.08),0_6px_16px_-3px_oklch(0.3_0.02_290/0.14)] " +
  "focus:shadow-[0_0_0_1.5px_var(--color-brand),0_0_0_4px_var(--color-brand-glow)]";

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
      inert={!open}
      className={cn(
        "contact-light fixed bottom-0 right-0 z-40 flex flex-col overflow-hidden bg-surface-raised text-foreground shadow-[0_1px_1px_oklch(0_0_0/0.5),0_18px_50px_-12px_oklch(0_0_0/0.65),0_44px_100px_-36px_oklch(0.55_0.22_295/0.45)] transition-all duration-200 ease-[cubic-bezier(0.2,0.6,0.2,1)]",
        "inset-0 sm:inset-auto sm:bottom-24 sm:right-7 sm:h-[min(620px,calc(100vh-7rem))] sm:w-[384px] sm:rounded-[20px]",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <header className="relative flex flex-col gap-5 px-5 pb-5 pt-[18px]">
        {/* faint brand wash — warmth without hard chrome */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-20 h-44 w-44 rounded-full bg-brand/12 blur-3xl"
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logos/logo.png"
              alt="Amiolas"
              width={32}
              height={32}
              className="size-8"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                Amiolas
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1.5 text-[10.5px] text-fg-dim">
                <span className="status-dot" aria-hidden />
                Online · KST
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-dim transition hover:bg-foreground/[0.06] hover:text-foreground"
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
        <h2 className="relative m-0 break-keep text-[21px] font-bold leading-[1.3] tracking-[-0.018em] text-foreground">
          안녕하세요.
          <br />
          무엇을 도와드릴까요?
        </h2>
      </header>

      <ol
        ref={scrollRef}
        className="m-0 flex flex-1 list-none flex-col gap-3 overflow-y-auto px-5 pb-5 pt-1"
      >
        {messages.length === 0 && (
          <li className="max-w-[88%] self-start rounded-2xl rounded-bl-md bg-surface-soft px-4 py-3 text-body-sm text-fg-muted shadow-[0_1px_2px_oklch(0_0_0/0.05)]">
            메시지를 보내주시면 영업일 기준 1일 이내에 회신드립니다.
          </li>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </ol>

      <form
        key={formKey}
        action={formAction}
        className="flex flex-col gap-2 p-3.5 pt-2"
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
              className={fieldClass}
            />
            <input
              type="email"
              name="email"
              placeholder="이메일"
              required
              className={fieldClass}
            />
          </div>
        )}

        <div className="flex items-stretch gap-2 rounded-2xl bg-white p-2 shadow-[0_0_0_1px_oklch(0.45_0.015_290/0.12),0_1px_2px_oklch(0.3_0.02_290/0.06),0_4px_12px_-3px_oklch(0.3_0.02_290/0.10)] transition-shadow duration-200 hover:shadow-[0_0_0_1px_oklch(0.45_0.015_290/0.18),0_2px_5px_oklch(0.3_0.02_290/0.08),0_6px_16px_-3px_oklch(0.3_0.02_290/0.14)] focus-within:shadow-[0_0_0_1.5px_var(--color-brand),0_0_0_4px_var(--color-brand-glow)]">
          <textarea
            name="text"
            placeholder="메시지를 보내주세요"
            required
            rows={2}
            maxLength={CONTACT_CONFIG.maxMessageLen}
            className="min-h-[40px] flex-1 resize-none bg-transparent px-2 py-1.5 text-body-sm text-foreground placeholder:text-fg-dim outline-none"
          />
          <SubmitButton />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="m-0 mt-0.5 px-1 text-xs leading-[1.4] text-destructive"
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
      className="flex aspect-square shrink-0 self-stretch items-center justify-center rounded-xl bg-brand text-white shadow-glow-sm transition hover:-translate-y-px hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
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
