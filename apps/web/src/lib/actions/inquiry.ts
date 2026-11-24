"use server";

import { prisma } from "@fano/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { headers } from "next/headers";
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
  /** Spam guards: a field people never see, and how long the form was open (ms) */
  website: z.string().max(200).optional(),
  startedAt: z.number().optional(),
});

// A form sent this soon after it opened was not typed by a person
const MIN_FILL_MS = 2500;

/** 7 to 15 digits and not one digit repeated */
function plausiblePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && !/^(\d)\1+$/.test(digits);
}

export type InquiryFormData = z.infer<typeof inquirySchema>;

export async function submitInquiry(data: InquiryFormData) {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid form data",
    };
  }

  const { page, attribution, website, startedAt, ...inquiry } = parsed.data;

  // startedAt is how long the form was open (ms). Comparing the visitor's clock with the server's
  // dropped real enquiries whenever the visitor's clock ran ahead, so a page still open from before
  // this change, which sends a clock time instead, is let through.
  const sentAClockTime = startedAt !== undefined && startedAt > 1e11;
  const tooFast = startedAt !== undefined && !sentAClockTime && startedAt < MIN_FILL_MS;

  // Bots get the same answer as people, and nothing is saved
  if (website || tooFast) {
    return { success: true, message: "Your inquiry has been submitted successfully." };
  }
  if (inquiry.phone && !plausiblePhone(inquiry.phone)) {
    return { success: false, error: "Please enter a valid mobile number, with country code if outside the UAE." };
  }
  try {
    const savedInquiry = await prisma.inquiry.create({
      data: {
        ...inquiry,
        type: inquiry.type ?? "general",
      },
    });

    revalidatePath("/admin/inquiries");

    // Copy it to the Fano team app's Lead inbox once the visitor has their answer.
    // The app sees the website server's location, so pass the visitor's country from Cloudflare.
    const country = (await headers()).get("cf-ipcountry")?.toUpperCase();
    if (inquiry.phone) {
      after(async () => {
        const property = inquiry.propertyId
          ? await prisma.property.findUnique({ where: { id: inquiry.propertyId }, select: { title: true } }).catch(() => null)
          : null;
        await sendLeadToFanoApp({
          inquiryId: savedInquiry.id,
          name: `${inquiry.firstName} ${inquiry.lastName}`.trim(),
          phone: inquiry.phone!,
          email: inquiry.email,
          message: country && country !== "XX" ? `${inquiry.message}
Visitor country: ${country}` : inquiry.message,
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
