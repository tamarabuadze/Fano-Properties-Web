"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaUpload } from "@fano/ui";
import { COMMERCIAL_STATUSES, COMMERCIAL_UNIT_TYPES, PROPERTY_STATUS_LABELS, RESIDENTIAL_STATUSES, cn } from "@fano/utils";
import { reportInvalid } from "@/lib/admin-form";
import { createProperty, updateProperty } from "../_actions";

// Numbers arrive as text; accept "1,200" and "1,200.00" rather than failing silently
const money = z.preprocess(
  (v) => (typeof v === "string" ? Number(v.replace(/[,\s]/g, "")) : v),
  z.number({ invalid_type_error: "Enter a number" }).positive("Must be positive")
);
const count = z.preprocess(
  (v) => (typeof v === "string" ? Math.round(Number(v.replace(/[,\s]/g, "")) || 0) : v),
  z.number({ invalid_type_error: "Enter a number" }).int().min(0, "Cannot be negative")
);

const schema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  propertyType: z.enum(["apartment", "villa", "house", "commercial", "land", "penthouse", "townhouse"]),
  listingType: z.enum(["sale", "rent", "lease"]),
  status: z.enum(["available", "sold", "rented", "off_market", "off_payment_plan"]),
  price: money,
  priceUnit: z.enum(["total", "per_sqft"]),
  currency: z.literal("AED"),
  location: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().optional(),
  country: z.string(),
  unitType: z.enum(["shop", "warehouse", "office_floor", "office_space"]).nullable().optional(),
  bedrooms: count,
  bathrooms: count,
  sqft: count,
  coverImage: z.string().trim().min(1, "Upload a cover image or paste an image link"),
  featured: z.boolean(),
  published: z.boolean(),
  agentId: z.string().optional(),
  metaTitle: z.string().optional(),
  permitNumber: z.string().trim().max(40, "At most 40 characters").optional(),
  metaDescription: z.string().optional(),
}).refine((d) => d.propertyType !== "commercial" || !!d.unitType, {
  message: "Choose a unit type",
  path: ["unitType"],
});

type FormData = z.infer<typeof schema>;

interface Agent { id: string; firstName: string; lastName: string | null; }

interface PropertyFormProps {
  agents: Agent[];
  defaultValues?: Partial<FormData>;
  propertyId?: string;
  defaultGallery?: string[];
  /** False until file storage is set up on the server: shows a warning, links still work */
  uploadsEnabled?: boolean;
}

const inputCls = "w-full h-10 px-3.5 rounded-[3px] border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A862]/25 focus:border-[#E2A862] transition-all hover:border-[#C5BAAB]";
const selectCls = inputCls + " appearance-none";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider";

export function PropertyForm({ agents, defaultValues, propertyId, defaultGallery = [], uploadsEnabled = true }: PropertyFormProps) {
  const router = useRouter();
  const [gallery, setGallery] = useState<string[]>(defaultGallery);
  const [galleryLink, setGalleryLink] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: "AED",
      priceUnit: "per_sqft",
      status: "available",
      listingType: "sale",
      propertyType: "apartment",
      country: "AE",
      coverImage: "",
      bedrooms: 0,
      bathrooms: 0,
      sqft: 0,
      featured: false,
      published: false,
      ...defaultValues,
    },
  });

  const isCommercial = watch("propertyType") === "commercial";
  const coverImage = watch("coverImage");
  const statuses = isCommercial ? COMMERCIAL_STATUSES : RESIDENTIAL_STATUSES;

  // A status that doesn't exist in the chosen category falls back to Available
  useEffect(() => {
    if (!(statuses as readonly string[]).includes(getValues("status"))) setValue("status", "available");
  }, [statuses, getValues, setValue]);

  // Commercial listings are for sale or lease only
  useEffect(() => {
    if (isCommercial && getValues("listingType") === "rent") setValue("listingType", "lease");
  }, [isCommercial, getValues, setValue]);

  async function onSubmit(data: FormData) {
    try {
      const result = propertyId
        ? await updateProperty(propertyId, { ...data, gallery })
        : await createProperty({ ...data, gallery, amenities: [] });

      if (result.success) {
        toast.success(propertyId ? "Property updated" : "Property created");
        router.push("/admin/properties");
      } else {
        toast.error((result as { error?: string }).error ?? "Something went wrong");
      }
    } catch (e) {
      // A dropped connection or a server crash rejects the action instead of returning
      console.error("[property-form] save failed", e);
      toast.error("Could not reach the server. Check your connection and try again.");
    }
  }

  const onInvalid = reportInvalid({
    location: "Address", sqft: "Square feet", unitType: "Unit type", permitNumber: "DLD permit number",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-8">
      {/* Basic Info */}
      <section className="bg-card rounded-[4px] border border-border p-6 space-y-5">
        <h2 className="font-display text-xl font-normal text-foreground">Basic Information</h2>

        <div>
          <label className={labelCls}>Category</label>
          <div className="inline-flex rounded-full border border-border p-1 bg-secondary/40">
            {[
              { label: "Residential", commercial: false },
              { label: "Commercial", commercial: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setValue("propertyType", opt.commercial ? "commercial" : "apartment", { shouldDirty: true })}
                className={cn(
                  "px-5 h-9 rounded-full text-sm font-medium transition-colors",
                  isCommercial === opt.commercial ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Title</label>
          <input {...register("title")} className={inputCls} placeholder="e.g. Modern Downtown Apartment" />
          {errors.title && <p className="text-xs text-[#B0453A] mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-3.5 py-3 rounded-[3px] border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A862]/25 focus:border-[#E2A862] transition-all hover:border-[#C5BAAB] resize-none"
            placeholder="Detailed description of the property…"
          />
          {errors.description && <p className="text-xs text-[#B0453A] mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!isCommercial && (
            <div>
              <label className={labelCls}>Property Type</label>
              <select {...register("propertyType")} className={selectCls}>
                {["apartment", "villa", "house", "land", "penthouse", "townhouse"].map((t) => (
                  <option key={t} value={t} className="capitalize">{t}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className={labelCls}>Listing Type</label>
            <select {...register("listingType")} className={selectCls}>
              <option value="sale">For Sale</option>
              {!isCommercial && <option value="rent">For Rent</option>}
              <option value="lease">For Lease</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Status</label>
            <select {...register("status")} className={selectCls}>
              {statuses.map((s) => (
                <option key={s} value={s}>{PROPERTY_STATUS_LABELS[s]}</option>
              ))}
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
      <section className="bg-card rounded-[4px] border border-border p-6 space-y-5">
        <h2 className="font-display text-xl font-normal text-foreground">Pricing & Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{watch("priceUnit") === "per_sqft" ? "Price per sq ft" : "Price"}</label>
            <input {...register("price")} type="number" step="any" min="0" inputMode="decimal" className={inputCls} placeholder="0" />
            {errors.price && <p className="text-xs text-[#B0453A] mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Currency</label>
            <select {...register("currency")} className={selectCls}>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Price Basis</label>
            <select {...register("priceUnit")} className={selectCls}>
              <option value="per_sqft">Per sq ft</option>
              <option value="total">Total price</option>
            </select>
          </div>
        </div>

        {isCommercial && (
          <div>
            <label className={labelCls}>Unit Type</label>
            <select {...register("unitType", { setValueAs: (v) => v || null })} className={selectCls}>
              <option value="">Select unit type…</option>
              {COMMERCIAL_UNIT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {errors.unitType && <p className="text-xs text-[#B0453A] mt-1">{errors.unitType.message}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {!isCommercial && (
            <>
              <div>
                <label className={labelCls}>Bedrooms</label>
                <input {...register("bedrooms")} type="number" min="0" step="1" className={inputCls} />
                {errors.bedrooms && <p className="text-xs text-[#B0453A] mt-1">{errors.bedrooms.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Bathrooms</label>
                <input {...register("bathrooms")} type="number" min="0" step="1" className={inputCls} />
                {errors.bathrooms && <p className="text-xs text-[#B0453A] mt-1">{errors.bathrooms.message}</p>}
              </div>
            </>
          )}
          <div>
            <label className={labelCls}>Square Feet</label>
            <input {...register("sqft")} type="number" min="0" step="1" className={inputCls} />
            {errors.sqft && <p className="text-xs text-[#B0453A] mt-1">{errors.sqft.message}</p>}
          </div>
          <div>
            <label className={labelCls}>DLD Permit No. (Trakheesi)</label>
            <input {...register("permitNumber")} className={inputCls} placeholder="Required before advertising in Dubai" />
            {errors.permitNumber && <p className="text-xs text-[#B0453A] mt-1">{errors.permitNumber.message}</p>}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-card rounded-[4px] border border-border p-6 space-y-5">
        <h2 className="font-display text-xl font-normal text-foreground">Location</h2>
        <div>
          <label className={labelCls}>Address / Neighborhood</label>
          <input {...register("location")} className={inputCls} placeholder="e.g. 123 Main St, Downtown" />
          {errors.location && <p className="text-xs text-[#B0453A] mt-1">{errors.location.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>City</label>
            <input {...register("city")} className={inputCls} />
            {errors.city && <p className="text-xs text-[#B0453A] mt-1">{errors.city.message}</p>}
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

      {/* Media: files first; a link is the fallback, never the only option */}
      <section className="bg-card rounded-[4px] border border-border p-6 space-y-5">
        <h2 className="font-display text-xl font-normal text-foreground">Media</h2>
        {!uploadsEnabled && (
          <p className="rounded-[4px] border border-[#EFD3AE] bg-[#F6E7D2] px-3.5 py-2.5 text-xs text-[#6B5038]">
            File storage isn&apos;t configured on this server yet (attach a Railway Volume or set the Supabase keys).
            Uploads will fail until then — paste image links as a workaround.
          </p>
        )}

        <div>
          <label className={labelCls}>Cover Image</label>
          <MediaUpload
            uploadUrl="/api/admin/upload"
            single
            value={coverImage ? [coverImage] : []}
            onChange={(urls) => setValue("coverImage", urls[0] ?? "", { shouldDirty: true, shouldValidate: true })}
            hint="JPG, JPEG, PNG or WEBP, up to 10 MB"
          />
          <details className="mt-2 group">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">Or paste an image link</summary>
            <input
              {...register("coverImage")}
              type="url"
              className={cn(inputCls, "mt-2")}
              placeholder="https://…/photo.jpg"
            />
          </details>
          {errors.coverImage && <p className="text-xs text-[#B0453A] mt-1">{errors.coverImage.message}</p>}
        </div>

        <div>
          <label className={labelCls}>Gallery Photos &amp; Videos</label>
          <MediaUpload
            uploadUrl="/api/admin/upload"
            allowVideo
            value={gallery}
            onChange={setGallery}
            hint="JPG, JPEG, PNG or WEBP up to 10 MB · MP4 video up to 50 MB"
          />
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">Or add a photo / video link</summary>
            <div className="mt-2 flex gap-2">
              <input
                type="url"
                value={galleryLink}
                onChange={(e) => setGalleryLink(e.target.value)}
                className={inputCls}
                placeholder="https://…/photo.jpg or …/tour.mp4"
              />
              <button
                type="button"
                onClick={() => {
                  const url = galleryLink.trim();
                  if (!url) return;
                  setGallery((g) => (g.includes(url) ? g : [...g, url]));
                  setGalleryLink("");
                }}
                className="h-10 shrink-0 rounded-full border border-border px-4 text-sm font-medium text-foreground hover:bg-secondary/60"
              >
                Add
              </button>
            </div>
          </details>
        </div>
      </section>

      {/* Publish Settings */}
      <section className="bg-card rounded-[4px] border border-border p-6 space-y-4">
        <h2 className="font-display text-xl font-normal text-foreground">Publish Settings</h2>
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
          className="btn-gold disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : propertyId ? "Update Property" : "Create Property"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="btn-gold-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
