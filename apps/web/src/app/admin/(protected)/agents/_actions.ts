"use server";

import { prisma } from "@fano/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache";
import { z } from "zod";
import { generateSlug } from "@fano/utils";
import { requireAdmin } from "@/lib/admin-auth";
import { actionFailed } from "@/lib/admin-errors";

const agentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v), "Upload a photo or paste a link").optional(),
  staffType: z.enum(["agent", "administrative"]).default("agent"),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  yearsExperience: z.number({ coerce: true }).int().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  languages: z.array(z.string().trim().min(1)).default([]),
  active: z.boolean().default(true),
  showContact: z.boolean().default(true),
});

export async function createAgent(data: z.infer<typeof agentSchema>) {
  await requireAdmin();
  const parsed = agentSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid data" };

  try {
    const slug = generateSlug(`${parsed.data.firstName} ${parsed.data.lastName ?? ""}`);
    const agent = await prisma.agent.create({
      data: {
        ...parsed.data,
        slug,
        lastName: parsed.data.lastName || null,
        email: parsed.data.email || null,
        avatar: parsed.data.avatar || null,
        linkedinUrl: parsed.data.linkedinUrl || null,
        instagramUrl: parsed.data.instagramUrl || null,
        twitterUrl: parsed.data.twitterUrl || null,
      },
    });
    revalidatePath("/admin/agents");
    revalidateTag(CACHE_TAGS.agents);
    return { success: true, id: agent.id };
  } catch (e) {
    return actionFailed("Failed to create agent.", e);
  }
}

export async function updateAgent(id: string, data: Partial<z.infer<typeof agentSchema>>) {
  await requireAdmin();
  try {
    await prisma.agent.update({
      where: { id },
      data: {
        ...data,
        ...(data.email !== undefined ? { email: data.email || null } : {}),
        ...(data.lastName !== undefined ? { lastName: data.lastName || null } : {}),
        ...(data.avatar !== undefined ? { avatar: data.avatar || null } : {}),
        ...(data.linkedinUrl !== undefined ? { linkedinUrl: data.linkedinUrl || null } : {}),
        ...(data.instagramUrl !== undefined ? { instagramUrl: data.instagramUrl || null } : {}),
        ...(data.twitterUrl !== undefined ? { twitterUrl: data.twitterUrl || null } : {}),
      },
    });
    revalidatePath("/admin/agents");
    revalidateTag(CACHE_TAGS.agents);
    return { success: true };
  } catch (e) {
    return actionFailed("Failed to update agent.", e);
  }
}

export async function deleteAgent(id: string) {
  await requireAdmin();
  try {
    await prisma.agent.delete({ where: { id } });
    revalidatePath("/admin/agents");
    revalidateTag(CACHE_TAGS.agents);
    return { success: true };
  } catch (e) {
    return actionFailed("Failed to delete agent.", e);
  }
}

export async function toggleAgentActive(id: string, active: boolean) {
  await requireAdmin();
  try {
    await prisma.agent.update({ where: { id }, data: { active } });
    revalidatePath("/admin/agents");
    revalidateTag(CACHE_TAGS.agents);
    return { success: true };
  } catch (e) {
    return actionFailed("Failed to update.", e);
  }
}
