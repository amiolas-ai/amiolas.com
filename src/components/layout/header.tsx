import Image from "next/image";
import Link from "next/link";
import { Clock } from "./clock";
import { ContactTrigger } from "./contact-trigger";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-background/70 backdrop-blur-md backdrop-saturate-110">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_auto] items-center gap-6 px-[var(--pad)] py-3.5 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Amiolas 홈"
          className="inline-flex items-center transition hover:opacity-80"
        >
          <Image
            src="/logos/logo-simple-transparent.png"
            alt="Amiolas"
            width={44}
            height={44}
            priority
            className="size-11"
          />
        </Link>

        <div className="hidden items-center gap-2.5 justify-self-center text-[11px] text-fg-muted md:flex">
          <span className="status-dot" aria-hidden />
          <Clock />
          <span className="opacity-40">·</span>
          <span className="font-mono uppercase tracking-[0.14em]">
            Seoul / AI Studio
          </span>
        </div>

        <nav className="flex items-center justify-end">
          <ContactTrigger className="group inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background">
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full bg-[oklch(0.78_0.18_150)] shadow-[0_0_0_2px_color-mix(in_oklab,oklch(0.78_0.18_150)_30%,transparent)] transition group-hover:bg-background group-hover:shadow-none"
            />
            <span>Contact</span>
          </ContactTrigger>
        </nav>
      </div>
    </header>
  );
}
