"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProperty, updateProperty } from "../_actions";

const schema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  propertyType: z.enum(["apartment", "villa", "house", "commercial", "land", "penthouse", "townhouse"]),
  listingType: z.enum(["sale", "rent", "lease"]),
  status: z.enum(["available", "sold", "rented", "off_market"]),
  price: z.number({ coerce: true }).positive("Must be positive"),
  currency: z.string(),
  location: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().optional(),
  country: z.string(),
  bedrooms: z.number({ coerce: true }).int().min(0),
  bathrooms: z.number({ coerce: true }).int().min(0),
  sqft: z.number({ coerce: true }).int().min(0),
  coverImage: z.string().url("Must be a valid URL"),
  featured: z.boolean(),
  published: z.boolean(),
  agentId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Agent { id: string; firstName: string; lastName: string; }

interface PropertyFormProps {
  agents: Agent[];
  defaultValues?: Partial<FormData>;
  propertyId?: string;
}

const inputCls = "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300";
const selectCls = inputCls + " appearance-none";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider";

export function PropertyForm({ agents, defaultValues, propertyId }: PropertyFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: "USD",
      status: "available",
      listingType: "sale",
      propertyType: "apartment",
      country: "US",
      bedrooms: 0,
      bathrooms: 0,
      sqft: 0,
      featured: false,
      published: false,
      ...defaultValues,
    },
  });

  async function onSubmit(data: FormData) {
    const result = propertyId
      ? await updateProperty(propertyId, data)
      : await createProperty({ ...data, amenities: [] });

    if (result.success) {
      toast.success(propertyId ? "Property updated" : "Property created");
      router.push("/properties");
    } else {
      toast.error((result as { error?: string }).error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Basic Information</h2>

        <div>
          <label className={labelCls}>Title</label>
          <input {...register("title")} className={inputCls} placeholder="e.g. Modern Downtown Apartment" />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300 resize-none"
            placeholder="Detailed description of the property…"
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Property Type</label>
            <select {...register("propertyType")} className={selectCls}>
              {["apartment", "villa", "house", "commercial", "land", "penthouse", "townhouse"].map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Listing Type</label>
            <select {...register("listingType")} className={selectCls}>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="lease">For Lease</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Status</label>
            <select {...register("status")} className={selectCls}>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="off_market">Off Market</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Assigned Agent</label>
            <select {...register("agentId")} className={selectCls}>
              <option value="">— None —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Pricing & Details */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Pricing & Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Price</label>
            <input {...register("price")} type="number" className={inputCls} placeholder="0" />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Currency</label>
            <select {...register("currency")} className={selectCls}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Bedrooms</label>
            <input {...register("bedrooms")} type="number" min="0" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Bathrooms</label>
            <input {...register("bathrooms")} type="number" min="0" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Square Feet</label>
            <input {...register("sqft")} type="number" min="0" className={inputCls} />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Location</h2>
        <div>
          <label className={labelCls}>Address / Neighborhood</label>
          <input {...register("location")} className={inputCls} placeholder="e.g. 123 Main St, Downtown" />
          {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>City</label>
            <input {...register("city")} className={inputCls} />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className={labelCls}>State</label>
            <input {...register("state")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Country</label>
            <input {...register("country")} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Media</h2>
        <div>
          <label className={labelCls}>Cover Image URL</label>
          <input {...register("coverImage")} type="url" className={inputCls} placeholder="https://…" />
          {errors.coverImage && <p className="text-xs text-red-500 mt-1">{errors.coverImage.message}</p>}
        </div>
      </section>

      {/* Publish Settings */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Publish Settings</h2>
        {[
          { name: "published" as const, label: "Published", description: "Make visible on the website" },
          { name: "featured" as const, label: "Featured", description: "Highlight on homepage" },
        ].map(({ name, label, description }) => (
          <div key={name} className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <input {...register(name)} type="checkbox" className="h-4 w-4 rounded" />
          </div>
        ))}
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : propertyId ? "Update Property" : "Create Property"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/properties")}
          className="h-11 px-6 rounded-xl border border-border text-muted-foreground font-medium text-sm hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
