import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// The hosted DATABASE_URL was written for a serverless runtime and pins
// connection_limit=1. On a long-running Next.js server that leaves one database
// connection for every concurrent request, and under light load Prisma times out
// with P2024 (pages fail, admin saves fail). A long-running server gets a real pool;
// DB_CONNECTION_LIMIT overrides it when needed.
function datasourceUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    url.searchParams.set("connection_limit", process.env.DB_CONNECTION_LIMIT ?? "10");
    if (!url.searchParams.has("pool_timeout")) url.searchParams.set("pool_timeout", "20");
    return url.toString();
  } catch {
    return raw;
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: datasourceUrl(),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
