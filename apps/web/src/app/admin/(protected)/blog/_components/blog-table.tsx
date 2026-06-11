"use client";

import Link from "next/link";
import { Edit, Trash2, Globe, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { deleteArticle, toggleArticlePublished } from "../_actions";

interface Article {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publishedAt?: Date | null;
  readTime?: number | null;
  category?: { name: string } | null;
  createdAt: Date;
}

export function BlogTable({ articles }: { articles: Article[] }) {
  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    const r = await deleteArticle(id);
    if (r.success) toast.success("Article deleted");
    else toast.error("Failed to delete");
  }

  async function handleToggle(id: string, current: boolean) {
    const r = await toggleArticlePublished(id, !current);
    if (r.success) toast.success(current ? "Unpublished" : "Published");
    else toast.error("Failed to update");
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {articles.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                No articles yet
              </td>
            </tr>
          ) : (
            articles.map((a) => (
              <tr key={a.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground line-clamp-1">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {a.category?.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    a.published ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-600"
                  }`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleToggle(a.id, a.published)}
                      aria-label={a.published ? "Unpublish" : "Publish"}
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      {a.published ? <EyeOff className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                    </button>
                    <Link href={`/blog/${a.id}`} aria-label="Edit" className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
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
  );
}
