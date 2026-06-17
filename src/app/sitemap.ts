import type { MetadataRoute } from "next";
import { getAllJobs } from "./(marketing)/careers/_data/jobs";

const SITE_URL = "https://amiolas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const jobEntries: MetadataRoute.Sitemap = getAllJobs().map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...jobEntries,
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
