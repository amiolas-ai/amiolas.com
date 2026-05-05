import { Eyebrow } from "@/components/marketing/eyebrow";

export function Hero() {
  return (
    <section className="px-6">
      <div className="mx-auto max-w-7xl py-32 sm:py-40 md:py-48">
        <div className="grid gap-10 md:grid-cols-[1.45fr_1fr] md:gap-12 lg:gap-20">
          <h1 className="break-keep text-balance text-[clamp(2.25rem,4.8vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            단절된 곳에 의미의 연속성을 회복합니다.
          </h1>
          <div className="md:pt-3">
            <Eyebrow>AI STUDIO</Eyebrow>
            <p className="mt-5 break-keep text-pretty text-base leading-[1.65] text-muted-foreground sm:text-lg">
              {"Amiolas는 자체 AI 제품과 엔터프라이즈 엔지니어링을 병행하는 AI Studio입니다. 사내 데이터, 협업의 흐름, 시스템과 시스템 사이—의미가 끊어지는 모든 자리에서 같은 원칙으로 일합니다. 이것이 모든 제품·사업·의사결정의 방향을 정하는 기준입니다."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
