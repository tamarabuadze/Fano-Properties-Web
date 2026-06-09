"use server";

import { prisma } from "@fano/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  propertyId: z.string().optional(),
  agentId: z.string().optional(),
  type: z.enum(["property", "agent", "general", "callback"]).default("general"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export async function submitInquiry(data: InquiryFormData) {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid form data",
    };
  }

  try {
    await prisma.inquiry.create({
      data: {
        ...parsed.data,
        type: parsed.data.type ?? "general",
      },
    });

    revalidatePath("/admin/inquiries");

    return { success: true, message: "Your inquiry has been submitted successfully." };
  } catch {
    return {
      success: false,
      error: "Failed to submit inquiry. Please try again.",
    };
  }
}
