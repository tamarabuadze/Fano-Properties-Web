"use server";

import { prisma } from "@fano/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { actionFailed } from "@/lib/admin-errors";

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "in_progress" | "closed") {
  await requireAdmin();
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status, readAt: status !== "new" ? new Date() : null },
    });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (e) {
    return actionFailed("Failed to update status.", e);
  }
}
