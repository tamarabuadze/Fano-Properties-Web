import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { CommercialLanding } from "../_components/commercial-landing";
import { related } from "../_components/links";

export const dynamic = "force-dynamic";

const path = "/commercial-properties/business-bay";
const title = "Offices & Commercial Property for Sale in Business Bay, Dubai";
const description =
  "Offices and commercial units for sale in Business Bay, Dubai's central business district, in new and off-plan towers. Fano Properties, RERA 49852.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...buildPageMeta({ path, title, description }),
};

export default function BusinessBayPage() {
  return (
    <CommercialLanding
      path={path}
      eyebrow="Business Bay"
      lead="Commercial property for sale"
      accent="in Business Bay."
      intro={[
        "Business Bay is Dubai's central business district, next to Downtown Dubai and along the Dubai Water Canal. It is a freehold area, so foreign buyers can own offices here outright. Our own office is in Churchill Executive Tower, Business Bay.",
      ]}
      filters={{ category: "commercial", listingType: "sale", search: "Business Bay" }}
      listingsHeading="Offices for sale in Business Bay"
      browseHref="/properties?category=commercial&listingType=sale&search=Business%20Bay"
      related={related(path)}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Commercial property", path: "/commercial-properties" },
        { name: "Business Bay", path },
      ]}
    />
  );
}
