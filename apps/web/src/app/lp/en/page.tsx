import { headers } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import { LuxNavbar } from "@/components/luxury/lux-navbar";
import { LuxFooter } from "@/components/luxury/lux-footer";
import { LuxEnquire } from "@/components/luxury/lux-enquire";
import { GoogleTag } from "@/components/analytics/google-tag";
import { getAgents } from "@/lib/queries/agents";
import { CONSENT_COUNTRIES } from "@/lib/analytics";
import { googleTagIds } from "@/lib/google-tag-html";
import { defaultTheme, themeScript } from "@/lib/site-theme";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Commercial Properties for Sale in Dubai | Fano Properties",
  description:
    "Explore premium commercial properties in Dubai — offices, clinics, retail and more. Off-plan and ready units from Fano Properties.",
  alternates: { canonical: "https://fanoproperties.com/lp/en" },
};

const MEDIA = "https://fanoproperties.com/media";

const properties = [
  {
    slug: "symphony",
    title: "The Symphony by Imtiaz",
    location: "Meydan Dubai",
    category: "Offices · Off-plan",
    price: "From AED 2.78M",
    img: `${MEDIA}/f43d86ae-1e7c-4fc1-afba-8d7e2e76779c.jpg`,
  },
  {
    slug: "poly-clinic",
    title: "Poly Clinic, Sobha Hartland",
    location: "Creek Vistas Grande MBR City",
    category: "Clinic unit · For rent",
    price: "AED 2,000,000",
    img: `${MEDIA}/c68a7dbd-4942-4a9f-a67a-4a0f032e1b1d.jpg`,
  },
  {
    slug: "palm-jebel-ali-villa",
    title: "Beachfront Villa, Palm Jebel Ali",
    location: "Frond N Palm Jebel Ali",
    category: "Villa · 5 bedrooms",
    price: "AED 22,000,000",
    img: `${MEDIA}/25de9424-2da9-4296-846b-5bfed77e3352.jpg`,
  },
  {
    slug: "sol-luxe",
    title: "Sol Luxe by Sol Properties",
    location: "Sheikh Zayed Road Dubai",
    category: "Offices & retail · Off-plan",
    price: "AED 4,770 /sq ft",
    img: `${MEDIA}/b73ff245-547e-4ca5-94e2-d6ac901a0c92.jpg`,
  },
  {
    slug: "sol-levante",
    title: "Sol Levante",
    location: "JVT Dubai",
    category: "Office & retail",
    price: "AED 2,100 /sq ft",
    img: `${MEDIA}/7046d5b0-9324-4df0-bac9-df0e4d97706a.jpg`,
  },
  {
    slug: "ahs-twin-towers",
    title: "AHS Twin Towers",
    location: "Sheikh Zayed Road Dubai",
    category: "Grade A offices · Off-plan",
    price: "AED 3,850 /sq ft",
    img: `${MEDIA}/cad76b38-a1b5-40ad-9f8c-aec5b3e899d8.jpg`,
  },
  {
    slug: "lumena",
    title: "LUMENA by OMNIYAT",
    location: "Business Bay Dubai",
    category: "Offices · Off-plan",
    price: "AED 5,700 /sq ft",
    img: `${MEDIA}/789d5274-e8fd-4406-9264-d8104baf8cf8.jpg`,
  },
  {
    slug: "enara",
    title: "ENARA by OMNIYAT",
    location: "Marasi Bay Business Bay",
    category: "Grand offices · Off-plan",
    price: "AED 8,600 /sq ft",
    img: `${MEDIA}/df04e87e-826b-4250-9139-c72bb5f556d3.jpg`,
  },
  {
    slug: "rockefeller-tower",
    title: "Christian A. Rockefeller Business Tower",
    location: "Sheikh Zayed Road Dubai",
    category: "Grade A offices · Off-plan",
    price: "AED 4,000 /sq ft",
    img: `${MEDIA}/51981e2e-d4ec-4c0b-8573-dc1a581c328d.jpg`,
  },
  {
    slug: "berkeley-tower",
    title: "Berkeley Tower Offices",
    location: "Business Bay Dubai",
    category: "Grade A offices · Off-plan",
    price: "AED 4,500 /sq ft",
    img: `${MEDIA}/5e91c869-8a1b-412a-833e-f4652c8bd957.jpg`,
  },
  {
    slug: "hq-by-rove",
    title: "HQ by Rove Office",
    location: "Marasi Drive Business Bay",
    category: "Office · Off-plan",
    price: "AED 5,759 /sq ft",
    img: `${MEDIA}/6c5e3b25-622e-4c63-b386-9fc1a071ebf6.jpg`,
  },
];

export default async function LpEnPage() {
  const showAgents = (await getAgents(1).catch(() => [])).length > 0;
  const country = (await headers()).get("cf-ipcountry")?.toUpperCase();
  const askConsent = !country || country === "XX" || CONSENT_COUNTRIES.includes(country);

  return (
    <div className="lx-root">
      <script dangerouslySetInnerHTML={{ __html: themeScript(defaultTheme()) }} />
      <LuxNavbar showAgents={showAgents} />
      <main className="fano-web">
        <section
          style={{
            padding: "4rem 1.5rem 2rem",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Premium Commercial Properties in Dubai
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              opacity: 0.75,
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
            }}
          >
            Offices, retail, clinics and villas — off-plan and ready. Speak to our team about any listing.
          </p>
        </section>

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem 4rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {properties.map((p) => (
            <Link
              key={p.slug}
              href={`/lp/en/${p.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "0.75rem",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                boxShadow: "0 1px 4px rgba(0,0,0,.12)",
                transition: "box-shadow .2s",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.title}
                width={600}
                height={400}
                style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{ padding: "1rem 1.25rem 1.25rem", flex: 1 }}>
                <p
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    opacity: 0.6,
                    marginBottom: "0.35rem",
                  }}
                >
                  {p.category}
                </p>
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    lineHeight: 1.35,
                    marginBottom: "0.25rem",
                  }}
                >
                  {p.title}
                </h2>
                <p style={{ fontSize: "0.85rem", opacity: 0.65, marginBottom: "0.75rem" }}>
                  {p.location}
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 600 }}>{p.price}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <LuxFooter showAgents={showAgents} />
      <LuxEnquire />
      <WhatsAppFloat />
      <GoogleTag {...googleTagIds()} askConsent={askConsent} />
    </div>
  );
}
