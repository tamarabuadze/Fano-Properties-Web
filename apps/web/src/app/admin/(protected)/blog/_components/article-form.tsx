"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createArticle, updateArticle } from "../_actions";

const schema = z.object({
  title: z.string().min(1, "Required"),
  excerpt: z.string().min(1, "Required"),
  content: z.string().min(1, "Required"),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  published: z.boolean().default(false),
  readTime: z.number({ coerce: true }).int().min(1).optional(),
  categoryId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Category {
  id: string;
  name: string;
}

interface ArticleFormProps {
  categories: Category[];
  defaultValues?: Partial<FormData>;
  articleId?: string;
}

const inputCls =
  "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300";
const selectCls = inputCls + " appearance-none";
const labelCls =
  "block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider";

export function ArticleForm({ categories, defaultValues, articleId }: ArticleFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      published: false,
      ...defaultValues,
    },
  });

  async function onSubmit(data: FormData) {
    const result = articleId
      ? await updateArticle(articleId, data)
      : await createArticle(data);

    if (result.success) {
      toast.success(articleId ? "Article updated" : "Article created");
      router.push("/admin/blog");
    } else {
      toast.error((result as { error?: string }).error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Content */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Article Content</h2>

        <div>
          <label className={labelCls}>Title</label>
          <input
            {...register("title")}
            className={inputCls}
            placeholder="e.g. Top 10 Neighborhoods to Invest In"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Excerpt</label>
          <textarea
            {...register("excerpt")}
            rows={3}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300 resize-none"
            placeholder="A short summary displayed in article cards and previews…"
          />
          {errors.excerpt && (
            <p className="text-xs text-red-500 mt-1">{errors.excerpt.message}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Content</label>
          <textarea
            {...register("content")}
            rows={18}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300 resize-y"
            placeholder="Write your article content here. Markdown is supported."
          />
          {errors.content && (
            <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1.5">Markdown supported.</p>
        </div>
      </section>

      {/* Meta */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <select {...register("categoryId")} className={selectCls}>
              <option value="">— Uncategorized —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Read Time (minutes)</label>
            <input
              {...register("readTime")}
              type="number"
              min="1"
              className={inputCls}
              placeholder="5"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Cover Image URL</label>
          <input
            {...register("coverImage")}
            type="url"
            className={inputCls}
            placeholder="https://…"
          />
          {errors.coverImage && (
            <p className="text-xs text-red-500 mt-1">{errors.coverImage.message}</p>
          )}
        </div>
      </section>

      {/* SEO */}
      <section className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-semibold text-foreground">SEO</h2>

        <div>
          <label className={labelCls}>Meta Title</label>
          <input
            {...register("metaTitle")}
            className={inputCls}
            placeholder="Custom page title for search engines (optional)"
          />
        </div>
        <div>
          <label className={labelCls}>Meta Description</label>
          <textarea
            {...register("metaDescription")}
            rows={2}
            className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent transition-all hover:border-zinc-300 resize-none"
            placeholder="Brief description for search results (≤160 characters)"
          />
        </div>
      </section>

      {/* Publish */}
      <section className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Published</p>
            <p className="text-xs text-muted-foreground">Make article visible on the website</p>
          </div>
          <input {...register("published")} type="checkbox" className="h-4 w-4 rounded" />
        </div>
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : articleId ? "Update Article" : "Create Article"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="h-11 px-6 rounded-xl border border-border text-muted-foreground font-medium text-sm hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
