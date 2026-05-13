import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/marketing/wordmark";
import { Clock } from "./clock";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-background/70 backdrop-blur-md backdrop-saturate-110">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_auto] items-center gap-6 px-[var(--pad)] py-3.5 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Amiolas 홈"
          className="flex items-center gap-3.5 transition hover:opacity-80"
        >
          <Image
            src="/logos/logo-light.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 mix-blend-multiply"
          />
          <Wordmark size="md" />
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
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <span>Contact</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              aria-hidden
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path
                d="M2 9L9 2M9 2H3.5M9 2V7.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
