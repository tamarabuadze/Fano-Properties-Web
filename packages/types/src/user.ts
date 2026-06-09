import type { WithTimestamps } from "./common";

export type UserRole = "admin" | "agent" | "user";

export type User = WithTimestamps & {
  id: string;
  supabaseId: string;
  email: string;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  active: boolean;
};
