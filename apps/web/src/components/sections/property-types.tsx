import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const collections = [
  { label: "Spaces for ambition.", category: "Commercial", detail: "Offices in Dubai", href: "/properties?category=commercial&listingType=sale", image: "/collection-offices.webp", className: "cinema-collection-office" },
  { label: "A life above the ordinary.", category: "Apartments", detail: "Your city. Your perspective.", href: "/properties?propertyType=apartment", image: "/collection-apartments.webp", className: "cinema-collection-apartment" },
  { label: "Room to make it yours.", category: "Villas", detail: "Find a place to call home", href: "/properties?propertyType=villa", image: "/collection-villas.webp", className: "cinema-collection-villa" },
];

export function PropertyTypesSection() {
  return (
    <section className="cinema-collections section-y bg-[#2B2520] text-[#F4EFEA]">
      <div className="container-site">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-14">
          <div>
            <p className="cinema-eyebrow mb-5 text-[#E2A862]">The collections</p>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">Different spaces.<br /><span className="cinema-serif text-[#F6E7D2]">The same personal touch.</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#F4EFEA]/65">Find a home that feels like you, or a workspace ready for what comes next.</p>
        </div>
        <div className="cinema-collection-grid">
          {collections.map((item, i) => (
            <Link key={item.category} href={item.href} className={`cinema-collection group ${item.className}`}>
              <Image src={item.image} alt="" fill unoptimized sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/95 via-[#2B2520]/15 to-[#2B2520]/10" />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 lg:p-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F4EFEA]/90">0{i + 1} / {item.category}</span>
                <span className="cinema-arrow"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="max-w-md text-2xl font-medium leading-tight tracking-[-0.03em] lg:text-3xl">{item.label}</h3>
                <p className="mt-3 text-xs tracking-wide text-[#F4EFEA]/65">{item.detail}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-[10px] tracking-wide text-[#F4EFEA]/45">Collection imagery is illustrative. View individual listings for property photographs and details.</p>
      </div>
    </section>
  );
}
