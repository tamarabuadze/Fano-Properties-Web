import Image from "next/image";
import Link from "next/link";
import { cn, isOptimizedImageHost, unitTypeLabel, formatPlace, splitListingTitle } from "@fano/utils";

export interface LuxPropertyCardProps {
  title: string;
  slug: string;
  propertyType: string;
  unitType?: string | null;
  priceUnit?: string | null;
  listingType: string;
  price: number;
  currency?: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  coverImage: string;
  feature?: boolean;
  priority?: boolean;
  className?: string;
}

function formatMoney(price: number, currency = "AED") {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price) + (currency === "AED" ? "" : ` ${currency}`);
}

// Photograph, then serif name, tracked place line, and one quiet line of facts.
// No box, no border; the price sits alone in serif. Hover: slow push-in, slight dim.
export function LuxPropertyCard({
  title, slug, propertyType, unitType, priceUnit, listingType, price, currency = "AED",
  location, city, bedrooms, bathrooms, sqft, coverImage, feature = false, priority = false, className,
}: LuxPropertyCardProps) {
  const isCommercial = propertyType === "commercial";
  const { headline } = splitListingTitle(title);
  const place = formatPlace(location, city);
  const facts = (isCommercial
    ? [unitTypeLabel(unitType), sqft > 0 ? `${sqft.toLocaleString("en-US")} sq ft` : null]
    : [bedrooms > 0 ? `${bedrooms} bedroom${bedrooms === 1 ? "" : "s"}` : null, sqft > 0 ? `${sqft.toLocaleString("en-US")} sq ft` : null, bathrooms > 0 ? `${bathrooms} bath` : null]
  ).filter(Boolean) as string[];
  const label = listingType === "rent" ? "To let" : listingType === "lease" ? "To lease" : null;

  return (
    <Link href={`/properties/${slug}`} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden rounded-[4px] bg-lx-raised", feature ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]")}>
        <Image
          src={coverImage}
          unoptimized={!isOptimizedImageHost(coverImage)}
          alt={title}
          fill
          sizes={feature ? "(max-width: 1023px) 100vw, 66vw" : "(max-width: 1023px) 100vw, 33vw"}
          quality={85}
          priority={priority}
          className="object-cover transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.04] group-hover:opacity-90"
        />
        {label && (
          <span className="absolute left-4 top-4 rounded-full border border-lx-gold/60 bg-lx-page/60 px-3 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-lx-pale backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-6 pt-6">
        <div className="min-w-0">
          <h3 className={cn("truncate font-display font-normal leading-tight text-lx-text transition-colors group-hover:text-lx-gold", feature ? "text-[30px]" : "text-[24px]")}>
            {headline}
          </h3>
          <p className="mt-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">{place}</p>
          {facts.length > 0 && <p className="mt-3 text-[13px] text-lx-text/55">{facts.join(" · ")}</p>}
        </div>
        <p className="shrink-0 text-right font-display text-[22px] leading-none text-lx-text">
          <span className="mr-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-lx-muted">{currency}</span>
          {formatMoney(price, currency)}
          {priceUnit === "per_sqft" && <span className="ml-1 text-[12px] text-lx-muted">/sq ft</span>}
          {listingType === "rent" && <span className="ml-1 text-[12px] text-lx-muted">/mo</span>}
        </p>
      </div>
    </Link>
  );
}
