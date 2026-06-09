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

export const metadata: Metadata = {
  title: {
    default: "Fano Real Estate — Premium Properties",
    template: "%s | Fano Real Estate",
  },
  description:
    "Discover premium properties for sale and rent. Find your dream home with Fano Real Estate — luxury living redefined.",
  keywords: ["real estate", "luxury properties", "homes for sale", "rentals", "premium listings"],
  authors: [{ name: "Fano Real Estate" }],
  creator: "Fano Real Estate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Fano Real Estate",
    title: "Fano Real Estate — Premium Properties",
    description:
      "Discover premium properties for sale and rent. Find your dream home with Fano Real Estate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fano Real Estate — Premium Properties",
    description: "Discover premium properties for sale and rent.",
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
  themeColor: "#000000",
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
