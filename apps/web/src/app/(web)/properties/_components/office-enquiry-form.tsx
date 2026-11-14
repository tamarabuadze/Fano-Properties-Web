"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/actions/inquiry";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/analytics";

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(50),
  lastName: z.string().trim().min(1, "Required").max(50),
  email: z.string().trim().email("Invalid email"),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter your mobile number, with country code if outside the UAE"),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full h-11 rounded-none !border-0 !border-b !border-lx-line !bg-transparent px-0 text-[14px] text-lx-text placeholder:text-lx-muted focus:!border-lx-gold focus:outline-none focus:ring-0 transition-colors";

/** Short enquiry card at the top of the commercial listings, so ad visitors can ask without scrolling */
export function OfficeEnquiryForm({ lease = false }: { lease?: boolean }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const message = lease
      ? "I'm looking for an office to lease in Dubai. Please send me the available options."
      : "I'm looking for an office to buy in Dubai. Please send me the available options and prices.";
    const result = await submitInquiry({
      ...data,
      message,
      type: "general",
      page: window.location.pathname + window.location.search,
      attribution: getAttribution(),
    });
    if (result.success) {
      trackLead("office_enquiry", { listing_type: lease ? "lease" : "sale" });
      toast.success("Thank you. An advisor will call you shortly.");
      reset();
    } else {
      toast.error(result.error ?? "Something went wrong. Please WhatsApp us instead.");
    }
  }

  return (
    <div className="rounded-[4px] border border-lx-line bg-lx-surface p-6">
      <p className="lx-eyebrow mb-3">Enquire</p>
      <h2 className="mb-5 font-display text-[22px] font-normal leading-tight text-lx-text">
        Get the office shortlist
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <input {...register("firstName")} placeholder="First name" aria-label="First name" autoComplete="given-name" className={inputCls} />
            {errors.firstName && <p className="mt-1 text-xs text-[#E08A7E]">{errors.firstName.message}</p>}
          </div>
          <div>
            <input {...register("lastName")} placeholder="Last name" aria-label="Last name" autoComplete="family-name" className={inputCls} />
            {errors.lastName && <p className="mt-1 text-xs text-[#E08A7E]">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <input {...register("phone")} type="tel" inputMode="tel" placeholder="Mobile number (with country code)" aria-label="Mobile number" autoComplete="tel" className={inputCls} />
          {errors.phone && <p className="mt-1 text-xs text-[#E08A7E]">{errors.phone.message}</p>}
        </div>
        <div>
          <input {...register("email")} type="email" placeholder="Email address" aria-label="Email address" autoComplete="email" className={inputCls} />
          {errors.email && <p className="mt-1 text-xs text-[#E08A7E]">{errors.email.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? "Sending…" : "Request a call back"}
        </button>
        <p className="text-center text-[12px] text-lx-text/50">No commitment. We typically respond within 2 hours.</p>
      </form>
    </div>
  );
}
