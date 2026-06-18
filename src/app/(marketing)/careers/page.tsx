// /careers 직무 리스트 페이지 — 공개 직무를 행 리스트로 보여주고 상세로 연결
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHead } from "@/components/marketing/section-head";
import { getAllJobs } from "./_data/jobs";
import { JobRow } from "./_components/job-row";

export const metadata: Metadata = buildMetadata({
  title: "영입",
  description:
    "Amiolas는 AI 에이전트 소프트웨어 개발을 주력으로, 자체 AI 제품과 엔터프라이즈 엔지니어링을 함께 만드는 AI Studio입니다. 의미를 함께 만들 동료를 찾습니다.",
  path: "/careers",
});

export default function CareersPage() {
  const jobs = getAllJobs();
  const openCount = String(jobs.length).padStart(2, "0");

  return (
    <section className="relative py-section">
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <SectionHead
            label="영입 · 공개 직무"
            title="의미를 함께 만들 동료를 찾습니다."
            aside={`${openCount} Open`}
          />
        </Reveal>

        <Reveal>
          <ul className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-xl border border-dashed border-border bg-line-soft p-0">
            {jobs.map((job) => (
              <li key={job.slug} className="bg-background">
                <JobRow job={job} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
