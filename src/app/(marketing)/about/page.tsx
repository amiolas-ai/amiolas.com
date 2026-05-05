import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description:
    "Amiolas는 단절된 곳에 의미의 연속성을 복원하는 AI Studio입니다.",
};

const lore = [
  { term: "본질", desc: "얼굴 전체를 감싸는 마법 투구" },
  {
    term: "별칭",
    desc: "Embalming-Skull · Cauldron — 인간들 사이에서 두려움의 대상으로 알려진 이름들",
  },
  {
    term: "제작자",
    desc: 'Emilidis "The Artisan" — 마법 유물을 다루는 장인 학파의 창설자',
  },
  {
    term: "장인의 통찰",
    desc: "이종 언어의 통합이 곧 이질적 영혼의 통합을 요구한다는 형이상학적 통찰",
  },
] as const;

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <header className="mb-20">
        <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-light">
          About
        </span>
        <h1 className="mt-3 text-balance text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          <span className="text-[oklch(0.82_0.07_225)]">A</span>m
          <span className="text-[oklch(0.82_0.07_225)]">i</span>olas{" "}
          <span className="text-muted-foreground">아미올라스</span>
        </h1>
        <p className="mt-6 text-pretty text-lg leading-[1.6] text-muted-foreground">
          Amiolas는 자체 AI 제품군과 엔터프라이즈 엔지니어링을 병행하는 AI
          Studio입니다.
        </p>
        <p className="mt-3 text-pretty text-lg leading-[1.6] text-muted-foreground">
          단절된 곳에서 의미의 연속성을 복원하는 일에 집중합니다.
        </p>
      </header>

      <section className="mb-20 border-t border-border pt-12">
        <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-light">
          작명 어원
        </span>
        <p className="mt-4 text-pretty leading-[1.7] text-muted-foreground">
          회사명{" "}
          <strong className="font-medium text-foreground">Amiolas</strong>는
          캐나다 작가 R. Scott Bakker의 판타지 소설 시리즈{" "}
          <em className="font-medium not-italic text-foreground">
            The Second Apocalypse
          </em>
          (제2의 묵시록)에 등장하는 마법 투구 &ldquo;Amiolas&rdquo;에서
          차용했습니다.
        </p>
        <dl className="mt-8 divide-y divide-border">
          {lore.map((item) => (
            <div
              key={item.term}
              className="grid grid-cols-[110px_1fr] gap-6 py-4"
            >
              <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {item.term}
              </dt>
              <dd className="text-pretty leading-[1.6]">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-20 border-t border-border pt-12">
        <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-light">
          미션
        </span>
        <blockquote className="mt-4 border-l-2 border-brand pl-6">
          <p className="text-balance text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.025em]">
            의미의 연속성을 회복합니다.
          </p>
          <cite className="mt-2 block font-mono text-[11px] not-italic tracking-[0.04em] text-muted-foreground">
            Restore the continuity of meaning.
          </cite>
        </blockquote>
        <p className="mt-6 text-pretty leading-[1.7] text-muted-foreground">
          단절된 곳에 의미의 연속성을 복원하는 일에 집중합니다. 사내 데이터,
          협업의 흐름, 시스템과 시스템 사이 — 의미가 끊어지는 모든 자리에서.
          이것이 Amiolas가 푸는 단 하나의 문제이며, 모든 제품·사업·의사결정의
          방향을 정하는 기준입니다.
        </p>
        <blockquote className="mt-10 border-l-2 border-brand pl-6">
          <p className="text-pretty text-xl font-medium leading-[1.5] tracking-[-0.01em]">
            &ldquo;의미와 영혼의 연속성 — 이종 언어의 통합은 이질적 영혼의
            통합을 요구한다.&rdquo;
          </p>
          <cite className="mt-2 block font-mono text-[11px] not-italic tracking-[0.04em] text-muted-foreground">
            Emilidis의 형이상학적 통찰 · R. Scott Bakker, The Second Apocalypse
          </cite>
        </blockquote>
        <p className="mt-6 text-pretty leading-[1.7] text-muted-foreground">
          이 통찰은 단순한 인용이 아닌 우리 일의 청사진입니다. 서로 다른
          &ldquo;언어&rdquo;로 흩어진 사내 데이터(GitHub · Notion · Drive · 코드
          · 메신저)의 의미를 통합 해독하려면, 표면(단어)을 합치기 전에 깊은
          곳(존재·맥락)을 먼저 합쳐야 합니다. 이 원칙이 첫 제품{" "}
          <strong className="font-medium text-foreground">Specify</strong>의
          온톨로지 우선 아키텍처와 1:1로 대응합니다.
        </p>
      </section>

      <section className="border-t border-border pt-12">
        <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-light">
          사업 구조
        </span>
        <h2 className="mt-3 text-balance text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          자체 AI 제품 라인과 엔터프라이즈 엔지니어링 사업을 병행합니다.
        </h2>
        <p className="mt-4 text-pretty leading-[1.7] text-muted-foreground">
          AI 제품 라인의 첫 출발은{" "}
          <strong className="font-medium text-foreground">Specify</strong>이며,
          이후 AI를 활용한 후속 제품을 순차적으로 추가해 제품군을 확장합니다.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-hairline)]">
            <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-light">
              장기 성장 동력
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em]">
              AI 제품 라인
            </h3>
            <ul className="mt-4 space-y-2 text-[0.9375rem] leading-[1.55] text-muted-foreground">
              <li>
                <span className="text-foreground">① Specify</span> — Ontology
                AI-Agent · Open Beta 운영 중
              </li>
              <li>
                <span className="text-foreground">② …(예정)</span> — AI를 활용한
                후속 제품을 순차적으로 추가
              </li>
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-hairline)]">
            <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-light">
              단기 자금 + 캐시플로
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em]">
              엔터프라이즈 엔지니어링
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-[1.55] text-muted-foreground">
              클라이언트 의뢰 기반 맞춤형 IT 시스템 설계·구축·운영. AI 제품
              라인과 자원·인력·의사결정 흐름을 분리해 독립적으로 운영합니다.
            </p>
          </article>
        </div>
      </section>
    </article>
  );
}
