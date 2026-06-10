import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";

type Item = { k: string; v: string; meta: string };

const trackA: Item[] = [
  { k: "01", v: "Specify · Ontology AI Agent", meta: "Open Beta" },
  { k: "02", v: "Agent II · 도메인 검토 단계", meta: "TBA" },
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
            title="AI 에이전트 개발과 기업 시스템 구축. 두 사업은 자원과 의사결정을 나눠 독립적으로 운영합니다."
            aside="2-track operation"
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-dashed border-border bg-line-soft md:grid-cols-2">
            <Pane
              sub="▌ Track A / Agent Line"
              title="AI Agents"
              body="장기 성장을 맡는 축입니다. 첫 제품 Specify가 Open Beta로 운영 중이고, 다음 에이전트들은 도메인 검토 단계에 있습니다."
              items={trackA}
            />
            <Pane
              sub="▌ Track B / Service Line"
              title="Enterprise Engineering"
              body="오늘의 운영 자금을 안정시키는 축입니다. 기업 의뢰를 받아 IT 시스템을 설계부터 운영까지 맡습니다. AI 에이전트 개발과 인력·의사결정을 나눠, 서로의 속도를 해치지 않습니다."
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
    </div>
  );
}
