import type { Metadata } from "next";
import { getFeaturedProperties } from "@/lib/queries/properties";
import { getAgents } from "@/lib/queries/agents";
import { getLatestArticles } from "@/lib/queries/blog";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { LuxHero } from "@/components/luxury/lux-hero";
import { LuxStatement } from "@/components/luxury/lux-statement";
import { LuxResidences } from "@/components/luxury/lux-residences";
import { LuxCollections } from "@/components/luxury/lux-collections";
import { LuxIntroduction } from "@/components/luxury/lux-introduction";
import { LuxTeam } from "@/components/luxury/lux-team";
import { LuxJournal } from "@/components/luxury/lux-journal";
import { LuxClosing } from "@/components/luxury/lux-closing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export const metadata: Metadata = {
  title: { absolute: "Fano Properties — Luxury Real Estate in Dubai" },
  description:
    "Discover luxury properties for sale and rent in Dubai. Find your dream home with Fano Properties — premium real estate, exceptional service.",
  alternates: { canonical: SITE_URL },
};

// Rendered on request: the build has no database, so a cached build-time page shows no listings
export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#organization`,
      name: "Fano Properties",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-dark.png`,
      description: "Luxury real estate agency specialising in premium properties for sale and rent in Dubai and beyond.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3404, 34th Floor, Churchill Executive Tower, Business Bay",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      telephone: "+97145644635",
      email: "info@fanoproperties.com",
      areaServed: ["Dubai", "Abu Dhabi", "United Arab Emirates"],
      sameAs: SOCIAL_LINKS.map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Fano Properties",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/properties?search={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function HomePage() {
  const [properties, agents, articles] = await Promise.all([
    getFeaturedProperties(3).catch(() => []),
    getAgents(1).catch(() => []),
    getLatestArticles(2).catch(() => []),
  ]);

  const jsonLdScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );

  return (
    <>
      {jsonLdScript}
      <LuxHero />
      <LuxStatement />
      <LuxResidences properties={properties as never} />
      <LuxCollections />
      <LuxIntroduction />
      <LuxTeam advisor={(agents as never[])[0] as never} />
      <LuxJournal articles={articles as never} />
      <LuxClosing />
    </>
  );
}
