export function MissionBar() {
  return (
    <section className="mission-stripes relative mx-[calc(-1*var(--pad))] mt-[clamp(40px,6vw,90px)] overflow-hidden border-y border-line-soft bg-surface-soft px-[var(--pad)] py-[clamp(80px,13vw,180px)]">
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
        <div className="mt-9 font-mono text-[11.5px] uppercase tracking-[0.18em] text-fg-dim">
          <span className="text-foreground">Emilidis, The Artisan</span>
          &nbsp;·&nbsp; R. Scott Bakker / The Second Apocalypse
        </div>
      </div>
    </section>
  );
}
