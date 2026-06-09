import { prisma } from "@fano/db";

export async function getAgents(limit?: number) {
  return prisma.agent.findMany({
    where: { active: true },
    take: limit,
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { properties: { where: { published: true } } } },
    },
  });
}

export async function getAgentBySlug(slug: string) {
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
