import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.jsdelivr.net",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
