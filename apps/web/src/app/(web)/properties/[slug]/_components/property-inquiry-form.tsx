"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/actions/inquiry";
import { getAttribution } from "@/lib/attribution";
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
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

// Hairline-underlined fields on a charcoal panel, closed by the glossy gold pill
const inputCls =
  "w-full h-11 rounded-none !border-0 !border-b !border-lx-line !bg-transparent px-0 text-[14px] text-lx-text placeholder:text-lx-muted focus:!border-lx-gold focus:outline-none focus:ring-0 transition-colors";

export function PropertyInquiryForm({ propertyId, propertyTitle }: PropertyInquiryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: `I am interested in "${propertyTitle}". Please contact me with more information.`,
    },
  });

  async function onSubmit(data: FormData) {
    const result = await submitInquiry({ ...data, propertyId, type: "property", page: window.location.pathname, attribution: getAttribution() });
    if (result.success) {
      trackLead("property_inquiry", { property_title: propertyTitle });
      toast.success("Inquiry sent! We'll be in touch shortly.");
      reset();
    } else {
      toast.error(result.error ?? "Something went wrong.");
    }
  }

  return (
    <div className="rounded-[4px] border border-lx-line bg-lx-surface p-6">
      <p className="lx-eyebrow mb-4">Enquire</p>
      <h3 className="mb-6 font-display text-[24px] font-normal leading-tight text-lx-text">Request information</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <input
              {...register("firstName")}
              placeholder="First name"
              aria-label="First name"
              className={inputCls}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-[#E08A7E]">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("lastName")}
              placeholder="Last name"
              aria-label="Last name"
              className={inputCls}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-[#E08A7E]">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className={inputCls}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#E08A7E]">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            type="tel"
            inputMode="tel"
            placeholder="Mobile number (with country code)"
            aria-label="Mobile number"
            className={inputCls}
          />
          {errors.phone && <p className="mt-1 text-xs text-[#E08A7E]">{errors.phone.message}</p>}
        </div>

        <div>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Your message"
            aria-label="Your message"
            className="w-full resize-none rounded-none !border-0 !border-b !border-lx-line !bg-transparent px-0 py-2 text-[14px] leading-relaxed text-lx-text placeholder:text-lx-muted focus:!border-lx-gold focus:outline-none focus:ring-0 transition-colors"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-[#E08A7E]">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send inquiry"}
        </button>

        <p className="text-center text-[12px] text-lx-text/50">
          No commitment required. We typically respond within 2 hours.
        </p>
      </form>
    </div>
  );
}
