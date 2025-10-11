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
};

export default nextConfig;
