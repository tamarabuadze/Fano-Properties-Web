"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn, isOptimizedImageHost, formatPlace, splitListingTitle } from "@fano/utils";
import { SafeImage } from "@fano/ui";
import { type LuxPropertyCardProps } from "./lux-property-card";
import { Reveal } from "./reveal";

type Listing = Omit<LuxPropertyCardProps, "price" | "feature" | "priority" | "className"> & { id: string; price: number | string };

function formatMoney(price: number, currency = "AED") {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price) + (currency === "AED" ? "" : ` ${currency}`);
}

export function LuxResidences({ properties }: { properties: Listing[] }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = properties.slice(0, 3);

  const next = useCallback(() => setSlide((s) => (s + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setSlide((s) => (s - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, slides.length]);

  return (
    <section className="bg-lx-page py-24 lg:py-36" id="discover">
      <div className="container-site">

        {/* Header row */}
        <Reveal className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="lx-numeral">01</p>
            <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
              Featured{" "}
              <span className="italic text-lx-pale">properties.</span>
            </h2>
          </div>
          <Link href="/properties" className="btn-gold shrink-0">
            View the collection
          </Link>
        </Reveal>

        {/* Full-width image slideshow */}
        {!slides.length ? (
          <p className="py-20 text-center text-lx-muted">The collection is being prepared.</p>
        ) : (
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[4px] aspect-[4/3] lg:aspect-[21/9]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slides.map((p, i) => {
                const { headline } = splitListingTitle(p.title);
                const place = formatPlace(p.location, p.city);
                return (
                  <div
                    key={p.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      i === slide ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                    aria-hidden={i !== slide}
                  >
                    <SafeImage
                      src={p.coverImage}
                      unoptimized={!isOptimizedImageHost(p.coverImage)}
                      alt={p.title}
                      fill
                      sizes="100vw"
                      quality={85}
                      className="object-cover"
                    />
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-lx-page/85 via-lx-page/20 to-transparent" />
                    {/* Featured badge */}
                    <span className="absolute left-6 top-6 rounded-full border border-lx-gold/60 bg-lx-gold/20 px-3 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-lx-gold backdrop-blur-sm">
                      Featured
                    </span>
                    {/* Property info */}
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                      <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-gold">{place}</p>
                      <h3 className="mt-2 font-display text-[clamp(22px,2.6vw,38px)] font-normal leading-tight text-lx-text">
                        {headline}
                      </h3>
                      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <p className="font-display text-[20px] text-lx-text">
                          <span className="mr-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">{p.currency ?? "AED"}</span>
                          {formatMoney(Number(p.price), p.currency ?? "AED")}
                          {p.priceUnit === "per_sqft" && <span className="ml-1 text-[13px] text-lx-muted">/sq ft</span>}
                        </p>
                        {p.bedrooms > 0 && <span className="text-[13px] text-lx-text/55">{p.bedrooms} bed{p.bedrooms === 1 ? "" : "s"}</span>}
                        {p.sqft > 0 && <span className="text-[13px] text-lx-text/55">{p.sqft.toLocaleString("en-US")} sq ft</span>}
                        <Link
                          href={`/properties/${p.slug}`}
                          className="btn-gold ml-auto"
                          tabIndex={i === slide ? 0 : -1}
                        >
                          View property
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Prev / Next */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous property"
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-lx-gold/40 bg-lx-page/40 text-lx-text backdrop-blur-sm transition-colors hover:border-lx-gold hover:bg-lx-page/70"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next property"
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-lx-gold/40 bg-lx-page/40 text-lx-text backdrop-blur-sm transition-colors hover:border-lx-gold hover:bg-lx-page/70"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            {slides.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to property ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === slide ? "w-8 bg-lx-gold" : "w-1.5 bg-lx-line hover:bg-lx-muted"
                    )}
                  />
                ))}
              </div>
            )}
          </Reveal>
        )}

      </div>
    </section>
  );
}
