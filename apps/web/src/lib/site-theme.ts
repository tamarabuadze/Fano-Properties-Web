import { cookies } from "next/headers";

// Design preview switch. "beige" is the live site; "navy" and "espresso" are the two
// dark luxury homepages built for comparison. Visiting /design/<theme> sets the cookie.
export const SITE_THEMES = ["beige", "navy", "espresso"] as const;
export type SiteTheme = (typeof SITE_THEMES)[number];

export const THEME_COOKIE = "fano-theme";

export function isSiteTheme(value: unknown): value is SiteTheme {
  return typeof value === "string" && (SITE_THEMES as readonly string[]).includes(value);
}

export async function getSiteTheme(): Promise<SiteTheme> {
  const value = (await cookies()).get(THEME_COOKIE)?.value;
  return isSiteTheme(value) ? value : "beige";
}

export function isDarkTheme(theme: SiteTheme): boolean {
  return theme !== "beige";
}
