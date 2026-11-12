import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";

const collections = [
  {
    title: "Offices & commercial",
    detail: "Grade A floors in Business Bay, Downtown and along Sheikh Zayed Road.",
    href: "/properties?category=commercial&listingType=sale",
    image: "/collection-offices.webp",
    position: "50% 50%",
  },
  {
    title: "Apartments",
    detail: "City residences chosen for light, outlook and the life around them.",
    href: "/properties?propertyType=apartment",
    image: "/collection-apartments.webp",
    position: "70% 50%",
  },
  {
    title: "Villas",
    detail: "Family homes and beachfront estates with room to make them yours.",
    href: "/properties?propertyType=villa",
    image: "/collection-villas.webp",
    position: "50% 50%",
  },
];

// Three tall photographs on the charcoal surface
export function LuxCollections() {
  return (
    <section className="bg-lx-surface py-24 lg:py-36">
      <div className="container-site">
        <Reveal className="mb-14 max-w-2xl lg:mb-20">
          <p className="lx-numeral">02</p>
          <h2 className="mt-5 font-display text-[clamp(32px,3.8vw,50px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text">
            Different spaces.<br /><span className="italic text-lx-pale">The same personal touch.</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {collections.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <Link href={item.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-lx-raised">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 100vw, 33vw"
                    style={{ objectPosition: item.position }}
                    className="object-cover transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.04] group-hover:opacity-90"
                  />
                </div>
                <h3 className="mt-7 font-display text-[22px] font-normal leading-tight text-lx-text transition-colors group-hover:text-lx-gold">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs text-[14px] leading-[1.8] text-lx-text/60">{item.detail}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
