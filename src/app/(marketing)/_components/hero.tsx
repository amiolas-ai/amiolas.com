import { Reveal } from "@/components/marketing/reveal";
import { HeroVideo } from "./hero-video";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[clamp(640px,86vh,880px)] flex-col overflow-hidden">
      <HeroVideo />

      {/* corner marker */}
      <span className="glitch-soft pointer-events-none absolute bottom-4 right-[var(--pad)] z-[2] font-mono text-[10px] uppercase tracking-[0.18em] text-brand-light opacity-70">
        Scroll ↓
      </span>

      {/* content — bottom-left */}
      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-[var(--pad)] pb-[clamp(36px,5vw,56px)] pt-[clamp(120px,20vw,240px)]">
        <Reveal className="w-fit">
          <div className="glitch-soft mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
            Mission ·{" "}
            <span className="text-brand-light">
              Restore the continuity of meaning
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h1 className="m-0 max-w-[18ch] text-balance break-keep text-[clamp(40px,6.4vw,76px)] font-bold leading-[1.08] tracking-[-0.028em] [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
            <span className="glitch glitch-base" data-text="끊어진 의미를">
              끊어진 의미를
            </span>
            <br />
            <span
              className="glitch glitch-base"
              data-text="다시 잇는 AI Studio."
            >
              <em className="font-bold italic tracking-[-0.01em] text-accent-soft">
                다시 잇는
              </em>{" "}
              AI Studio.
            </span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="m-0 mt-6 max-w-[58ch] break-keep text-[clamp(15px,1.3vw,18px)] leading-[1.7] text-fg-muted [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
            Amiolas는 자체 AI 에이전트와 엔터프라이즈 엔지니어링을 병행하는 AI
            Studio입니다. 사내 데이터, 협업의 흐름, 시스템과 시스템 사이. 의미가
            끊어지는 모든 자리에서, 우리는 연속성을 복원합니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
