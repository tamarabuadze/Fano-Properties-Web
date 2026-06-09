"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateSlug } from "@fano/utils";
import { requireAdmin } from "@/lib/auth";

const agentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional().or(z.literal("")),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  yearsExperience: z.number({ coerce: true }).int().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  active: z.boolean().default(true),
});

export async function createAgent(data: z.infer<typeof agentSchema>) {
  await requireAdmin();
  const parsed = agentSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid data" };

  try {
    const slug = generateSlug(`${parsed.data.firstName} ${parsed.data.lastName}`);
    const agent = await prisma.agent.create({
      data: {
        ...parsed.data,
        slug,
        avatar: parsed.data.avatar || null,
        linkedinUrl: parsed.data.linkedinUrl || null,
        instagramUrl: parsed.data.instagramUrl || null,
        twitterUrl: parsed.data.twitterUrl || null,
      },
    });
    revalidatePath("/agents");
    return { success: true, id: agent.id };
  } catch {
    return { success: false, error: "Failed to create agent." };
  }
}

export async function updateAgent(id: string, data: Partial<z.infer<typeof agentSchema>>) {
  await requireAdmin();
  try {
    await prisma.agent.update({ where: { id }, data });
    revalidatePath("/agents");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update agent." };
  }
}

export async function deleteAgent(id: string) {
  await requireAdmin();
  try {
    await prisma.agent.delete({ where: { id } });
    revalidatePath("/agents");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete agent." };
  }
}

export async function toggleAgentActive(id: string, active: boolean) {
  await requireAdmin();
  try {
    await prisma.agent.update({ where: { id }, data: { active } });
    revalidatePath("/agents");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update." };
  }
}
