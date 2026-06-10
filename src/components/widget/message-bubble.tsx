import type { ContactMessage } from "@/types/contact";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: ContactMessage }) {
  if (message.sender === "system") {
    return (
      <li className="mx-auto max-w-[90%] whitespace-pre-line py-1.5 text-center font-mono text-label-sm uppercase leading-[1.6] text-fg-dim">
        {message.text}
      </li>
    );
  }

  const isUser = message.sender === "user";

  return (
    <li
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-body-sm",
          isUser
            ? "rounded-br-md bg-brand text-white shadow-[0_2px_10px_-2px_color-mix(in_oklab,var(--color-brand)_45%,transparent)]"
            : "rounded-bl-md bg-surface-soft text-foreground shadow-[0_1px_2px_oklch(0_0_0/0.05)]",
        )}
      >
        {message.text}
      </div>
    </li>
  );
}
