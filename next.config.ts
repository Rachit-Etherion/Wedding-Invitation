import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local network load the dev server's JS (otherwise the page never hydrates)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
