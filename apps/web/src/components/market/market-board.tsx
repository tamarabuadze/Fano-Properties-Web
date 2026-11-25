import type { CSSProperties } from "react";
import type { MarketSeries } from "@/lib/dubai-market";
import type { NewsItem } from "@/lib/dubai-news";
import { MarketChart } from "./market-chart";
import { formatPrice } from "./format";

// The market board and the ticker tape beside the Dubai news. Every figure is a real share price
// (lib/dubai-market.ts); every headline links to the publisher's own article (lib/dubai-news.ts).

const sinceFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "Asia/Dubai" });
const asOfFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Dubai",
});

function Change({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold tabular-nums text-[#5BC08A] ${className}`}>
      <span aria-hidden="true">▲</span>
      <span>
        <span className="sr-only">up </span>
        {pct.toFixed(1)}%
      </span>
    </span>
  );
}

function summary(s: MarketSeries) {
  return `${s.name} share price, monthly closes from ${sinceFmt.format(new Date(s.since))}: now ${formatPrice(s.price, s.currency)}, up ${s.changePct.toFixed(1)}% over five years.`;
}

export function MarketBoard({ series }: { series: MarketSeries[] }) {
  if (series.length === 0) return null;
  const [lead, ...rest] = series as [MarketSeries, ...MarketSeries[]];
  const asOf = series.map((s) => s.asOf).sort().at(-1)!;

  return (
    <div className="overflow-hidden rounded-[4px] border border-[#E2A862]/20 bg-[#1A1612] text-[#F7F1E8] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F7F1E8]/10 px-5 py-4 lg:px-8">
        <p className="flex items-center gap-3 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E2A862]">
          <span className="block h-px w-8 bg-[#E2A862]/70" aria-hidden="true" />
          Market pulse · Dubai Financial Market
        </p>
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#F7F1E8]/50">5-year share prices</p>
      </div>

      <div className={`grid ${rest.length ? "lg:grid-cols-12" : ""}`}>
        {/* The leading developer, drawn large */}
        <div className={`flex flex-col px-5 pb-6 pt-6 lg:px-8 lg:pb-8 ${rest.length ? "lg:col-span-7 lg:border-r lg:border-[#F7F1E8]/10" : ""}`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7F1E8]/55">
                {lead.ticker} · {lead.name}
              </p>
              <p className="mt-2 font-display text-[clamp(30px,3.4vw,44px)] leading-none tabular-nums">{formatPrice(lead.price, lead.currency)}</p>
            </div>
            <p className="text-right text-[13px] text-[#F7F1E8]/60">
              <Change pct={lead.changePct} className="text-[18px]" />
              <span className="mt-1 block">since {sinceFmt.format(new Date(lead.since))}</span>
            </p>
          </div>
          <div className="mt-6 flex min-h-[220px] flex-1 flex-col lg:min-h-[280px]">
            <MarketChart points={lead.points} currency={lead.currency} label={summary(lead)} variant="feature" className="flex-1" />
          </div>
        </div>

        {/* The others, one row each */}
        {rest.length > 0 && (
          <ul className="divide-y divide-[#F7F1E8]/10 border-t border-[#F7F1E8]/10 lg:col-span-5 lg:border-t-0">
            {rest.map((s) => (
              <li key={s.symbol} className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-3 px-5 py-5 lg:px-8">
                <div>
                  <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7F1E8]/55">{s.ticker}</p>
                  <p className="mt-1 text-[14px] text-[#F7F1E8]/90">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[15px] tabular-nums">{formatPrice(s.price, s.currency)}</p>
                  <p className="mt-0.5 text-[12px] text-[#F7F1E8]/55">
                    <Change pct={s.changePct} /> <span className="ml-1">5y</span>
                  </p>
                </div>
                <div className="col-span-2">
                  <MarketChart points={s.points} currency={s.currency} label={summary(s)} height={56} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="border-t border-[#F7F1E8]/10 px-5 py-4 text-[11px] leading-relaxed text-[#F7F1E8]/45 lg:px-8">
        Monthly closing share prices of Dubai-listed property developers; latest price delayed. Source: Yahoo Finance,
        updated {asOfFmt.format(new Date(asOf))} GST. Past performance is not a guide to future returns.
      </p>
    </div>
  );
}

/**
 * A slow ticker tape of the developers' prices and the latest headlines. It repeats what the board and
 * the news list already say, so it is hidden from screen readers and stands still for reduced motion.
 */
export function MarketTicker({ items, market, className = "" }: { items: NewsItem[]; market: MarketSeries[]; className?: string }) {
  if (items.length === 0 && market.length === 0) return null;
  const entries = [
    ...market.map((s) => ({ key: s.symbol, kind: "stock" as const, s })),
    ...items.map((n) => ({ key: n.url, kind: "news" as const, n })),
  ];
  const style = { "--lx-ticker-duration": `${Math.max(40, entries.length * 9)}s` } as CSSProperties;

  const row = (copy: number) =>
    entries.map((e) => (
      <span key={`${copy}-${e.key}`} className="flex shrink-0 items-center gap-4 pr-10">
        <span className="block h-[5px] w-[5px] rotate-45 bg-[#E2A862]" />
        {e.kind === "stock" ? (
          <span className="flex items-center gap-2 tabular-nums">
            <span className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E2A862]">{e.s.ticker}</span>
            <span className="text-[#F7F1E8]">{formatPrice(e.s.price, e.s.currency)}</span>
            <span className="text-[#5BC08A]">▲ {e.s.changePct.toFixed(1)}%</span>
            <span className="text-[#F7F1E8]/45">5y</span>
          </span>
        ) : (
          <a href={e.n.url} target="_blank" rel="noopener noreferrer nofollow" tabIndex={-1} className="flex items-center gap-2 hover:text-[#E2A862]">
            <span className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7F1E8]/45">{e.n.source}</span>
            <span className="text-[#F7F1E8]/90">{e.n.title}</span>
          </a>
        )}
      </span>
    ));

  return (
    <div className={`lx-ticker overflow-hidden border-y border-[#E2A862]/20 bg-[#120F0C] py-3 text-[13px] ${className}`} aria-hidden="true" style={style}>
      <div className="lx-ticker-track flex">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
