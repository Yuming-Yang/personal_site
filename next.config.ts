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
      { source: "/connect", destination: "/contact", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/podcast.html", destination: "/podcast", permanent: true },
      { source: "/year-archive", destination: "/writing", permanent: true },
      {
        source: "/wordpress/blog-posts",
        destination: "/writing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
