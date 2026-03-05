import { describe, expect, it } from "vitest";

import {
  getAllEpisodes,
  getAllWriting,
  getEpisodeBySlug,
  getWritingBySlug,
} from "@/lib/content";

describe("content loaders", () => {
  it("loads writing entries and resolves by slug", async () => {
    const writing = await getAllWriting();

    expect(writing.length).toBeGreaterThan(0);
    expect(writing[0]).toHaveProperty("type", "writing");

    const bySlug = await getWritingBySlug(
      "welcome-to-the-115-billion-puzzle-box",
    );
    expect(bySlug?.title).toContain("$115 Billion Puzzle Box");
  });

  it("loads podcast entries and resolves by slug", async () => {
    const episodes = await getAllEpisodes();

    expect(episodes.length).toBeGreaterThan(0);
    expect(episodes[0]).toHaveProperty("type", "podcast");

    const bySlug = await getEpisodeBySlug(
      "shanghai-high-school-160-anniversary",
    );
    expect(bySlug?.externalUrl).toContain("open.spotify.com");
  });
});
