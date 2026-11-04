import { unstable_cache } from "next/cache";

// Public pages read the same listings on every visit, and each database round trip
// takes the better part of a second, so query results are kept for a couple of minutes.
// Admin saves clear them at once with revalidateTag(CACHE_TAGS.x).
export const CACHE_TAGS = { properties: "properties", agents: "agents", blog: "blog" } as const;

const DATE = "__date";

// The cache stores JSON, which would turn Dates into strings: mark them and bring them back
function pack<T>(value: T): unknown {
  return JSON.parse(
    JSON.stringify(value, function (this: Record<string, unknown>, key, v) {
      const raw = this[key];
      return raw instanceof Date ? { [DATE]: raw.toISOString() } : v;
    })
  );
}

function unpack<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value), (_key, v) =>
    v && typeof v === "object" && DATE in v ? new Date(v[DATE]) : v
  ) as T;
}

export function cached<A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  key: string,
  tags: string[],
  revalidate = 120
): (...args: A) => Promise<R> {
  const run = unstable_cache(async (...args: A) => pack(await fn(...args)), [key], { tags, revalidate });
  return async (...args: A) => unpack<R>(await run(...args));
}
