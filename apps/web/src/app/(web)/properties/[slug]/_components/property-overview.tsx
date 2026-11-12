import { MapPin, Calendar, Eye, BadgeCheck } from "lucide-react";
import {
  PROPERTY_STATUS_LABELS,
  formatPrice,
  formatDate,
  unitTypeLabel,
  formatPlace,
  splitListingTitle,
  parseDescription,
} from "@fano/utils";

interface Property {
  title: string;
  description: string;
  propertyType: string;
  unitType?: string | null;
  listingType: string;
  status: string;
  price: number | string;
  priceUnit?: string | null;
  currency: string;
  location: string;
  city: string;
  state?: string | null;
  country: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  viewCount: number;
  createdAt: Date;
  permitNumber?: string | null;
}

const labelClass = "font-label text-[10px] font-semibold uppercase tracking-[0.18em]";

export function PropertyOverview({ property }: { property: Property }) {
  const isCommercial = property.propertyType === "commercial";
  const price = typeof property.price === "string" ? parseFloat(property.price) : property.price;
  const { headline, details } = splitListingTitle(property.title);
  const address = formatPlace(property.location, property.city, property.state, property.country);
  const blocks = parseDescription(property.description);
  const available = property.status === "available";

  const stats: { value: string; label: string }[] = isCommercial
    ? [{ value: unitTypeLabel(property.unitType), label: "Unit type" }]
    : [
        { value: String(property.bedrooms), label: "Bedrooms" },
        { value: String(property.bathrooms), label: "Bathrooms" },
      ];
  stats.push({ value: property.sqft > 0 ? property.sqft.toLocaleString() : "—", label: "Square feet" });

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full bg-lx-gold px-3 py-1 capitalize text-lx-page ${labelClass}`}>
            For {property.listingType}
          </span>
          <span className={`inline-flex items-center rounded-full border border-lx-line px-3 py-1 capitalize text-lx-text ${labelClass}`}>
            {isCommercial && property.unitType ? `Commercial · ${unitTypeLabel(property.unitType)}` : property.propertyType}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 capitalize ${labelClass} ${
              available ? "border-lx-gold/50 text-lx-gold" : "border-lx-gold text-lx-pale"
            }`}
          >
            {PROPERTY_STATUS_LABELS[property.status] ?? property.status}
          </span>
        </div>

        <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text text-balance">
          {headline}
        </h1>
        {details.length > 0 && (
          <p className="mt-3 font-display text-lg italic text-lx-pale">{details.join(" · ")}</p>
        )}

        <div className="mt-4 flex items-center gap-2 text-lx-text/65">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="text-[15px]">{address}</p>
        </div>

        <p className="mt-8 font-display text-[clamp(28px,3.4vw,40px)] font-normal leading-none text-lx-text">
          {formatPrice(price, property.currency)}
          {property.priceUnit === "per_sqft" && (
            <span className="text-lg text-lx-muted"> /sq ft</span>
          )}
          {property.listingType === "rent" && (
            <span className="text-lg text-lx-muted"> /month</span>
          )}
        </p>
      </div>

      {/* Stats: a hairline row of serif figures */}
      <dl className="mb-12 flex flex-wrap border-y border-lx-line">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex-1 py-5 ${i > 0 ? "border-l border-lx-line pl-6" : ""} ${i < stats.length - 1 ? "pr-6" : ""}`}>
            <dd className="font-display text-[28px] font-normal leading-none text-lx-text">{s.value}</dd>
            <dt className={`mt-2 text-lx-muted ${labelClass}`}>{s.label}</dt>
          </div>
        ))}
      </dl>

      {/* Description */}
      <div className="mb-10">
        <p className="lx-eyebrow mb-5">About this property</p>
        <div className="max-w-none text-[15px] leading-[1.85] text-lx-text/75">
          {blocks.map((block, i) =>
            block.type === "heading" ? (
              <h3
                key={i}
                className="mb-3 mt-8 font-display text-[22px] font-normal leading-tight text-lx-text first:mt-0"
              >
                {block.text}
              </h3>
            ) : block.type === "list" ? (
              <ul key={i} className="mb-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {block.items.map((item, j) => (
                  <li key={j} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.85em] h-px w-3.5 bg-lx-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className="mb-4 last:mb-0">
                {block.text}
              </p>
            )
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-lx-line pt-5 text-[12px] text-lx-muted">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Listed {formatDate(property.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{property.viewCount.toLocaleString()} views</span>
        </div>
        {property.permitNumber && (
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>DLD Permit No. {property.permitNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
}
