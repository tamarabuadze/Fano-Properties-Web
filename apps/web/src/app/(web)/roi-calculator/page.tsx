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
    <div className="min-h-screen pt-20">
      <div className="page-band py-14 lg:py-20">
        <div className="container-site">
          <p className="eyebrow mb-5">Investor tools</p>
          <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-normal leading-[1.02] tracking-[-0.01em] text-[#2B2520]">
            ROI calculator
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[#2B2520]/70">
            See what a Dubai property could earn you: rental yield, monthly cash flow and long-term return, with DLD
            fees, mortgage costs and service charges built in.
          </p>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <RoiCalculator variant="full" />

        <div className="mt-24 border-t border-[#C5BAAB]/40 pt-14">
          <p className="eyebrow mb-10">How the numbers work</p>
          <div className="grid max-w-5xl gap-x-16 gap-y-12 md:grid-cols-2">
            {notes.map((n) => (
              <div key={n.q}>
                <h2 className="font-display text-[22px] font-normal leading-tight text-[#2B2520]">{n.q}</h2>
                <p className="mt-3 text-[14px] leading-[1.8] text-[#2B2520]/70">{n.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
