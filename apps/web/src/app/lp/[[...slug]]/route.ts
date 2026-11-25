import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { googleTagHead } from "@/lib/google-tag-html";
import { whatsAppGateTag } from "@/lib/whatsapp-gate";
import { defaultTheme } from "@/lib/site-theme";

// Landing pages for the Google Ads campaigns, one per property in English and Arabic:
//   /lp/en                English index of every property      /lp/ar               Arabic investor page
//   /lp/en/<property>     English property page                /lp/ar/<property>    Arabic property page
//
// The pages belong to the website: they live in apps/web/lp-pages/<lang>-<property>.html and use
// the Fano team app's light "Calcite Sand" look (styles in public/lp-assets). Nothing is loaded
// from the team app. Enquiries post to /api/lp-lead on this site, which saves them with the
// website's other enquiries and hands each one to the team app's Lead inbox.

const DIR = path.join(process.cwd(), "lp-pages");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com").replace(/\/$/, "");
const KEY = /^[a-z0-9-]{1,60}$/;

/** /lp/en/sol-luxe -> en-sol-luxe.html, /lp/ar -> ar.html */
function fileFor(slug: string[]): string | null {
  const [lang, key, ...rest] = slug;
  if (rest.length || (lang !== "en" && lang !== "ar")) return null;
  if (key === undefined) return `${lang}.html`;
  return KEY.test(key) ? `${lang}-${key}.html` : null;
}

export async function GET(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const file = fileFor(slug);
  if (!file) return NextResponse.redirect(new URL("/lp/en", req.url), 302);

  let html: string;
  try {
    html = await readFile(path.join(DIR, file), "utf8");
  } catch {
    return NextResponse.redirect(new URL(slug[0] === "ar" ? "/lp/ar" : "/lp/en", req.url), 302);
  }

  const pagePath = `/lp/${slug.join("/")}`;
  // The page's own script keeps the visitor's saved theme; SITE_THEME sets the one shown first
  html = html.replace("<html ", `<html data-theme="${defaultTheme()}" `);
  html = html.replace("</head>", `<link rel="canonical" href="${SITE}${pagePath}">\n${googleTagHead()}</head>`);
  // Name and mobile before WhatsApp opens, so taps become leads (lib/whatsapp-gate.ts)
  html = html.replace("</body>", `${whatsAppGateTag()}</body>`);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
