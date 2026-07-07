import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(root, "../..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@morapay/sdk", "@morapay/react"],
};

export default nextConfig;
