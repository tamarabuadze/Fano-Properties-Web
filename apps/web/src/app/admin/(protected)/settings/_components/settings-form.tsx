"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { saveSettings } from "../_actions";

const schema = z.object({
  siteName: z.string().min(1, "Required"),
  siteTagline: z.string().optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  facebookUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  footerText: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface SettingsFormProps {
  defaultValues: Partial<FormData>;
}

const inputCls =
  "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300";
const labelCls =
  "block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider";

export function SettingsForm({ defaultValues }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      siteName: "Fano Real Estate",
      siteTagline: "Find Your Dream Home",
      ...defaultValues,
    },
  });

  async function onSubmit(data: FormData) {
    const result = await saveSettings(data);
    if (result.success) {
      toast.success("Settings saved");
    } else {
      toast.error((result as { error?: string }).error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Site Info */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Site Information</h2>

        <div>
          <label className={labelCls}>Site Name</label>
          <input {...register("siteName")} className={inputCls} placeholder="Fano Real Estate" />
          {errors.siteName && (
            <p className="text-xs text-red-500 mt-1">{errors.siteName.message}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Tagline</label>
          <input
            {...register("siteTagline")}
            className={inputCls}
            placeholder="Find Your Dream Home"
          />
        </div>

        <div>
          <label className={labelCls}>Footer Text</label>
          <input
            {...register("footerText")}
            className={inputCls}
            placeholder="© 2025 Fano Real Estate. All rights reserved."
          />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Contact Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Email</label>
            <input
              {...register("contactEmail")}
              type="email"
              className={inputCls}
              placeholder="hello@fano.com"
            />
            {errors.contactEmail && (
              <p className="text-xs text-red-500 mt-1">{errors.contactEmail.message}</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input
              {...register("contactPhone")}
              className={inputCls}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Office Address</label>
          <textarea
            {...register("contactAddress")}
            rows={2}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300 resize-none"
            placeholder="123 Main Street, Suite 100, New York, NY 10001"
          />
        </div>
      </section>

      {/* Social */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Social Media</h2>

        {[
          { name: "facebookUrl" as const, label: "Facebook URL", placeholder: "https://facebook.com/…" },
          { name: "instagramUrl" as const, label: "Instagram URL", placeholder: "https://instagram.com/…" },
          { name: "twitterUrl" as const, label: "Twitter / X URL", placeholder: "https://twitter.com/…" },
          { name: "linkedinUrl" as const, label: "LinkedIn URL", placeholder: "https://linkedin.com/company/…" },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className={labelCls}>{label}</label>
            <input {...register(name)} type="text" className={inputCls} placeholder={placeholder} />
            {errors[name] && (
              <p className="text-xs text-red-500 mt-1">{errors[name]?.message}</p>
            )}
          </div>
        ))}
      </section>

      <div>
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
