import { Eyebrow } from "@/components/marketing/eyebrow";

export function SpecifyCard() {
  return (
    <section className="border-t border-border/60 px-6">
      <div className="mx-auto max-w-7xl py-20 sm:py-24">
        <article className="grid gap-6 md:grid-cols-[1fr_2.4fr] md:gap-12 lg:gap-16">
          <div className="flex flex-col gap-2">
            <Eyebrow>Open Beta · Ontology AI-Agent</Eyebrow>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-balance text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
              Specify
            </h2>
            <p className="mt-4 break-keep text-pretty leading-[1.6] text-muted-foreground sm:text-lg">
              {"흩어진 사내 데이터를 그래프 기반 온톨로지로 통합해 정보 탐색 시간을 40% 단축합니다."}
            </p>
            <a
              href="https://specify.app"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border-strong decoration-1 underline-offset-[5px] transition hover:text-brand hover:decoration-brand"
            >
              specify.app에서 살펴보기
              <span aria-hidden>→</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
