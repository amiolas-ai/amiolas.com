import type { Metadata } from "next";

const SITE_URL = "https://amiolas.com";

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
