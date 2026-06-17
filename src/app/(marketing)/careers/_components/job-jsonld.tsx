// JD 상세의 JobPosting 구조화데이터(JSON-LD) — 유효 필수 필드만 채워 무효 스키마 방지
import type { Job } from "../_data/jobs";

type Props = {
  job: Job;
};

export function JobJsonLd({ job }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.datePosted,
    employmentType: "FULL_TIME",
    directApply: false,
    hiringOrganization: {
      "@type": "Organization",
      name: "Amiolas",
      url: "https://amiolas.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // 정적 빌드 데이터(외부 입력 아님)를 직렬화 — XSS 표면 없음
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
