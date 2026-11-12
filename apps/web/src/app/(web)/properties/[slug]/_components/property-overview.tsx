import { BedDouble, Bath, Maximize2, MapPin, Calendar, Eye, Store, BadgeCheck } from "lucide-react";
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

export function PropertyOverview({ property }: { property: Property }) {
  const isCommercial = property.propertyType === "commercial";
  const price = typeof property.price === "string" ? parseFloat(property.price) : property.price;
  const { headline, details } = splitListingTitle(property.title);
  const address = formatPlace(property.location, property.city, property.state, property.country);
  const blocks = parseDescription(property.description);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs font-medium capitalize">
            For {property.listingType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium capitalize">
            {isCommercial && property.unitType ? `Commercial · ${unitTypeLabel(property.unitType)}` : property.propertyType}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
 property.status === "available"
 ? "bg-emerald-50 text-emerald-700"
 : "bg-amber-50 text-amber-700"
 }`}>
            {PROPERTY_STATUS_LABELS[property.status] ?? property.status}
          </span>
        </div>

        <h1 className="font-display text-3xl lg:text-4xl font-semibold [letter-spacing:-0.025em] text-[#2B2520] mb-2">
          {headline}
        </h1>
        {details.length > 0 && (
          <p className="font-serif italic text-lg text-[#8C6A47] mb-3">{details.join(" · ")}</p>
        )}

        <div className="flex items-center gap-1.5 text-[#6B5038]/80 mb-4">
          <MapPin className="h-4 w-4 shrink-0" />
          <p className="text-base">{address}</p>
        </div>

        <p className="font-display text-3xl font-semibold text-[#6B5038] [letter-spacing:-0.02em]">
          {formatPrice(price, property.currency)}
          {property.priceUnit === "per_sqft" && (
            <span className="text-lg font-normal text-zinc-500"> /sq ft</span>
          )}
          {property.listingType === "rent" && (
            <span className="text-lg font-normal text-zinc-500">/month</span>
          )}
        </p>
      </div>

      {/* Stats */}
      <div className={`grid ${isCommercial ? "grid-cols-2" : "grid-cols-3"} gap-4 mb-10 p-6 rounded-2xl bg-zinc-50 border border-border`}>
        {isCommercial ? (
          <div className="flex flex-col items-center gap-1.5 text-center border-r border-border">
            <Store className="h-5 w-5 text-zinc-400" />
            <p className="text-xl font-semibold text-black">{unitTypeLabel(property.unitType)}</p>
            <p className="text-xs text-zinc-500">Unit Type</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <BedDouble className="h-5 w-5 text-zinc-400" />
              <p className="text-xl font-semibold text-black">{property.bedrooms}</p>
              <p className="text-xs text-zinc-500">Bedrooms</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center border-x border-border">
              <Bath className="h-5 w-5 text-zinc-400" />
              <p className="text-xl font-semibold text-black">{property.bathrooms}</p>
              <p className="text-xs text-zinc-500">Bathrooms</p>
            </div>
          </>
        )}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Maximize2 className="h-5 w-5 text-zinc-400" />
          <p className="text-xl font-semibold text-black">
            {property.sqft > 0 ? property.sqft.toLocaleString() : "—"}
          </p>
          <p className="text-xs text-zinc-500">Square Feet</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold text-[#2B2520] mb-4">About this Property</h2>
        <div className="max-w-none text-[15px] leading-relaxed text-[#4A403A]">
          {blocks.map((block, i) =>
            block.type === "heading" ? (
              <h3
                key={i}
                className="mt-7 mb-2.5 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-[#8C6A47] first:mt-0"
              >
                <span aria-hidden="true" className="h-px w-6 bg-[#E2A862]" />
                {block.text}
              </h3>
            ) : block.type === "list" ? (
              <ul key={i} className="mb-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {block.items.map((item, j) => (
                  <li key={j} className="relative pl-5">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-[#E2A862]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className="mb-3 last:mb-0">
                {block.text}
              </p>
            )
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-6 pt-6 border-t border-border text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Listed {formatDate(property.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>{property.viewCount.toLocaleString()} views</span>
        </div>
        {property.permitNumber && (
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" />
            <span>DLD Permit No. {property.permitNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
}
