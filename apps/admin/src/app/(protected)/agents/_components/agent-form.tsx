"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAgent, updateAgent } from "../_actions";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  yearsExperience: z.number({ coerce: true }).int().min(0).optional(),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  active: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

interface AgentFormProps {
  defaultValues?: Partial<FormData>;
  agentId?: string;
}

const inputCls =
  "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300";
const labelCls =
  "block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider";

export function AgentForm({ defaultValues, agentId }: AgentFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      active: true,
      ...defaultValues,
    },
  });

  async function onSubmit(data: FormData) {
    const result = agentId
      ? await updateAgent(agentId, data)
      : await createAgent(data);

    if (result.success) {
      toast.success(agentId ? "Agent updated" : "Agent created");
      router.push("/agents");
    } else {
      toast.error((result as { error?: string }).error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Info */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Personal Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>First Name</label>
            <input {...register("firstName")} className={inputCls} placeholder="John" />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Last Name</label>
            <input {...register("lastName")} className={inputCls} placeholder="Smith" />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Email</label>
            <input
              {...register("email")}
              type="email"
              className={inputCls}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input {...register("phone")} className={inputCls} placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title / Role</label>
            <input
              {...register("title")}
              className={inputCls}
              placeholder="Senior Real Estate Agent"
            />
          </div>
          <div>
            <label className={labelCls}>Specialization</label>
            <input
              {...register("specialization")}
              className={inputCls}
              placeholder="Luxury Residences"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Bio</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300 resize-none"
            placeholder="A short biography about the agent…"
          />
        </div>
      </section>

      {/* Professional Details */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Professional Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>License Number</label>
            <input {...register("licenseNumber")} className={inputCls} placeholder="RE-12345" />
          </div>
          <div>
            <label className={labelCls}>Years of Experience</label>
            <input
              {...register("yearsExperience")}
              type="number"
              min="0"
              className={inputCls}
              placeholder="5"
            />
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Avatar</h2>
        <div>
          <label className={labelCls}>Avatar Image URL</label>
          <input
            {...register("avatar")}
            type="url"
            className={inputCls}
            placeholder="https://…"
          />
          {errors.avatar && (
            <p className="text-xs text-red-500 mt-1">{errors.avatar.message}</p>
          )}
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Social Links</h2>

        <div>
          <label className={labelCls}>LinkedIn URL</label>
          <input
            {...register("linkedinUrl")}
            type="url"
            className={inputCls}
            placeholder="https://linkedin.com/in/…"
          />
          {errors.linkedinUrl && (
            <p className="text-xs text-red-500 mt-1">{errors.linkedinUrl.message}</p>
          )}
        </div>
        <div>
          <label className={labelCls}>Instagram URL</label>
          <input
            {...register("instagramUrl")}
            type="url"
            className={inputCls}
            placeholder="https://instagram.com/…"
          />
          {errors.instagramUrl && (
            <p className="text-xs text-red-500 mt-1">{errors.instagramUrl.message}</p>
          )}
        </div>
        <div>
          <label className={labelCls}>Twitter / X URL</label>
          <input
            {...register("twitterUrl")}
            type="url"
            className={inputCls}
            placeholder="https://twitter.com/…"
          />
          {errors.twitterUrl && (
            <p className="text-xs text-red-500 mt-1">{errors.twitterUrl.message}</p>
          )}
        </div>
      </section>

      {/* Status */}
      <section className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Active</p>
            <p className="text-xs text-muted-foreground">Agent appears on the public website</p>
          </div>
          <input {...register("active")} type="checkbox" className="h-4 w-4 rounded" />
        </div>
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : agentId ? "Update Agent" : "Create Agent"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/agents")}
          className="h-11 px-6 rounded-xl border border-border text-muted-foreground font-medium text-sm hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
