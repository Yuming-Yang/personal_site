import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

function buildRss(...items: string[]): string {
  return `<rss><channel>${items.join("")}</channel></rss>`;
}

function buildItem({
  title,
  link,
  guid,
  pubDate,
  description,
}: {
  title: string;
  link?: string;
  guid?: string;
  pubDate: string;
  description: string;
}): string {
  return `<item>
    <title><![CDATA[${title}]]></title>
    ${link ? `<link>${link}</link>` : ""}
    ${guid ? `<guid>${guid}</guid>` : ""}
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${description}]]></description>
  </item>`;
}

async function importContentModule() {
  return import("@/lib/content");
}

function setEnv(overrides: NodeJS.ProcessEnv) {
  process.env = { ...process.env, ...overrides };
}

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  process.env = { ...ORIGINAL_ENV };
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.unstubAllGlobals();
});

describe("content loaders", () => {
  it("loads writing entries and resolves by slug", async () => {
    setEnv({ NODE_ENV: "test" });
    const { getAllWriting, getWritingBySlug } = await importContentModule();
    const writing = await getAllWriting();

    expect(writing.length).toBeGreaterThan(0);
    expect(writing[0]).toHaveProperty("type", "writing");

    const bySlug = await getWritingBySlug(
      "welcome-to-the-115-billion-puzzle-box",
    );
    expect(bySlug?.title).toContain("$115 Billion Puzzle Box");
  });

  it("loads podcast entries and resolves by slug", async () => {
    setEnv({ NODE_ENV: "test" });
    const { getAllEpisodes, getEpisodeBySlug } = await importContentModule();
    const episodes = await getAllEpisodes();

    expect(episodes.length).toBeGreaterThan(0);
    expect(episodes[0]).toHaveProperty("type", "podcast");

    const bySlug = await getEpisodeBySlug(
      "shanghai-high-school-160-anniversary",
    );
    expect(bySlug?.externalUrl).toContain("open.spotify.com");
  });

  it("creates deterministic non-empty slugs for unicode and hash fallback", async () => {
    setEnv({
      NODE_ENV: "development",
      WRITING_RSS_FEED_URL: "https://example.com/writing-feed",
    });

    const rss = buildRss(
      buildItem({
        title: "市场 结构 观察",
        pubDate: "2025-02-01T00:00:00.000Z",
        description: "Unicode title entry",
      }),
      buildItem({
        title: "🔥🔥",
        pubDate: "2025-02-02T00:00:00.000Z",
        description: "Emoji only title entry",
      }),
    );

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => rss,
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getAllWriting } = await importContentModule();
    const writing = await getAllWriting();

    const unicodeEntry = writing.find((entry) => entry.title === "市场 结构 观察");
    const emojiEntry = writing.find((entry) => entry.title === "🔥🔥");

    expect(unicodeEntry?.slug).toBe("市场-结构-观察");
    expect(emojiEntry?.slug).toMatch(/^entry-[0-9a-f]{10}$/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("keeps duplicate slugs stable even when feed order changes", async () => {
    setEnv({
      NODE_ENV: "development",
      WRITING_RSS_FEED_URL: "https://example.com/writing-feed",
    });

    const a = buildItem({
      title: "Duplicate A",
      link: "https://example.com/posts/duplicate-path",
      pubDate: "2025-02-02T00:00:00.000Z",
      description: "Entry A",
    });
    const b = buildItem({
      title: "Duplicate B",
      link: "https://example.com/posts/duplicate-path",
      pubDate: "2025-02-03T00:00:00.000Z",
      description: "Entry B",
    });

    const fetchMockFirst = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => buildRss(a, b),
    });
    vi.stubGlobal("fetch", fetchMockFirst);

    let contentModule = await importContentModule();
    const firstOrder = await contentModule.getAllWriting();
    const firstByTitle = new Map(firstOrder.map((entry) => [entry.title, entry.slug]));

    vi.resetModules();
    vi.unstubAllGlobals();
    process.env = {
      ...ORIGINAL_ENV,
      NODE_ENV: "development",
      WRITING_RSS_FEED_URL: "https://example.com/writing-feed",
    };

    const fetchMockSecond = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => buildRss(b, a),
    });
    vi.stubGlobal("fetch", fetchMockSecond);

    contentModule = await importContentModule();
    const secondOrder = await contentModule.getAllWriting();
    const secondByTitle = new Map(
      secondOrder.map((entry) => [entry.title, entry.slug]),
    );

    expect(firstByTitle.get("Duplicate A")).toBe(secondByTitle.get("Duplicate A"));
    expect(firstByTitle.get("Duplicate B")).toBe(secondByTitle.get("Duplicate B"));
    expect(firstByTitle.get("Duplicate A")).not.toBe("duplicate-path-2");
    expect(firstByTitle.get("Duplicate B")).not.toBe("duplicate-path-2");
  });

  it("shares a single fetch call for concurrent and repeated reads within ttl", async () => {
    setEnv({
      NODE_ENV: "development",
      WRITING_RSS_FEED_URL: "https://example.com/writing-feed",
    });

    const rss = buildRss(
      buildItem({
        title: "Cacheable Post",
        link: "https://example.com/posts/cacheable-post",
        pubDate: "2025-02-04T00:00:00.000Z",
        description: "Cache test",
      }),
    );

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => rss,
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getAllWriting } = await importContentModule();
    const [first, second, third] = await Promise.all([
      getAllWriting(),
      getAllWriting(),
      getAllWriting(),
    ]);

    expect(first.length).toBeGreaterThan(0);
    expect(second[0]?.slug).toBe(first[0]?.slug);
    expect(third[0]?.slug).toBe(first[0]?.slug);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await getAllWriting();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
