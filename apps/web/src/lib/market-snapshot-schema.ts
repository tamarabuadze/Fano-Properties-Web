import { z } from "zod";

/** Areas the office pages show figures for */
export const MARKET_AREAS = [
  { key: "dubai", label: "All Dubai" },
  { key: "business-bay", label: "Business Bay" },
  { key: "sheikh-zayed-road", label: "Sheikh Zayed Road" },
] as const;

export type MarketAreaKey = (typeof MARKET_AREAS)[number]["key"];

const num = z.coerce.number().finite().nonnegative();

export const marketAreaSchema = z.object({
  /** Office sale transactions registered with DLD in the period */
  transactions: num.int().optional(),
  /** Average sale price, AED per sq ft */
  avgPricePerSqft: num.optional(),
  /** Same figure for the year before, to show the change */
  prevAvgPricePerSqft: num.optional(),
  /** Total value of those transactions, AED */
  totalValue: num.optional(),
});

export const marketSnapshotSchema = z.object({
  periodLabel: z.string().trim().min(3, "Say which dates the figures cover").max(80),
  asOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date the figures were taken"),
  sourceUrl: z.string().url().max(300),
  areas: z.object({
    dubai: marketAreaSchema,
    "business-bay": marketAreaSchema,
    "sheikh-zayed-road": marketAreaSchema,
  }),
});

export type MarketSnapshot = z.infer<typeof marketSnapshotSchema>;
export type MarketAreaFigures = z.infer<typeof marketAreaSchema>;

export const MARKET_SNAPSHOT_KEY = "marketSnapshot";
export const DLD_SOURCE_URL = "https://dubailand.gov.ae/en/open-data/real-estate-data/";

/** True when an area has at least one figure worth showing */
export function hasFigures(a: MarketAreaFigures | undefined): a is MarketAreaFigures {
  return !!a && (a.transactions != null || a.avgPricePerSqft != null || a.totalValue != null);
}
