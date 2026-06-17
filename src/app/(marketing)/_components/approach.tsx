import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

type Item = { k: string; v: string; meta: string };

const trackA: Item[] = [
  { k: "01", v: "Specify · Ontology AI Agent", meta: "Open Beta" },
  { k: "02", v: "Agent II · 세무 AI 에이전트", meta: "In Dev" },
  { k: "03", v: "Agent III · 도메인 검토 단계", meta: "TBA" },
];

const trackB: Item[] = [
  { k: "·", v: "Architecture · System Design", meta: "Scope" },
  { k: "·", v: "Implementation · Integration", meta: "Build" },
  { k: "·", v: "Operation · Continuous Support", meta: "Run" },
];

export function Approach() {
  return (
    <section className="relative py-section">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="Practice"
            title={
              <>
                <span className="block">
                  AI&nbsp;에이전트 개발과 기업 시스템&nbsp;구축.
                </span>
                <span className="block">
                  두 사업은 자원과 의사결정을 나눠 독립적으로 운영합니다.
                </span>
              </>
            }
            aside="2-track operation"
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-dashed border-border bg-line-soft md:grid-cols-2">
            <Pane
              sub="▌ Track A / Agent Line"
              title="AI Agents"
              body="장기 성장을 맡는 축입니다. 첫 제품 Specify가 Open Beta로 운영 중이고, 두 번째 세무 AI 에이전트를 개발하고 있습니다."
              items={trackA}
            />
            <Pane
              sub="▌ Track B / Service Line"
              title="Enterprise Engineering"
              body="오늘의 운영 자금을 안정시키는 축입니다. 기업 의뢰를 받아 IT 시스템을 설계부터 운영까지 맡습니다. AI 에이전트 개발과 인력·의사결정을 나눠, 서로의 속도를 해치지 않습니다."
              items={trackB}
              work={{
                label: "맘마 — 육아 기록 · AI 성장 분석 앱",
                href: "https://mamma.im",
                note: "mamma.im",
                icon: <MammaIcon className="size-8 shrink-0" />,
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pane({
  sub,
  title,
  body,
  items,
  work,
}: {
  sub: string;
  title: string;
  body: string;
  items: Item[];
  work?: { label: string; href: string; note: string; icon?: React.ReactNode };
}) {
  return (
    <div className="bg-background p-[clamp(28px,3vw,44px)]">
      <div className="mb-6 font-mono text-label uppercase text-fg-dim">
        {sub}
      </div>
      <h3 className="m-0 mb-2 text-subheading">
        {title}
      </h3>
      <p className="m-0 mb-5 max-w-[50ch] break-keep text-body-sm text-fg-muted">
        {body}
      </p>
      <ul className="m-0 grid list-none gap-px border-t border-line-soft bg-line-soft p-0">
        {items.map((item) => (
          <li
            key={item.v}
            className="grid grid-cols-[20px_1fr_auto] items-center gap-3 bg-background py-3 text-body-sm sm:grid-cols-[28px_1fr_auto] sm:gap-4"
          >
            <span className="font-mono text-label-sm text-fg-dim">{item.k}</span>
            <span className="break-keep text-foreground">{item.v}</span>
            <span className="font-mono text-label-sm text-fg-dim tabular-nums">
              {item.meta}
            </span>
          </li>
        ))}
      </ul>

      {work ? (
        <div className="mt-6 border-t border-line-soft pt-5">
          <div className="mb-3 font-mono text-label uppercase text-fg-dim">
            ▌ Selected Work
          </div>
          <a
            className="group flex items-center justify-between gap-3 text-body-sm"
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2.5 break-keep text-foreground transition-colors group-hover:text-brand-light">
              {work.icon}
              {work.label}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-label-sm text-fg-dim transition-colors group-hover:text-brand-light">
              {work.note}
              <svg
                width="11"
                height="11"
                viewBox="0 0 13 13"
                fill="none"
                aria-hidden
                className="translate-y-px transition-transform group-hover:-translate-y-0 group-hover:translate-x-0.5"
              >
                <path
                  d="M2.5 10.5L10.5 2.5M10.5 2.5H4M10.5 2.5V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </a>
        </div>
      ) : null}
    </div>
  );
}

// 맘마(mamma.im) 앱 아이콘 — 공식 favicon.svg 기반 인라인 벡터 (투명 배경)
function MammaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="60 55 395 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="mammaBrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF4757" />
        </linearGradient>
        <linearGradient id="mammaMilk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF0F0" />
          <stop offset="100%" stopColor="#FFE4E4" />
        </linearGradient>
        <filter id="mammaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="4"
            dy="12"
            stdDeviation="16"
            floodColor="#FF4757"
            floodOpacity="0.2"
          />
        </filter>
        <rect id="mammaBottle" x="166" y="210" width="180" height="220" rx="50" />
        <clipPath id="mammaClip">
          <use href="#mammaBottle" />
        </clipPath>
      </defs>

      <path
        d="M120 130 L128 154 L152 162 L128 170 L120 194 L112 170 L88 162 L112 154 Z"
        fill="#FFA502"
        opacity="0.6"
      />
      <circle cx="410" cy="140" r="12" fill="#FF4757" opacity="0.4" />
      <circle cx="390" cy="400" r="8" fill="#FFA502" opacity="0.5" />

      <g
        transform="translate(256, 266) rotate(12) translate(-256, -266)"
        filter="url(#mammaShadow)"
      >
        <path d="M206 170 C206 40, 306 40, 306 170" fill="#FFA502" />
        <use href="#mammaBottle" fill="#FFFFFF" />
        <g clipPath="url(#mammaClip)">
          <path
            d="M150 320 Q 206 290, 256 325 T 366 320 L 366 450 L 150 450 Z"
            fill="url(#mammaMilk)"
          />
        </g>
        <use href="#mammaBottle" fill="none" stroke="#2F3542" strokeWidth="14" />
        <rect
          x="146"
          y="170"
          width="220"
          height="50"
          rx="18"
          fill="url(#mammaBrand)"
          stroke="#2F3542"
          strokeWidth="14"
        />
        <line
          x1="196"
          y1="260"
          x2="236"
          y2="260"
          stroke="#2F3542"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <line
          x1="196"
          y1="300"
          x2="216"
          y2="300"
          stroke="#2F3542"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <line
          x1="196"
          y1="340"
          x2="236"
          y2="340"
          stroke="#2F3542"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 256 360 C 256 360, 240 345, 256 335 C 272 345, 256 360, 256 360 Z"
          fill="#FF4757"
          transform="scale(1.8) translate(-113, -150)"
        />
      </g>
    </svg>
  );
}
