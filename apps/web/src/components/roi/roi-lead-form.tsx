"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { formatPrice } from "@fano/utils";
import { submitInquiry } from "@/lib/actions/inquiry";
import { getAttribution } from "@/lib/attribution";
import type { RoiInputs, RoiResult } from "@/lib/roi";
import { trackLead } from "@/lib/analytics";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter your mobile number, with country code if outside the UAE"),
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

const inputCls =
  "w-full h-11 border-0 border-b border-[#C5BAAB]/60 bg-transparent px-0 text-[14px] text-[#2B2520] placeholder:text-[#A39886] focus:border-[#E2A862] focus:outline-none focus:ring-0 transition-colors";

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
      page: window.location.pathname,
      attribution: getAttribution(),
    });
    if (res.success) {
      trackLead("roi_lead");
      toast.success("Thanks! An advisor will contact you about these numbers shortly.");
      reset();
    } else {
      toast.error(res.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-[4px] bg-[#FBF8F4] p-6">
      <div>
        <p className="eyebrow mb-3">Speak to an advisor</p>
        <h3 className="font-display text-[22px] font-normal leading-tight text-[#2B2520]">Talk these numbers through</h3>
        <p className="mt-2 text-[13px] leading-[1.7] text-[#2B2520]/60">
          We&apos;ll send your figures to a Fano investment advisor, who will get back to you.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <input {...register("firstName")} placeholder="First name" aria-label="First name" className={inputCls} />
          {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" aria-label="Last name" className={inputCls} />
          {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="Email address" aria-label="Email address" className={inputCls} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register("phone")} type="tel" inputMode="tel" placeholder="Mobile number (with country code)" aria-label="Mobile number" className={inputCls} />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-pill w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Request a free consultation"}
      </button>
    </form>
  );
}
