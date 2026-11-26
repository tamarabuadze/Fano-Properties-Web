import type { NextConfig } from "next";

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
  // Browsers and crawlers ask for /favicon.ico directly; serve the generated app icon there.
  // fanoproperties.com/listings comes from the Fano listings app through src/app/api/listings.
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/icon" },
      { source: "/listings", destination: "/api/listings" },
      { source: "/listings/:path*", destination: "/api/listings?path=:path*" },
    ];
  },
};

export default nextConfig;
