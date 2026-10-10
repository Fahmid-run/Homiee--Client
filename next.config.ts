import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/properties/:slug",
        destination: "/properties/detail?slug=:slug",
      },
    ];
  },
};

export default nextConfig;
