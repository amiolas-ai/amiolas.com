"use client";

import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<"button">, "onClick" | "type" | "children"> & {
  children: ReactNode;
};

export function ContactTrigger({ children, ...props }: Props) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("amiolas:contact:toggle"))
      }
      {...props}
    >
      {children}
    </button>
  );
}
