// Dubai property headlines for the homepage and blog news feed, read from publishers' public RSS feeds.
// Refreshed automatically: the server keeps the list for an hour, then reads the feeds again on the
// next visit. If a feed cannot be reached, the last good list is kept; with nothing at all the
// section simply does not show. Only headlines, dates and links are shown; each opens the
// publisher's own article.
//
// Editorial rule (Fano's own site, not a neutral news desk): headlines are real and never edited,
// but only stories that sit well with Fano are picked: Dubai stories, nothing negative about the
// market, nothing naming rival brokers, agencies or portals, and nothing promoting other markets.

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
// The headline itself must be about Dubai: the city, its big developers or its best-known districts
const DUBAI_WORDS =
  /\b(dubai|Emaar|Nakheel|Meraas|Sobha|Damac|Binghatti|Ellington|Azizi|Danube|Omniyat|Deyaar|Union Properties|Majid Al Futtaim|Palm Jumeirah|Palm Jebel Ali|Business Bay|Downtown|Jumeirah|Mall of the Emirates|Expo City)\b/i;
// Stories that would work against a Dubai brokerage: market worries, disputes, discounting
const NEGATIVE_WORDS =
  /\b(corrections?|crash\w*|collaps\w*|plung\w*|plummet\w*|tumbl\w*|slump\w*|sink\w*|sank|fall|falls|falling|fell|drops?|dropped|dropping|declin\w*|dips?|dipped|lower|lowest|cheaper|below|discount\w*|black friday|bargains?|deals|loss|losses|losing|bubbles?|oversuppl\w*|glut|cool|cools|cooled|cooling|soften\w*|softer|softening|flat|flatten\w*|moderat\w*|slow\w*|stall\w*|warn\w*|risks?|risky|fears?|concerns?|worr\w*|crisis|challeng\w*|uncertain\w*|volatil\w*|default\w*|bankrupt\w*|insolven\w*|fraud\w*|scams?|arrest\w*|jail\w*|prison|court|lawsuits?|sued|sues|disputes?|fined|fines|penalt\w*|bans?|banned|crackdown|evict\w*|stuck|delay\w*|cancel\w*|halt\w*|freez\w*|frozen|exodus|flee\w*|fled|unsold|vacan\w*|struggl\w*|pressures?|squeez\w*|expensive|costl\w*|afford\w*|tax|taxes|wars?|attack\w*|missiles?|strikes?|conflict\w*|tensions?|sanction\w*|regional|panic\w*|doubts?|downturn|recession|inflation)\b/i;
// Rival brokers, agencies, portals and investment platforms, and pieces built around them
const COMPETITOR_WORDS =
  /(Sotheby|Savills|Knight Frank|\bCBRE\b|\bJLL\b|Cavendish Maxwell|Better ?homes|Allsopp|Haus\s*(&|and)\s*Haus|f[a\u00e4]m Properties|Driven Properties|\bEspace\b|Metropolitan|Provident|Engel|Coldwell|Keller Williams|RE\/?MAX|Property ?Finder|Bayut|Dubizzle|Houza|\bStake\b|SmartCrowd|Prypco|Huspy|Maria Morris|Hamptons|Christie|\bbrokers?\b|\bbrokerages?\b|\bagents?\b|\bagenc(y|ies)\b|podcast|panel)/i;
// Other property markets competing for the same buyers
const OTHER_MARKETS =
  /\b(Abu Dhabi|Sharjah|Ras Al Khaimah|RAK|Ajman|Umm Al Quwain|Fujairah|Al Ain|Saudi|Riyadh|Jeddah|NEOM|Qatar|Doha|Oman|Muscat|Bahrain|Kuwait|Cyprus|Greece|Turkey|Istanbul|Mar-a-Lago)\b/i;

/** True when a headline is a Dubai property story that sits well with Fano (exported for tests) */
export function suitsFano(title: string): boolean {
  return DUBAI_WORDS.test(title) && !NEGATIVE_WORDS.test(title) && !COMPETITOR_WORDS.test(title) && !OTHER_MARKETS.test(title);
}

const SOURCES: Source[] = [
  {
    name: "Arabian Business",
    feed: "https://www.arabianbusiness.com/feed",
    keep: ({ title, url, categories }) =>
      (url.includes("/real-estate/") ||
        categories.some((c) => /real estate|property/i.test(c)) ||
        PROPERTY_WORDS.test(title)) &&
      suitsFano(title),
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
