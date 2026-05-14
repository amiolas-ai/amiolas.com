"use client";

import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  unread: number;
  onToggle: () => void;
};

export function WidgetFab({ open, unread, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close contact widget" : "Open contact widget"}
      aria-expanded={open}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_18px_48px_-12px_oklch(0.55_0.22_295/0.55),0_0_0_1px_oklch(0.55_0.22_295/0.4)] transition-all duration-200 ease-[cubic-bezier(0.2,0.6,0.2,1)] hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-7 sm:right-7",
        open && "scale-90 opacity-90",
      )}
    >
      {open ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M4 5.5C4 4.67 4.67 4 5.5 4H16.5C17.33 4 18 4.67 18 5.5V14.5C18 15.33 17.33 16 16.5 16H8L4.7 18.85C4.37 19.14 3.85 18.9 3.85 18.46V5.5H4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
      {unread > 0 && !open && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-foreground px-1.5 text-[10.5px] font-semibold text-background"
        >
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </button>
  );
}
