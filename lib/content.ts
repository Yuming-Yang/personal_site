import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { ContentEntry, ContentFrontmatter, ContentType } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DEFAULT_WRITING_RSS_FEED = "https://alanyang0.substack.com/feed";
const RSS_REVALIDATE_SECONDS = 60 * 60;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(value: string): string {
  return decodeXmlEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "entry";
}

function tryParseDate(value?: string): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
}

function buildExcerpt(value: string): string {
  if (value.length <= 180) {
    return value;
  }

  return `${value.slice(0, 177).trimEnd()}...`;
}

function extractFirstTagValue(source: string, tagNames: string[]): string {
  for (const tagName of tagNames) {
    const escaped = escapeRegex(tagName);
    const regex = new RegExp(
      `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`,
      "i",
    );
    const match = source.match(regex);

    if (match?.[1]) {
      return decodeXmlEntities(match[1].trim());
    }
  }

  return "";
}

function extractAllTagValues(source: string, tagName: string): string[] {
  const escaped = escapeRegex(tagName);
  const regex = new RegExp(
    `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`,
    "gi",
  );

  const matches = [...source.matchAll(regex)];
  return matches
    .map((match) => decodeXmlEntities((match[1] ?? "").trim()))
    .filter(Boolean);
}

function extractLinkFromItem(item: string): string {
  const inlineLink = extractFirstTagValue(item, ["link"]);
  if (inlineLink.startsWith("http://") || inlineLink.startsWith("https://")) {
    return inlineLink;
  }

  const linkMatches = [...item.matchAll(/<link\b([^>]*)\/?>/gi)];
  for (const match of linkMatches) {
    const attrs = match[1] ?? "";
    const hrefMatch = attrs.match(/\bhref=(["'])(.*?)\1/i);
    const relMatch = attrs.match(/\brel=(["'])(.*?)\1/i);
    const href = hrefMatch?.[2]?.trim();
    const rel = relMatch?.[2]?.trim().toLowerCase();

    if (!href) {
      continue;
    }

    if (!rel || rel === "alternate") {
      return decodeXmlEntities(href);
    }
  }

  return "";
}

function extractItemBlocks(xml: string): string[] {
  const rssItems = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map(
    (match) => match[0],
  );
  if (rssItems.length > 0) {
    return rssItems;
  }

  return [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map(
    (match) => match[0],
  );
}

function deriveSlug(item: string, link: string, fallbackTitle: string): string {
  if (link) {
    try {
      const pathname = new URL(link).pathname;
      const candidate = pathname
        .split("/")
        .filter(Boolean)
        .pop();

      if (candidate) {
        return slugify(candidate);
      }
    } catch {
      // Ignore parse errors and continue with other fallbacks.
    }
  }

  const guid = extractFirstTagValue(item, ["guid", "id"]);
  if (guid) {
    return slugify(guid);
  }

  return slugify(fallbackTitle);
}

function ensureUniqueSlugs(entries: ContentEntry[]): ContentEntry[] {
  const counts = new Map<string, number>();

  return entries.map((entry) => {
    const count = counts.get(entry.slug) ?? 0;
    counts.set(entry.slug, count + 1);

    if (count === 0) {
      return entry;
    }

    return {
      ...entry,
      slug: `${entry.slug}-${count + 1}`,
    };
  });
}

function readMarkdownEntries(type: ContentType): ContentEntry[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) {
    return [];
  }

  const filenames = fs.readdirSync(dir).filter((name) => name.endsWith(".md"));

  return filenames
    .map((filename) => {
      const fullPath = path.join(dir, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      const frontmatter = data as Partial<ContentFrontmatter>;

      if (
        !frontmatter.title ||
        !frontmatter.date ||
        !frontmatter.slug ||
        !frontmatter.excerpt
      ) {
        throw new Error(`Missing required frontmatter in ${type}/${filename}`);
      }

      return {
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        slug: frontmatter.slug,
        type,
        readTime:
          typeof frontmatter.readTime === "string"
            ? frontmatter.readTime
            : undefined,
        externalUrl:
          typeof frontmatter.externalUrl === "string"
            ? frontmatter.externalUrl
            : undefined,
        content: content.trim(),
      } satisfies ContentEntry;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function isRssEnabled(): boolean {
  return process.env.NODE_ENV !== "test";
}

function resolveRssFeedUrl(type: ContentType): string {
  if (type === "writing") {
    return process.env.WRITING_RSS_FEED_URL ?? DEFAULT_WRITING_RSS_FEED;
  }

  return process.env.PODCAST_RSS_FEED_URL ?? "";
}

async function readRssEntries(type: ContentType): Promise<ContentEntry[]> {
  if (!isRssEnabled()) {
    return [];
  }

  const feedUrl = resolveRssFeedUrl(type);
  if (!feedUrl) {
    return [];
  }

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: RSS_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`RSS request failed: ${response.status}`);
    }

    const xml = await response.text();
    const itemBlocks = extractItemBlocks(xml);

    const parsed = itemBlocks.map((item, index) => {
      const title = extractFirstTagValue(item, ["title"]) || `Untitled ${index + 1}`;
      const link = extractLinkFromItem(item);
      const date = tryParseDate(
        extractFirstTagValue(item, [
          "pubDate",
          "published",
          "updated",
          "dc:date",
        ]),
      );
      const rawSummary =
        extractFirstTagValue(item, [
          "description",
          "summary",
          "content:encoded",
          "content",
        ]) || title;
      const summary = stripHtml(rawSummary);
      const excerpt = buildExcerpt(summary || title);
      const tags = extractAllTagValues(item, "category").map((tag) =>
        stripHtml(tag),
      );
      const slug = deriveSlug(item, link, title);

      return {
        title: stripHtml(title) || title,
        date,
        excerpt,
        tags: tags.filter(Boolean),
        slug,
        type,
        externalUrl: link || undefined,
        content:
          type === "writing"
            ? summary
            : summary || "New episode available on Spotify.",
      } satisfies ContentEntry;
    });

    return ensureUniqueSlugs(parsed).sort((a, b) =>
      a.date < b.date ? 1 : -1,
    );
  } catch (error) {
    console.error(`Failed to load ${type} RSS feed`, error);
    return [];
  }
}

export async function getAllWriting(): Promise<ContentEntry[]> {
  const remoteEntries = await readRssEntries("writing");
  if (remoteEntries.length > 0) {
    return remoteEntries;
  }

  return readMarkdownEntries("writing");
}

export async function getWritingBySlug(slug: string): Promise<ContentEntry | null> {
  const writing = await getAllWriting();
  return writing.find((entry) => entry.slug === slug) ?? null;
}

export async function getAllEpisodes(): Promise<ContentEntry[]> {
  const remoteEntries = await readRssEntries("podcast");
  if (remoteEntries.length > 0) {
    return remoteEntries;
  }

  return readMarkdownEntries("podcast");
}

export async function getEpisodeBySlug(
  slug: string,
): Promise<ContentEntry | null> {
  const episodes = await getAllEpisodes();
  return episodes.find((entry) => entry.slug === slug) ?? null;
}
