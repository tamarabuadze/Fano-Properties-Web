import type { Metadata } from "next";
import { FaqAccordion } from "./_components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about buying, selling, and renting properties with Fano.",
};

const faqs = [
  {
    q: "How do I start the buying process?",
    a: "Getting pre-approved for a mortgage is the first step. Once you have a budget in mind, our agents will work with you to identify properties that match your criteria and lifestyle.",
  },
  {
    q: "What are your agent fees?",
    a: "Our commission structure is transparent and competitive. Buyers typically pay no agent fees — sellers pay a standard commission that covers both sides of the transaction. We'll discuss all costs upfront.",
  },
  {
    q: "How long does it typically take to buy a property?",
    a: "From offer acceptance to closing, the process typically takes 30–60 days depending on financing, inspections, and title work. We'll guide you through every step.",
  },
  {
    q: "Can I list my property with Fano?",
    a: "Absolutely. Contact us for a free property valuation and we'll walk you through our listing process, marketing strategy, and pricing approach.",
  },
  {
    q: "Do you work with international buyers?",
    a: "Yes. We have experience working with international clients and can assist with cross-border transactions, financing referrals, and legal guidance.",
  },
  {
    q: "What is the difference between a buyer's agent and a seller's agent?",
    a: "A buyer's agent represents your interests as a purchaser, helping you find properties, negotiate, and navigate the transaction. A seller's agent (listing agent) represents the seller and is focused on marketing and selling the property.",
  },
  {
    q: "How is property value determined?",
    a: "We use a comparative market analysis (CMA) that evaluates recent sales of similar properties in the same area, current market conditions, the property's condition, and unique features.",
  },
  {
    q: "Can I rent before I buy in a neighborhood?",
    a: "We offer both rental and purchase listings. Renting first is a great strategy to experience a neighborhood before committing to purchase.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="border-b border-border bg-zinc-50 py-12">
        <div className="container-site">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">Help Center</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-[#1a1410]">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-500 mt-3 max-w-xl">
            Everything you need to know about working with Fano Real Estate.
          </p>
        </div>
      </div>

      <div className="container-site max-w-3xl py-16">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
