import type { Metadata } from "next";
import { Building2, Users, MessageSquare, TrendingUp, Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@fano/db";
import { formatPrice } from "@fano/utils";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardStats() {
  const [
    totalProperties,
    publishedProperties,
    featuredProperties,
    totalAgents,
    totalInquiries,
    newInquiries,
    totalArticles,
    recentInquiries,
    recentProperties,
  ] = await Promise.all([
    prisma.property.count().catch(() => 0),
    prisma.property.count({ where: { published: true } }).catch(() => 0),
    prisma.property.count({ where: { featured: true } }).catch(() => 0),
    prisma.agent.count({ where: { active: true } }).catch(() => 0),
    prisma.inquiry.count().catch(() => 0),
    prisma.inquiry.count({ where: { status: "new" } }).catch(() => 0),
    prisma.blogArticle.count({ where: { published: true } }).catch(() => 0),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: { select: { title: true } } },
    }).catch(() => []),
    prisma.property.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, price: true, currency: true, status: true, published: true, listingType: true },
    }).catch(() => []),
  ]);

  return {
    totalProperties, publishedProperties, featuredProperties,
    totalAgents, totalInquiries, newInquiries, totalArticles,
    recentInquiries, recentProperties,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "Total Properties",
      value: stats.totalProperties,
      sub: `${stats.publishedProperties} published`,
      icon: Building2,
      href: "/admin/properties",
    },
    {
      label: "Active Agents",
      value: stats.totalAgents,
      sub: "Verified agents",
      icon: Users,
      href: "/admin/agents",
    },
    {
      label: "Total Inquiries",
      value: stats.totalInquiries,
      sub: `${stats.newInquiries} new`,
      icon: MessageSquare,
      href: "/admin/inquiries",
      highlight: stats.newInquiries > 0,
    },
    {
      label: "Published Articles",
      value: stats.totalArticles,
      sub: "Blog posts",
      icon: TrendingUp,
      href: "/admin/blog",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your real estate platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all hover:shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                card.highlight ? "bg-amber-50 border border-amber-100" : "bg-secondary"
              }`}>
                <card.icon className={`h-5 w-5 ${card.highlight ? "text-amber-600" : "text-muted-foreground"}`} />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-2xl font-semibold text-foreground [letter-spacing:-0.02em]">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground text-sm">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {stats.recentInquiries.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">No inquiries yet</div>
            ) : (
              stats.recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-foreground">
                      {inq.firstName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {inq.firstName} {inq.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {inq.property?.title ?? inq.type}
                    </p>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    inq.status === "new"
                      ? "bg-amber-50 text-amber-700"
                      : inq.status === "closed"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {inq.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Properties */}
        <div className="bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground text-sm">Recent Properties</h2>
            <Link href="/admin/properties" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {stats.recentProperties.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">No properties yet</div>
            ) : (
              stats.recentProperties.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/properties/${p.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(parseFloat(p.price.toString()), p.currency)}
                    </p>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.published
                      ? "bg-green-50 text-green-700"
                      : "bg-zinc-100 text-zinc-600"
                  }`}>
                    {p.published ? "Live" : "Draft"}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
