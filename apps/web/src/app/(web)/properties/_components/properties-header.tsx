import { Phone } from "lucide-react";
import { PageBanner } from "@/components/luxury/page-banner";
import { OfficeEnquiryForm } from "./office-enquiry-form";

type Category = "all" | "residential" | "commercial";

type HeaderCopy = { eyebrow: string; lead: string; accent: string; body: string };

const COPY: Record<"all" | "residential" | "commercial-sale" | "commercial-lease", HeaderCopy> = {
  all: {
    eyebrow: "The collection",
    lead: "Find your",
    accent: "property.",
    body: "Homes, apartments and workspaces across Dubai, each verified with the developer and priced in full.",
  },
  residential: {
    eyebrow: "Residential",
    lead: "Find your",
    accent: "home.",
    body: "Apartments, villas and penthouses across Dubai, each verified with the developer and priced in full.",
  },
  "commercial-sale": {
    eyebrow: "Commercial · For sale",
    lead: "Offices for sale",
    accent: "in Dubai.",
    body: "Grade A offices in Business Bay, Downtown and along Sheikh Zayed Road, verified with the developer and priced per sq ft.",
  },
  "commercial-lease": {
    eyebrow: "Commercial · For lease",
    lead: "Offices for lease",
    accent: "in Dubai.",
    body: "Offices and commercial space in Business Bay, Downtown and along Sheikh Zayed Road, verified with the owner.",
  },
};

interface PropertiesHeaderProps {
  category?: Category;
  listingType?: string;
}

export function PropertiesHeader({ category = "all", listingType }: PropertiesHeaderProps) {
  const isCommercial = category === "commercial";
  const lease = listingType === "lease";
  const copy = COPY[isCommercial ? (lease ? "commercial-lease" : "commercial-sale") : category];

  return (
    <PageBanner
      image={isCommercial ? "/collection-offices.webp" : "/media/e40dad2a-6468-49ff-92b9-40bb64486996.jpg"}
      eyebrow={copy.eyebrow}
      title={copy.lead}
      accent={copy.accent}
      subtitle={copy.body}
      aside={
        <OfficeEnquiryForm
          lease={lease || listingType === "rent"}
          scope={isCommercial ? "office" : category === "residential" ? "residential" : "general"}
        />
      }
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="tel:+97145644635" className="btn-gold inline-flex items-center gap-2">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call +971 4 564 4635
        </a>
        <a
          href="https://wa.me/971525719164"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-outline inline-flex items-center gap-2"
        >
          WhatsApp +971 52 571 9164
        </a>
      </div>
    </PageBanner>
  );
}
