import type { Metadata } from "next";
import { buildPageMeta } from "@/lib/seo";
import { FaqAccordion } from "./_components/faq-accordion";

const title = "FAQ";
const description = "Answers about buying property in Dubai: freehold ownership for foreigners, DLD fees, off-plan payment plans, mortgages and the Golden Visa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  ...buildPageMeta({ path: "/faq", title, description }),
};

const faqs = [
  {
    q: "Can foreigners buy property in Dubai?",
    a: "Yes. Buyers of any nationality can own property outright (freehold) in Dubai's designated freehold areas, which include Business Bay, Downtown Dubai, Dubai Marina and Sheikh Zayed Road. You don't need to live in the UAE to buy.",
  },
  {
    q: "What fees do I pay when buying?",
    a: "The main government cost is the Dubai Land Department (DLD) transfer fee of 4% of the price, plus registration and trustee office fees. Agency fees and any bank fees depend on the deal, and we confirm all costs with you in writing before you commit.",
  },
  {
    q: "How does buying off-plan work?",
    a: "You buy a unit before it is built and pay in stages under the developer's payment plan, for example a deposit on booking, instalments during construction and the balance on handover. Payments go into a government-regulated escrow account for the project, and the sale is registered with the DLD.",
  },
  {
    q: "How long does buying take?",
    a: "A cash purchase of a ready property can usually be completed within a few weeks once the price is agreed. With a mortgage it takes longer, while the bank approves the loan and valuation. Off-plan purchases are reserved quickly, with handover on the developer's completion date.",
  },
  {
    q: "Can I get a mortgage as a foreigner?",
    a: "Yes. UAE banks lend to both residents and non-residents, usually with a smaller loan for non-residents. Loan limits are set by UAE Central Bank rules and the bank's own checks, and we can introduce you to mortgage advisors.",
  },
  {
    q: "Does buying property qualify me for a UAE Golden Visa?",
    a: "Property investors can apply for a 10-year Golden Visa when their property in Dubai is worth at least AED 2 million, subject to the government's conditions. Rules can change, so we check the current requirements for your case.",
  },
  {
    q: "Do you work with buyers outside the UAE?",
    a: "Yes. We work with investors from around the world and can handle viewings by video call, documents and the purchase steps remotely. Contact us on WhatsApp or by email to get started.",
  },
  {
    q: "Can I list my property with Fano?",
    a: "Yes. Contact us for a free valuation and we'll explain how we market your property and what we recommend for pricing.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <div className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="lx-eyebrow mb-5">Help centre</p>
          <h1 className="font-display text-[clamp(36px,4.6vw,56px)] font-normal leading-[1.02] tracking-[-0.01em] text-lx-text text-balance">
            Frequently asked questions
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-lx-text/70">
            Everything you need to know about working with Fano Properties.
          </p>
        </div>
      </div>

      <div className="container-site max-w-3xl py-14 lg:py-20">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
