import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@fano/db";
import { PropertyForm } from "../_components/property-form";

export const metadata: Metadata = { title: "New Property" };

export default async function NewPropertyPage() {
  const agents = await prisma.agent.findMany({
    where: { active: true },
    select: { id: true, firstName: true, lastName: true },
    orderBy: { firstName: "asc" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/properties" className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground [letter-spacing:-0.02em]">New Property</h1>
          <p className="text-muted-foreground text-sm">Add a new listing to the platform</p>
        </div>
      </div>

      <PropertyForm agents={agents} />
    </div>
  );
}
