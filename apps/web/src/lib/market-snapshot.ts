import { prisma } from "@fano/db";
import { MARKET_SNAPSHOT_KEY, marketSnapshotSchema, type MarketSnapshot } from "./market-snapshot-schema";

export * from "./market-snapshot-schema";

/** Saved figures, or null when none have been entered (the box then stays hidden) */
export async function getMarketSnapshot(): Promise<MarketSnapshot | null> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { key: MARKET_SNAPSHOT_KEY } });
    if (!row) return null;
    const parsed = marketSnapshotSchema.safeParse(JSON.parse(row.value));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
