import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "cloudflare:workers": path.resolve(
        process.cwd(),
        "build/vercel-cloudflare-workers-shim.ts",
      ),
    };
    return config;
  },
};

export default nextConfig;
