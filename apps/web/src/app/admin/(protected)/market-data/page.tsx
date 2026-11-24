import type { Metadata } from "next";
import { getMarketSnapshot, DLD_SOURCE_URL } from "@/lib/market-snapshot";
import { MarketDataForm } from "./_components/market-data-form";

export const metadata: Metadata = { title: "Market data" };
export const dynamic = "force-dynamic";

export default async function MarketDataPage() {
  const snapshot = await getMarketSnapshot();

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-[32px] font-normal leading-tight text-foreground">Market data</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Official Dubai Land Department office-sale figures, shown on the commercial property pages with their source and date.
          Nothing appears on the site until you save figures here.
        </p>
      </div>

      <ol className="bg-card rounded-[4px] border border-border p-6 space-y-2 text-sm text-foreground list-decimal list-inside">
        <li>
          Open{" "}
          <a href={DLD_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline text-[#8C6A47]">
            DLD Real Estate Data → Transactions
          </a>
          .
        </li>
        <li>Choose Sales, Commercial, Office, and the area (or all of Dubai). Set the date range, usually the last 12 months.</li>
        <li>Enter the number of transactions, the average price per sq ft and the total value below. Leave a box empty if you don&apos;t have it.</li>
        <li>Repeat once a month so the date on the site stays current.</li>
      </ol>

      <MarketDataForm initial={snapshot} defaultSourceUrl={DLD_SOURCE_URL} />
    </div>
  );
}
