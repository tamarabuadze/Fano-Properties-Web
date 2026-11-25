import type { NewsItem } from "@/lib/dubai-news";
import { Reveal } from "./reveal";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dubai" }).format(
    new Date(iso),
  );
}

function isRecent(iso: string) {
  return Date.now() - Date.parse(iso) < 36 * 60 * 60 * 1000;
}

// Dubai property news, updated automatically through the day (lib/dubai-news.ts).
// Headlines link out to the publisher; nothing is copied from the articles.
export function LuxNews({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  const sources = [...new Set(items.map((i) => i.source))].join(", ");

  return (
    <section className="bg-lx-page py-24 lg:py-32" aria-labelledby="lx-news-title">
      <div className="container-site">
        <Reveal className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-lx-pale">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1F8A5B] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1F8A5B]" />
              </span>
              Live · Updated daily
            </p>
            <h2
              id="lx-news-title"
              className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text"
            >
              Dubai property <span className="italic text-lx-pale">news.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.8] text-lx-text/60">
            The latest on Dubai and UAE real estate, gathered automatically from the region&rsquo;s business press.
          </p>
        </Reveal>

        <ul className="grid gap-x-10 border-t border-lx-line md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.url} delay={0.05 * i} className="border-b border-lx-line">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex h-full flex-col gap-3 py-7"
              >
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">
                  {isRecent(item.publishedAt) && <span className="mr-2 text-[#1F8A5B]">New</span>}
                  {formatDate(item.publishedAt)} · {item.source}
                </p>
                <h3 className="font-display text-[20px] font-normal leading-snug text-lx-text transition-colors group-hover:text-lx-gold">
                  {item.title}
                </h3>
                <span className="mt-auto text-[12px] text-lx-text/50 transition-colors group-hover:text-lx-gold">
                  Read on {item.source} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-[12px] leading-relaxed text-lx-text/45">
          Headlines from {sources}. Fano Properties is not the author of these articles.
        </p>
      </div>
    </section>
  );
}
