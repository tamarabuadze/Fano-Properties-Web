import { PrismaClient } from "@prisma/client";

// Direct URL (port 5432) bypasses pgbouncer transaction-mode restrictions
const directUrl =
  process.env.DIRECT_URL ||
  "postgresql://postgres.spjwekprwjkikcbogtil:Fanorock2027%40@aws-1-eu-west-2.pooler.supabase.com:5432/postgres";

const prisma = new PrismaClient({
  datasources: { db: { url: directUrl } },
});

async function main() {
  console.log("🌱 Seeding demo data...");

  // ── AGENTS ─────────────────────────────────────────────────────────────────
  const agents = await Promise.all([
    prisma.agent.upsert({
      where: { slug: "sarah-mitchell" },
      update: {},
      create: {
        firstName: "Sarah",
        lastName: "Mitchell",
        slug: "sarah-mitchell",
        email: "sarah.mitchell@fanoproperties.com",
        phone: "+971 50 123 4567",
        title: "Senior Property Consultant",
        specialization: "Luxury Residential",
        bio: "With over 10 years in UAE luxury real estate, Sarah has helped hundreds of clients find their perfect home across Dubai's most prestigious communities.",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format",
        yearsExperience: 10,
        licenseNumber: "RERA-4421",
        active: true,
      },
    }),
    prisma.agent.upsert({
      where: { slug: "james-thornton" },
      update: {},
      create: {
        firstName: "James",
        lastName: "Thornton",
        slug: "james-thornton",
        email: "james.thornton@fanoproperties.com",
        phone: "+971 55 987 6543",
        title: "Investment Property Specialist",
        specialization: "Off-Plan & Investment",
        bio: "James specialises in Dubai's off-plan market and high-yield investment properties, helping international buyers navigate the UAE real estate landscape.",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format",
        yearsExperience: 8,
        licenseNumber: "RERA-3312",
        active: true,
      },
    }),
    prisma.agent.upsert({
      where: { slug: "priya-nair" },
      update: {},
      create: {
        firstName: "Priya",
        lastName: "Nair",
        slug: "priya-nair",
        email: "priya.nair@fanoproperties.com",
        phone: "+971 52 456 7890",
        title: "Residential Sales Agent",
        specialization: "Apartments & Townhouses",
        bio: "Priya brings deep knowledge of Dubai's residential communities and a personal approach that puts clients at ease throughout every stage of the transaction.",
        avatar:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&auto=format",
        yearsExperience: 5,
        licenseNumber: "RERA-7789",
        active: true,
      },
    }),
  ]);
  console.log(`✓ ${agents.length} agents upserted`);

  // ── PROPERTIES ─────────────────────────────────────────────────────────────
  const properties = await Promise.all([
    prisma.property.upsert({
      where: { slug: "palm-jumeirah-signature-villa" },
      update: {},
      create: {
        title: "Palm Jumeirah Signature Villa",
        slug: "palm-jumeirah-signature-villa",
        description:
          "An extraordinary 6-bedroom signature villa on the iconic Palm Jumeirah fronds, offering unobstructed Arabian Gulf views from every level. Featuring a private beach, infinity pool, home cinema, and smart home automation throughout. This trophy residence exemplifies Dubai's finest waterfront living.",
        propertyType: "villa",
        listingType: "sale",
        status: "available",
        price: 18500000,
        currency: "AED",
        bedrooms: 6,
        bathrooms: 7,
        sqft: 9200,
        location: "Frond N, Palm Jumeirah",
        city: "Dubai",
        country: "AE",
        coverImage:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[0].id,
      },
    }),
    prisma.property.upsert({
      where: { slug: "downtown-dubai-luxury-penthouse" },
      update: {},
      create: {
        title: "Downtown Dubai Luxury Penthouse",
        slug: "downtown-dubai-luxury-penthouse",
        description:
          "A full-floor penthouse in the heart of Downtown Dubai with breathtaking Burj Khalifa and Fountain views. This immaculate 4-bedroom residence features floor-to-ceiling glass, a wraparound terrace, private pool, and dedicated concierge service. Steps from Dubai Mall and the finest dining in the city.",
        propertyType: "penthouse",
        listingType: "sale",
        status: "available",
        price: 12800000,
        currency: "AED",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 5400,
        location: "Boulevard Point, Downtown Dubai",
        city: "Dubai",
        country: "AE",
        coverImage:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[1].id,
      },
    }),
    prisma.property.upsert({
      where: { slug: "dubai-hills-estate-mansion" },
      update: {},
      create: {
        title: "Dubai Hills Estate Mansion",
        slug: "dubai-hills-estate-mansion",
        description:
          "Set on a premier golf course plot within the prestigious Dubai Hills Estate, this 5-bedroom mansion blends contemporary architecture with lush green surroundings. The property features a grand entrance, chef's kitchen, entertainment level, landscaped garden, and a resort-style pool with cabana.",
        propertyType: "villa",
        listingType: "sale",
        status: "available",
        price: 9750000,
        currency: "AED",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 7800,
        location: "Golf Place, Dubai Hills Estate",
        city: "Dubai",
        country: "AE",
        coverImage:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[2].id,
      },
    }),
    prisma.property.upsert({
      where: { slug: "marina-gate-waterfront-apartment" },
      update: {},
      create: {
        title: "Marina Gate Waterfront Apartment",
        slug: "marina-gate-waterfront-apartment",
        description:
          "A stunning 3-bedroom apartment in Marina Gate with panoramic Dubai Marina views. This high-floor residence offers an open-plan living and dining area, a fully fitted kitchen, and a generous balcony ideal for alfresco dining. Access to world-class facilities including a rooftop infinity pool, gym, and direct marina promenade access.",
        propertyType: "apartment",
        listingType: "sale",
        status: "available",
        price: 4200000,
        currency: "AED",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2100,
        location: "Marina Gate, Dubai Marina",
        city: "Dubai",
        country: "AE",
        coverImage:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format",
        published: true,
        featured: false,
        agentId: agents[0].id,
      },
    }),
    prisma.property.upsert({
      where: { slug: "jumeirah-bay-island-villa" },
      update: {},
      create: {
        title: "Jumeirah Bay Island Villa",
        slug: "jumeirah-bay-island-villa",
        description:
          "An ultra-luxury 7-bedroom villa on the exclusive Jumeirah Bay Island — one of Dubai's most coveted addresses. This architectural masterpiece features a private boat dock, outdoor entertainment terrace, home spa, gym, and uninterrupted views of the Dubai skyline and the Arabian Gulf. A rare opportunity for discerning buyers.",
        propertyType: "villa",
        listingType: "sale",
        status: "available",
        price: 38000000,
        currency: "AED",
        bedrooms: 7,
        bathrooms: 9,
        sqft: 14500,
        location: "Bulgari Resort & Residences, Jumeirah Bay",
        city: "Dubai",
        country: "AE",
        coverImage:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format",
        published: true,
        featured: true,
        agentId: agents[1].id,
      },
    }),
  ]);
  console.log(`✓ ${properties.length} properties upserted`);

  // ── BLOG ARTICLES ──────────────────────────────────────────────────────────
  const articles = await Promise.all([
    prisma.blogArticle.upsert({
      where: { slug: "dubai-luxury-real-estate-guide-2026" },
      update: {},
      create: {
        title: "Dubai Luxury Real Estate: The Complete Buyer's Guide for 2026",
        slug: "dubai-luxury-real-estate-guide-2026",
        excerpt:
          "From Palm Jumeirah to Downtown Dubai, we break down everything international buyers need to know about purchasing premium property in the UAE this year.",
        content: `## Why Dubai Remains the World's Premier Investment Destination

Dubai has firmly established itself as one of the world's top real estate investment destinations. With zero income tax, a rapidly growing population, and a government committed to long-term economic development, the emirate continues to attract ultra-high-net-worth buyers from Europe, Asia, and beyond.

## The Top Neighbourhoods for 2026

### Palm Jumeirah
The iconic man-made island remains Dubai's most recognised address. Signature villas on the fronds continue to command premium prices, with demand from European and Asian buyers driving values upward.

### Downtown Dubai
Home to the Burj Khalifa and Dubai Mall, Downtown offers unparalleled lifestyle convenience. High-floor apartments and penthouses with Fountain views are among the most sought-after units in the city.

### Dubai Hills Estate
A master-planned community set around an 18-hole golf course. Dubai Hills offers family-sized villas with lush greenery — a rarity in the desert city — making it particularly popular with families relocating from Europe.

### Jumeirah Bay Island
For buyers seeking absolute exclusivity, Jumeirah Bay Island hosts the Bulgari Resort & Residences and a handful of ultra-premium villas. Inventory is extremely limited, making it one of the scarcest addresses in the Middle East.

## Legal Framework for Foreign Buyers

Non-UAE nationals can purchase freehold property in designated areas. The process is straightforward: once you've agreed terms, you'll sign a Memorandum of Understanding (MOU), pay a 10% deposit, and proceed to the transfer at the Dubai Land Department (DLD).

## Golden Visa Through Property

Buying a property worth AED 2 million or more qualifies you for a 10-year UAE Golden Visa, granting you and your family long-term residency. This has been a major driver of international interest since the programme's expansion in 2022.`,
        coverImage:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format",
        readTime: 7,
        published: true,
        publishedAt: new Date(),
      },
    }),
    prisma.blogArticle.upsert({
      where: { slug: "uae-golden-visa-property-investment-2026" },
      update: {},
      create: {
        title: "UAE Golden Visa: How Property Investment Secures Long-Term Residency",
        slug: "uae-golden-visa-property-investment-2026",
        excerpt:
          "The UAE Golden Visa programme has transformed how global investors think about Dubai property. Here is everything you need to know about qualifying through real estate.",
        content: `## What Is the UAE Golden Visa?

Introduced in 2019 and significantly expanded in 2022, the UAE Golden Visa grants long-term residency (5 or 10 years, renewable) to investors, entrepreneurs, and skilled professionals. For property buyers, a minimum investment of AED 2 million unlocks a 10-year visa for the buyer, their spouse, and children.

## Property Investment Pathway

To qualify via real estate:

- The property must be worth at least **AED 2,000,000** (approximately €500,000)
- It must be in a **freehold designated area** — such as Palm Jumeirah, Downtown Dubai, Dubai Marina, and many others
- Off-plan properties are eligible if purchased from an approved developer with a minimum 50% paid

## Benefits of the Golden Visa

1. **10-year renewable residency** — no need for a local sponsor
2. **Family inclusion** — spouse, children, and even parents can be included
3. **Business freedom** — the ability to own 100% of a UAE-based company
4. **Tax efficiency** — the UAE levies no personal income tax or capital gains tax
5. **Ease of travel** — UAE residency strengthens your global mobility

## The Application Process

Once your property transfer is complete at the Dubai Land Department, your agent or a registered typing centre can initiate the Golden Visa application through the ICP (Federal Authority for Identity and Citizenship) portal. The entire process typically takes 2–4 weeks.

## Is It Right for You?

The Golden Visa suits buyers who want to use Dubai as a base — whether for business, lifestyle, or tax planning — while maintaining flexibility to travel globally. With the AED 2M threshold accessible across a broad range of apartment and townhouse options, more international buyers than ever are qualifying.`,
        coverImage:
          "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format",
        readTime: 6,
        published: true,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.blogArticle.upsert({
      where: { slug: "european-buyers-dubai-property-guide" },
      update: {},
      create: {
        title: "Why European Buyers Are Choosing Dubai Over Traditional Markets",
        slug: "european-buyers-dubai-property-guide",
        excerpt:
          "From London to Amsterdam, European investors are increasingly moving capital into Dubai real estate. We explore the key drivers behind this shift.",
        content: `## A Shifting Tide

Over the past three years, Dubai has seen a dramatic increase in European buyers — particularly from the UK, France, Germany, and the Netherlands. Several structural factors have made Dubai not just attractive, but compelling compared to traditional European markets.

## Tax Environment

European investors face increasingly heavy property taxation at home. In contrast, the UAE levies:

- **No income tax**
- **No capital gains tax**
- **No inheritance tax**
- A one-time 4% Dubai Land Department transfer fee

For high-net-worth individuals managing significant property portfolios, the tax differential is significant.

## Rental Yields

Prime areas of London, Paris, and Amsterdam routinely yield 2–3% gross. In Dubai, prime residential areas consistently deliver **5–8% gross yields**, with some areas exceeding 10% in the short-term rental market.

## Off-Plan Opportunities

Dubai's developer community offers staggered payment plans — often 40% during construction and 60% on completion — that are simply unavailable in most European markets. This allows buyers to secure an asset with relatively modest initial outlay.

## Lifestyle and Connectivity

Dubai offers direct non-stop flights to virtually every major European city in under 7 hours. The city's safety, climate, world-class dining, and international schools make it a credible full-time or part-time base for European families.

## The Outlook for 2026

With Expo City Dubai now a permanent business and innovation district, and new master communities like Dubai Creek Harbour and Dubai South maturing, 2026 presents a compelling entry point before the next phase of price appreciation.`,
        coverImage:
          "https://images.unsplash.com/photo-1582407947304-fd86f28f4248?w=800&auto=format",
        readTime: 5,
        published: true,
        publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log(`✓ ${articles.length} blog articles upserted`);

  console.log("\n✅ Seed complete! Platform is now populated with Dubai properties and UAE/EU content.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
