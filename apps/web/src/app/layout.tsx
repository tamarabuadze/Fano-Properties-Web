import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/shared/query-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanoproperties.com";

export const metadata: Metadata = {
  title: {
    default: "Fano Properties — Luxury Real Estate in Dubai",
    template: "%s | Fano Properties",
  },
  description:
    "Discover luxury properties for sale and rent in Dubai. Find your dream home with Fano Properties — premium real estate, exceptional service.",
  keywords: [
    "luxury real estate Dubai", "properties for sale Dubai", "Dubai villas for sale",
    "Dubai apartments", "premium properties", "real estate investment Dubai",
    "Fano Properties", "homes for rent Dubai",
  ],
  authors: [{ name: "Fano Properties" }],
  creator: "Fano Properties",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Fano Properties",
    title: "Fano Properties — Luxury Real Estate in Dubai",
    description:
      "Discover luxury properties for sale and rent in Dubai. Premium real estate, exceptional service.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fano Properties — Luxury Real Estate in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fano Properties — Luxury Real Estate in Dubai",
    description: "Discover luxury properties for sale and rent in Dubai.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1410",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black antialiased">
        <QueryProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
