import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: "postgresql://Mac@localhost:5432/fano" } },
});

async function main() {
  console.log("🌱 Seeding demo data...");

  // Clean up old E2E test data
  await prisma.blogArticle.deleteMany({ where: { title: { startsWith: "Test Article E2E" } } });
  await prisma.property.deleteMany({ where: { title: { startsWith: "Test Villa E2E" } } });
  await prisma.agent.deleteMany({ where: { firstName: "TestAgent" } });

  // ── AGENTS ─────────────────────────────────────────────────────────────────
  const agents = await Promise.all([
    prisma.agent.upsert({
      where: { slug: "sophia-martinez" },
      update: {},
      create: {
        firstName: "Sophia",
        lastName: "Martinez",
        slug: "sophia-martinez",
        email: "sophia@fano.com",
        phone: "+1 310 555 0101",
        title: "Senior Luxury Agent",
        specialization: "Luxury Residential",
        bio: "With over 12 years in premium real estate, Sophia has closed more than $300M in transactions across Beverly Hills and Malibu.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
        yearsExperience: 12,
        licenseNumber: "CA-RE-8821",
        active: true,
      },
    }),
    prisma.agent.upsert({
      where: { slug: "james-chen" },
      update: {},
      create: {
        firstName: "James",
        lastName: "Chen",
        slug: "james-chen",
        email: "james@fano.com",
        phone: "+1 310 555 0202",
        title: "Investment Specialist",
        specialization: "Commercial & Investment",
        bio: "James specialises in high-yield investment properties and commercial real estate. His analytical approach has earned him top-producer status four years running.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format",
        yearsExperience: 8,
        licenseNumber: "CA-RE-4453",
        active: true,
      },
    }),
    prisma.agent.upsert({
      where: { slug: "emma-harrington" },
      update: {},
      create: {
        firstName: "Emma",
        lastName: "Harrington",
        slug: "emma-harrington",
        email: "emma@fano.com",
        phone: "+1 310 555 0303",
        title: "Residential Expert",
        specialization: "Family Homes & Relocations",
        bio: "Emma is known for her personal touch and deep market knowledge, helping families find their perfect home in the greater LA area.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format",
        yearsExperience: 6,
        licenseNumber: "CA-RE-9974",
        active: true,
      },
    }),
  ]);
  console.log(`✓ ${agents.length} agents created`);

  // ── PROPERTIES ─────────────────────────────────────────────────────────────
  const properties = await Promise.all([
    prisma.property.upsert({
      where: { slug: "sunset-villa-beverly-hills" },
      update: {},
      create: {
        title: "Sunset Villa, Beverly Hills",
        slug: "sunset-villa-beverly-hills",
        description: "An extraordinary 6-bedroom estate perched above Sunset Boulevard with panoramic canyon-to-ocean views. Featuring a chef's kitchen, resort-style pool, and a private cinema room, this masterpiece redefines luxury living.",
        propertyType: "villa",
        listingType: "sale",
        status: "available",
        price: 8500000,
        currency: "USD",
        bedrooms: 6,
        bathrooms: 7,
        sqft: 7200,
        location: "1420 Sunset Blvd",
        city: "Beverly Hills",
        state: "CA",
        country: "US",
        coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[0].id,
      },
    }),
    prisma.property.upsert({
      where: { slug: "modern-penthouse-west-hollywood" },
      update: {},
      create: {
        title: "Modern Penthouse, West Hollywood",
        slug: "modern-penthouse-west-hollywood",
        description: "A sleek full-floor penthouse offering 360° city views, floor-to-ceiling glass, a private rooftop terrace, and concierge services. The pinnacle of urban luxury.",
        propertyType: "penthouse",
        listingType: "sale",
        status: "available",
        price: 4200000,
        currency: "USD",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 3100,
        location: "850 N Kings Rd",
        city: "West Hollywood",
        state: "CA",
        country: "US",
        coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[1].id,
      },
    }),
    prisma.property.upsert({
      where: { slug: "malibu-beachfront-estate" },
      update: {},
      create: {
        title: "Malibu Beachfront Estate",
        slug: "malibu-beachfront-estate",
        description: "Wake up to the Pacific Ocean every morning in this stunning 4-bedroom beachfront estate. Direct sand access, a wraparound deck, and floor-to-ceiling glass throughout.",
        propertyType: "house",
        listingType: "sale",
        status: "available",
        price: 12900000,
        currency: "USD",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 4800,
        location: "24500 PCH",
        city: "Malibu",
        state: "CA",
        country: "US",
        coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[0].id,
      },
    }),
  ]);
  console.log(`✓ ${properties.length} properties created`);

  // ── BLOG ARTICLES ──────────────────────────────────────────────────────────
  const articles = await Promise.all([
    prisma.blogArticle.upsert({
      where: { slug: "top-luxury-neighborhoods-los-angeles-2026" },
      update: {},
      create: {
        title: "Top Luxury Neighborhoods in Los Angeles for 2026",
        slug: "top-luxury-neighborhoods-los-angeles-2026",
        excerpt: "From Beverly Hills to Malibu, we break down the most sought-after neighborhoods for high-end buyers this year.",
        content: `## Why LA Remains the Gold Standard\n\nLos Angeles continues to attract ultra-high-net-worth buyers from around the globe. Here are the top neighborhoods to watch in 2026.\n\n## Beverly Hills\n\nHome prices remain strong above the $5M mark, with demand driven by tech executives and international buyers.\n\n## Malibu\n\nBeachfront inventory is at a decade low, pushing prices to record highs — especially along the coveted Carbon Beach stretch.\n\n## Bel Air\n\nHillside estates with city views continue to command premiums. New construction in the area is at its highest since 2018.`,
        coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format",
        readTime: 5,
        published: true,
        publishedAt: new Date(),
      },
    }),
    prisma.blogArticle.upsert({
      where: { slug: "buyers-guide-luxury-real-estate-2026" },
      update: {},
      create: {
        title: "The Ultimate Buyer's Guide to Luxury Real Estate in 2026",
        slug: "buyers-guide-luxury-real-estate-2026",
        excerpt: "Everything you need to know before making a premium property purchase — from due diligence to negotiation strategy.",
        content: `## Start with the Right Agent\n\nA specialist luxury agent can save you millions. They know off-market listings, local comps, and have relationships that open doors.\n\n## Pre-Approval at the Luxury Level\n\nJumbo loans require a different level of financial documentation. Get your assets in order early.\n\n## The Inspection Process\n\nFor homes above $5M, hire multiple specialist inspectors — structural, roofing, HVAC, and pool systems all warrant separate reviews.\n\n## Closing at the Top End\n\nEscrow timelines can vary significantly. Build flexibility into your schedule and work with a title company experienced in high-value transactions.`,
        coverImage: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&auto=format",
        readTime: 7,
        published: true,
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.blogArticle.upsert({
      where: { slug: "interior-design-trends-luxury-homes-2026" },
      update: {},
      create: {
        title: "Interior Design Trends Defining Luxury Homes in 2026",
        slug: "interior-design-trends-luxury-homes-2026",
        excerpt: "Biophilic design, smart glass, and bespoke craftsmanship are reshaping what premium buyers expect from their interiors.",
        content: `## Biophilic Design Takes Centre Stage\n\nLiving walls, natural stone, and abundant natural light are no longer optional — they are expected in the luxury segment.\n\n## Smart Glass Technology\n\nElectrochromic glass that transitions from transparent to opaque at the touch of a button is appearing in more high-end builds.\n\n## Bespoke Everything\n\nOff-the-shelf no longer cuts it at the luxury level. Custom millwork, hand-laid tile, and personalised colour palettes are the standard.`,
        coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format",
        readTime: 4,
        published: true,
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log(`✓ ${articles.length} blog articles created`);

  console.log("\n✅ Seed complete! Admin panel and landing page are now populated.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
