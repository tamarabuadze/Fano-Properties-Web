import React from "react";
import Link from "next/link";
import { FanoLogo, LOGO_COLORS } from "@/components/shared/fano-logo";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social-links";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Agents", href: "/agents" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Properties: [
    { label: "For Sale", href: "/properties?listingType=sale" },
    { label: "Commercial", href: "/properties?category=commercial" },
    { label: "Featured", href: "/properties?featured=true" },
    { label: "All Listings", href: "/properties" },
    { label: "ROI Calculator", href: "/roi-calculator" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "FAQ", href: "/faq" },
  ],
};

const CONTACT = [
  { icon: Phone, text: "04 564 4635", href: "tel:+97145644635" },
  { icon: MessageCircle, text: "+971 52 571 9164", href: "https://wa.me/971525719164" },
  { icon: Mail, text: "info@fanoproperties.com", href: "mailto:info@fanoproperties.com" },
];

// Footer in the Fano brand: espresso, link groups in glowing glass cards,
// and a bottom bar with soft amber light lines
export function Footer({ showAgents = true }: { showAgents?: boolean }) {
  const groups = Object.entries(footerLinks).map(
    ([heading, links]) => [heading, showAgents ? links : links.filter((l) => l.href !== "/agents")] as const
  );

  return (
    <footer className="relative overflow-hidden bg-[#24201A] text-[#A99D8F]">
      {/* Faint champagne glow behind the link cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #DFCFB9 0%, transparent 65%)" }}
      />

      <div className="container-site relative pt-16 pb-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <FanoLogo color={LOGO_COLORS.champagne} className="h-12" />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-[#A99D8F]">
              Premium real estate for discerning buyers, sellers, and investors.
            </p>
            <p className="mt-2 font-serif text-base italic text-[#DFCFB9]">Your Trusted Real Estate Partner</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFCFB9]/30 bg-[#DFCFB9]/[0.04] text-[#DFCFB9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#DFCFB9] hover:text-[#24201A]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <ul className="mt-6 space-y-2.5">
              {CONTACT.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2.5 text-sm text-[#A99D8F] transition-colors hover:text-[#DFCFB9]"
                  >
                    <Icon className="h-4 w-4 text-[#DFCFB9]" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link groups in glowing glass cards, with champagne HD bullets */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8 lg:gap-5">
            {groups.map(([heading, links]) => (
              <div
                key={heading}
                className="rounded-2xl border border-[#DFCFB9]/35 bg-gradient-to-b from-[#DFCFB9]/[0.08] to-[#DFCFB9]/[0.02] p-5 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,.03)_inset,0_0_30px_-6px_rgba(226,168,98,.45)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,.05)_inset,0_0_42px_-4px_rgba(226,168,98,.6)] lg:p-6"
              >
                <h4 className="mb-5 text-xs font-semibold uppercase tracking-[2px] text-[#DFCFB9]">{heading}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group inline-flex items-center gap-2.5 text-sm text-[#A99D8F] transition-colors hover:text-[#DFCFB9]">
                        <span aria-hidden className="-mt-0.5 text-lg leading-none text-[#DFCFB9] [text-shadow:0_0_5px_rgba(223,207,185,0.4)] transition-transform group-hover:scale-125">•</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line: glowing curved light lines, copyright and the credit badge */}
      <div className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="fano-footer-line" x1="0" x2="1">
              <stop offset="0" stopColor="#E2A862" stopOpacity="0" />
              <stop offset=".2" stopColor="#ECBE80" stopOpacity=".95" />
              <stop offset=".55" stopColor="#DFCFB9" stopOpacity=".5" />
              <stop offset="1" stopColor="#DFCFB9" stopOpacity="0" />
            </linearGradient>
            <filter id="fano-footer-glow" x="-10%" y="-200%" width="120%" height="500%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <path d="M0 22 C 360 4, 900 4, 1440 18" fill="none" stroke="url(#fano-footer-line)" strokeWidth="6" filter="url(#fano-footer-glow)" opacity=".45" />
          <path d="M0 22 C 360 4, 900 4, 1440 18" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1.2" />
          <path d="M-40 140 C 120 70, 260 56, 520 66" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1.2" opacity=".6" />
          <path d="M-40 150 C 100 90, 240 80, 470 92" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1" opacity=".4" />
          <path d="M-60 158 C 80 112, 210 104, 420 116" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1" opacity=".25" />
        </svg>
        <div className="container-site relative flex flex-col items-center gap-4 pt-10 pb-10 !pr-[4.75rem] text-center text-xs text-[#A99D8F] sm:pb-8 sm:!pr-24 lg:flex-row lg:justify-between lg:!pr-12 lg:text-left">
          <p className="text-[13px]">© 2025 Fano Real Estate. All rights reserved.</p>
          <p className="group inline-flex items-center gap-2 rounded-full border border-[#DFCFB9]/20 bg-[#DFCFB9]/5 px-4 py-2 text-[13px] text-[#A99D8F] transition-all duration-300 hover:border-[#DFCFB9] hover:bg-[#DFCFB9]/10 hover:text-[#DFCFB9]">
            <span aria-hidden className="text-base text-[#DFCFB9] [text-shadow:0_0_8px_rgba(223,207,185,0.4)]">◈</span>
            Designed &amp; developed by <strong className="font-semibold tracking-[0.5px] text-[#DFCFB9]">FANO TEAM</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
