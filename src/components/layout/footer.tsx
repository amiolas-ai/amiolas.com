export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line-soft py-[30px] pb-[60px] text-xs text-fg-dim">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-4 px-[var(--pad)] md:grid-cols-[1fr_auto_1fr]">
        <div className="text-left">© 2026 Amiolas, Inc. · 아미올라스</div>
        <div className="font-mono uppercase tracking-[0.14em]">
          Restore the continuity of meaning
        </div>
        <div className="text-left md:text-right">
          <a href="#top" className="text-fg-muted transition hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
