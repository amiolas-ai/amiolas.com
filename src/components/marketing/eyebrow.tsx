import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: Props) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-eyebrow text-fg-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}
