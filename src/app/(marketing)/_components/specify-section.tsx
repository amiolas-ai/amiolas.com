import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

export function SpecifySection() {
  return (
    <section id="specify" className="relative py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="Latest Release"
            title="파편화된 기업 데이터를 기업용 AI 두뇌로. 첫 번째 AI 제품."
            aside="2026 · 01 / Open Beta"
          />
        </Reveal>

        <Reveal>
          <article className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                <span className="inline-flex items-center gap-1.5 text-accent-soft">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent-soft" />
                  Open Beta
                </span>
                <span className="opacity-40" aria-hidden>/</span>
                <span>Ontology AI Agent</span>
                <span className="opacity-40" aria-hidden>/</span>
                <span>Multi-Source RAG</span>
              </div>

              <div className="flex flex-col gap-5">
                <h3 className="m-0 text-[clamp(44px,5.6vw,76px)] font-semibold uppercase leading-[1] tracking-[-0.02em]">
                  Specify
                </h3>
                <p className="m-0 max-w-[32ch] break-keep text-[clamp(17px,1.4vw,20px)] leading-[1.5] text-foreground">
                  파편화된 사내 지식을 그래프 기반 온톨로지로 구조화하는, 기업용
                  AI 두뇌.
                </p>
              </div>

              <p className="m-0 max-w-[54ch] break-keep text-[15px] leading-[1.75] text-fg-muted">
                GitHub, Notion, Google Docs, 코드. 서로 다른 &ldquo;언어&rdquo;로
                흩어진 사내 데이터를 통합 해독합니다. 단순 저장·검색을 넘어
                AI의 자율 추론으로 인사이트를 역제안하며, 정보 탐색 시간을 평균
                40% 단축합니다.
              </p>

              <dl className="grid max-w-[520px] grid-cols-3 gap-8 border-t border-line-soft pt-7">
                <Stat dt="Search Time" dd={<span className="text-accent-soft">▼ 40%</span>} />
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

            <KnowledgeGraph />
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ dt, dd }: { dt: string; dd: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
        {dt}
      </dt>
      <dd className="m-0 text-[19px] font-semibold tracking-[-0.012em]">{dd}</dd>
    </div>
  );
}

function KnowledgeGraph() {
  const accent = "oklch(0.55 0.18 295)";
  const inkDim = "oklch(0.42 0.014 285)";

  return (
    <div
      aria-hidden
      className="relative aspect-[5/4.6] w-full lg:aspect-auto lg:min-h-[480px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 50%, color-mix(in oklab, var(--color-brand-light) 12%, transparent), transparent 72%)",
        }}
      />
      <span className="absolute right-0 top-0 font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-dim">
        ▣ Knowledge Graph
      </span>
      <svg
        viewBox="0 0 500 460"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="kgNodeA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.18 295)" stopOpacity="1" />
            <stop
              offset="100%"
              stopColor="oklch(0.5 0.22 295)"
              stopOpacity="0.4"
            />
          </radialGradient>
          <radialGradient id="kgNodeB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.04 85)" stopOpacity="1" />
            <stop
              offset="100%"
              stopColor="oklch(0.75 0.04 85)"
              stopOpacity="0.4"
            />
          </radialGradient>
        </defs>

        <g stroke={accent} strokeWidth="1" opacity="0.55" fill="none">
          <line x1="250" y1="230" x2="100" y2="100">
            <animate
              attributeName="opacity"
              values=".2;.7;.2"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>
          <line x1="250" y1="230" x2="400" y2="90" />
          <line x1="250" y1="230" x2="420" y2="230">
            <animate
              attributeName="opacity"
              values=".3;.8;.3"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </line>
          <line x1="250" y1="230" x2="80" y2="260" />
          <line x1="250" y1="230" x2="140" y2="380">
            <animate
              attributeName="opacity"
              values=".25;.7;.25"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </line>
          <line x1="250" y1="230" x2="380" y2="370" />
          <line x1="100" y1="100" x2="80" y2="260" />
          <line x1="400" y1="90" x2="420" y2="230" />
          <line
            x1="140"
            y1="380"
            x2="380"
            y2="370"
            strokeDasharray="3 4"
          />
          <line x1="420" y1="230" x2="380" y2="370" />
          <line x1="80" y1="260" x2="140" y2="380" />
          <line
            x1="100"
            y1="100"
            x2="400"
            y2="90"
            strokeDasharray="3 4"
            opacity="0.25"
          />
        </g>

        <g>
          <circle cx="100" cy="100" r="11" fill="url(#kgNodeA)">
            <animate
              attributeName="r"
              values="10;13;10"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="400" cy="90" r="9" fill="url(#kgNodeA)" />
          <circle cx="420" cy="230" r="13" fill="url(#kgNodeA)">
            <animate
              attributeName="r"
              values="12;15;12"
              dur="4.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="260" r="8" fill="url(#kgNodeA)" />
          <circle cx="140" cy="380" r="10" fill="url(#kgNodeA)" />
          <circle cx="380" cy="370" r="9" fill="url(#kgNodeA)" />
          <circle cx="200" cy="150" r="3.5" fill="url(#kgNodeB)" opacity="0.7" />
          <circle cx="320" cy="170" r="3.5" fill="url(#kgNodeB)" opacity="0.7" />
          <circle cx="190" cy="310" r="3.5" fill="url(#kgNodeB)" opacity="0.7" />
          <circle cx="320" cy="300" r="3.5" fill="url(#kgNodeB)" opacity="0.7" />
        </g>

        <g>
          <circle cx="250" cy="230" r="40" fill="oklch(0.62 0.22 295)" opacity="0.15" />
          <circle cx="250" cy="230" r="26" fill="oklch(0.62 0.22 295)" opacity="0.35" />
          <circle cx="250" cy="230" r="16" fill="oklch(0.85 0.18 295)" />
          <text
            x="250"
            y="234"
            textAnchor="middle"
            fontFamily="var(--font-mono), JetBrains Mono, monospace"
            fontSize="10"
            fill="#ffffff"
            fontWeight="600"
          >
            AI
          </text>
        </g>

        <g
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          fontSize="9.5"
          fill={inkDim}
          letterSpacing="1"
        >
          <text x="100" y="82">GITHUB</text>
          <text x="380" y="72">NOTION</text>
          <text x="430" y="216">GDRIVE</text>
          <text x="58" y="246">SLACK</text>
          <text x="120" y="402">JIRA</text>
          <text x="360" y="392">FIGMA</text>
        </g>
      </svg>
    </div>
  );
}
