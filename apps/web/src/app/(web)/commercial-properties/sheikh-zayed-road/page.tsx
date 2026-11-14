import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { CommercialLanding } from "../_components/commercial-landing";
import { related } from "../_components/links";

export const dynamic = "force-dynamic";

const path = "/commercial-properties/sheikh-zayed-road";
const title = "Offices for Sale on Sheikh Zayed Road, Dubai";
const description =
  "Offices and commercial space for sale on Sheikh Zayed Road, Dubai's main commercial corridor, close to Dubai Metro. Fano Properties, RERA 49852.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...buildPageMeta({ path, title, description }),
};

export default function SheikhZayedRoadPage() {
  return (
    <CommercialLanding
      path={path}
      eyebrow="Sheikh Zayed Road"
      lead="Offices for sale"
      accent="on Sheikh Zayed Road."
      intro={[
        "Sheikh Zayed Road is Dubai's main commercial corridor, lined with office towers and served by Dubai Metro along its length. It suits companies that want a well-known address with easy access across the city.",
      ]}
      filters={{ category: "commercial", listingType: "sale", search: "Sheikh Zayed" }}
      listingsHeading="Offices for sale on Sheikh Zayed Road"
      browseHref="/properties?category=commercial&listingType=sale&search=Sheikh%20Zayed"
      related={related(path)}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Commercial property", path: "/commercial-properties" },
        { name: "Sheikh Zayed Road", path },
      ]}
    />
  );
}
