export function MissionBar() {
  return (
    <section className="mission-stripes relative mx-[calc(-1*var(--pad))] mt-[clamp(20px,6vw,90px)] overflow-hidden border-y border-line-soft bg-surface-soft px-[var(--pad)] py-[clamp(56px,13vw,120px)]">
      <div className="relative mx-auto max-w-[1440px] text-center">
        <div className="mb-7 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
          Metaphor
        </div>
        <blockquote className="m-0 mx-auto max-w-[24ch] break-keep text-balance font-serif text-[clamp(26px,3.8vw,54px)] font-normal italic leading-[1.25] tracking-[-0.012em] text-foreground">
          “의미와 영혼의{" "}
          <span className="font-sans font-semibold not-italic tracking-[-0.025em] text-brand">
            연속성
          </span>
          . 이종 언어의 통합은 이질적 영혼의 통합을 요구한다.”
        </blockquote>
        <div className="mt-9 flex flex-col items-center justify-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim sm:flex-row sm:gap-3 sm:text-[11.5px] sm:tracking-[0.18em]">
          <span className="text-foreground">Emilidis, The Artisan</span>
          <span aria-hidden className="hidden opacity-60 sm:inline">·</span>
          <span>R. Scott Bakker / The Second Apocalypse</span>
        </div>
      </div>
    </section>
  );
}
