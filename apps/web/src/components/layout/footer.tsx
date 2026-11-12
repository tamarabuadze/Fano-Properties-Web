import React from "react";
import Link from "next/link";
import { FanoLogo, LOGO_COLORS } from "@/components/shared/fano-logo";
import { SOCIAL_LINKS } from "@/lib/social-links";

const pages = [
  { label: "properties", href: "/properties" },
  { label: "commercial", href: "/properties?category=commercial" },
  { label: "agents", href: "/agents" },
  { label: "insights", href: "/blog" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
  { label: "roi calculator", href: "/roi-calculator" },
  { label: "privacy", href: "/privacy-policy" },
  { label: "faq", href: "/faq" },
];

// Quiet footer: logo, address, links and socials in lowercase text, one hairline above
export function Footer({ showAgents = true }: { showAgents?: boolean }) {
  const links = showAgents ? pages : pages.filter((l) => l.href !== "/agents");

  return (
    <footer className="border-t border-[#C5BAAB]/45 bg-[#F4EFEA] text-[#2B2520]">
      <div className="container-site grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex" aria-label="Fano Properties home">
            <FanoLogo color={LOGO_COLORS.bronze} className="h-11" />
          </Link>
          <p className="cinema-serif mt-5 text-[17px] text-[#8C6A47]">Your trusted real estate partner.</p>
        </div>

        <div className="text-[13px] leading-[1.9] text-[#2B2520]/80 lg:col-span-3">
          <p>3404, 34th Floor, Churchill Tower</p>
          <p>Business Bay, Dubai</p>
          <p className="mt-3"><a href="tel:+97145644635" className="hover:text-[#2B2520]">04 564 4635</a></p>
          <p><a href="https://wa.me/971525719164" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B2520]">+971 52 571 9164</a></p>
          <p><a href="mailto:info@fanoproperties.com" className="hover:text-[#2B2520]">info@fanoproperties.com</a></p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 text-[13px] leading-[1.9] text-[#2B2520]/80 lg:col-span-3" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#2B2520]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-[13px] leading-[1.9] text-[#2B2520]/80 lg:col-span-2">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block hover:text-[#2B2520]">
              {label.toLowerCase()}
            </a>
          ))}
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-[#C5BAAB]/35 py-5 text-[12px] text-[#2B2520]/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Fano Real Estate. All rights reserved.</p>
        <p>RERA 49852</p>
      </div>
    </footer>
  );
}
