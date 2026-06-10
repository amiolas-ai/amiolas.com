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
    <section id="specify" className="relative py-section">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="AI Agents · Lineup"
            title={
              <>
                첫&nbsp;제품 Specify를 시작으로,{" "}
                <em className="font-bold italic text-accent-soft">
                  분야별&nbsp;AI&nbsp;에이전트를 하나씩
                </em>{" "}
                늘려갑니다.
              </>
            }
            aside="01 Shipped · 02 In-Research"
          />
        </Reveal>

        {/* FEATURED — Specify */}
        <Reveal>
          <article
            className="relative rounded-xl border border-border p-[clamp(24px,3.4vw,40px)]"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, color-mix(in oklab, var(--color-brand) 8%, transparent) 0%, transparent 60%)",
            }}
          >
            <CornerBrackets />
            <div className="absolute -top-2.5 left-6 bg-background px-2.5 font-mono text-label-sm uppercase tracking-[0.22em] text-brand-light">
              ▍ Featured · Now Shipping
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-fg-dim">
                  <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-label-sm">
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
                  <h3 className="m-0 text-wordmark uppercase">
                    Specify
                  </h3>
                  <p className="m-0 max-w-[32ch] break-keep text-lede text-foreground">
                    흩어진 사내 지식을 하나의 지식 그래프로 엮는, 기업용 AI
                    두뇌.
                  </p>
                </div>

                <p className="m-0 max-w-[54ch] break-keep text-body text-fg-muted">
                  필요한 자료가 어디 있는지 아무도 모르는 순간이 회사마다
                  반복됩니다. Specify는 GitHub, Notion, Google Docs, 코드에
                  흩어진 데이터를 관계로 묶어 하나의 지식망으로 만듭니다.
                  질문하면 흩어진 문서를 가로질러 답하고, 관련 자료를 먼저
                  제안합니다. 정보 찾는 시간은 평균 40% 줄어듭니다.
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
                  className="group mt-2 inline-flex w-fit items-baseline gap-2 text-body font-medium text-foreground transition-colors hover:text-brand-light"
                  href="https://specify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="border-b border-foreground/40 pb-1 transition-colors group-hover:border-brand-light">
                    specify.app 둘러보기
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
            <div className="flex items-center justify-between gap-4 px-1 pb-4 font-mono text-label uppercase text-fg-dim">
              <span>↓ Next in the lineup</span>
              <span className="hidden sm:inline">
                도메인 검토 단계 · 일정은 변동될 수 있습니다
              </span>
            </div>
            <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {lineup.map((p) => (
                <li
                  key={p.id}
                  className="relative rounded-lg border border-dashed border-line-soft p-6"
                >
                  <div className="mb-2.5 flex items-baseline justify-between">
                    <span className="font-mono text-label-sm uppercase text-fg-dim">
                      {`0${p.id.length} / ${p.id}`}
                    </span>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-label-sm uppercase text-fg-dim">
                      {p.stage}
                    </span>
                  </div>
                  <div className="text-subheading text-fg-muted">
                    {p.name}
                  </div>
                  <div className="mt-1.5 font-mono text-label text-fg-dim">
                    {p.domain}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-line-soft pt-3 font-mono text-label-sm text-fg-dim">
                    <span>ETA · {p.eta}</span>
                    <span aria-hidden>—</span>
                  </div>
                </li>
              ))}
              {/* open-ended "+" slot — the lineup is not fixed */}
              <li className="flex min-h-[150px] flex-col items-center justify-center rounded-lg border border-dashed border-line-soft p-6">
                <div className="text-[42px] leading-none text-brand-light">+</div>
                <div className="mt-2 font-mono text-label-sm uppercase text-fg-dim">
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
      <dt className="mb-2 font-mono text-label-sm uppercase text-fg-dim">
        {dt}
      </dt>
      <dd className="m-0 text-subheading tabular-nums">
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

      <div className="relative rounded-xl border border-border bg-surface-card p-1.5 shadow-glow-lg">
        <CornerBrackets />
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/images/specify.webp"
            alt="Specify 제품 화면 — 사내 지식을 그래프로 연결하는 기업용 AI 두뇌"
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

      <figcaption className="mt-3 flex items-center justify-between font-mono text-label-sm uppercase text-fg-dim">
        <span className="text-brand-light">▣ Specify · Live Product UI</span>
        <span>specify.app</span>
      </figcaption>
    </figure>
  );
}
