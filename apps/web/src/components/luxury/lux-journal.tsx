import Image from "next/image";
import Link from "next/link";
import { isOptimizedImageHost } from "@fano/utils";
import { Reveal } from "./reveal";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  publishedAt?: Date | null;
  readTime?: number | null;
}

function formatDate(date?: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

// Two articles, side by side, on the charcoal surface. No badges.
export function LuxJournal({ articles }: { articles: Article[] }) {
  const pair = articles.slice(0, 2);
  if (pair.length === 0) return null;

  return (
    <section className="bg-lx-surface py-24 lg:py-36">
      <div className="container-site">
        <Reveal className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="lx-numeral">05</p>
            <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
              The <span className="italic text-lx-pale">journal.</span>
            </h2>
          </div>
          <Link href="/blog" className="lx-link shrink-0">All articles</Link>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          {pair.map((a, i) => (
            <Reveal key={a.id} delay={0.1 * i}>
              <Link href={`/blog/${a.slug}`} className="group block">
                {a.coverImage && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-lx-raised">
                    <Image
                      src={a.coverImage}
                      unoptimized={!isOptimizedImageHost(a.coverImage)}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.04] group-hover:opacity-90"
                    />
                  </div>
                )}
                <p className="mt-7 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">
                  {[formatDate(a.publishedAt), a.readTime ? `${a.readTime} min read` : null].filter(Boolean).join(" · ")}
                </p>
                <h3 className="mt-3 font-display text-[24px] font-normal leading-tight text-lx-text transition-colors group-hover:text-lx-gold">
                  {a.title}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-md text-[14px] leading-[1.8] text-lx-text/60">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
