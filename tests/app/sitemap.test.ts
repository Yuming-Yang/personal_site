import { beforeEach, describe, expect, it, vi } from "vitest";

const getAllWritingMock = vi.fn();
const getAllEpisodesMock = vi.fn();

vi.mock("@/lib/content", () => ({
  getAllWriting: getAllWritingMock,
  getAllEpisodes: getAllEpisodesMock,
}));

beforeEach(() => {
  vi.resetModules();
  getAllWritingMock.mockReset();
  getAllEpisodesMock.mockReset();
  process.env.NEXT_PUBLIC_SITE_URL = "https://yumingyang.com";
});

describe("sitemap", () => {
  it("uses entry dates for dynamic routes and max content date for static routes", async () => {
    getAllWritingMock.mockResolvedValue([
      {
        title: "Writing One",
        date: "2025-01-10T00:00:00.000Z",
        excerpt: "Writing excerpt",
        tags: [],
        slug: "writing-one",
        type: "writing",
        content: "Content",
      },
    ]);
    getAllEpisodesMock.mockResolvedValue([
      {
        title: "Episode One",
        date: "2025-02-15T00:00:00.000Z",
        excerpt: "Episode excerpt",
        tags: [],
        slug: "episode-one",
        type: "podcast",
        content: "Content",
      },
    ]);

    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();

    const writingRoute = entries.find(
      (entry) => entry.url === "https://yumingyang.com/writing/writing-one",
    );
    const podcastRoute = entries.find(
      (entry) => entry.url === "https://yumingyang.com/podcast/episode-one",
    );
    const projectsRoute = entries.find(
      (entry) => entry.url === "https://yumingyang.com/projects",
    );

    expect(writingRoute?.lastModified).toEqual(new Date("2025-01-10T00:00:00.000Z"));
    expect(podcastRoute?.lastModified).toEqual(new Date("2025-02-15T00:00:00.000Z"));
    expect(projectsRoute?.lastModified).toEqual(new Date("2025-02-15T00:00:00.000Z"));
  });

  it("uses fixed fallback lastModified when no content exists", async () => {
    getAllWritingMock.mockResolvedValue([]);
    getAllEpisodesMock.mockResolvedValue([]);

    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();

    const homeRoute = entries.find((entry) => entry.url === "https://yumingyang.com");
    expect(homeRoute?.lastModified).toEqual(new Date("2024-01-01T00:00:00.000Z"));
  });
});
