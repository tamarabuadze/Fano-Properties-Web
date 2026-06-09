"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "in_progress" | "closed") {
  await requireAdmin();
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status, readAt: status !== "new" ? new Date() : null },
    });
    revalidatePath("/inquiries");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update status." };
  }
}
