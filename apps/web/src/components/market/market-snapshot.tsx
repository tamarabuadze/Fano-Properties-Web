import {
  getMarketSnapshot,
  hasFigures,
  MARKET_AREAS,
  type MarketAreaKey,
  type MarketSnapshot as Snapshot,
  type MarketAreaFigures,
} from "@/lib/market-snapshot";

type MarketSnapshot = Snapshot;

const aed = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function compactAed(v: number) {
  if (v >= 1e9) return `AED ${(v / 1e9).toFixed(2)}bn`;
  if (v >= 1e6) return `AED ${(v / 1e6).toFixed(1)}m`;
  return `AED ${aed.format(v)}`;
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Official Dubai Land Department office-sale figures for an area, entered by the team in
 * Admin → Market data. Renders nothing until figures exist, so pages never show placeholders.
 */
export async function MarketSnapshot({
  area,
  fallback = null,
  wrap = (box) => box,
}: {
  area: MarketAreaKey;
  fallback?: React.ReactNode;
  /** Page chrome around the box, only drawn when there are figures */
  wrap?: (box: React.ReactNode) => React.ReactNode;
}) {
  const snap = await getMarketSnapshot();
  const fig = snap?.areas[area];
  if (!snap || !hasFigures(fig)) return <>{fallback}</>;
  return <>{wrap(<SnapshotBox area={area} snap={snap} fig={fig} />)}</>;
}

function SnapshotBox({ area, snap, fig }: { area: MarketAreaKey; snap: MarketSnapshot; fig: MarketAreaFigures }) {

  const label = MARKET_AREAS.find((a) => a.key === area)?.label ?? "Dubai";
  const change =
    fig.avgPricePerSqft != null && fig.prevAvgPricePerSqft
      ? ((fig.avgPricePerSqft - fig.prevAvgPricePerSqft) / fig.prevAvgPricePerSqft) * 100
      : null;

  const tiles = [
    fig.transactions != null && { label: "Office sales registered", value: aed.format(fig.transactions) },
    fig.avgPricePerSqft != null && {
      label: "Average price",
      value: `AED ${aed.format(fig.avgPricePerSqft)}`,
      unit: "/sq ft",
      note: change != null ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}% on the year before` : undefined,
    },
    fig.totalValue != null && { label: "Total value", value: compactAed(fig.totalValue) },
  ].filter(Boolean) as { label: string; value: string; unit?: string; note?: string }[];

  return (
    <section aria-labelledby={`market-${area}`} className="rounded-[4px] border border-lx-line bg-lx-surface p-6 lg:p-8">
      <p className="lx-eyebrow mb-3">Dubai Land Department data</p>
      <h2 id={`market-${area}`} className="font-display text-[clamp(24px,2.6vw,32px)] font-normal leading-tight text-lx-text">
        Office market: {label}
      </h2>
      <p className="mt-2 text-[13px] text-lx-text/60">{snap.periodLabel}</p>

      <dl className="mt-6 grid gap-6 sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="border-t border-lx-line pt-4">
            <dt className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-lx-gold">{t.label}</dt>
            <dd className="mt-2 font-display text-[28px] leading-none text-lx-text">
              {t.value}
              {t.unit && <span className="ml-1 text-[14px] text-lx-muted">{t.unit}</span>}
            </dd>
            {t.note && <dd className="mt-2 text-[12px] text-lx-text/60">{t.note}</dd>}
          </div>
        ))}
      </dl>

      <p className="mt-6 text-[12px] text-lx-text/50">
        Source:{" "}
        <a href={snap.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-lx-gold">
          Dubai Land Department, registered office sale transactions
        </a>
        . Updated {formatDate(snap.asOf)}.
      </p>
    </section>
  );
}
