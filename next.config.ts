import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "yumingyang.net" }],
        destination: "https://yumingyang.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.yumingyang.net" }],
        destination: "https://yumingyang.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.yumingyang.com" }],
        destination: "https://yumingyang.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
