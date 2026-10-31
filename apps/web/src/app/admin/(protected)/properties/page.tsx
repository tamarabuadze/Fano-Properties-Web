import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { prisma } from "@fano/db";
import { PropertiesTable } from "./_components/properties-table";

export const metadata: Metadata = { title: "Properties" };

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");
  const pageSize = 20;

  const where = params.search
    ? {
        OR: [
          { title: { contains: params.search, mode: "insensitive" as const } },
          { city: { contains: params.search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [rawProperties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: "desc" },
      include: { agent: { select: { firstName: true, lastName: true } } },
    }),
    prisma.property.count({ where }),
  ]);
  const properties = rawProperties.map((p) => ({ ...p, price: Number(p.price) }));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">Properties</h1>
          <p className="text-muted-foreground text-sm mt-1">{total} total properties</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <form>
          <input
            type="text"
            name="search"
            defaultValue={params.search}
            placeholder="Search properties…"
            className="w-full max-w-sm h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-transparent"
          />
        </form>
      </div>

      <PropertiesTable
        properties={properties as never}
        total={total}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}
