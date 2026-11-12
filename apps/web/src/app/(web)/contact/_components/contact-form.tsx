"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/actions/inquiry";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/analytics";

const TOPICS = ["Buy", "Sell", "Rent", "Lease", "List my property", "Other"];

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
  topic: z.string().optional(),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

// Hairline-underlined fields with floating-free placeholders, a "How can we help?"
// choice as outline pills, and an espresso pill to send
const inputCls =
  "w-full h-12 border-0 border-b border-[#C5BAAB]/60 bg-transparent px-0 text-[15px] text-[#2B2520] placeholder:text-[#A39886] focus:border-[#E2A862] focus:outline-none focus:ring-0 transition-colors";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit({ topic, ...data }: FormData) {
    const result = await submitInquiry({
      ...data,
      message: topic ? `[${topic}] ${data.message}` : data.message,
      type: "general",
      page: window.location.pathname,
      attribution: getAttribution(),
    });
    if (result.success) {
      trackLead("contact");
      toast.success("Message sent! We'll be in touch shortly.");
      reset();
    } else {
      toast.error(result.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <fieldset>
        <legend className="eyebrow mb-5">How can we help?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" value={t} {...register("topic")} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-full border border-[#C5BAAB]/70 px-5 text-[13px] text-[#2B2520]/70 transition-colors hover:border-[#2B2520] hover:text-[#2B2520] peer-checked:border-[#2B2520] peer-checked:bg-[#2B2520] peer-checked:text-[#F4EFEA] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E2A862]/60">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-6">
        <p className="eyebrow">Your details</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <input {...register("firstName")} placeholder="First name" aria-label="First name" className={inputCls} />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <input {...register("lastName")} placeholder="Last name" aria-label="Last name" className={inputCls} />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <input {...register("email")} type="email" placeholder="Email address" aria-label="Email address" className={inputCls} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register("phone")} type="tel" inputMode="tel" placeholder="Mobile number (with country code)" aria-label="Mobile number" className={inputCls} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Tell us how we can help…"
            aria-label="Message"
            className="w-full resize-none border-0 border-b border-[#C5BAAB]/60 bg-transparent px-0 py-3 text-[15px] leading-relaxed text-[#2B2520] placeholder:text-[#A39886] focus:border-[#E2A862] focus:outline-none focus:ring-0 transition-colors"
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-pill min-w-[180px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-[12px] text-[#2B2520]/50">We typically respond within 2 hours.</p>
      </div>
    </form>
  );
}
