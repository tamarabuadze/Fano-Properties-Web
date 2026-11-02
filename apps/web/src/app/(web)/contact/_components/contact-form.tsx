"use client";

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

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const result = await submitInquiry({ ...data, type: "general" });
    if (result.success) {
      toast.success("Message sent! We'll be in touch shortly.");
      reset();
    } else {
      toast.error(result.error ?? "Something went wrong.");
    }
  }

  const inputCls =
    "w-full h-12 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 transition-all hover:border-zinc-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register("firstName")} placeholder="First name" className={inputCls} />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" className={inputCls} />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <input {...register("email")} type="email" placeholder="Email address" className={inputCls} />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register("phone")} type="tel" placeholder="Phone (optional)" className={inputCls} />
      </div>

      <div>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us how we can help…"
          className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent placeholder:text-zinc-400 resize-none transition-all hover:border-zinc-300"
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-13 rounded-xl bg-[#1a1410] text-white font-medium hover:bg-[#2a2118] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
