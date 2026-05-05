import Link from "next/link";
import { Wordmark } from "@/components/marketing/wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark size="sm" />
            <p className="mt-4 max-w-sm text-pretty text-sm leading-[1.6] text-muted-foreground break-keep">
              단절된 곳에 의미의 연속성을 회복합니다.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Contact
            </Link>
            <a
              href="https://specify.app"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Specify ↗
            </a>
          </nav>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-8">
          <p className="font-mono text-[11px] tracking-[0.04em] text-fg-subtle">
            Amiolas © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
