"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { actionFailed } from "@/lib/admin-errors";
import { MARKET_SNAPSHOT_KEY, marketSnapshotSchema, type MarketSnapshot } from "@/lib/market-snapshot";

export async function saveMarketSnapshot(data: MarketSnapshot) {
  await requireAdmin();
  const parsed = marketSnapshotSchema.safeParse(data);
  if (!parsed.success) return { success: false as const, error: parsed.error.errors[0]?.message ?? "Invalid data" };

  try {
    const value = JSON.stringify(parsed.data);
    await prisma.siteSettings.upsert({
      where: { key: MARKET_SNAPSHOT_KEY },
      update: { value },
      create: { key: MARKET_SNAPSHOT_KEY, value, description: "DLD office-sale figures shown on the commercial pages" },
    });
    revalidatePath("/commercial-properties", "layout");
    return { success: true as const };
  } catch (e) {
    return actionFailed("Failed to save market data.", e);
  }
}

/** Removes the figures; the box disappears from the site */
export async function clearMarketSnapshot() {
  await requireAdmin();
  try {
    await prisma.siteSettings.deleteMany({ where: { key: MARKET_SNAPSHOT_KEY } });
    revalidatePath("/commercial-properties", "layout");
    return { success: true as const };
  } catch (e) {
    return actionFailed("Failed to clear market data.", e);
  }
}
