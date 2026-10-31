import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { PropertySearchSection } from "@/components/sections/property-search";
import { FeaturedPropertiesSection } from "@/components/sections/featured-properties";
import { PropertyTypesSection } from "@/components/sections/property-types";
import { WhyUsSection } from "@/components/sections/why-us";
import { AgentsShowcaseSection } from "@/components/sections/agents-showcase";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { LatestArticlesSection } from "@/components/sections/latest-articles";
import { GoogleReviewsSection } from "@/components/sections/google-reviews";
import { CtaSection } from "@/components/sections/cta-section";
import { getFeaturedProperties } from "@/lib/queries/properties";
import { getAgents } from "@/lib/queries/agents";
import { getLatestArticles } from "@/lib/queries/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export const metadata: Metadata = {
  title: "Fano Properties — Luxury Real Estate in Dubai",
  description:
    "Discover luxury properties for sale and rent in Dubai. Find your dream home with Fano Properties — premium real estate, exceptional service.",
  alternates: { canonical: SITE_URL },
};

export const revalidate = 3600;

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
        streetAddress: "3404, 34th Floor, Churchill Tower, Business Bay",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      telephone: "+971525719164",
      email: "info@fanoproperties.com",
      areaServed: ["Dubai", "Abu Dhabi", "United Arab Emirates"],
      sameAs: [
        "https://www.instagram.com/fanoproperties",
        "https://www.linkedin.com/company/fanoproperties",
      ],
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
    getFeaturedProperties(6).catch(() => []),
    getAgents(5).catch(() => []),
    getLatestArticles(3).catch(() => []),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <PropertySearchSection />
      <FeaturedPropertiesSection properties={properties as never} />
      <PropertyTypesSection />
      <WhyUsSection />
      <AgentsShowcaseSection agents={agents as never} />
      <TestimonialsSection />
      <GoogleReviewsSection />
      <LatestArticlesSection articles={articles as never} />
      <CtaSection />
    </>
  );
}
