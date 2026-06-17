// 채용 리스트의 직무 행 — 행 전체가 상세로 이동하는 링크(키보드 포커스 가능)
import Link from "next/link";
import type { Job } from "../_data/jobs";

type Props = {
  job: Job;
};

export function JobRow({ job }: Props) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group grid grid-cols-1 items-center gap-3 bg-background px-[clamp(20px,2.5vw,36px)] py-7 outline-none transition-colors hover:bg-surface-card focus-visible:bg-surface-card focus-visible:ring-2 focus-visible:ring-brand md:grid-cols-[1fr_auto] md:gap-8"
    >
      <div>
        <h3 className="m-0 break-keep text-subheading text-foreground transition-colors group-hover:text-brand-light">
          {job.title}
        </h3>
        <p className="m-0 mt-2 max-w-[52ch] text-pretty break-keep text-body-sm text-fg-muted">
          {job.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-label-sm uppercase text-fg-dim">
          <span>{job.team}</span>
          <span aria-hidden className="opacity-40">
            ·
          </span>
          <span>{job.type}</span>
          <span aria-hidden className="opacity-40">
            ·
          </span>
          <span>{job.location}</span>
        </div>
      </div>

      <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-label uppercase text-fg-dim transition-colors group-hover:text-brand-light">
        상세 보기
        <svg
          width="12"
          height="12"
          viewBox="0 0 13 13"
          fill="none"
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M3 6.5H10M10 6.5L6.5 3M10 6.5L6.5 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
