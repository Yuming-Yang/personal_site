import type { MetadataRoute } from "next";

import { getAllEpisodes, getAllWriting } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yumingyang.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const writing = await getAllWriting();
  const episodes = await getAllEpisodes();

  const writingRoutes = writing.map(
    (entry) => `/writing/${entry.slug}`,
  );
  const podcastRoutes = episodes.map(
    (entry) => `/podcast/${entry.slug}`,
  );

  return [...staticRoutes, ...writingRoutes, ...podcastRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
