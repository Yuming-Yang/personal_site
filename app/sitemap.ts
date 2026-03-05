import type { MetadataRoute } from "next";

import { getAllEpisodes, getAllWriting } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yumingyang.com";
const STATIC_FALLBACK_LAST_MODIFIED = new Date("2024-01-01T00:00:00.000Z");

function parseLastModified(value: string): Date {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return STATIC_FALLBACK_LAST_MODIFIED;
  }

  return parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/projects",
    "/writing",
    "/podcast",
    "/research",
    "/resume",
    "/contact",
  ];
  const writing = await getAllWriting();
  const episodes = await getAllEpisodes();

  const writingRoutes = writing.map((entry) => ({
    url: `${BASE_URL}/writing/${entry.slug}`,
    lastModified: parseLastModified(entry.date),
  }));
  const podcastRoutes = episodes.map((entry) => ({
    url: `${BASE_URL}/podcast/${entry.slug}`,
    lastModified: parseLastModified(entry.date),
  }));

  const contentTimes = [...writingRoutes, ...podcastRoutes].map((route) =>
    route.lastModified.getTime(),
  );
  const staticLastModified =
    contentTimes.length > 0
      ? new Date(Math.max(...contentTimes))
      : STATIC_FALLBACK_LAST_MODIFIED;

  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: staticLastModified,
  }));

  return [...staticEntries, ...writingRoutes, ...podcastRoutes];
}
