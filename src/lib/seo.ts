import type { Metadata } from "next";

const SITE_URL = "https://amiolas.com";

/** 사이트 공통 소개 문장 — layout·manifest·json-ld·OG 이미지가 모두 이 상수를 참조 (표류 방지) */
export const SITE_DESCRIPTION =
  "흩어진 회사 지식을 AI로 다시 잇습니다. 자체 AI 에이전트 개발과 기업 시스템 구축을 병행하는 AI Studio, Amiolas.";

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  /** Path beginning with "/" (e.g. "/", "/contact"). Used for canonical + openGraph.url. */
  path?: string;
};

/**
 * Page-level metadata helper. Provides canonical + openGraph.url + title/description
 * overrides in one place. Root layout in src/app/layout.tsx supplies the rest
 * (authors, publisher, robots, openGraph.type/locale/siteName/images, viewport).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: BuildMetadataArgs = {}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    alternates: {
      canonical: path,
      languages: { "ko-KR": path },
    },
    openGraph: {
      url,
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
    },
    twitter: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
    },
  };
}
