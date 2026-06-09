import { BlogCard } from "@fano/ui";
import { getBlogArticles } from "@/lib/queries/blog";
import { AnimateStagger } from "@/components/shared/animate-stagger";

export async function BlogGrid({
  filters,
}: {
  filters: { category?: string; page?: string; search?: string };
}) {
  const result = await getBlogArticles({
    categorySlug: filters.category,
    page: filters.page ? parseInt(filters.page) : 1,
    search: filters.search,
  });

  if (result.data.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl font-semibold text-black mb-2">No articles yet</p>
        <p className="text-zinc-500">Check back soon for market insights and news.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <AnimateStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((article) => (
          <BlogCard
            key={article.id}
            id={article.id}
            title={article.title}
            slug={article.slug}
            excerpt={article.excerpt}
            coverImage={article.coverImage}
            publishedAt={article.publishedAt?.toISOString()}
            readTime={article.readTime}
            category={article.category}
          />
        ))}
      </AnimateStagger>
    </div>
  );
}
