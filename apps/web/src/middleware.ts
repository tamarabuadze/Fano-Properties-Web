import { auth } from "@/auth";
import { NextResponse, type NextMiddleware } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Pass auth API requests through
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // Admin root → dashboard
  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Already logged in → skip login page
  if (pathname === "/admin/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Not logged in → send to login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}) as unknown as NextMiddleware;

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/auth/:path*",
  ],
};
