// JD 본문 한 섹션 렌더러 — 제목 + 도입 단락 + 글머리표 + 마무리 단락
import type { JobSection as JobSectionData } from "../_data/jobs";

type Props = {
  section: JobSectionData;
  /** 좌측 번호 라벨 (예: "01"). */
  num: string;
};

export function JobSection({ section, num }: Props) {
  return (
    <section className="grid grid-cols-1 gap-y-4 border-t border-dashed border-border py-9 md:grid-cols-[200px_1fr] md:gap-x-12">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-label-sm uppercase text-fg-dim">
          {num}
        </span>
        <h2 className="m-0 break-keep text-subheading text-foreground">
          {section.heading}
        </h2>
      </div>

      <div className="max-w-[68ch]">
        {section.lead ? (
          <p className="m-0 break-keep text-body text-fg-muted">
            {section.lead}
          </p>
        ) : null}

        {section.bullets ? (
          <ul
            className={`m-0 grid list-none gap-2.5 p-0 ${
              section.lead ? "mt-5" : ""
            }`}
          >
            {section.bullets.map((bullet) => (
              <li
                key={bullet}
                className="grid grid-cols-[16px_1fr] gap-3 break-keep text-body text-fg-muted"
              >
                <span
                  aria-hidden
                  className="mt-[0.55em] h-px w-2.5 self-start bg-border-strong"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {section.outro ? (
          <p className="m-0 mt-5 break-keep text-body text-fg-muted">
            {section.outro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
