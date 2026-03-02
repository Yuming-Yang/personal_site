import type { MetadataRoute } from "next";

import { getAllEpisodes, getAllWriting } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yumingyang.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/writing",
    "/podcast",
    "/publications",
    "/resume",
    "/contact",
  ];

  const writingRoutes = getAllWriting().map(
    (entry) => `/writing/${entry.slug}`,
  );
  const podcastRoutes = getAllEpisodes().map(
    (entry) => `/podcast/${entry.slug}`,
  );

  return [...staticRoutes, ...writingRoutes, ...podcastRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
