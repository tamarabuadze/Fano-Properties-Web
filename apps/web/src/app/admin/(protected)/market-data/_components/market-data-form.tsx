"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MARKET_AREAS, type MarketSnapshot, type MarketAreaKey, type MarketAreaFigures } from "@/lib/market-snapshot-schema";
import { saveMarketSnapshot, clearMarketSnapshot } from "../_actions";

const inputCls =
  "w-full h-10 px-3.5 rounded-[3px] border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A862]/25 focus:border-[#E2A862] transition-all hover:border-[#C5BAAB]";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider";

const FIELDS: { key: keyof MarketAreaFigures; label: string; placeholder: string }[] = [
  { key: "transactions", label: "Office sales (count)", placeholder: "e.g. 1240" },
  { key: "avgPricePerSqft", label: "Average AED / sq ft", placeholder: "e.g. 2150" },
  { key: "prevAvgPricePerSqft", label: "Average AED / sq ft, year before", placeholder: "optional" },
  { key: "totalValue", label: "Total value (AED)", placeholder: "e.g. 2450000000" },
];

type AreaInput = Record<keyof MarketAreaFigures, string>;
const emptyArea = (): AreaInput => ({ transactions: "", avgPricePerSqft: "", prevAvgPricePerSqft: "", totalValue: "" });

function toInput(f?: MarketAreaFigures): AreaInput {
  const a = emptyArea();
  if (!f) return a;
  for (const k of Object.keys(a) as (keyof MarketAreaFigures)[]) a[k] = f[k] != null ? String(f[k]) : "";
  return a;
}

function toFigures(a: AreaInput): MarketAreaFigures {
  const out: MarketAreaFigures = {};
  for (const k of Object.keys(a) as (keyof MarketAreaFigures)[]) {
    // Accept "2,450,000,000" as typed from the DLD page
    const v = a[k].replace(/[,\s]/g, "");
    if (v !== "") out[k] = Number(v);
  }
  return out;
}

export function MarketDataForm({ initial, defaultSourceUrl }: { initial: MarketSnapshot | null; defaultSourceUrl: string }) {
  const [periodLabel, setPeriodLabel] = useState(initial?.periodLabel ?? "");
  const [asOf, setAsOf] = useState(initial?.asOf ?? new Date().toISOString().slice(0, 10));
  const [sourceUrl, setSourceUrl] = useState(initial?.sourceUrl ?? defaultSourceUrl);
  const [areas, setAreas] = useState<Record<MarketAreaKey, AreaInput>>({
    dubai: toInput(initial?.areas.dubai),
    "business-bay": toInput(initial?.areas["business-bay"]),
    "sheikh-zayed-road": toInput(initial?.areas["sheikh-zayed-road"]),
  });
  const [busy, setBusy] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      periodLabel,
      asOf,
      sourceUrl,
      areas: {
        dubai: toFigures(areas.dubai),
        "business-bay": toFigures(areas["business-bay"]),
        "sheikh-zayed-road": toFigures(areas["sheikh-zayed-road"]),
      },
    };
    const bad = Object.values(payload.areas).flatMap((a) => Object.values(a)).some((n) => !Number.isFinite(n) || n < 0);
    if (bad) return toast.error("Figures must be numbers, e.g. 2150 or 2,450,000,000");
    setBusy(true);
    const res = await saveMarketSnapshot(payload);
    setBusy(false);
    if (res.success) toast.success("Saved. The figures are now on the commercial pages.");
    else toast.error(res.error ?? "Something went wrong");
  }

  async function onClear() {
    if (!confirm("Remove the market figures from the website?")) return;
    setBusy(true);
    const res = await clearMarketSnapshot();
    setBusy(false);
    if (res.success) {
      toast.success("Removed from the website");
      setAreas({ dubai: emptyArea(), "business-bay": emptyArea(), "sheikh-zayed-road": emptyArea() });
    } else toast.error(res.error ?? "Something went wrong");
  }

  return (
    <form onSubmit={onSave} noValidate className="space-y-8">
      <section className="bg-card rounded-[4px] border border-border p-6 space-y-5">
        <h2 className="font-display text-xl font-normal text-foreground">Period and source</h2>
        <div>
          <label className={labelCls} htmlFor="md-period">Dates covered</label>
          <input id="md-period" value={periodLabel} onChange={(e) => setPeriodLabel(e.target.value)} className={inputCls} placeholder="Office sales, 1 Nov 2025 – 31 Oct 2026" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="md-asof">Figures taken on</label>
            <input id="md-asof" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="md-source">Source link</label>
            <input id="md-source" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      {MARKET_AREAS.map((area) => (
        <section key={area.key} className="bg-card rounded-[4px] border border-border p-6 space-y-5">
          <h2 className="font-display text-xl font-normal text-foreground">{area.label}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className={labelCls} htmlFor={`md-${area.key}-${f.key}`}>{f.label}</label>
                <input
                  id={`md-${area.key}-${f.key}`}
                  inputMode="decimal"
                  value={areas[area.key][f.key]}
                  onChange={(e) => setAreas((s) => ({ ...s, [area.key]: { ...s[area.key], [f.key]: e.target.value } }))}
                  className={inputCls}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={busy} className="btn-gold disabled:opacity-50">
          {busy ? "Saving…" : "Save and publish"}
        </button>
        {initial && (
          <button type="button" onClick={onClear} disabled={busy} className="h-10 px-4 rounded-[3px] border border-border text-sm hover:border-[#B0453A] hover:text-[#B0453A]">
            Remove from website
          </button>
        )}
      </div>
    </form>
  );
}
