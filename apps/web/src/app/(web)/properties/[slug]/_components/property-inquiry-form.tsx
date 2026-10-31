"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/actions/inquiry";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

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
    const result = await submitInquiry({ ...data, propertyId, type: "property" });
    if (result.success) {
      toast.success("Inquiry sent! We'll be in touch shortly.");
      reset();
    } else {
      toast.error(result.error ?? "Something went wrong.");
    }
  }

  return (
    <div className="rounded-2xl border border-border p-6 bg-white">
      <h3 className="font-semibold text-[#1a1410] text-lg mb-5">Request Information</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              {...register("firstName")}
              placeholder="First name"
              className="w-full h-11 px-3.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 transition-all hover:border-zinc-300"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("lastName")}
              placeholder="Last name"
              className="w-full h-11 px-3.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 transition-all hover:border-zinc-300"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="w-full h-11 px-3.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 transition-all hover:border-zinc-300"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone (optional)"
            className="w-full h-11 px-3.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 transition-all hover:border-zinc-300"
          />
        </div>

        <div>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Your message"
            className="w-full px-3.5 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 resize-none transition-all hover:border-zinc-300"
          />
          {errors.message && (
            <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-[#1a1410] text-white font-medium text-sm hover:bg-[#2a2118] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending…" : "Send Inquiry"}
        </button>

        <p className="text-xs text-zinc-400 text-center">
          No commitment required. We typically respond within 2 hours.
        </p>
      </form>
    </div>
  );
}
