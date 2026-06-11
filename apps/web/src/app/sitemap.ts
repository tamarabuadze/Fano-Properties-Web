import { MetadataRoute } from "next";
import { prisma } from "@fano/db";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/properties`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/agents`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

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

  return [...staticPages, ...propertyPages, ...agentPages, ...articlePages];
}
