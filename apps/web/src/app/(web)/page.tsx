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

export const metadata: Metadata = {
  title: "Fano Real Estate — Premium Properties",
  description:
    "Discover premium properties for sale and rent. Find your dream home with Fano Real Estate — luxury living redefined.",
};

export const revalidate = 3600;

export default async function HomePage() {
  const [properties, agents, articles] = await Promise.all([
    getFeaturedProperties(6).catch(() => []),
    getAgents(5).catch(() => []),
    getLatestArticles(3).catch(() => []),
  ]);

  return (
    <>
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
