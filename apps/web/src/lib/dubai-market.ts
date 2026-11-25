// Share prices of Dubai-listed property developers for the market charts beside the news feed.
//
// Real numbers only: monthly closing prices over five years, read from Yahoo Finance's public chart
// data (delayed, unofficial feed). Nothing is estimated or adjusted. The server keeps the figures for
// three hours; if Yahoo cannot be reached the last good figures are kept, and with none at all the
// charts simply do not show.
//
// Editorial rule (Fano's own site): the charts use a fixed five-year window, and a company is shown
// only while its share price is up over that window. A developer whose five-year trend turns
// negative drops out on its own rather than showing a falling line.

export interface MarketPoint {
  t: string; // ISO date of the month
  c: number; // closing price
}

export interface MarketSeries {
  symbol: string;
  ticker: string;
  name: string;
  currency: string;
  price: number;
  changePct: number; // over the whole window
  since: string; // ISO date the window starts
  asOf: string; // ISO time of the latest price
  points: MarketPoint[];
}

// Listed Dubai developers, in a fixed order (never sorted by performance)
const STOCKS = [
  { symbol: "EMAAR.AE", ticker: "EMAAR", name: "Emaar Properties" },
  { symbol: "EMAARDEV.AE", ticker: "EMAARDEV", name: "Emaar Development" },
  { symbol: "UPP.AE", ticker: "UPP", name: "Union Properties" },
  { symbol: "DEYAAR.AE", ticker: "DEYAAR", name: "Deyaar Development" },
] as const;

const HOSTS = ["https://query1.finance.yahoo.com", "https://query2.finance.yahoo.com"];
const TTL_MS = 3 * 60 * 60 * 1000;
const RETRY_MS = 10 * 60 * 1000;
const MIN_POINTS = 24; // two years of months at least, or the chart says too little

let cache: { at: number; series: MarketSeries[] } | null = null;
let pending: Promise<MarketSeries[]> | null = null;

interface ChartResponse {
  chart?: {
    result?: {
      meta?: { currency?: string; regularMarketPrice?: number; regularMarketTime?: number };
      timestamp?: number[];
      indicators?: { quote?: { close?: (number | null)[] }[] };
    }[];
  };
}

/** Turns one Yahoo chart response into a series, or null when the data is unusable (exported for tests) */
export function parseChart(json: ChartResponse, stock: (typeof STOCKS)[number]): MarketSeries | null {
  const result = json.chart?.result?.[0];
  const stamps = result?.timestamp ?? [];
  const closes = result?.indicators?.quote?.[0]?.close ?? [];
  const points: MarketPoint[] = [];
  stamps.forEach((ts, i) => {
    const c = closes[i];
    if (typeof c === "number" && Number.isFinite(c) && c > 0) points.push({ t: new Date(ts * 1000).toISOString(), c: Number(c.toFixed(3)) });
  });
  if (points.length < MIN_POINTS) return null;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const live = result?.meta?.regularMarketPrice;
  const price = typeof live === "number" && live > 0 ? live : last.c;
  last.c = Number(price.toFixed(3)); // the month in progress ends at today's price
  const asOfSec = result?.meta?.regularMarketTime;
  return {
    symbol: stock.symbol,
    ticker: stock.ticker,
    name: stock.name,
    currency: result?.meta?.currency ?? "AED",
    price,
    changePct: (price / first.c - 1) * 100,
    since: first.t,
    asOf: asOfSec ? new Date(asOfSec * 1000).toISOString() : last.t,
    points,
  };
}

async function readStock(stock: (typeof STOCKS)[number]): Promise<MarketSeries | null> {
  let lastError: unknown;
  for (const host of HOSTS) {
    try {
      const res = await fetch(`${host}/v8/finance/chart/${encodeURIComponent(stock.symbol)}?range=5y&interval=1mo`, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FanoPropertiesMarket/1.0; +https://fanoproperties.com)", Accept: "application/json" },
        cache: "no-store", // this file keeps its own copy
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`${stock.symbol} answered ${res.status}`);
      return parseChart((await res.json()) as ChartResponse, stock);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

async function refresh(): Promise<MarketSeries[]> {
  const results = await Promise.allSettled(STOCKS.map(readStock));
  const series = results.flatMap((r, i) => {
    if (r.status === "rejected") console.warn("[dubai-market]", STOCKS[i]?.symbol, r.reason instanceof Error ? r.reason.message : r.reason);
    return r.status === "fulfilled" && r.value ? [r.value] : [];
  });
  const now = Date.now();
  // Nothing came back: keep the last good figures and try again soon
  cache = series.length ? { at: now, series } : { at: now - TTL_MS + RETRY_MS, series: cache?.series ?? [] };
  return cache.series;
}

/**
 * Five-year share price charts for Dubai developers that are up over five years, in a fixed order.
 * After the first load, refreshes run in the background so no visitor waits for Yahoo.
 */
export async function getDubaiMarket(): Promise<MarketSeries[]> {
  if (!cache || Date.now() - cache.at > TTL_MS) {
    pending ??= refresh()
      .catch((e) => {
        console.warn("[dubai-market] refresh failed", e instanceof Error ? e.message : e);
        return cache?.series ?? [];
      })
      .finally(() => { pending = null; });
    // First visit after a restart: wait briefly, never hold the page up for a slow feed
    if (!cache) await Promise.race([pending, new Promise((resolve) => setTimeout(resolve, 2500))]);
  }
  return (cache?.series ?? []).filter((s) => s.changePct > 0);
}
