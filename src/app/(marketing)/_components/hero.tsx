import { Reveal } from "@/components/marketing/reveal";

const meta = [
  { dt: "Mission", dd: "Restore continuity of meaning" },
  { dt: "Practice", dd: "AI Products · Enterprise Engineering" },
  { dt: "Flagship", dd: "Specify · Ontology AI Agent" },
  { dt: "Stage", dd: "Founding · Open Beta" },
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[min(720px,82vh)] items-stretch pb-[clamp(60px,9vw,120px)]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-[clamp(40px,5vw,64px)] px-[var(--pad)] pt-[clamp(40px,5vw,64px)]">
        <HelmBlueprint />

        <Reveal className="relative z-[2] w-fit">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-3 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            <span
              aria-hidden
              className="size-1.5 rounded-[1px] bg-brand-light"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
              Amiolas / AI Studio ·{" "}
              <b className="font-medium text-foreground">Est. 2025</b>
            </span>
          </div>
        </Reveal>

        <div className="relative z-[2] flex flex-col gap-7">
          <Reveal>
            <h1 className="m-0 max-w-[18ch] text-balance break-keep text-[clamp(36px,5.6vw,80px)] font-bold leading-[1.12] tracking-[-0.028em]">
              단절된 곳에 의미의{" "}
              <em className="font-serif font-normal italic tracking-[-0.01em] text-accent-soft">
                연속성
              </em>
              을 회복합니다.
            </h1>
          </Reveal>
          <Reveal>
            <p className="m-0 max-w-[54ch] break-keep text-[clamp(15px,1.3vw,18px)] leading-[1.7] text-fg-muted">
              Amiolas는 자체 AI 제품과 엔터프라이즈 엔지니어링을 병행하는 AI
              Studio입니다. 사내 데이터, 협업의 흐름, 시스템과 시스템 사이.
              의미가 끊어지는 모든 자리에서, 우리는 연속성을 복원합니다.
            </p>
          </Reveal>
        </div>

        <Reveal className="relative z-[2]">
          <dl className="grid max-w-[920px] grid-cols-2 gap-6 border-t border-line-soft pt-6 md:grid-cols-4">
            {meta.map(({ dt, dd }) => (
              <div key={dt}>
                <dt className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-dim">
                  {dt}
                </dt>
                <dd className="m-0 text-sm text-foreground">{dd}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function HelmBlueprint() {
  const stroke = "oklch(0.55 0.22 295)";
  const inkMute = "oklch(0.42 0.014 285)";
  const inkDim = "oklch(0.46 0.014 285)";
  const monoFont = "var(--font-mono), JetBrains Mono, monospace";

  const rightLevels: Array<[string, number]> = [
    ["A", 160],
    ["B", 260],
    ["C", 360],
    ["D", 460],
    ["E", 560],
  ];
  const leftLevels: Array<[string, number]> = [
    ["1", 160],
    ["2", 260],
    ["3", 360],
    ["4", 460],
    ["5", 560],
  ];

  return (
    <div
      aria-hidden
      className="hero-arch-mask pointer-events-none absolute left-1/2 top-1/2 z-0 h-[clamp(440px,62vh,640px)] w-[min(880px,75%)] -translate-x-1/2 -translate-y-1/2 opacity-30 max-lg:opacity-20 max-sm:opacity-10"
    >
      <svg
        viewBox="0 0 500 600"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id="bpStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.9" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.18" />
          </linearGradient>
          <pattern
            id="bpHatch"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke={stroke}
              strokeOpacity="0.14"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>

        {/* Background grid — horizontals every 100u + faint verticals every 50u */}
        <g stroke="oklch(0.55 0.014 285)" strokeOpacity="0.18" strokeWidth="0.6">
          {[100, 200, 300, 400, 500].map((y) => (
            <line
              key={`h${y}`}
              x1="0"
              y1={y}
              x2="500"
              y2={y}
              strokeDasharray="1 6"
            />
          ))}
        </g>
        <g stroke="oklch(0.55 0.014 285)" strokeOpacity="0.1" strokeWidth="0.5">
          {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              y1="80"
              x2={x}
              y2="570"
              strokeDasharray="1 6"
            />
          ))}
        </g>

        {/* Outermost faint silhouette (4th shell, dashed) */}
        <path
          d="M 250 70 C 430 70 480 240 480 580 M 250 70 C 70 70 20 240 20 580"
          stroke={stroke}
          strokeOpacity="0.18"
          strokeWidth="0.8"
          strokeDasharray="4 5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Concentric helm shells */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M 250 80 C 410 80 460 240 460 560 M 250 80 C 90 80 40 240 40 560"
            stroke="url(#bpStroke)"
            strokeWidth="1.6"
          />
          <path
            d="M 250 130 C 380 130 420 250 420 560 M 250 130 C 120 130 80 250 80 560"
            stroke={stroke}
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
          <path
            d="M 250 180 C 350 180 380 260 380 560 M 250 180 C 150 180 120 260 120 560"
            stroke={stroke}
            strokeOpacity="0.38"
            strokeWidth="1"
          />
          {/* Side ear reinforcement curves */}
          <path
            d="M 110 360 C 100 420 105 480 130 540"
            stroke={stroke}
            strokeOpacity="0.45"
            strokeWidth="0.9"
            strokeDasharray="2 4"
          />
          <path
            d="M 390 360 C 400 420 395 480 370 540"
            stroke={stroke}
            strokeOpacity="0.45"
            strokeWidth="0.9"
            strokeDasharray="2 4"
          />
          {/* Visor twin slits with hatched fill */}
          <path
            d="M 222 320 L 222 560 L 246 560 L 246 360 Z M 254 360 L 254 560 L 278 560 L 278 320 Z"
            stroke={stroke}
            strokeOpacity="0.65"
            strokeWidth="1.1"
            fill="url(#bpHatch)"
          />
        </g>

        {/* Center vertical axis */}
        <line
          x1="250"
          y1="60"
          x2="250"
          y2="575"
          stroke={stroke}
          strokeOpacity="0.4"
          strokeWidth="0.7"
          strokeDasharray="3 4"
        />
        {/* Center vertical axis ticks (every 100u, crosshair) */}
        <g stroke={stroke} strokeOpacity="0.35" strokeWidth="0.6">
          {[160, 260, 360, 460].map((y) => (
            <line key={`cx${y}`} x1="244" y1={y} x2="256" y2={y} />
          ))}
        </g>

        {/* Mid horizontal axis (dashed, faint) */}
        <line
          x1="40"
          y1="320"
          x2="460"
          y2="320"
          stroke={stroke}
          strokeOpacity="0.22"
          strokeWidth="0.6"
          strokeDasharray="2 5"
        />

        {/* Apex node + crosshair + N label */}
        <g>
          <line
            x1="232"
            y1="80"
            x2="268"
            y2="80"
            stroke={stroke}
            strokeOpacity="0.55"
            strokeWidth="0.8"
          />
          <circle cx="250" cy="80" r="5" fill={stroke} />
          <circle cx="250" cy="80" r="16" fill={stroke} fillOpacity="0.12">
            <animate
              attributeName="r"
              values="16;24;16"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              values=".12;.04;.12"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x="262"
            y="76"
            fontFamily={monoFont}
            fontSize="9"
            fill={inkDim}
            letterSpacing="0.6"
          >
            N · APEX
          </text>
        </g>

        {/* Top horizontal dimension */}
        <g stroke={inkMute} strokeOpacity="0.65" strokeWidth="0.7">
          <line x1="40" y1="55" x2="460" y2="55" />
          <line x1="40" y1="49" x2="40" y2="61" />
          <line x1="460" y1="49" x2="460" y2="61" />
        </g>
        <text
          x="250"
          y="48"
          textAnchor="middle"
          fontFamily={monoFont}
          fontSize="9"
          fill={inkMute}
          letterSpacing="1"
        >
          420 UNITS · WIDTH
        </text>

        {/* Right vertical dimension + tick labels A–E */}
        <g stroke={inkMute} strokeOpacity="0.65" strokeWidth="0.7">
          <line x1="480" y1="80" x2="480" y2="560" />
          <line x1="474" y1="80" x2="486" y2="80" />
          <line x1="474" y1="560" x2="486" y2="560" />
        </g>
        <g
          stroke={inkMute}
          strokeOpacity="0.55"
          strokeWidth="0.7"
          fontFamily={monoFont}
          fontSize="8.5"
          fill={inkDim}
          letterSpacing="0.6"
        >
          {rightLevels.map(([letter, y]) => (
            <g key={`r${letter}`}>
              <line x1="468" y1={y} x2="476" y2={y} />
              <text x="464" y={y + 3} textAnchor="end">
                {letter}
              </text>
            </g>
          ))}
        </g>

        {/* Left vertical dimension + tick labels 1–5 */}
        <g stroke={inkMute} strokeOpacity="0.55" strokeWidth="0.7">
          <line x1="20" y1="80" x2="20" y2="560" />
          <line x1="14" y1="80" x2="26" y2="80" />
          <line x1="14" y1="560" x2="26" y2="560" />
        </g>
        <g
          stroke={inkMute}
          strokeOpacity="0.5"
          strokeWidth="0.7"
          fontFamily={monoFont}
          fontSize="8.5"
          fill={inkDim}
          letterSpacing="0.6"
        >
          {leftLevels.map(([num, y]) => (
            <g key={`l${num}`}>
              <line x1="24" y1={y} x2="32" y2={y} />
              <text x="36" y={y + 3}>
                {num}
              </text>
            </g>
          ))}
        </g>

        {/* Baseline at y=575 with tick marks */}
        <line
          x1="40"
          y1="575"
          x2="460"
          y2="575"
          stroke={inkMute}
          strokeOpacity="0.6"
          strokeWidth="0.9"
        />
        <g stroke={inkMute} strokeOpacity="0.5" strokeWidth="0.7">
          {[60, 120, 180, 240, 300, 360, 420].map((x) => (
            <line key={`bt${x}`} x1={x} y1="571" x2={x} y2="579" />
          ))}
        </g>
        <text
          x="40"
          y="592"
          fontFamily={monoFont}
          fontSize="8"
          fill={inkDim}
          letterSpacing="1"
        >
          BASE PLANE · 000
        </text>

        {/* Compass rosette — top-left */}
        <g transform="translate(58 100)">
          <circle
            cx="0"
            cy="0"
            r="14"
            stroke={inkMute}
            strokeOpacity="0.4"
            strokeWidth="0.7"
            fill="none"
          />
          <line
            x1="0"
            y1="-14"
            x2="0"
            y2="14"
            stroke={inkMute}
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
          <line
            x1="-14"
            y1="0"
            x2="14"
            y2="0"
            stroke={inkMute}
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
          <path d="M 0 -14 L -3 -8 L 0 -10 L 3 -8 Z" fill={stroke} />
          <text
            x="0"
            y="-18"
            textAnchor="middle"
            fontFamily={monoFont}
            fontSize="8"
            fill={stroke}
            letterSpacing="0.6"
          >
            N
          </text>
        </g>

        {/* Section callout — A-A near visor */}
        <g
          fontFamily={monoFont}
          fontSize="8"
          fill={inkDim}
          letterSpacing="0.8"
        >
          <line
            x1="200"
            y1="440"
            x2="300"
            y2="440"
            stroke={stroke}
            strokeOpacity="0.35"
            strokeWidth="0.6"
            strokeDasharray="3 3"
          />
          <text x="196" y="443" textAnchor="end">
            A
          </text>
          <text x="304" y="443">
            A
          </text>
        </g>
      </svg>

      {/* Title block — bottom-right */}
      <div className="absolute bottom-[6%] right-[2%] flex flex-col gap-0.5 border-l border-line-soft pl-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim opacity-35">
        <span>
          <b className="font-medium tracking-[0.22em] text-fg-muted">
            FIG. 001
          </b>{" "}
          · AMIOLAS HELM
        </span>
        <span>ELEVATION · SCALE 1 : 1</span>
        <span>DRAWING NO. AML-001 / REV. A</span>
      </div>

      {/* Left vertical caption */}
      <div className="absolute left-[2%] top-1/2 origin-top-left -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-fg-dim opacity-30">
        AMIOLAS · HELM ELEVATION
      </div>

      {/* Right vertical caption */}
      <div className="absolute right-[2%] top-1/2 origin-top-right translate-x-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-fg-dim opacity-30">
        CONTINUITY OF MEANING
      </div>
    </div>
  );
}
