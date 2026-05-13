import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

export function SpecifySection() {
  return (
    <section
      id="specify"
      className="relative py-[clamp(60px,8vw,120px)]"
    >
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="Latest Release"
            title={
              <>
                파편화된 기업 데이터를 기업용 AI 두뇌로. 첫 번째 AI 제품.
              </>
            }
            aside="2026 · 01 / Open Beta"
          />
        </Reveal>

        <Reveal>
          <article className="release-card-bg release-card-spot relative grid grid-cols-1 overflow-hidden rounded-[22px] border border-border shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_color-mix(in_oklab,var(--color-brand-light)_18%,transparent)] transition-colors hover:border-[color-mix(in_oklab,var(--color-brand-light)_55%,var(--color-border))] md:grid-cols-[1.1fr_1fr]">
            <div className="relative z-[1] flex flex-col gap-8 px-7 py-9 md:px-11 md:pb-9 md:pt-11">
              <div className="flex flex-wrap gap-2">
                <Tag tone="accent">● Open Beta</Tag>
                <Tag>Ontology AI Agent</Tag>
                <Tag>Multi-Source RAG</Tag>
              </div>

              <div>
                <h3 className="m-0 break-keep text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.15] tracking-[-0.022em]">
                  Specify
                  <small className="mt-3.5 block break-keep text-[0.45em] font-normal not-italic leading-[1.6] tracking-[-0.005em] text-fg-muted">
                    파편화된 사내 지식을 그래프 기반 온톨로지로 구조화하는,
                    기업용 AI 두뇌.
                  </small>
                </h3>
              </div>

              <p className="m-0 max-w-[48ch] break-keep text-[15px] leading-[1.75] text-fg-muted">
                GitHub, Notion, Google Docs, 코드. 서로 다른 &ldquo;언어&rdquo;로
                흩어진 사내 데이터를 통합 해독합니다. 단순 저장·검색을 넘어
                AI의 자율 추론으로 인사이트를 역제안하며, 정보 탐색 시간을 평균
                40% 단축합니다.
              </p>

              <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-line-soft pt-6">
                <Stat dt="Search Time" dd={<span className="text-accent-soft">▼ 40%</span>} />
                <Stat dt="Early Users" dd="~ 20" />
                <Stat dt="Stage" dd="Open Beta" />
              </dl>

              <a
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-foreground px-4 py-3.5 text-[13.5px] font-medium text-background transition hover:-translate-y-px hover:bg-accent-soft hover:text-white"
                href="https://specify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Visit specify.app</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "accent";
}) {
  if (tone === "accent") {
    return (
      <span className="inline-flex rounded font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-soft border border-[color-mix(in_oklab,var(--color-brand-light)_50%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-brand-light)_10%,transparent)] px-2.5 py-1">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex rounded border border-border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted">
      {children}
    </span>
  );
}

function Stat({ dt, dd }: { dt: string; dd: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
        {dt}
      </dt>
      <dd className="m-0 text-lg font-semibold tracking-[-0.01em]">{dd}</dd>
    </div>
  );
}

function KnowledgeGraph() {
  const accent = "oklch(0.55 0.18 295)";
  const inkDim = "oklch(0.42 0.014 285)";

  return (
    <div
      aria-hidden
      className="kg-bg relative min-h-[320px] border-t border-line-soft md:min-h-[460px] md:border-l md:border-t-0"
    >
      <span className="absolute right-5 top-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-dim">
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
