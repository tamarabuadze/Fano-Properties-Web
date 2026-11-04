import { prisma } from "@fano/db";
import { cached, CACHE_TAGS } from "@/lib/cache";

async function getAgentsUncached(limit?: number) {
  return prisma.agent.findMany({
    where: { active: true },
    take: limit,
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { properties: { where: { published: true } } } },
    },
  });
}

async function getAgentBySlugUncached(slug: string) {
  return prisma.agent.findUnique({
    where: { slug },
    include: {
      properties: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { images: { orderBy: { position: "asc" }, take: 1 } },
      },
      _count: { select: { properties: true } },
    },
  });
}

export const getAgents = cached(getAgentsUncached, "getAgents", [CACHE_TAGS.agents, CACHE_TAGS.properties]);
export const getAgentBySlug = cached(getAgentBySlugUncached, "getAgentBySlug", [CACHE_TAGS.agents, CACHE_TAGS.properties]);
