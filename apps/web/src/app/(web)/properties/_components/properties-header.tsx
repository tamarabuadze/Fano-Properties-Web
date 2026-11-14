import { Phone } from "lucide-react";
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
    <div className="border-b border-lx-line bg-lx-page pb-14 pt-16 lg:pb-20 lg:pt-24">
      <div className={isCommercial ? "container-site grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16" : "container-site"}>
        <div>
          <p className="lx-eyebrow mb-6">{copy.eyebrow}</p>
          <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text text-balance">
            {copy.lead} <span className="italic text-lx-pale">{copy.accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-lx-text/70">{copy.body}</p>

          {isCommercial && (
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
          )}
        </div>

        {isCommercial && <OfficeEnquiryForm lease={lease} />}
      </div>
    </div>
  );
}
