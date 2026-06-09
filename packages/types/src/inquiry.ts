import type { WithTimestamps } from "./common";

export type InquiryStatus = "new" | "contacted" | "in_progress" | "closed";
export type InquiryType = "property" | "agent" | "general" | "callback";

export type Inquiry = WithTimestamps & {
  id: string;
  type: InquiryType;
  status: InquiryStatus;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  message: string;
  propertyId?: string | null;
  agentId?: string | null;
  notes?: string | null;
  readAt?: Date | null;
};
