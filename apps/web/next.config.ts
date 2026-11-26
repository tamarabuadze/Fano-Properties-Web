import type { NextConfig } from "next";

// fanoproperties.com/listings is served by the Fano listings app (Cloudflare Worker "app").
// Next.js passes these requests through, so the address bar keeps fanoproperties.com.
const LISTINGS_APP = "https://app.fanoproperties.workers.dev";

const nextConfig: NextConfig = {
  transpilePackages: ["@fano/ui", "@fano/utils", "@fano/types"],
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Browsers and crawlers ask for /favicon.ico directly; serve the generated app icon there
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/icon" },
      { source: "/listings", destination: `${LISTINGS_APP}/listings` },
      { source: "/listings/:path*", destination: `${LISTINGS_APP}/listings/:path*` },
    ];
  },
};

export default nextConfig;
