import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/marketing/wordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Amiolas 홈"
          className="flex items-center gap-2.5 transition hover:opacity-70"
        >
          <Image
            src="/logos/logo-light.png"
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 mix-blend-multiply"
          />
          <Wordmark size="lg" />
        </Link>
        <Link
          href="/contact"
          className="text-sm text-foreground transition hover:text-brand"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
