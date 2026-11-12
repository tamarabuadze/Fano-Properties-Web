import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, Linkedin, Instagram, Globe } from "lucide-react";
import { getAgentBySlug } from "@/lib/queries/agents";
import { PropertyCard } from "@fano/ui";
import { AnimateStagger } from "@/components/shared/animate-stagger";

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent || !agent.active) return { title: "Agent Not Found", robots: { index: false } };
  return {
    title: `${agent.firstName} ${agent.lastName} — Real Estate Agent`,
    description: agent.bio?.slice(0, 160),
    alternates: { canonical: `/agents/${slug}` },
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent || !agent.active) notFound();

  const socialLinks = [
    { icon: Linkedin, href: agent.linkedinUrl, label: "LinkedIn" },
    { icon: Instagram, href: agent.instagramUrl, label: "Instagram" },
    { icon: Globe, href: agent.websiteUrl, label: "Website" },
  ].filter((l) => l.href);

  const facts = [
    agent.licenseNumber ? `RERA BRN ${agent.licenseNumber}` : null,
    agent.specialization,
    agent.languages.length > 0 ? `Speaks ${agent.languages.join(", ")}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen pt-20">
      <div className="container-site py-12 lg:py-20">
        <div className="mb-16 grid gap-12 lg:grid-cols-3 lg:gap-20">
          {/* Agent profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="relative mb-7 aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-[#E6DFD5]">
                {agent.avatar ? (
                  <Image
                    src={agent.avatar}
                    alt={`${agent.firstName} ${agent.lastName ?? ""}`.trim()}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-6xl font-normal text-[#8C6A47]/50">
                      {agent.firstName[0]}{agent.lastName?.[0]}
                    </span>
                  </div>
                )}
              </div>

              <p className="eyebrow mb-4">The team</p>
              <h1 className="font-display text-[clamp(32px,3.6vw,44px)] font-normal leading-[1.05] tracking-[-0.01em] text-[#2B2520]">
                {agent.firstName} {agent.lastName}
              </h1>
              {agent.title && (
                <p className="mt-2 text-[14px] text-[#2B2520]/65">{agent.title}</p>
              )}
              {facts.length > 0 && (
                <ul className="mt-6 divide-y divide-[#C5BAAB]/40 border-y border-[#C5BAAB]/40 text-[13px] text-[#2B2520]/75">
                  {facts.map((f) => (
                    <li key={f} className="py-2.5">{f}</li>
                  ))}
                </ul>
              )}

              <div className="mt-6 space-y-3">
                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 text-[13px] text-[#2B2520]/80 transition-colors hover:text-[#2B2520]"
                  >
                    <Phone className="h-4 w-4 text-[#8C6A47]" aria-hidden="true" />
                    {agent.phone}
                  </a>
                )}
                {agent.email ? (
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 text-[13px] text-[#2B2520]/80 transition-colors hover:text-[#2B2520]"
                  >
                    <Mail className="h-4 w-4 text-[#8C6A47]" aria-hidden="true" />
                    {agent.email}
                  </a>
                ) : (
                  <a href="/contact" className="btn-pill w-full">
                    Contact {agent.firstName} through Fano
                  </a>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-6 flex gap-2">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5BAAB]/70 text-[#2B2520]/60 transition-colors hover:border-[#2B2520] hover:text-[#2B2520]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Bio + listings */}
          <div className="lg:col-span-2">
            {agent.bio && (
              <div className="mb-16">
                <p className="eyebrow mb-4">About</p>
                <div className="space-y-5">
                  {agent.bio.split("\n").map((para, i) => (
                    <p key={i} className={i === 0 ? "font-display text-[clamp(22px,2.2vw,28px)] font-normal leading-[1.35] text-[#2B2520]" : "text-[15px] leading-[1.85] text-[#2B2520]/75"}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {agent.properties.length > 0 && (
              <div>
                <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#C5BAAB]/40 pb-6">
                  <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-normal leading-tight text-[#2B2520]">
                    Active listings
                  </h2>
                  <span className="eyebrow">{agent.properties.length} {agent.properties.length === 1 ? "property" : "properties"}</span>
                </div>
                <AnimateStagger className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                  {agent.properties.map((p) => (
                    <PropertyCard
                      key={p.id}
                      id={p.id}
                      title={p.title}
                      slug={p.slug}
                      propertyType={p.propertyType}
                      unitType={p.unitType}
                      priceUnit={p.priceUnit}
                      listingType={p.listingType}
                      price={parseFloat(p.price.toString())}
                      currency={p.currency}
                      location={p.location}
                      city={p.city}
                      bedrooms={p.bedrooms}
                      bathrooms={p.bathrooms}
                      sqft={p.sqft}
                      coverImage={p.coverImage}
                      featured={p.featured}
                    />
                  ))}
                </AnimateStagger>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
