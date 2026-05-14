import type { ContactMessage } from "@/types/contact";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: ContactMessage }) {
  if (message.sender === "system") {
    return (
      <li className="mx-auto max-w-[90%] whitespace-pre-line py-1.5 text-center font-mono text-[10.5px] uppercase leading-[1.6] tracking-[0.16em] text-fg-dim">
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
          "max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-[13.5px] leading-[1.55] shadow-[var(--shadow-hairline)]",
          isUser
            ? "rounded-br-md bg-brand text-white"
            : "rounded-bl-md bg-surface-soft text-foreground",
        )}
      >
        {message.text}
      </div>
    </li>
  );
}
