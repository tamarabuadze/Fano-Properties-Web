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

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container-site py-16">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Agent profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative h-72 w-full lg:h-80 rounded-2xl overflow-hidden bg-zinc-100 mb-6">
                {agent.avatar ? (
                  <Image
                    src={agent.avatar}
                    alt={`${agent.firstName} ${agent.lastName}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-6xl font-semibold text-zinc-300">
                      {agent.firstName[0]}{agent.lastName[0]}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-semibold [letter-spacing:-0.02em] text-[#2B2520]">
                {agent.firstName} {agent.lastName}
              </h1>
              {agent.title && (
                <p className="text-zinc-500 mt-1">{agent.title}</p>
              )}
              {(agent.licenseNumber || agent.languages.length > 0 || agent.specialization) && (
                <div className="mt-4 space-y-1 text-sm text-zinc-600">
                  {agent.licenseNumber && <p>RERA BRN {agent.licenseNumber}</p>}
                  {agent.specialization && <p>{agent.specialization}</p>}
                  {agent.languages.length > 0 && <p>Speaks {agent.languages.join(", ")}</p>}
                </div>
              )}

              <div className="mt-6 space-y-3">
                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 text-sm text-zinc-700 hover:text-[#2B2520] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-zinc-400" />
                    {agent.phone}
                  </a>
                )}
                {agent.email ? (
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 text-sm text-zinc-700 hover:text-[#2B2520] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-zinc-400" />
                    {agent.email}
                  </a>
                ) : (
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full h-11 rounded-full bg-gradient-to-b from-[#3A322B] to-[#2B2520] text-[#F4EFEA] shadow-[0_10px_24px_-10px_rgba(43,37,32,.6)] hover:-translate-y-px hover:shadow-[0_16px_30px_-12px_rgba(43,37,32,.7)] text-[#F4EFEA] text-sm font-medium transition-colors"
                  >
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
                      className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-zinc-500 hover:text-[#2B2520] hover:border-zinc-400 transition-all"
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
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-[#2B2520] mb-4">About</h2>
                <div className="space-y-4">
                  {agent.bio.split("\n").map((para, i) => (
                    <p key={i} className="text-zinc-600 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            )}

            {agent.properties.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#2B2520] mb-6">
                  Active Listings ({agent.properties.length})
                </h2>
                <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
