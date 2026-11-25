// Dubai property headlines for the homepage news feed, read from publishers' public RSS feeds.
// Refreshed automatically: the server keeps the list for an hour, then reads the feeds again on the
// next visit. If a feed cannot be reached, the last good list is kept; with nothing at all the
// section simply does not show. Only headlines, dates and links are shown; each opens the
// publisher's own article.

export interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO date
}

interface Source {
  name: string;
  feed: string;
  /** Keeps only the property stories when the feed mixes sections */
  keep: (item: { title: string; url: string; categories: string[] }) => boolean;
}

const PROPERTY_WORDS =
  /\b(real estate|realty|propert(y|ies)|off-plan|villas?|apartments?|townhouses?|homes?|rents?|rental|mortgages?|landlords?|tenants?|Land Department|DLD|RERA|Emaar|Nakheel|Damac|Sobha|Aldar|Meraas|Binghatti|Ellington|Azizi|Danube)\b/i;
// Dubai and the wider UAE only; the big Dubai developers count as Dubai stories
const DUBAI_WORDS = /\b(dubai|uae|emirates?|emirati|abu dhabi|sharjah|ras al khaimah|ajman|Emaar|Nakheel|Damac|Sobha|Meraas|Binghatti|Ellington|Azizi|Danube)\b/i;

const SOURCES: Source[] = [
  {
    name: "Arabian Business",
    feed: "https://www.arabianbusiness.com/feed",
    keep: ({ title, url, categories }) =>
      (url.includes("/real-estate/") ||
        categories.some((c) => /real estate|property/i.test(c)) ||
        PROPERTY_WORDS.test(title)) &&
      DUBAI_WORDS.test(`${title} ${url.replace(/[-/]/g, " ")} ${categories.join(" ")}`),
  },
];

const TTL_MS = 60 * 60 * 1000; // read the feeds again after an hour
const MAX_AGE_MS = 21 * 24 * 60 * 60 * 1000; // never show stories older than three weeks

let cache: { at: number; items: NewsItem[] } | null = null;
let pending: Promise<NewsItem[]> | null = null;

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name: string) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1] ?? "") : "";
}

/** Parses RSS <item>s into news items (exported for tests) */
export function parseFeed(xml: string, source: Source): NewsItem[] {
  const out: NewsItem[] = [];
  for (const m of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)) {
    const body = m[1] ?? "";
    const title = tag(body, "title");
    const url = tag(body, "link") || tag(body, "guid");
    const date = new Date(tag(body, "pubDate") || tag(body, "dc:date"));
    const categories = [...body.matchAll(/<category\b[^>]*>([\s\S]*?)<\/category>/gi)].map((c) => decode(c[1] ?? ""));
    if (!title || !/^https:\/\//.test(url) || Number.isNaN(date.getTime())) continue;
    if (!source.keep({ title, url, categories })) continue;
    out.push({ title: title.slice(0, 200), url, source: source.name, publishedAt: date.toISOString() });
  }
  return out;
}

async function readSource(source: Source): Promise<NewsItem[]> {
  const res = await fetch(source.feed, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; FanoPropertiesNews/1.0; +https://fanoproperties.com)",
      Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.5",
    },
    cache: "no-store", // this file keeps its own hourly copy
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`${source.name} feed answered ${res.status}`);
  return parseFeed(await res.text(), source);
}

async function refresh(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(SOURCES.map(readSource));
  const seen = new Set<string>();
  const now = Date.now();
  const items = results
    .flatMap((r, i) => {
      if (r.status === "rejected") console.warn("[dubai-news]", SOURCES[i]?.name, r.reason instanceof Error ? r.reason.message : r.reason);
      return r.status === "fulfilled" ? r.value : [];
    })
    .filter((item) => now - Date.parse(item.publishedAt) < MAX_AGE_MS)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .filter((item) => {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  // Nothing came back: keep the last good list and try again in five minutes rather than an hour
  cache = items.length ? { at: now, items } : { at: now - TTL_MS + 5 * 60 * 1000, items: cache?.items ?? [] };
  return cache.items;
}

/**
 * The latest Dubai property headlines, newest first. Once a list is held, an hourly refresh runs in
 * the background so no visitor waits for the feeds; only the very first visit after a restart does.
 */
export async function getDubaiPropertyNews(limit = 6): Promise<NewsItem[]> {
  if (!cache || Date.now() - cache.at > TTL_MS) {
    pending ??= refresh()
      .catch((e) => {
        console.warn("[dubai-news] refresh failed", e instanceof Error ? e.message : e);
        return cache?.items ?? [];
      })
      .finally(() => { pending = null; });
    if (!cache) await pending;
  }
  return (cache?.items ?? []).slice(0, limit);
}
