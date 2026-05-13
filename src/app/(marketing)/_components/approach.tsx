import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

type Item = { k: string; v: string; meta: string };

const trackA: Item[] = [
  { k: "01", v: "Specify · Ontology AI Agent", meta: "Open Beta" },
  { k: "02", v: "Product II · 도메인 검토 단계", meta: "TBA" },
  { k: "03", v: "Product III · 도메인 검토 단계", meta: "TBA" },
];

const trackB: Item[] = [
  { k: "·", v: "Architecture · System Design", meta: "Scope" },
  { k: "·", v: "Implementation · Integration", meta: "Build" },
  { k: "·", v: "Operation · Continuous Support", meta: "Run" },
];

export function Approach() {
  return (
    <section className="relative py-[clamp(60px,8vw,120px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="Practice"
            title="두 갈래는 서로의 자원과 의사결정 흐름을 분리해 독립적으로 운영합니다."
            aside="2-track operation"
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-line-soft bg-line-soft md:grid-cols-2">
            <Pane
              sub="▌ Track A / Product Line"
              title="AI Products"
              body="장기 성장 동력. Specify를 시작으로 AI를 활용한 후속 제품을 순차적으로 추가해 제품군을 확장합니다."
              items={trackA}
            />
            <Pane
              sub="▌ Track B / Service Line"
              title="Enterprise Engineering"
              body="단기 자금 + 캐시플로. 클라이언트 의뢰 기반의 맞춤형 IT 시스템 설계·구축·운영. AI 제품 라인과 분리 운영합니다."
              items={trackB}
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
}: {
  sub: string;
  title: string;
  body: string;
  items: Item[];
}) {
  return (
    <div className="bg-background px-8 py-9">
      <div className="mb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
        {sub}
      </div>
      <h3 className="m-0 mb-2 text-[22px] font-semibold tracking-[-0.015em]">
        {title}
      </h3>
      <p className="m-0 mb-6 max-w-[50ch] break-keep text-sm leading-[1.75] text-fg-muted">
        {body}
      </p>
      <ul className="m-0 grid list-none gap-px border-t border-line-soft bg-line-soft p-0">
        {items.map((item) => (
          <li
            key={item.v}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3.5 bg-background py-3.5 text-[13.5px]"
          >
            <span className="font-mono text-[10.5px] text-fg-dim">{item.k}</span>
            <span className="text-foreground">{item.v}</span>
            <span className="font-mono text-[10.5px] text-fg-dim">
              {item.meta}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
