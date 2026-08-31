import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/learn/:slug",
        permanent: true,
      },
      {
        source: "/tools/ems-address",
        destination: "https://tools.unclehangul.com/overseas-address-converter",
        permanent: true,
      },
      {
        source: "/tools/kr-address-formatter",
        destination: "https://tools.unclehangul.com/korean-address-converter",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
