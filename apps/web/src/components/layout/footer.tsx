import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#2B2520] via-[#26201C] to-[#1C1714] text-[#F4EFEA]">
      {/* Warm glow behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #E2A862 0%, transparent 65%)" }}
      />

      <div className="container-site relative pt-16 pb-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-white.png"
                alt="Fano Properties"
                width={160}
                height={52}
                className="h-10 w-auto object-contain"
                /* Sand logo on espresso, as in the Fano app */
                style={{ filter: "brightness(0) saturate(100%) invert(76%) sepia(14%) saturate(480%) hue-rotate(356deg) brightness(92%)" }}
              />
            </Link>
            <p className="mt-5 max-w-xs text-base font-medium leading-relaxed text-[#F4EFEA]">
              Premium real estate for discerning buyers, sellers, and investors.
            </p>
            <p className="mt-2 font-serif text-base italic text-[#E2A862]">Your Trusted Real Estate Partner</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2A862]/35 bg-[#F4EFEA]/5 text-[#E8D9C4] shadow-[0_0_14px_-4px_rgba(226,168,98,.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E2A862] hover:text-[#2B2520]"
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
                    className="inline-flex items-center gap-2.5 text-sm text-[#E6DFD5]/80 transition-colors hover:text-[#E2A862]"
                  >
                    <Icon className="h-4 w-4 text-[#E2A862]" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link groups in glowing glass cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8 lg:gap-5">
            {groups.map(([heading, links]) => (
              <div
                key={heading}
                className="rounded-2xl border border-[#E2A862]/40 bg-gradient-to-b from-[#F4EFEA]/[0.07] to-[#F4EFEA]/[0.02] p-5 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,.03)_inset,0_0_28px_-6px_rgba(226,168,98,.45)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,.05)_inset,0_0_40px_-4px_rgba(226,168,98,.6)] lg:p-6"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#E2A862]">{heading}</p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-[#F4EFEA]/85 transition-colors hover:text-[#E2A862]">
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

      {/* Bottom bar with glowing curved light lines */}
      <div className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="fano-footer-line" x1="0" x2="1">
              <stop offset="0" stopColor="#E2A862" stopOpacity="0" />
              <stop offset=".25" stopColor="#ECBE80" stopOpacity=".9" />
              <stop offset=".6" stopColor="#E2A862" stopOpacity=".55" />
              <stop offset="1" stopColor="#E2A862" stopOpacity="0" />
            </linearGradient>
            <filter id="fano-footer-glow" x="-10%" y="-200%" width="120%" height="500%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <path d="M0 40 C 360 0, 720 0, 1440 30" fill="none" stroke="url(#fano-footer-line)" strokeWidth="6" filter="url(#fano-footer-glow)" opacity=".5" />
          <path d="M0 40 C 360 0, 720 0, 1440 30" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1.2" />
          <path d="M-40 130 C 180 60, 300 50, 520 70" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1" opacity=".55" />
          <path d="M-40 140 C 160 80, 280 72, 480 90" fill="none" stroke="url(#fano-footer-line)" strokeWidth="1" opacity=".35" />
        </svg>
        <div className="container-site relative flex flex-col items-center gap-3 pt-10 pb-24 text-center text-xs text-[#C5BAAB] sm:pb-8 lg:flex-row lg:justify-between lg:text-left">
          <p>© 2025 Fano Real Estate. All rights reserved.</p>
          <p className="text-sm text-[#F4EFEA]">
            Designed &amp; developed in-house by <span className="font-semibold text-[#E2A862]">Ali Raza</span>
            <span className="text-[#C5BAAB]"> · Fano Properties</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
