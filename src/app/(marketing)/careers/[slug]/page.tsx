// /careers/[slug] JD 상세 페이지 — 직무별 메타데이터 + JobPosting JSON-LD + 본문 섹션 렌더
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllJobs, getJob } from "../_data/jobs";
import { JobJsonLd } from "../_components/job-jsonld";
import { JobSection } from "../_components/job-section";
import { ApplyCta } from "../_components/apply-cta";

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata(
  props: PageProps<"/careers/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const job = getJob(slug);

  if (!job) {
    return buildMetadata({ title: "영입", path: "/careers" });
  }

  return buildMetadata({
    title: `${job.title} · 영입`,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailPage(
  props: PageProps<"/careers/[slug]">,
) {
  const { slug } = await props.params;
  const job = getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <article className="relative py-section">
      <JobJsonLd job={job} />
      <div className="mx-auto max-w-[1080px] px-[var(--pad)]">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 font-mono text-label-sm uppercase text-fg-muted outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden
          >
            <path
              d="M10 6.5H3M3 6.5L6.5 3M3 6.5L6.5 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          공개 직무
        </Link>

        <header className="mt-8 border-b border-dashed border-border pb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-label uppercase text-fg-dim">
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
          <h1 className="m-0 mt-4 break-keep text-title text-foreground">
            {job.title}
          </h1>
          <p className="m-0 mt-6 max-w-[68ch] text-pretty break-keep text-lede text-fg-muted">
            {job.lead}
          </p>
        </header>

        <div>
          {job.sections.map((section, i) => (
            <JobSection
              key={section.heading}
              section={section}
              num={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>

        <ApplyCta />
      </div>
    </article>
  );
}
