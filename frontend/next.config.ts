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
    const isDevelopment = process.env.NODE_ENV === "development";
    const allowedOrigins = isDevelopment
      ? ["http://localhost:3000", "http://localhost:1337"]
      : [
          "https://nextjs-headless-store-67ttczggu-morad17s-projects.vercel.app",
          "https://*.vercel.app",
          "https://pc-builder-strapi-backend.onrender.com",
        ];

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: isDevelopment
              ? "*"
              : "https://pc-builder-strapi-backend.onrender.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, X-Requested-With, Accept, Origin",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400", // 24 hours
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
