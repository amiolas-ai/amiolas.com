import type { ReactNode } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

type Card = {
  num: string;
  title: string;
  desc: string;
  href: string;
  foot: string;
  icon: ReactNode;
};

const cards: Card[] = [
  {
    num: "/ 01",
    title: "AI Studio",
    desc: "자체 AI 제품과 엔터프라이즈 엔지니어링을 한 지붕 아래 운영합니다.",
    href: "#approach",
    foot: "About →",
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <path
          d="M28 8 L48 48 H8 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M28 22 V48" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="28" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "/ 02",
    title: "Specify",
    desc: "Ontology AI Agent. 사내 데이터의 의미적 관계를 자동 매핑합니다.",
    href: "#specify",
    foot: "Product →",
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="42" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="14" cy="42" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="42" cy="42" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="28" cy="28" r="6" fill="currentColor" />
        <path
          d="M18 14h20M14 18v20M42 18v20M18 42h20M18 18l8 8M38 18l-8 8M18 38l8-8M38 38l-8-8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    num: "/ 03",
    title: "Enterprise Engineering",
    desc: "맞춤형 IT 시스템의 설계 · 구축 · 운영. 클라이언트 의뢰 기반.",
    href: "#approach",
    foot: "Services →",
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <rect
          x="8"
          y="14"
          width="40"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M8 22h40M14 30h6M14 36h10M28 30h6M28 36h10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="13" cy="18" r="1" fill="currentColor" />
        <circle cx="17" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "/ 04",
    title: "Continuity",
    desc: "의미의 단절을 메우는 단 하나의 문제. 모든 의사결정의 기준선.",
    href: "#approach",
    foot: "Mission →",
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <path
          d="M8 28 C 8 14 20 8 28 8 C 36 8 48 14 48 28 C 48 42 36 48 28 48 C 20 48 8 42 8 28 Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M14 28 H 42" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M28 14 V 42"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="2 3"
        />
      </svg>
    ),
  },
  {
    num: "/ 05",
    title: "Contact",
    desc: "프로젝트 의뢰 · 협업 제안 · 미디어 문의는 한 곳에서.",
    href: "#contact",
    foot: "Inquire →",
    icon: (
      <svg viewBox="0 0 56 56" fill="none">
        <path
          d="M10 36 V 16 H 46 V 40 H 24 L 16 46 V 40 H 10 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="28" r="1.6" fill="currentColor" />
        <circle cx="28" cy="28" r="1.6" fill="currentColor" />
        <circle cx="34" cy="28" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
];

export function StudioGrid() {
  return (
    <section id="approach" className="relative py-[clamp(60px,8vw,120px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="Studio"
            title={
              <>
                하나의 문제, 두 갈래의 실행.
                <br className="hidden md:inline" />
                AI 제품 라인과 엔터프라이즈 엔지니어링.
              </>
            }
            aside="05 entry points"
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map((c) => (
              <a
                key={c.num}
                href={c.href}
                className="group relative flex min-h-[320px] flex-col gap-4 bg-background px-6 pb-6 pt-7 transition-colors hover:bg-surface-soft"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                  {c.num}
                </div>
                <div className="flex h-[72px] items-center justify-start text-accent-soft [&_svg]:size-14">
                  {c.icon}
                </div>
                <h3 className="m-0 break-keep text-[17px] font-semibold leading-[1.35] tracking-[-0.012em]">
                  {c.title}
                </h3>
                <p className="m-0 break-keep text-[13px] leading-[1.7] text-fg-muted">
                  {c.desc}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                    {c.foot}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                    className="text-fg-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-soft"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
