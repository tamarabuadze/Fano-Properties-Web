import Link from "next/link";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { PropertiesGrid } from "../../properties/_components/properties-grid";
import { OfficeEnquiryForm } from "../../properties/_components/office-enquiry-form";
import { MarketSnapshot } from "@/components/market/market-snapshot";
import { PageBanner } from "@/components/luxury/page-banner";
import type { MarketAreaKey } from "@/lib/market-snapshot-schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  items?: { title: string; text: string }[];
}

export interface CommercialLandingProps {
  path: string;
  /** Photograph behind the opening banner */
  image: string;
  /** CSS object-position for that photograph */
  imagePosition?: string;
  eyebrow: string;
  lead: string;
  accent: string;
  intro: string[];
  /** Filters passed to the standard listings grid */
  filters: { category?: string; unitType?: string; listingType?: string; search?: string };
  listingsHeading: string;
  /** Link to the full, filterable listings page */
  browseHref: string;
  sections?: LandingSection[];
  related: { href: string; label: string }[];
  breadcrumbs: { name: string; path: string }[];
  /**
   * DLD market figures for this area (entered in Admin → Market data). When figures exist they
   * take the place of the section headed `replaces`; until then that section shows as before.
   */
  market?: { area: MarketAreaKey; replaces?: string };
}

function SectionBlock({ s }: { s: LandingSection }) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="font-display text-[clamp(24px,2.6vw,32px)] font-normal leading-tight text-lx-text">{s.heading}</h2>
      {s.paragraphs?.map((p) => (
        <p key={p} className="mt-4 text-[15px] leading-[1.8] text-lx-text/70">{p}</p>
      ))}
      {s.items && (
        <dl className="mt-6 space-y-5">
          {s.items.map((it) => (
            <div key={it.title}>
              <dt className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-lx-gold">{it.title}</dt>
              <dd className="mt-1 text-[15px] leading-[1.8] text-lx-text/70">{it.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export function CommercialLanding(props: CommercialLandingProps) {
  const { image, imagePosition, eyebrow, lead, accent, intro, filters, listingsHeading, browseHref, sections = [], related, breadcrumbs, market } = props;
  const replaced = market?.replaces ? sections.find((s) => s.heading === market.replaces) : undefined;
  const otherSections = replaced ? sections.filter((s) => s !== replaced) : sections;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.path}`,
    })),
  };

  return (
    <div className="min-h-screen bg-lx-page pt-20 lg:pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageBanner
        image={image}
        position={imagePosition}
        eyebrow={eyebrow}
        title={lead}
        accent={accent}
        subtitle={intro.map((p) => (
          <p key={p} className="mt-4 first:mt-0">{p}</p>
        ))}
        before={
          <nav aria-label="Breadcrumb" className="mb-6 text-[12px] text-[#F7F1E8]/60">
            {breadcrumbs.map((b, i) => (
              <span key={b.path}>
                {i > 0 && <span className="mx-2">/</span>}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={b.path} className="hover:text-[#E2A862]">{b.name}</Link>
                ) : (
                  <span aria-current="page">{b.name}</span>
                )}
              </span>
            ))}
          </nav>
        }
        aside={<OfficeEnquiryForm lease={filters.listingType === "lease"} />}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="tel:+97145644635" className="btn-gold inline-flex items-center gap-2">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call +971 4 564 4635
          </a>
          <a href="https://wa.me/971525719164" target="_blank" rel="noopener noreferrer" className="btn-gold-outline inline-flex items-center gap-2">
            WhatsApp +971 52 571 9164
          </a>
        </div>
      </PageBanner>

      <div className="container-site py-12 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-tight text-lx-text">{listingsHeading}</h2>
          <Link href={browseHref} className="btn-gold-outline shrink-0">Filter all listings</Link>
        </div>
        <Suspense fallback={<p className="py-16 text-center text-lx-muted">Loading listings…</p>}>
          <PropertiesGrid filters={filters} />
        </Suspense>
      </div>

      {market && (
        <MarketSnapshot
          area={market.area}
          wrap={(box) => (
            <div className="border-t border-lx-line">
              <div className="container-site py-14 lg:py-20">{box}</div>
            </div>
          )}
          fallback={
            replaced && (
              <div className="border-t border-lx-line">
                <div className="container-site max-w-3xl py-14 lg:py-20">
                  <SectionBlock s={replaced} />
                </div>
              </div>
            )
          }
        />
      )}

      {otherSections.length > 0 && (
        <div className="border-t border-lx-line">
          <div className="container-site max-w-3xl py-14 lg:py-20">
            {otherSections.map((s) => (
              <SectionBlock key={s.heading} s={s} />
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-lx-line">
        <div className="container-site py-12">
          <p className="lx-eyebrow mb-5">Explore</p>
          <ul className="flex flex-wrap gap-3">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="btn-gold-outline">{r.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
