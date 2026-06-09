"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";

const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteTagline: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  footerText: z.string().optional(),
});

type SettingsData = z.infer<typeof settingsSchema>;

export async function getSettings(): Promise<Partial<SettingsData>> {
  const rows = await prisma.siteSettings.findMany();
  return Object.fromEntries(rows.map((r: { key: string; value: string }) => [r.key, r.value])) as Partial<SettingsData>;
}

export async function saveSettings(data: SettingsData) {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid data" };

  try {
    const entries = Object.entries(parsed.data).filter(([, v]) => v !== undefined) as [string, string][];
    await Promise.all(
      entries.map(([key, value]) =>
        prisma.siteSettings.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save settings." };
  }
}
