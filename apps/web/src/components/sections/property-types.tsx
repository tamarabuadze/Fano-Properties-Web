import Link from "next/link";
import Image from "next/image";

// Three tall photo cards with a serif title and a few plain lines beneath, as the
// reference presents its services
const collections: {
  title: string;
  detail: string;
  points: string[];
  href: string;
  image: string;
  position?: string;
}[] = [
  {
    title: "Offices & commercial",
    detail: "Grade A workspace in Business Bay, Downtown and along Sheikh Zayed Road.",
    points: ["Off-plan towers with developer payment plans", "Full-floor and fitted offices", "Retail and showroom units"],
    href: "/properties?category=commercial&listingType=sale",
    image: "/collection-offices.webp",
  },
  {
    title: "Apartments",
    detail: "City residences chosen for light, outlook and the life around them.",
    points: ["Downtown, Marina and the Palm", "Ready and off-plan", "Furnished rentals"],
    href: "/properties?propertyType=apartment",
    image: "/collection-apartments.webp",
    // wide interior shot: keep the sofa, artwork and window in the tall crop
    position: "70% 50%",
  },
  {
    title: "Villas",
    detail: "Family homes and beachfront estates with room to make them yours.",
    points: ["Jumeirah Bay, Palm Jumeirah and the Hills", "Private pools and gardens", "Long-term leases"],
    href: "/properties?propertyType=villa",
    image: "/collection-villas.webp",
  },
];

export function PropertyTypesSection() {
  return (
    <section className="section-tint section-y">
      <div className="container-site">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p className="eyebrow">The collections</p>
          <h2 className="mt-4 font-display text-[clamp(34px,4.4vw,58px)] font-normal leading-[1.05] tracking-[-0.01em] text-[#2B2520]">
            Different spaces.<br /><span className="italic text-[#8C6A47]">The same personal touch.</span>
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {collections.map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-[#D9CFC2]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: item.position ?? "50% 50%" }}
                />
              </div>
              <h3 className="mt-6 font-display text-[26px] font-normal leading-tight text-[#2B2520] transition-colors group-hover:text-[#8C6A47]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-[#2B2520]/70">{item.detail}</p>
              <ul className="mt-4 space-y-1.5 text-[13px] text-[#2B2520]/60">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-[#E2A862]" />
                    {point}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
