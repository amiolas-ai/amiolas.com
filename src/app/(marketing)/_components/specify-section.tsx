import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

// Future product slots — scalable lineup. When a new product ships, promote it
// into the FEATURED slot above.
const lineup = [
  { id: "II", name: "Agent II", domain: "도메인 검토 단계", stage: "TBA", eta: "2026 H2" },
  { id: "III", name: "Agent III", domain: "도메인 검토 단계", stage: "TBA", eta: "2027" },
] as const;

export function SpecifySection() {
  return (
    <section id="specify" className="relative py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="AI Agents · Lineup"
            title={
              <>
                파편화된 정보를 꿰는 AI 에이전트로.{" "}
                <em className="font-bold italic text-accent-soft">
                  영역을 넓혀 라인업을 확장
                </em>
                합니다.
              </>
            }
            aside="01 Shipped · 02 In-Research"
          />
        </Reveal>

        {/* FEATURED — Specify */}
        <Reveal>
          <article
            className="relative rounded-[10px] border border-border p-[clamp(24px,3.4vw,40px)]"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, oklch(0.55 0.22 295 / 0.1) 0%, transparent 60%)",
            }}
          >
            <CornerBrackets />
            <div className="absolute -top-2.5 left-6 bg-background px-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-light">
              ▍ Featured · Now Shipping
            </div>

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
              <div className="flex flex-col gap-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                  <span className="font-mono text-[9.5px] rounded-sm border border-border px-2 py-0.5">
                    01 / 01
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-accent-soft">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-accent-soft"
                    />
                    Open Beta
                  </span>
                  <span className="opacity-40" aria-hidden>
                    /
                  </span>
                  <span>Ontology AI Agent</span>
                  <span className="opacity-40" aria-hidden>
                    /
                  </span>
                  <span>Multi-Source RAG</span>
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="m-0 text-[clamp(44px,5.6vw,76px)] font-semibold uppercase leading-[1] tracking-[-0.02em]">
                    Specify
                  </h3>
                  <p className="m-0 max-w-[32ch] break-keep text-[clamp(17px,1.4vw,20px)] leading-[1.5] text-foreground">
                    파편화된 사내 지식을 그래프 기반 온톨로지로 구조화하는,
                    기업용 AI 두뇌.
                  </p>
                </div>

                <p className="m-0 max-w-[54ch] break-keep text-[15px] leading-[1.75] text-fg-muted">
                  GitHub, Notion, Google Docs, 코드. 서로 다른
                  &ldquo;언어&rdquo;로 흩어진 사내 데이터를 통합 해독합니다. 단순
                  저장·검색을 넘어 AI의 자율 추론으로 인사이트를 역제안하며, 정보
                  탐색 시간을 평균 40% 단축합니다.
                </p>

                <dl className="grid max-w-[520px] grid-cols-3 gap-8 border-t border-line-soft pt-7">
                  <Stat
                    dt="Search Time"
                    dd={<span className="text-accent-soft">▼ 40%</span>}
                  />
                  <Stat dt="Early Users" dd="~ 20" />
                  <Stat dt="Stage" dd="Open Beta" />
                </dl>

                <a
                  className="group mt-2 inline-flex w-fit items-baseline gap-2 text-[15px] font-medium text-foreground transition-colors hover:text-brand-light"
                  href="https://specify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="border-b border-foreground/40 pb-1 transition-colors group-hover:border-brand-light">
                    Visit specify.app
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 13 13"
                    fill="none"
                    aria-hidden
                    className="translate-y-0.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2.5 10.5L10.5 2.5M10.5 2.5H4M10.5 2.5V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>

              <SpecifyVisual />
            </div>
          </article>
        </Reveal>

        {/* NEXT IN THE LINEUP — coming-next ghost cards */}
        <Reveal>
          <div className="mt-10">
            <div className="flex items-center justify-between gap-4 px-1 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
              <span>↓ Next in the lineup</span>
              <span className="hidden opacity-70 sm:inline">
                도메인 검토 단계 · 일정은 변동될 수 있습니다
              </span>
            </div>
            <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {lineup.map((p) => (
                <li
                  key={p.id}
                  className="relative rounded-[6px] border border-dashed border-border p-[22px] opacity-90"
                >
                  <div className="mb-2.5 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim opacity-70">
                      {`0${p.id.length} / ${p.id}`}
                    </span>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-fg-dim">
                      {p.stage}
                    </span>
                  </div>
                  <div className="text-[24px] font-semibold tracking-[-0.01em]">
                    {p.name}
                  </div>
                  <div className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-fg-dim">
                    {p.domain}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3 font-mono text-[10px] tracking-[0.14em] text-fg-dim">
                    <span>ETA · {p.eta}</span>
                    <span aria-hidden>—</span>
                  </div>
                </li>
              ))}
              {/* open-ended "+" slot — the lineup is not fixed */}
              <li className="flex min-h-[150px] flex-col items-center justify-center rounded-[6px] border border-dashed border-border p-[22px] opacity-60">
                <div className="text-[42px] leading-none text-brand-light">+</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                  Future Agent
                </div>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CornerBrackets() {
  const base =
    "pointer-events-none absolute size-[18px] border-brand-light";
  return (
    <>
      <span className={`${base} -left-px -top-px border-l-[1.5px] border-t-[1.5px]`} />
      <span className={`${base} -right-px -top-px border-r-[1.5px] border-t-[1.5px]`} />
      <span className={`${base} -bottom-px -left-px border-b-[1.5px] border-l-[1.5px]`} />
      <span className={`${base} -bottom-px -right-px border-b-[1.5px] border-r-[1.5px]`} />
    </>
  );
}

function Stat({ dt, dd }: { dt: string; dd: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
        {dt}
      </dt>
      <dd className="m-0 text-[19px] font-semibold tracking-[-0.012em]">
        {dd}
      </dd>
    </div>
  );
}
function SpecifyVisual() {
  return (
    <figure className="relative m-0">
      {/* violet glow backdrop — kept subtle so it frames, not veils */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 blur-[44px]"
        style={{
          background:
            "radial-gradient(closest-side at 50% 50%, oklch(0.55 0.22 295 / 0.18), transparent 75%)",
        }}
      />

      <div className="relative rounded-[12px] border border-border bg-surface-card p-1.5 shadow-[0_30px_80px_-30px_oklch(0.55_0.22_295_/_0.4),0_0_0_1px_oklch(0.55_0.22_295_/_0.1)]">
        <CornerBrackets />
        <div className="relative overflow-hidden rounded-[8px]">
          <Image
            src="/images/specify.webp"
            alt="Specify 제품 화면 — AI로 지식을 연결하는 스마트 문서 플랫폼"
            width={1920}
            height={1059}
            sizes="(max-width: 1024px) 100vw, 720px"
            className="block h-auto w-full"
          />
          {/* very faint top sheen only — keep the screenshot legible */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/4"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.04) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-dim">
        <span className="text-brand-light">▣ Specify · Live Product UI</span>
        <span className="opacity-70">specify.app</span>
      </figcaption>
    </figure>
  );
}
