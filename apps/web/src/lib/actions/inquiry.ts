"use server";

import { prisma } from "@fano/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { sendLeadToFanoApp } from "@/lib/fano-app";

const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  propertyId: z.string().optional(),
  agentId: z.string().optional(),
  type: z.enum(["property", "agent", "general", "callback"]).default("general"),
  /** Page the form was sent from, and the ad or link that brought the visitor */
  page: z.string().max(300).optional(),
  attribution: z.record(z.string().max(300)).optional(),
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

  const { page, attribution, ...inquiry } = parsed.data;
  try {
    await prisma.inquiry.create({
      data: {
        ...inquiry,
        type: inquiry.type ?? "general",
      },
    });

    revalidatePath("/admin/inquiries");

    // Copy it to the Fano team app's Lead inbox once the visitor has their answer
    if (inquiry.phone) {
      after(async () => {
        const property = inquiry.propertyId
          ? await prisma.property.findUnique({ where: { id: inquiry.propertyId }, select: { title: true } }).catch(() => null)
          : null;
        await sendLeadToFanoApp({
          name: `${inquiry.firstName} ${inquiry.lastName}`.trim(),
          phone: inquiry.phone!,
          email: inquiry.email,
          message: inquiry.message,
          project: property?.title ?? "fanoproperties.com",
          purpose: inquiry.type === "property" ? "Property enquiry" : "General enquiry",
          page,
          attribution,
        });
      });
    }

    return { success: true, message: "Your inquiry has been submitted successfully." };
  } catch {
    return {
      success: false,
      error: "Failed to submit inquiry. Please try again.",
    };
  }
}
