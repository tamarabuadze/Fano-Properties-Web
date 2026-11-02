import type { Metadata } from "next";
import { RoiCalculator } from "@/components/roi/roi-calculator";

export const metadata: Metadata = {
  title: "Dubai Property ROI Calculator",
  description:
    "Estimate rental yield, cash-on-cash return, monthly cash flow and total ROI for a Dubai property, including DLD fees, mortgage and service charges.",
  alternates: { canonical: "/roi-calculator" },
};

const notes = [
  {
    q: "What's included in the upfront cost?",
    a: "Your down payment (or the full price for cash buyers), the 4% Dubai Land Department transfer fee, the agency fee plus 5% VAT, mortgage registration (0.25% of the loan plus an admin fee) and other one-off fees such as the trustee, title deed and valuation.",
  },
  {
    q: "How is net rental yield calculated?",
    a: "Year-one rent after vacancy, minus service charges, maintenance and management, divided by the purchase price plus purchase costs. Gross yield is simply annual rent divided by price.",
  },
  {
    q: "What is cash-on-cash return?",
    a: "Your net cash flow after mortgage repayments in year one, divided by the cash you put in upfront. It shows how hard your own money is working.",
  },
  {
    q: "How is total ROI worked out?",
    a: "At the end of the hold period we estimate the sale value using your growth rate, subtract selling costs and the remaining loan, add all the rental cash flow you received, then subtract the cash you invested.",
  },
];

export default function RoiCalculatorPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="border-b border-border bg-zinc-50 py-12">
        <div className="container-site">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">Investor Tools</p>
          <h1 className="text-4xl lg:text-5xl font-semibold [letter-spacing:-0.025em] text-[#1a1410]">
            ROI Calculator
          </h1>
          <p className="text-zinc-500 mt-3 max-w-xl">
            See what a Dubai property could earn you: rental yield, monthly cash flow and long-term return, with DLD
            fees, mortgage costs and service charges built in.
          </p>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <RoiCalculator variant="full" />

        <div className="mt-20 pt-12 border-t border-border grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
          {notes.map((n) => (
            <div key={n.q}>
              <h2 className="font-semibold text-[#1a1410]">{n.q}</h2>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{n.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
