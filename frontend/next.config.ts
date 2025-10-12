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
        pathname: "/uploads/**",
      },
    ],
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

  // Add CORS headers for API routes and external requests
  async headers() {
    return [
      {
        // Apply CORS headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // or specify your Strapi URL: "https://pc-builder-strapi-backend.onrender.com"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
      {
        // Specific headers for API calls
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
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
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
