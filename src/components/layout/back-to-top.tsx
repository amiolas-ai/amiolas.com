"use client";

import type { MouseEvent } from "react";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export function BackToTop() {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const startY = window.scrollY;
    if (startY <= 0) return;
    const duration = Math.min(900, Math.max(450, startY * 0.45));
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY * (1 - easeOutCubic(t)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <a
      href="#top"
      onClick={handleClick}
      className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-foreground"
    >
      <span>Back to top</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </a>
  );
}
