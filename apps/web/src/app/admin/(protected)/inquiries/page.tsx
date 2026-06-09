import type { Metadata } from "next";
import { prisma } from "@fano/db";
import { InquiriesTable } from "./_components/inquiries-table";

export const metadata: Metadata = { title: "Inquiries" };

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");
  const pageSize = 25;

  const where = params.status
    ? { status: params.status as never }
    : {};

  const [inquiries, total, newCount] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        property: { select: { title: true, slug: true } },
        agent: { select: { firstName: true, lastName: true } },
      },
    }),
    prisma.inquiry.count({ where }),
    prisma.inquiry.count({ where: { status: "new" } }),
  ]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">Inquiries</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {total} total · <span className="text-amber-600 font-medium">{newCount} new</span>
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { label: "All", value: "" },
          { label: "New", value: "new" },
          { label: "In Progress", value: "in_progress" },
          { label: "Closed", value: "closed" },
        ].map((filter) => (
          <a
            key={filter.value}
            href={filter.value ? `?status=${filter.value}` : "?"}
            className={`h-8 px-3 rounded-lg text-sm font-medium transition-colors ${
              (params.status ?? "") === filter.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter.label}
          </a>
        ))}
      </div>

      <InquiriesTable
        inquiries={inquiries as never}
        total={total}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}
