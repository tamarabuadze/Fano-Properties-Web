import Link from "next/link";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { PropertiesGrid } from "../../properties/_components/properties-grid";
import { OfficeEnquiryForm } from "../../properties/_components/office-enquiry-form";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  items?: { title: string; text: string }[];
}

export interface CommercialLandingProps {
  path: string;
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
}

export function CommercialLanding(props: CommercialLandingProps) {
  const { eyebrow, lead, accent, intro, filters, listingsHeading, browseHref, sections = [], related, breadcrumbs } = props;

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

      <div className="border-b border-lx-line bg-lx-page pb-14 pt-16 lg:pb-20 lg:pt-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-[12px] text-lx-muted">
              {breadcrumbs.map((b, i) => (
                <span key={b.path}>
                  {i > 0 && <span className="mx-2">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={b.path} className="hover:text-lx-gold">{b.name}</Link>
                  ) : (
                    <span aria-current="page">{b.name}</span>
                  )}
                </span>
              ))}
            </nav>
            <p className="lx-eyebrow mb-6">{eyebrow}</p>
            <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text text-balance">
              {lead} <span className="italic text-lx-pale">{accent}</span>
            </h1>
            {intro.map((p) => (
              <p key={p} className="mt-6 max-w-xl text-[15px] leading-[1.8] text-lx-text/70">{p}</p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+97145644635" className="btn-gold inline-flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call +971 4 564 4635
              </a>
              <a href="https://wa.me/971525719164" target="_blank" rel="noopener noreferrer" className="btn-gold-outline inline-flex items-center gap-2">
                WhatsApp +971 52 571 9164
              </a>
            </div>
          </div>
          <OfficeEnquiryForm lease={filters.listingType === "lease"} />
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-tight text-lx-text">{listingsHeading}</h2>
          <Link href={browseHref} className="btn-gold-outline shrink-0">Filter all listings</Link>
        </div>
        <Suspense fallback={<p className="py-16 text-center text-lx-muted">Loading listings…</p>}>
          <PropertiesGrid filters={filters} />
        </Suspense>
      </div>

      {sections.length > 0 && (
        <div className="border-t border-lx-line">
          <div className="container-site max-w-3xl py-14 lg:py-20">
            {sections.map((s) => (
              <section key={s.heading} className="mb-12 last:mb-0">
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
