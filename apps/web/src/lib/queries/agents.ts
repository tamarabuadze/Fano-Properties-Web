import { prisma } from "@fano/db";
import { cached, CACHE_TAGS } from "@/lib/cache";

/** Removes email and phone from an agent who chose not to show them on the website */
export function publicAgent<T extends { showContact: boolean; email: string | null; phone: string | null }>(agent: T): T {
  if (!agent.showContact) return { ...agent, email: null, phone: null } as T;
  return agent;
}

async function getAgentsUncached(limit?: number) {
  const agents = await prisma.agent.findMany({
    where: { active: true },
    take: limit,
    orderBy: [{ employeeId: "asc" }, { createdAt: "asc" }],
    include: {
      _count: { select: { properties: { where: { published: true } } } },
    },
  });
  return agents.map(publicAgent);
}

async function getAgentBySlugUncached(slug: string) {
  const agent = await prisma.agent.findUnique({
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
  return agent && publicAgent(agent);
}

export const getAgents = cached(getAgentsUncached, "getAgents", [CACHE_TAGS.agents, CACHE_TAGS.properties]);
export const getAgentBySlug = cached(getAgentBySlugUncached, "getAgentBySlug", [CACHE_TAGS.agents, CACHE_TAGS.properties]);
