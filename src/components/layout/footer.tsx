import Link from "next/link";
import { BackToTop } from "./back-to-top";

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line-soft py-[30px] pb-[60px] text-xs text-fg-dim">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-3 px-[var(--pad)] text-center md:grid-cols-[1fr_auto_1fr] md:gap-4 md:text-left">
        <div className="md:text-left">
          © 2026 Amiolas, Inc. · 아미올라스
          <span className="mx-2 opacity-50" aria-hidden>
            ·
          </span>
          <Link
            href="/privacy"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Privacy
          </Link>
        </div>
        <div className="font-mono uppercase tracking-[0.14em]">
          Restore the continuity of meaning
        </div>
        <div className="md:text-right">
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
