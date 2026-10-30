"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { formatPrice } from "@fano/utils";
import { submitInquiry } from "@/lib/actions/inquiry";
import type { RoiInputs, RoiResult } from "@/lib/roi";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface RoiLeadFormProps {
  inputs: RoiInputs;
  result: RoiResult;
  propertyId?: string;
  propertyTitle?: string;
}

const aed = (v: number) => formatPrice(Math.round(v));
const pct = (v: number) => `${v.toFixed(1)}%`;

function summarise(inputs: RoiInputs, result: RoiResult, propertyTitle?: string) {
  return [
    `ROI calculator consultation request${propertyTitle ? ` for "${propertyTitle}"` : ""}.`,
    "",
    `Purchase price: ${aed(inputs.price)} (${inputs.sizeSqft} sq ft)`,
    inputs.useMortgage
      ? `Financing: mortgage, ${inputs.downPaymentPct}% down, ${inputs.interestRatePct}% over ${inputs.loanTermYears} yrs`
      : "Financing: cash",
    `Annual rent: ${aed(inputs.annualRent)}, service charges AED ${inputs.serviceChargePerSqft}/sq ft`,
    `Cash needed upfront: ${aed(result.cashInvested)}`,
    `Net yield: ${pct(result.netYieldPct)}, cash-on-cash: ${pct(result.cashOnCashPct)}`,
    `Monthly cash flow: ${aed(result.monthlyCashFlow)}`,
    `${inputs.holdYears}-year total ROI: ${pct(result.totalRoiPct)} (${pct(result.annualisedRoiPct)}/yr)`,
  ].join("\n");
}

export function RoiLeadForm({ inputs, result, propertyId, propertyTitle }: RoiLeadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await submitInquiry({
      ...data,
      message: summarise(inputs, result, propertyTitle),
      propertyId,
      type: propertyId ? "property" : "general",
    });
    if (res.success) {
      toast.success("Thanks! An advisor will contact you about these numbers shortly.");
      reset();
    } else {
      toast.error(res.error ?? "Something went wrong.");
    }
  }

  const inputCls =
    "w-full h-11 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 transition-all hover:border-zinc-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border p-6 space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-[#1a1410]">Talk these numbers through with an advisor</h3>
        <p className="text-xs text-zinc-500 mt-1">
          We&apos;ll send your figures to a Fano investment advisor, who will get back to you.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register("firstName")} placeholder="First name" aria-label="First name" className={inputCls} />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" aria-label="Last name" className={inputCls} />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="Email address" aria-label="Email address" className={inputCls} />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>
      <input {...register("phone")} type="tel" placeholder="Phone (optional)" aria-label="Phone" className={inputCls} />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 rounded-xl bg-[#9a7957] text-white text-sm font-medium hover:bg-[#7e6244] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Request a free consultation"}
      </button>
    </form>
  );
}
