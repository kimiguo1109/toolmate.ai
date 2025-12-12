import { MetadataRoute } from "next";

// Demo toolkits - in production, fetch from database
const DEMO_TOOLKITS = [
  { slug: "kimi-pm-hiker", updatedAt: new Date() },
  { slug: "alex-developer-gaming", updatedAt: new Date() },
  { slug: "sarah-designer-cooking", updatedAt: new Date() },
];

const PROFESSIONS = [
  "product-manager",
  "developer",
  "designer",
  "marketer",
  "student",
  "writer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://maxmate.ai";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/personas`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Profession category pages
  const professionPages = PROFESSIONS.map((profession) => ({
    url: `${baseUrl}/personas/${profession}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // User toolkit pages
  const toolkitPages = DEMO_TOOLKITS.map((toolkit) => ({
    url: `${baseUrl}/u/${toolkit.slug}`,
    lastModified: toolkit.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...professionPages, ...toolkitPages];
}

