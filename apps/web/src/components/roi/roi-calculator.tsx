"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn, formatPrice } from "@fano/utils";
import { calculateRoi, defaultRoiInputs, VAT_PCT, type RoiInputs } from "@/lib/roi";
import { RoiLeadForm } from "./roi-lead-form";

interface RoiCalculatorProps {
  variant?: "full" | "compact";
  price?: number;
  sizeSqft?: number;
  propertyId?: string;
  propertyTitle?: string;
}

const aed = (v: number) => formatPrice(Math.round(v));
const pctText = (v: number) => `${Number.isFinite(v) ? v.toFixed(1) : "0.0"}%`;

export function RoiCalculator({
  variant = "full",
  price,
  sizeSqft,
  propertyId,
  propertyTitle,
}: RoiCalculatorProps) {
  const [inputs, setInputs] = useState<RoiInputs>(() => defaultRoiInputs(price, sizeSqft));
  const [showAdvanced, setShowAdvanced] = useState(variant === "full");
  const result = useMemo(() => calculateRoi(inputs), [inputs]);

  const set = <K extends keyof RoiInputs>(key: K) => (value: RoiInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const compact = variant === "compact";

  return (
    <div className={cn("grid gap-6", !compact && "lg:grid-cols-5 lg:gap-10")}>
      {/* ── Inputs ─────────────────────────────────────────── */}
      <div className={cn("min-w-0 space-y-6", !compact && "lg:col-span-3")}>
        <Section title="Property">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Purchase price" suffix="AED" value={inputs.price} onChange={set("price")} step={50_000} />
            <NumberField label="Size" suffix="sq ft" value={inputs.sizeSqft} onChange={set("sizeSqft")} step={50} />
          </div>
        </Section>

        <Section title="Financing">
          <div className="inline-flex rounded-full border border-border p-1 bg-zinc-50">
            {[
              { label: "Mortgage", value: true },
              { label: "Cash", value: false },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => set("useMortgage")(opt.value)}
                className={cn(
                  "px-5 h-9 rounded-full text-sm font-medium transition-colors",
                  inputs.useMortgage === opt.value ? "bg-[#1a1410] text-white" : "text-zinc-600 hover:text-[#1a1410]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {inputs.useMortgage && (
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <NumberField
                label="Down payment"
                suffix="%"
                value={inputs.downPaymentPct}
                onChange={set("downPaymentPct")}
                min={0}
                max={100}
                hint="UAE minimum is usually 20% for expats (properties up to AED 5M)."
              />
              <NumberField label="Interest rate" suffix="%" value={inputs.interestRatePct} onChange={set("interestRatePct")} step={0.1} />
              <NumberField label="Loan term" suffix="yrs" value={inputs.loanTermYears} onChange={set("loanTermYears")} min={1} max={25} />
            </div>
          )}
        </Section>

        <Section title="Rental income">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Annual rent" suffix="AED" value={inputs.annualRent} onChange={set("annualRent")} step={5_000} />
            <NumberField
              label="Service charges"
              suffix="AED/sq ft"
              value={inputs.serviceChargePerSqft}
              onChange={set("serviceChargePerSqft")}
              step={1}
              hint="Annual building fees, typically AED 10–25 per sq ft in Dubai."
            />
          </div>
        </Section>

        <div className="rounded-2xl border border-border">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-[#1a1410]"
            aria-expanded={showAdvanced}
          >
            Detailed assumptions
            <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")} />
          </button>
          {showAdvanced && (
            <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">Purchase costs</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <NumberField label="DLD transfer fee" suffix="%" value={inputs.dldFeePct} onChange={set("dldFeePct")} step={0.1} />
                  <NumberField
                    label="Agency fee"
                    suffix="%"
                    value={inputs.agencyFeePct}
                    onChange={set("agencyFeePct")}
                    step={0.1}
                    hint={`Plus ${VAT_PCT}% VAT.`}
                  />
                  <NumberField
                    label="Other fees"
                    suffix="AED"
                    value={inputs.otherCosts}
                    onChange={set("otherCosts")}
                    step={500}
                    hint="Trustee, title deed, valuation, NOC."
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">Running costs</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <NumberField label="Vacancy" suffix="%" value={inputs.vacancyPct} onChange={set("vacancyPct")} min={0} max={100} />
                  <NumberField label="Maintenance" suffix="% rent" value={inputs.maintenancePct} onChange={set("maintenancePct")} min={0} max={100} />
                  <NumberField label="Management" suffix="% rent" value={inputs.managementPct} onChange={set("managementPct")} min={0} max={100} />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">Growth &amp; exit</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <NumberField label="Value growth" suffix="%/yr" value={inputs.appreciationPct} onChange={set("appreciationPct")} step={0.5} />
                  <NumberField label="Rent growth" suffix="%/yr" value={inputs.rentGrowthPct} onChange={set("rentGrowthPct")} step={0.5} />
                  <NumberField label="Hold period" suffix="yrs" value={inputs.holdYears} onChange={set("holdYears")} min={1} max={30} />
                  <NumberField label="Selling costs" suffix="%" value={inputs.sellingCostPct} onChange={set("sellingCostPct")} step={0.5} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────── */}
      <div className={cn("min-w-0 space-y-6", !compact && "lg:col-span-2")}>
        <div className={cn("rounded-2xl bg-[#1a1410] text-white p-6", !compact && "lg:sticky lg:top-24")}>
          <p className="text-xs font-medium uppercase tracking-widest text-[#c9a96e]">Your estimated returns</p>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Metric label="Net rental yield" value={pctText(result.netYieldPct)} />
            <Metric label="Cash-on-cash return" value={pctText(result.cashOnCashPct)} />
            <Metric
              label="Monthly cash flow"
              value={aed(result.monthlyCashFlow)}
              tone={result.monthlyCashFlow < 0 ? "negative" : "default"}
            />
            <Metric
              label={`${inputs.holdYears}-year total ROI`}
              value={pctText(result.totalRoiPct)}
              sub={`${pctText(result.annualisedRoiPct)} per year`}
              tone={result.totalRoiPct < 0 ? "negative" : "default"}
            />
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 space-y-5 text-sm">
            <Breakdown
              title="Cash needed upfront"
              total={result.cashInvested}
              rows={[
                [inputs.useMortgage ? `Down payment (${inputs.downPaymentPct}%)` : "Purchase price", result.downPayment],
                [`DLD transfer fee (${inputs.dldFeePct}%)`, result.dldFee],
                [`Agency fee + VAT`, result.agencyFee],
                ...(result.mortgageRegistrationFee > 0
                  ? ([["Mortgage registration", result.mortgageRegistrationFee]] as [string, number][])
                  : []),
                ["Other fees", inputs.otherCosts],
              ]}
            />
            <Breakdown
              title="Year one, per year"
              total={result.annualCashFlow}
              totalLabel="Net cash flow"
              rows={[
                [`Rent after ${inputs.vacancyPct}% vacancy`, result.effectiveRent],
                ["Service charges", -result.annualServiceCharges],
                ["Maintenance & management", -(result.annualOperatingCosts - result.annualServiceCharges)],
                ...(result.annualMortgagePayment > 0
                  ? ([["Mortgage repayments", -result.annualMortgagePayment]] as [string, number][])
                  : []),
              ]}
            />
            <Breakdown
              title={`After ${inputs.holdYears} years`}
              total={result.totalProfit}
              totalLabel="Total profit"
              rows={[
                ["Estimated sale value", result.saleValue],
                ["Proceeds after loan & selling costs", result.saleProceeds],
                ["Total rental cash flow", result.years[result.years.length - 1]?.cumulativeCashFlow ?? 0],
              ]}
            />
          </div>
          <p className="mt-5 text-xs text-white/50 flex gap-2">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Estimates only, based on the assumptions above. Not financial advice. Gross yield:{" "}
            {pctText(result.grossYieldPct)}.
          </p>
        </div>

        <RoiLeadForm inputs={inputs} result={result} propertyId={propertyId} propertyTitle={propertyTitle} />
      </div>

      {!compact && (
        <div className="min-w-0 lg:col-span-5">
          <YearTable years={result.years} />
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#1a1410] mb-3">{title}</h3>
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  step = 1,
  min = 0,
  max,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  hint?: string;
}) {
  // Keep the raw text so users can clear the field or type "4." while editing
  const [text, setText] = useState(String(value));
  useEffect(() => {
    if (parseFloat(text) !== value) setText(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-zinc-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={text}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            setText(e.target.value);
            const n = parseFloat(e.target.value);
            if (Number.isFinite(n)) {
              const clamped = Math.min(max ?? Infinity, Math.max(min, n));
              onChange(clamped);
            } else {
              onChange(0);
            }
          }}
          className={cn(
            "w-full h-11 pl-4 rounded-xl border border-border text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all hover:border-zinc-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            suffix ? "pr-20" : "pr-4"
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{hint}</p>}
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "negative";
}) {
  return (
    <div className="rounded-xl bg-white/5 p-4">
      <p className="text-[11px] text-white/60">{label}</p>
      <p
        className={cn(
          "text-xl font-semibold mt-1 tabular-nums [letter-spacing:-0.02em]",
          tone === "negative" ? "text-red-300" : "text-white"
        )}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-[#c9a96e] mt-0.5">{sub}</p>}
    </div>
  );
}

function Breakdown({
  title,
  rows,
  total,
  totalLabel = "Total",
}: {
  title: string;
  rows: [string, number][];
  total: number;
  totalLabel?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-[#c9a96e] mb-2">{title}</p>
      <dl className="space-y-1.5">
        {rows.map(([label, v]) => (
          <div key={label} className="flex justify-between gap-4 text-white/70">
            <dt>{label}</dt>
            <dd className="tabular-nums">{aed(v)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 pt-1.5 border-t border-white/10 font-medium text-white">
          <dt>{totalLabel}</dt>
          <dd className={cn("tabular-nums", total < 0 && "text-red-300")}>{aed(total)}</dd>
        </div>
      </dl>
    </div>
  );
}

function YearTable({ years }: { years: ReturnType<typeof calculateRoi>["years"] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-zinc-50">
        <h3 className="text-sm font-semibold text-[#1a1410]">Year-by-year projection</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-zinc-500">
              {["Year", "Property value", "Annual rent", "Cash flow", "Cumulative cash flow", "Loan balance", "Equity"].map(
                (h) => (
                  <th key={h} className="px-5 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {years.map((y) => (
              <tr key={y.year} className="tabular-nums">
                <td className="px-5 py-3 font-medium text-[#1a1410]">{y.year}</td>
                <td className="px-5 py-3 whitespace-nowrap">{aed(y.propertyValue)}</td>
                <td className="px-5 py-3 whitespace-nowrap">{aed(y.rent)}</td>
                <td className={cn("px-5 py-3 whitespace-nowrap", y.cashFlow < 0 && "text-red-600")}>{aed(y.cashFlow)}</td>
                <td className={cn("px-5 py-3 whitespace-nowrap", y.cumulativeCashFlow < 0 && "text-red-600")}>
                  {aed(y.cumulativeCashFlow)}
                </td>
                <td className="px-5 py-3 whitespace-nowrap">{aed(y.loanBalance)}</td>
                <td className="px-5 py-3 whitespace-nowrap font-medium">{aed(y.equity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
