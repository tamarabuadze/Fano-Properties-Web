import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Fano Properties — our story, mission, and the team behind the brand.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Excellence", description: "We hold ourselves to the highest standards in every interaction and transaction." },
  { title: "Relationships", description: "Long-term client relationships built on trust, transparency, and results." },
  { title: "Market expertise", description: "Deep local knowledge across residential, commercial, and investment properties." },
  { title: "Global reach", description: "Helping investors from around the world buy property in Dubai, in person or remotely." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Opening: a quiet headline band, then the photograph */}
      <section className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="eyebrow mb-5">Our story</p>
          <h1 className="max-w-3xl font-display text-[clamp(40px,6vw,80px)] font-normal leading-[1.0] tracking-[-0.01em] text-[#2B2520] text-balance">
            Built on trust.<br /><span className="italic">Driven by results.</span>
          </h1>
        </div>
      </section>

      <section className="container-site pt-10 lg:pt-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-[#E6DFD5] lg:aspect-[21/9]">
          <Image
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1973&auto=format"
            alt="The Fano Properties team at work"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
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
              <div className="mt-8 space-y-5 border-t border-[#C5BAAB]/40 pt-8">
                <p className="text-[15px] leading-[1.85] text-[#2B2520]/75">
                  We help buyers and investors find the right property in Dubai, from off-plan offices in Business Bay to homes across the city, with clear facts, honest advice and support at every step through to handover.
                </p>
                <p className="text-[15px] leading-[1.85] text-[#2B2520]/75">
                  From our office in Business Bay, our team guides buyers and investors through every step, from choosing a project to handover.
                </p>
              </div>
              <Link href="/contact" className="btn-pill mt-10">
                Work with us
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[#E6DFD5]">
              <Image
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format"
                alt="Our mission"
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
          <div className="grid gap-10 border-t border-[#C5BAAB]/50 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {values.map((v, i) => (
              <div key={v.title} className="lg:border-l lg:border-[#C5BAAB]/50 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0">
                <p className="font-display text-[15px] italic text-[#8C6A47]">0{i + 1}</p>
                <h3 className="mt-4 font-display text-[26px] font-normal leading-tight text-[#2B2520]">{v.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-[#2B2520]/70">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
