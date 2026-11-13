"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Building2, ShoppingBag, Warehouse, ChevronRight, ChevronLeft } from "lucide-react";
import { cn, isOptimizedImageHost, formatPlace, splitListingTitle } from "@fano/utils";
import { SafeImage } from "@fano/ui";
import { type LuxPropertyCardProps } from "./lux-property-card";
import { Reveal } from "./reveal";

type Listing = Omit<LuxPropertyCardProps, "price" | "feature" | "priority" | "className"> & { id: string; price: number | string };

const COMMERCIAL_SUBS = [
  {
    label: "Office Space",
    desc: "Corporate floors, fitted offices and serviced business suites in prime Business Bay addresses.",
    href: "/properties?category=commercial&unitType=offices",
    Icon: Building2,
  },
  {
    label: "Retail & Shops",
    desc: "Ground-floor retail units, showrooms and F&B outlets in high-footfall Dubai locations.",
    href: "/properties?category=commercial",
    Icon: ShoppingBag,
  },
  {
    label: "Warehouses",
    desc: "Industrial units, storage facilities and logistics space across Dubai's free zones.",
    href: "/properties?category=commercial&unitType=warehouse",
    Icon: Warehouse,
  },
] as const;

function formatMoney(price: number, currency = "AED") {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price) + (currency === "AED" ? "" : ` ${currency}`);
}

export function LuxResidences({ properties }: { properties: Listing[] }) {
  const [tab, setTab] = useState<"residential" | "commercial">("residential");
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

  useEffect(() => { setSlide(0); }, [tab]);

  const tabCls = (active: boolean) =>
    cn(
      "inline-flex h-10 items-center rounded-full px-5 font-label text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
      active ? "bg-lx-gold text-lx-page" : "text-lx-text/60 hover:text-lx-text"
    );

  return (
    <section className="bg-lx-page py-24 lg:py-36" id="discover">
      <div className="container-site">

        {/* Header row */}
        <Reveal className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="lx-numeral">01</p>
            <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
              Featured{" "}
              <span className="italic text-lx-pale">
                {tab === "residential" ? "properties." : "commercial."}
              </span>
            </h2>
          </div>
          <Link
            href={tab === "commercial" ? "/properties?category=commercial" : "/properties"}
            className="btn-gold shrink-0"
          >
            View the collection
          </Link>
        </Reveal>

        {/* Category tabs */}
        <div className="mb-12">
          <div
            className="inline-flex gap-1 rounded-full border border-lx-line p-1"
            role="tablist"
            aria-label="Property category"
          >
            <button
              role="tab"
              aria-selected={tab === "residential"}
              onClick={() => setTab("residential")}
              className={tabCls(tab === "residential")}
            >
              Residential
            </button>
            <button
              role="tab"
              aria-selected={tab === "commercial"}
              onClick={() => setTab("commercial")}
              className={tabCls(tab === "commercial")}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Residential: full-width image slideshow */}
        {tab === "residential" && (
          !slides.length ? (
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
                        priority={i === 0}
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
          )
        )}

        {/* Commercial: sub-category navigation cards */}
        {tab === "commercial" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMMERCIAL_SUBS.map(({ label, desc, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col gap-6 rounded-[2px] border border-lx-line bg-lx-surface p-8 transition-colors duration-300 hover:border-lx-gold"
              >
                <Icon className="h-6 w-6 text-lx-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-display text-[20px] font-normal leading-tight text-lx-text">{label}</p>
                  <p className="mt-2 text-[13px] leading-[1.75] text-lx-text/60">{desc}</p>
                </div>
                <span className="mt-auto flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-lx-gold">
                  Browse listings <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
