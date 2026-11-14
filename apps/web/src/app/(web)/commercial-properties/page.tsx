import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { CommercialLanding } from "./_components/commercial-landing";
import { related } from "./_components/links";

export const dynamic = "force-dynamic";

const path = "/commercial-properties";
const title = "Commercial Property for Sale in Dubai";
const description =
  "Grade A offices and commercial space for sale in Dubai, in Business Bay and on Sheikh Zayed Road. Fano Properties, RERA-registered agency No. 49852.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...buildPageMeta({ path, title, description }),
};

export default function CommercialPropertiesPage() {
  return (
    <CommercialLanding
      path={path}
      eyebrow="Commercial property"
      lead="Commercial property"
      accent="for sale in Dubai."
      intro={[
        "Offices and commercial space in Business Bay, Downtown and along Sheikh Zayed Road, from single suites to larger floor plates. Every listing is checked with the developer before it goes live, and priced per sq ft so towers are easy to compare.",
      ]}
      filters={{ category: "commercial", listingType: "sale" }}
      listingsHeading="Commercial property for sale"
      browseHref="/properties?category=commercial&listingType=sale"
      sections={[
        {
          heading: "Where we work",
          items: [
            { title: "Business Bay", text: "Dubai's central business district, next to Downtown, with new and off-plan office towers along the canal." },
            { title: "Sheikh Zayed Road", text: "The city's main commercial corridor, with established office towers close to Dubai Metro stations." },
          ],
        },
        {
          heading: "Work with a RERA-registered agency",
          paragraphs: [
            "Fano Properties is registered with RERA under No. 49852 and based in Churchill Executive Tower, Business Bay. We help owner-occupiers and investors shortlist offices, arrange viewings, and handle the paperwork through to transfer at the Dubai Land Department.",
          ],
        },
      ]}
      related={related(path)}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Commercial property", path },
      ]}
    />
  );
}
