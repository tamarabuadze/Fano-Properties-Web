// fanoproperties.com/listings: the Fano listings app (Cloudflare Worker "app") under the website's
// own address. next.config.ts sends /listings and /listings/<path> here, and each request is passed
// on with only the headers the listings need. A plain rewrite to the Worker would also pass on the
// Cloudflare headers this site receives (cf-connecting-ip in particular), which Cloudflare refuses
// as a loop ("DNS points to prohibited IP", error 1000).
const LISTINGS_APP = "https://app.fanoproperties.workers.dev";
const PASS_ON = ["accept", "accept-language", "user-agent", "if-none-match", "if-modified-since"];
const DROP_FROM_REPLY = ["content-encoding", "content-length", "transfer-encoding", "connection", "keep-alive"];

export const dynamic = "force-dynamic";

async function listings(req: Request) {
  // Behind the rewrite the request keeps its own address (/listings/...); ?path= is the fallback
  const url = new URL(req.url);
  const fromAddress = url.pathname === "/listings" || url.pathname.startsWith("/listings/");
  const rest = (fromAddress ? url.pathname.slice("/listings".length) : url.searchParams.get("path") ?? "")
    .split("/")
    .filter(Boolean)
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    });
  url.searchParams.delete("path");
  const query = url.searchParams.toString();
  const target = `${LISTINGS_APP}/listings${rest.map((p) => "/" + encodeURIComponent(p)).join("")}${query ? "?" + query : ""}`;

  const headers = new Headers();
  for (const name of PASS_ON) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }

  let reply: Response;
  try {
    reply = await fetch(target, { method: req.method, headers, redirect: "manual", cache: "no-store" });
  } catch {
    return new Response("The listings are not available right now. Please try again shortly.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  // fetch has already unpacked the body, so its size and encoding headers no longer apply
  const out = new Headers(reply.headers);
  for (const name of DROP_FROM_REPLY) out.delete(name);
  return new Response(req.method === "HEAD" ? null : reply.body, { status: reply.status, headers: out });
}

export const GET = listings;
export const HEAD = listings;
