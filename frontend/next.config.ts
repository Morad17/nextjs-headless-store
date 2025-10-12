import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix the workspace root detection issue
  outputFileTracingRoot: path.join(__dirname),

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pc-builder-strapi-backend.onrender.com",
        pathname: "/**",
      },
    ],
    // Add these for better image handling
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  sassOptions: {
    additionalData: `@import "src/scss/variables.scss";`,
  },

  // Valid experimental features for Next.js 15
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },

  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,

  // Optimize for deployment - using valid compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  output: "standalone",

  reactStrictMode: true,

  // Add comprehensive CORS headers
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, X-Requested-With, Accept, Origin",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://pc-builder-strapi-backend.onrender.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  // Add rewrites to proxy Strapi requests if needed
  async rewrites() {
    return [
      {
        source: "/strapi/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }/:path*`,
      },
    ];
  },
};

export default nextConfig;
