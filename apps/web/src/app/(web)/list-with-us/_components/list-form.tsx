"use client";

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
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => { const d = v.replace(/\D/g, ""); return d.length >= 7 && d.length <= 15; },
      "Enter your mobile number, with country code if outside the UAE"
    ),
  propertyType: z.string().min(1, "Select a property type"),
  projectName: z.string().min(1, "Enter the building or project name"),
  area: z.string().min(1, "Enter the area or community"),
  bedrooms: z.string().min(1, "Select bedrooms"),
  sizeSqft: z.string().optional(),
  askingPrice: z.string().optional(),
  propertyStatus: z.string().min(1, "Select a status"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full h-11 rounded-none !border-0 !border-b !border-lx-line !bg-transparent px-0 text-[14px] text-lx-text placeholder:text-lx-muted focus:!border-lx-gold focus:outline-none focus:ring-0 transition-colors";

const selectCls =
  "w-full h-11 rounded-none !border-0 !border-b !border-lx-line !bg-transparent px-0 text-[14px] text-lx-text focus:!border-lx-gold focus:outline-none focus:ring-0 transition-colors appearance-none cursor-pointer";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-[#E08A7E]">{msg}</p>;
}

export function ListForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const details = [
      `Property Type: ${data.propertyType}`,
      `Project / Building: ${data.projectName}`,
      `Area / Community: ${data.area}`,
      `Bedrooms: ${data.bedrooms}`,
      data.sizeSqft ? `Size: ${data.sizeSqft} sq ft` : null,
      data.askingPrice ? `Asking Price: AED ${data.askingPrice}` : null,
      `Status: ${data.propertyStatus}`,
      data.notes ? `Additional notes: ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitInquiry({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: `Listing submission\n\n${details}`,
      type: "general",
      page: window.location.pathname,
      attribution: getAttribution(),
    });

    if (result.success) {
      trackLead("listing_submission", { property_type: data.propertyType });
      toast.success("Submission received. We'll be in touch within 24 hours.");
      reset();
    } else {
      toast.error(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Owner name */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <input {...register("firstName")} placeholder="First name" aria-label="First name" className={inputCls} />
          <FieldError msg={errors.firstName?.message} />
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" aria-label="Last name" className={inputCls} />
          <FieldError msg={errors.lastName?.message} />
        </div>
      </div>

      {/* Contact */}
      <div>
        <input {...register("email")} type="email" placeholder="Email address" aria-label="Email address" className={inputCls} />
        <FieldError msg={errors.email?.message} />
      </div>
      <div>
        <input {...register("phone")} type="tel" inputMode="tel" placeholder="Mobile number (with country code)" aria-label="Mobile number" className={inputCls} />
        <FieldError msg={errors.phone?.message} />
      </div>

      {/* Property details */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <select {...register("propertyType")} aria-label="Property type" className={selectCls} defaultValue="">
            <option value="" disabled>Property type</option>
            <option>Apartment</option>
            <option>Penthouse</option>
            <option>Villa</option>
            <option>Townhouse</option>
            <option>Office</option>
            <option>Retail</option>
            <option>Plot</option>
            <option>Other</option>
          </select>
          <FieldError msg={errors.propertyType?.message} />
        </div>
        <div>
          <select {...register("bedrooms")} aria-label="Bedrooms" className={selectCls} defaultValue="">
            <option value="" disabled>Bedrooms</option>
            <option value="Studio">Studio</option>
            <option value="1">1 BR</option>
            <option value="2">2 BR</option>
            <option value="3">3 BR</option>
            <option value="4">4 BR</option>
            <option value="5+">5 BR+</option>
            <option value="N/A">N/A (commercial)</option>
          </select>
          <FieldError msg={errors.bedrooms?.message} />
        </div>
      </div>

      <div>
        <input {...register("projectName")} placeholder="Building / project name" aria-label="Building or project name" className={inputCls} />
        <FieldError msg={errors.projectName?.message} />
      </div>
      <div>
        <input {...register("area")} placeholder="Area / community (e.g. Business Bay, Downtown)" aria-label="Area or community" className={inputCls} />
        <FieldError msg={errors.area?.message} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <input {...register("sizeSqft")} type="text" inputMode="numeric" placeholder="Size in sq ft (optional)" aria-label="Size in square feet" className={inputCls} />
          <FieldError msg={errors.sizeSqft?.message} />
        </div>
        <div>
          <input {...register("askingPrice")} type="text" inputMode="numeric" placeholder="Asking price in AED (optional)" aria-label="Asking price" className={inputCls} />
          <FieldError msg={errors.askingPrice?.message} />
        </div>
      </div>

      <div>
        <select {...register("propertyStatus")} aria-label="Property status" className={selectCls} defaultValue="">
          <option value="" disabled>Property status</option>
          <option value="Ready to move in">Ready to move in</option>
          <option value="Off-plan">Off-plan</option>
          <option value="Under construction">Under construction</option>
          <option value="Tenanted">Tenanted</option>
        </select>
        <FieldError msg={errors.propertyStatus?.message} />
      </div>

      <div>
        <textarea
          {...register("notes")}
          rows={3}
          placeholder="Anything else we should know? (optional)"
          aria-label="Additional notes"
          className="w-full resize-none rounded-none !border-0 !border-b !border-lx-line !bg-transparent px-0 py-2 text-[14px] leading-relaxed text-lx-text placeholder:text-lx-muted focus:!border-lx-gold focus:outline-none focus:ring-0 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : isSubmitSuccessful ? "Submitted" : "Submit your property"}
      </button>

      <p className="text-center text-[12px] text-lx-text/50">
        Every submission is reviewed by a senior advisor. We respond within 24 hours.
      </p>
    </form>
  );
}
