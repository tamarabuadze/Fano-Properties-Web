"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, ShoppingBag, Warehouse, ChevronRight } from "lucide-react";
import { cn } from "@fano/utils";
import { LuxPropertyCard, type LuxPropertyCardProps } from "./lux-property-card";
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

export function LuxResidences({ properties }: { properties: Listing[] }) {
  const [tab, setTab] = useState<"residential" | "commercial">("residential");
  const [first, ...rest] = properties.slice(0, 3);

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
              Selected{" "}
              <span className="italic text-lx-pale">
                {tab === "residential" ? "residences." : "commercial."}
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

        {/* Residential: featured property cards */}
        {tab === "residential" && (
          !first ? (
            <p className="py-20 text-center text-lx-muted">The collection is being prepared.</p>
          ) : (
            <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
              <Reveal className="lg:col-span-8">
                <LuxPropertyCard {...first} price={Number(first.price)} feature priority />
              </Reveal>
              <div className="grid gap-y-16 sm:grid-cols-2 sm:gap-x-10 lg:col-span-4 lg:grid-cols-1">
                {rest.map((p, i) => (
                  <Reveal key={p.id} delay={0.1 * (i + 1)}>
                    <LuxPropertyCard {...p} price={Number(p.price)} />
                  </Reveal>
                ))}
              </div>
            </div>
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
