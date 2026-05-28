const SITE_URL = "https://amiolas.com";

const ORG_ID = `${SITE_URL}#org`;
const WEBSITE_ID = `${SITE_URL}#website`;

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Amiolas",
  alternateName: "아미올라스",
  legalName: "Amiolas, Inc.",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/logo.png`,
  description:
    "단절된 곳에 의미의 연속성을 회복합니다. 자체 AI 에이전트와 엔터프라이즈 엔지니어링을 병행하는 AI Studio.",
  foundingDate: "2025",
  email: "support@amiolas.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seoul",
    addressCountry: "KR",
  },
} as const;

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Amiolas",
  inLanguage: "ko-KR",
  publisher: { "@id": ORG_ID },
} as const;

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
