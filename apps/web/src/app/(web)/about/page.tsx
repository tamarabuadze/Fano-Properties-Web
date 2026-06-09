import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Building2, Globe } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Fano Real Estate — our story, mission, and the team behind the brand.",
};

const values = [
  { icon: Award, title: "Excellence", description: "We hold ourselves to the highest standards in every interaction and transaction." },
  { icon: Users, title: "Relationships", description: "Long-term client relationships built on trust, transparency, and results." },
  { icon: Building2, title: "Market Expertise", description: "Deep local knowledge across residential, commercial, and investment properties." },
  { icon: Globe, title: "Global Reach", description: "Connecting buyers and sellers across borders with a truly global network." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative h-80 lg:h-96 overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1973&auto=format"
          alt="About Fano"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 h-full flex flex-col justify-center container-site">
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl lg:text-6xl font-semibold text-white [letter-spacing:-0.025em] text-balance max-w-2xl">
            Built on Trust. Driven by Results.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="section-y">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Our Mission"
                title="More Than Real Estate"
                description="Fano was founded on a simple belief: that buying or selling a property should be one of the most positive experiences of your life. We combine deep market expertise with genuine care for each client."
              />
              <div className="mt-8 space-y-4">
                <p className="text-zinc-600 leading-relaxed">
                  Since our founding, we've helped thousands of families find their perfect home, guided investors to high-performing assets, and supported sellers in achieving record prices.
                </p>
                <p className="text-zinc-600 leading-relaxed">
                  Our team of certified agents brings decades of combined experience and an unwavering commitment to your success.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 h-12 px-6 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                Work With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative h-[460px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format"
                  alt="Our mission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-6 border border-border">
                <p className="text-3xl font-semibold text-black [letter-spacing:-0.03em]">12+</p>
                <p className="text-zinc-500 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-zinc-50">
        <div className="container-site">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
            align="center"
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-border p-6">
                <div className="h-12 w-12 rounded-xl bg-zinc-50 border border-border flex items-center justify-center mb-4">
                  <v.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-y bg-black text-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "$2B+", label: "Properties Sold" },
              { value: "2,400+", label: "Happy Clients" },
              { value: "50+", label: "Expert Agents" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.03em] mb-2">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
