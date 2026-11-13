import type { Metadata } from "next";

export const DEFAULT_OG_IMAGE = "/og-default.jpg";

interface PageMetaInput {
  path: string;
  title: string;
  description?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  type?: "website" | "article";
}

// A page's openGraph/twitter objects replace the root layout's whole, so each page sets every field itself
export function buildPageMeta({ path, title, description, images, type = "website" }: PageMetaInput): Pick<Metadata, "openGraph" | "twitter"> {
  const ogImages = images?.length ? images : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }];
  return {
    openGraph: {
      type,
      siteName: "Fano Properties",
      locale: "en_US",
      url: path,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}

export function metaDescription(s: string | null | undefined, max = 155): string | undefined {
  const t = (s ?? "").replace(/\s+/g, " ").trim();
  if (!t) return undefined;
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,;:.\-–—•]+$/, "") + "…";
}
