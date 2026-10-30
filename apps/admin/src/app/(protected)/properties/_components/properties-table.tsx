"use client";

import Link from "next/link";
import { Edit, Eye, Trash2, Star, Globe, EyeOff } from "lucide-react";
import { cn } from "@fano/utils";
import { toast } from "sonner";
import { deleteProperty, togglePropertyPublished, togglePropertyFeatured } from "../_actions";

interface Property {
  id: string;
  title: string;
  propertyType: string;
  listingType: string;
  price: number;
  currency: string;
  city: string;
  status: string;
  published: boolean;
  featured: boolean;
  agent?: { firstName: string; lastName: string } | null;
  createdAt: Date;
}

interface PropertiesTableProps {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

export function PropertiesTable({ properties, total, page, pageSize }: PropertiesTableProps) {
  async function handleDelete(id: string) {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    const result = await deleteProperty(id);
    if (result.success) toast.success("Property deleted");
    else toast.error(result.error ?? "Failed to delete");
  }

  async function handleTogglePublish(id: string, current: boolean) {
    const result = await togglePropertyPublished(id, !current);
    if (result.success) toast.success(current ? "Unpublished" : "Published");
    else toast.error(result.error ?? "Failed to update");
  }

  async function handleToggleFeatured(id: string, current: boolean) {
    const result = await togglePropertyFeatured(id, !current);
    if (result.success) toast.success(current ? "Removed from featured" : "Marked as featured");
    else toast.error(result.error ?? "Failed to update");
  }

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Property</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Price</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agent</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No properties found
                  </td>
                </tr>
              ) : (
                properties.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.city}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-muted-foreground">{p.propertyType}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: p.currency,
                        maximumFractionDigits: 0,
                      }).format(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          p.published
                            ? "bg-green-50 text-green-700"
                            : "bg-zinc-100 text-zinc-600"
                        )}>
                          {p.published ? "Live" : "Draft"}
                        </span>
                        {p.featured && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {p.agent ? `${p.agent.firstName} ${p.agent.lastName}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggleFeatured(p.id, p.featured)}
                          aria-label={p.featured ? "Unfeature" : "Feature"}
                          className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                            p.featured
                              ? "text-amber-500 hover:bg-amber-50"
                              : "text-muted-foreground hover:bg-secondary"
                          )}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTogglePublish(p.id, p.published)}
                          aria-label={p.published ? "Unpublish" : "Publish"}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                        >
                          {p.published ? <EyeOff className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                        </button>
                        <Link
                          href={`/properties/${p.id}`}
                          aria-label="Edit"
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          aria-label="Delete"
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {Math.ceil(total / pageSize) > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <p>Page {page} of {Math.ceil(total / pageSize)}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`?page=${page - 1}`} className="h-8 px-3 rounded-lg border border-border flex items-center hover:bg-secondary transition-colors">
                Previous
              </Link>
            )}
            {page < Math.ceil(total / pageSize) && (
              <Link href={`?page=${page + 1}`} className="h-8 px-3 rounded-lg border border-border flex items-center hover:bg-secondary transition-colors">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
