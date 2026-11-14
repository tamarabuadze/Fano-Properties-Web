import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { CommercialLanding } from "../_components/commercial-landing";
import { related } from "../_components/links";

export const dynamic = "force-dynamic";

const path = "/commercial-properties/offices-for-sale";
const title = "Offices for Sale in Dubai | Business Bay & Sheikh Zayed Road";
const description =
  "Offices for sale in Dubai, from single suites to full floors in Grade A towers in Business Bay and on Sheikh Zayed Road, priced per sq ft. RERA 49852.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...buildPageMeta({ path, title, description }),
};

export default function OfficesForSalePage() {
  return (
    <CommercialLanding
      path={path}
      eyebrow="Offices · For sale"
      lead="Offices for sale"
      accent="in Dubai."
      intro={[
        "Ready and off-plan offices in Business Bay and on Sheikh Zayed Road, verified with the developer and priced per sq ft. Tell us the size and budget you need and we will send you a shortlist.",
      ]}
      filters={{ category: "commercial", unitType: "offices", listingType: "sale" }}
      listingsHeading="Offices for sale now"
      browseHref="/properties?category=commercial&listingType=sale&unitType=offices"
      sections={[
        {
          heading: "Buying an office in Dubai: the essentials",
          items: [
            { title: "Freehold areas", text: "Foreign buyers can own offices outright in Dubai's designated freehold areas, which include Business Bay." },
            { title: "Agreement", text: "Once a price is agreed, buyer and seller sign the RERA memorandum of understanding (Form F), usually with a deposit held until transfer." },
            { title: "Transfer fee", text: "The Dubai Land Department charges a 4% transfer fee on the purchase price, plus administration fees. Off-plan purchases are registered on the DLD's Oqood system." },
            { title: "Service charges", text: "Each building sets its own annual service charge per sq ft. Ask for the current figure before you buy; registered charges are published through RERA's Mollak system." },
            { title: "Title deed", text: "On transfer, the Dubai Land Department issues the title deed in the buyer's name." },
          ],
        },
        {
          heading: "Why buy with Fano Properties",
          paragraphs: [
            "We are a RERA-registered agency (No. 49852) based in Business Bay. We check every listing with the developer, explain payment plans and fees up front, and stay with you from the first viewing to the transfer.",
          ],
        },
      ]}
      related={related(path)}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Commercial property", path: "/commercial-properties" },
        { name: "Offices for sale", path },
      ]}
    />
  );
}
