import { MetadataRoute } from "next";
import { prisma } from "@fano/db";

// Built on request: the build has no database, so a build-time sitemap lists no properties
export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

function newest(rows: { updatedAt: Date }[]): Date | undefined {
  return rows.reduce<Date | undefined>((m, r) => (!m || r.updatedAt > m ? r.updatedAt : m), undefined);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, agents, articles] = await Promise.all([
    prisma.property.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
    prisma.agent.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
    prisma.blogArticle.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
  ]);

  // Brochure pages carry no lastmod; listing pages take their newest item's date
  const latestProperty = newest(properties);
  const latestArticle = newest(articles);
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: latestProperty, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/properties`, lastModified: latestProperty, changeFrequency: "hourly", priority: 0.9 },
    // Commercial lives on clean URLs; /properties?category=commercial canonicalises to the hub
    { url: `${BASE_URL}/commercial-properties`, lastModified: latestProperty, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/commercial-properties/offices-for-sale`, lastModified: latestProperty, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/commercial-properties/business-bay`, lastModified: latestProperty, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/commercial-properties/sheikh-zayed-road`, lastModified: latestProperty, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/properties?category=residential`, lastModified: latestProperty, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/agents`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: latestArticle, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/roi-calculator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/list-with-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const agentPages: MetadataRoute.Sitemap = agents.map((a) => ({
    url: `${BASE_URL}/agents/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const listedStatic = agents.length > 0 ? staticPages : staticPages.filter((p) => !p.url.endsWith("/agents"));

  return [...listedStatic, ...propertyPages, ...agentPages, ...articlePages];
}
