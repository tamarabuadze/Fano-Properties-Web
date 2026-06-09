import { BedDouble, Bath, Maximize2, MapPin, Calendar, Eye } from "lucide-react";
import { formatPrice, formatDate } from "@fano/utils";

interface Property {
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  status: string;
  price: number | string;
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
}

export function PropertyOverview({ property }: { property: Property }) {
  const price = typeof property.price === "string" ? parseFloat(property.price) : property.price;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs font-medium capitalize">
            For {property.listingType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium capitalize">
            {property.propertyType}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
            property.status === "available"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}>
            {property.status.replace("_", " ")}
          </span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-semibold [letter-spacing:-0.025em] text-black mb-3">
          {property.title}
        </h1>

        <div className="flex items-center gap-1.5 text-zinc-500 mb-4">
          <MapPin className="h-4 w-4 shrink-0" />
          <p className="text-base">
            {property.location}, {property.city}
            {property.state ? `, ${property.state}` : ""}, {property.country}
          </p>
        </div>

        <p className="text-3xl font-semibold text-black [letter-spacing:-0.02em]">
          {formatPrice(price, property.currency)}
          {property.listingType === "rent" && (
            <span className="text-lg font-normal text-zinc-500">/month</span>
          )}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-2xl bg-zinc-50 border border-border">
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
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Maximize2 className="h-5 w-5 text-zinc-400" />
          <p className="text-xl font-semibold text-black">{property.sqft.toLocaleString()}</p>
          <p className="text-xs text-zinc-500">Square Feet</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-black mb-4">About this Property</h2>
        <div className="prose prose-zinc max-w-none">
          {property.description.split("\n").map((para, i) => (
            <p key={i} className="text-zinc-600 leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
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
      </div>
    </div>
  );
}
