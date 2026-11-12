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
    <div className={cn("grid gap-8", !compact && "lg:grid-cols-5 lg:gap-14")}>
      {/* ── Inputs ─────────────────────────────────────────── */}
      <div className={cn("min-w-0 space-y-8", !compact && "lg:col-span-3")}>
        <Section title="Property">
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberField label="Purchase price" suffix="AED" value={inputs.price} onChange={set("price")} step={50_000} />
            <NumberField label="Size" suffix="sq ft" value={inputs.sizeSqft} onChange={set("sizeSqft")} step={50} />
          </div>
        </Section>

        <Section title="Financing">
          <div className="inline-flex gap-1 rounded-full border border-[#C5BAAB]/60 p-1" role="group" aria-label="Financing">
            {[
              { label: "Mortgage", value: true },
              { label: "Cash", value: false },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                aria-pressed={inputs.useMortgage === opt.value}
                onClick={() => set("useMortgage")(opt.value)}
                className={cn(
                  "h-9 rounded-full px-5 text-[13px] transition-colors",
                  inputs.useMortgage === opt.value ? "bg-[#2B2520] text-[#F4EFEA]" : "text-[#2B2520]/65 hover:text-[#2B2520]"
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

        <div className="border-y border-[#C5BAAB]/40">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="flex w-full items-center justify-between py-4 text-left font-display text-[20px] font-normal text-[#2B2520]"
            aria-expanded={showAdvanced}
          >
            Detailed assumptions
            <ChevronDown className={cn("h-4 w-4 text-[#8C6A47] transition-transform", showAdvanced && "rotate-180")} strokeWidth={1.5} />
          </button>
          {showAdvanced && (
            <div className="space-y-7 border-t border-[#C5BAAB]/40 py-6">
              <div>
                <p className={subLabelClass}>Purchase costs</p>
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
                <p className={subLabelClass}>Running costs</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <NumberField label="Vacancy" suffix="%" value={inputs.vacancyPct} onChange={set("vacancyPct")} min={0} max={100} />
                  <NumberField label="Maintenance" suffix="% rent" value={inputs.maintenancePct} onChange={set("maintenancePct")} min={0} max={100} />
                  <NumberField label="Management" suffix="% rent" value={inputs.managementPct} onChange={set("managementPct")} min={0} max={100} />
                </div>
              </div>
              <div>
                <p className={subLabelClass}>Growth &amp; exit</p>
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
        <div className={cn("rounded-[4px] bg-[#2B2520] p-6 text-[#F4EFEA] lg:p-8", !compact && "lg:sticky lg:top-28")}>
          <p className="eyebrow text-[#E2A862]">Your estimated returns</p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
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

          <div className="mt-8 space-y-6 border-t border-[#F4EFEA]/15 pt-6 text-[13px]">
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
          <p className="mt-6 flex gap-2 text-[11px] leading-relaxed text-[#F4EFEA]/50">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
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

const subLabelClass = "mb-4 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2B2520]/55";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
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
      <label htmlFor={id} className="mb-1 block text-[12px] text-[#2B2520]/60">
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
            "h-11 w-full border-0 border-b border-[#C5BAAB]/60 bg-transparent pl-0 text-[15px] tabular-nums text-[#2B2520] transition-colors focus:border-[#E2A862] focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            suffix ? "pr-20" : "pr-0"
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-label text-[10px] uppercase tracking-[0.12em] text-[#A39886]">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-[11px] leading-snug text-[#2B2520]/50">{hint}</p>}
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
    <div className="border-t border-[#F4EFEA]/15 pt-4">
      <p className="font-label text-[10px] uppercase tracking-[0.16em] text-[#F4EFEA]/55">{label}</p>
      <p
        className={cn(
          "mt-2 font-display text-[clamp(26px,2.4vw,32px)] font-normal leading-none tabular-nums",
          tone === "negative" ? "text-red-300" : "text-[#F4EFEA]"
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1.5 text-[11px] text-[#E2A862]">{sub}</p>}
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
      <p className="mb-2 font-display text-[16px] italic text-[#E2A862]">{title}</p>
      <dl className="space-y-1.5">
        {rows.map(([label, v]) => (
          <div key={label} className="flex justify-between gap-4 text-[#F4EFEA]/65">
            <dt>{label}</dt>
            <dd className="tabular-nums">{aed(v)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 border-t border-[#F4EFEA]/15 pt-1.5 text-[#F4EFEA]">
          <dt>{totalLabel}</dt>
          <dd className={cn("tabular-nums", total < 0 && "text-red-300")}>{aed(total)}</dd>
        </div>
      </dl>
    </div>
  );
}

function YearTable({ years }: { years: ReturnType<typeof calculateRoi>["years"] }) {
  return (
    <div className="mt-6 border-t border-[#C5BAAB]/40 pt-10">
      <p className="eyebrow mb-3">Projection</p>
      <h3 className="mb-8 font-display text-[28px] font-normal leading-tight text-[#2B2520]">Year by year</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#C5BAAB]/60 text-left">
              {["Year", "Property value", "Annual rent", "Cash flow", "Cumulative cash flow", "Loan balance", "Equity"].map(
                (h, i) => (
                  <th key={h} className={cn("whitespace-nowrap py-3 pr-6 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2B2520]/55", i === 0 && "pl-0")}>
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5BAAB]/40 text-[#2B2520]/80">
            {years.map((y) => (
              <tr key={y.year} className="tabular-nums">
                <td className="py-3 pr-6 font-display text-[16px] text-[#2B2520]">{y.year}</td>
                <td className="whitespace-nowrap py-3 pr-6">{aed(y.propertyValue)}</td>
                <td className="whitespace-nowrap py-3 pr-6">{aed(y.rent)}</td>
                <td className={cn("whitespace-nowrap py-3 pr-6", y.cashFlow < 0 && "text-red-700")}>{aed(y.cashFlow)}</td>
                <td className={cn("whitespace-nowrap py-3 pr-6", y.cumulativeCashFlow < 0 && "text-red-700")}>
                  {aed(y.cumulativeCashFlow)}
                </td>
                <td className="whitespace-nowrap py-3 pr-6">{aed(y.loanBalance)}</td>
                <td className="whitespace-nowrap py-3 pr-0 text-[#2B2520]">{aed(y.equity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
