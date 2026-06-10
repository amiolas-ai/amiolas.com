export function MissionBar() {
  return (
    <section
      className="mission-stripes relative mt-[clamp(20px,6vw,90px)] overflow-hidden border-y border-dashed border-border px-[var(--pad)] py-[clamp(56px,13vw,120px)]"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.55 0.22 295 / 0.08) 0%, transparent 70%)",
      }}
    >
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
        <p className="m-0 mx-auto mt-7 max-w-[44ch] break-keep text-[15px] leading-[1.75] text-fg-muted">
          회사명 Amiolas는 이 통찰로 만들어진 소설 속 마법 투구에서 왔습니다.
          서로 다른 언어를 잇는 투구처럼, Amiolas는 흩어진 데이터의 &ldquo;서로
          다른 언어&rdquo;를 잇습니다.
        </p>
      </div>
    </section>
  );
}
