import { NextResponse } from "next/server";
import { isSiteTheme, THEME_COOKIE } from "@/lib/site-theme";

// /design/navy, /design/espresso or /design/beige: remember the choice for this
// browser and go to the homepage. Lets the two dark designs be compared on the
// same deployment without touching what everyone else sees.
export async function GET(req: Request, { params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const url = new URL("/", req.url);
  const res = NextResponse.redirect(url);
  if (isSiteTheme(theme)) {
    res.cookies.set(THEME_COOKIE, theme, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  }
  return res;
}
