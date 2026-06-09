import type { WithTimestamps } from "./common";

export type Agent = WithTimestamps & {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  email: string;
  phone?: string | null;
  bio?: string | null;
  avatar?: string | null;
  title?: string | null;
  specialization?: string | null;
  licenseNumber?: string | null;
  yearsExperience?: number | null;
  languages: string[];
  socialLinks: AgentSocialLinks;
  active: boolean;
  userId?: string | null;
};

export type AgentSocialLinks = {
  linkedin?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  website?: string | null;
};

export type AgentWithStats = Agent & {
  totalListings: number;
  activeListings: number;
  soldProperties: number;
};
