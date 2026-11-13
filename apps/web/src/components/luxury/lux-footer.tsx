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

// Charcoal footer: wordmark, address, two numbers, lowercase links, socials as text
export function LuxFooter({ showAgents = true }: { showAgents?: boolean }) {
  const links = showAgents ? pages : pages.filter((l) => l.href !== "/agents");

  return (
    <footer className="border-t border-lx-line bg-lx-surface text-lx-text">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex" aria-label="Fano Properties home">
            <FanoLogo color={LOGO_COLORS.champagne} className="h-11" />
          </Link>
          <p className="mt-6 font-display text-[20px] italic leading-snug text-lx-pale">Real Estate. Real Relationships.</p>
        </div>

        <div className="text-[13px] leading-[2] text-lx-text/70 lg:col-span-3">
          <p>3404, 34th Floor, Churchill Executive Tower</p>
          <p>Business Bay, Dubai</p>
          <p className="mt-4"><a href="tel:+97145644635" className="transition-colors hover:text-lx-gold">+971 4 564 4635</a></p>
          <p><a href="https://wa.me/971525719164" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lx-gold">+971 52 571 9164</a></p>
          <p><a href="mailto:info@fanoproperties.com" className="transition-colors hover:text-lx-gold">info@fanoproperties.com</a></p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 font-label text-[11px] font-bold uppercase tracking-[0.18em] text-lx-text/70 lg:col-span-3" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-lx-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-y-3 font-label text-[11px] font-bold uppercase tracking-[0.18em] text-lx-text/70 lg:col-span-2">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-lx-gold">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-lx-line py-6 font-label text-[10px] uppercase tracking-[0.18em] text-lx-text/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 Fano Properties</p>
        <p>RERA 49852</p>
      </div>
    </footer>
  );
}
