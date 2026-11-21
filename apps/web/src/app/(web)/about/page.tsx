import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { SOCIAL_LINKS } from "@/lib/social-links";

const title = "About Us | Dubai Real Estate Agency | RERA 49852";
const description = "Fano Properties is a RERA-registered (No. 49852) real estate agency in Business Bay, Dubai, for commercial and residential property to buy, sell and lease.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  ...buildPageMeta({ path: "/about", title, description }),
};

const values = [
  { title: "Excellence", description: "We hold ourselves to the highest standards in every interaction and transaction." },
  { title: "Relationships", description: "Long-term client relationships built on trust, transparency, and results." },
  { title: "Market expertise", description: "Deep local knowledge across residential, commercial, and investment properties." },
  { title: "Global reach", description: "Helping investors from around the world buy property in Dubai, in person or remotely." },
];

// Only facts that can be checked on the RERA register and on our Property Finder and Bayut profiles
const credentials = [
  { label: "RERA registered", value: "No. 49852", note: "Licensed by Dubai's Real Estate Regulatory Agency" },
  { label: "Property Finder", value: "SuperAgents", note: "Advisors with Property Finder SuperAgent status and verified listings" },
  { label: "Bayut", value: "TruBroker™", note: "Advisors carrying Bayut's TruBroker™ badge, with authenticity-checked listings" },
  { label: "Our office", value: "Business Bay", note: "Office 3404, Churchill Executive Tower, Business Bay, Dubai" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Opening: a quiet headline band, then the photograph */}
      <section className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="lx-eyebrow mb-5">Our story</p>
          <h1 className="max-w-3xl font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.0] tracking-[-0.01em] text-lx-text text-balance">
            Built on trust.<br /><span className="italic">Driven by results.</span>
          </h1>
        </div>
      </section>

      <section className="container-site pt-10 lg:pt-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-lx-raised lg:aspect-[21/9]">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=2560&auto=format"
            alt="Luxury Dubai real estate"
            fill
            sizes="100vw"
            className="object-cover object-[50%_45%]"
            priority
          />
        </div>
      </section>

      {/* Credentials: verifiable registrations and portal badges */}
      <section className="section-y">
        <div className="container-site">
          <SectionHeader
            eyebrow="Credentials"
            title="Registered, verified, accountable"
            description="Every Fano advisor works under our RERA licence, and our listings are checked by Dubai's leading property portals."
            className="mb-14"
          />
          <div className="grid gap-10 border-t border-lx-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {credentials.map((c) => (
              <div key={c.label} className="lg:border-l lg:border-lx-line lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0">
                <p className="lx-eyebrow">{c.label}</p>
                <p className="mt-4 font-display text-[28px] font-normal leading-tight text-lx-gold">{c.value}</p>
                <p className="mt-3 text-[14px] leading-[1.8] text-lx-text/70">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-y">
        <div className="container-site">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeader
                eyebrow="Our mission"
                title="More than real estate"
                description="Fano was founded on a simple belief: that buying or selling a property should be one of the most positive experiences of your life. We combine deep market expertise with genuine care for each client."
              />
              <div className="mt-8 space-y-5 border-t border-lx-line pt-8">
                <p className="text-[15px] leading-[1.85] text-lx-text/75">
                  We help buyers and investors find the right property in Dubai, from off-plan offices in Business Bay to homes across the city, with clear facts, honest advice and support at every step through to handover.
                </p>
                <p className="text-[15px] leading-[1.85] text-lx-text/75">
                  From our office in Business Bay, our team guides buyers and investors through every step, from choosing a project to handover.
                </p>
              </div>
              <Link href="/contact" className="btn-gold mt-10">
                Work with us
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-lx-raised">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=1200&auto=format"
                alt="Dubai skyline at night"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values: four numbered columns separated by hairlines */}
      <section className="section-y section-tint">
        <div className="container-site">
          <SectionHeader
            eyebrow="What we stand for"
            title="Our core values"
            align="center"
            className="mb-14"
          />
          <div className="grid gap-10 border-t border-lx-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {values.map((v, i) => (
              <div key={v.title} className="lg:border-l lg:border-lx-line lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0">
                <p className="font-display text-[15px] italic text-lx-gold">0{i + 1}</p>
                <h3 className="mt-4 font-display text-[22px] font-normal leading-tight text-lx-text">{v.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-lx-text/70">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to find us: social channels and portal profiles */}
      <section className="section-y">
        <div className="container-site">
          <SectionHeader
            eyebrow="Follow our work"
            title="See our latest listings"
            description="New properties and market updates, shared first on our channels and portal profiles."
            align="center"
            className="mb-12"
          />
          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center gap-3 rounded-[4px] border border-lx-line px-4 py-6 text-center text-lx-text transition-colors hover:border-lx-gold hover:text-lx-gold"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-[13px] font-medium tracking-[0.04em]">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
