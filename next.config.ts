import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    domains: ["ik.imagekit.io"],
  },
};

export default nextConfig;
