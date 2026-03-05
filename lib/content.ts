import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { ContentEntry, ContentFrontmatter, ContentType } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DEFAULT_WRITING_RSS_FEED = "https://alanyang0.substack.com/feed";
const DEFAULT_PODCAST_RSS_FEED = "https://anchor.fm/s/10a81feb0/podcast/rss";
const RSS_REVALIDATE_SECONDS = 60 * 60;
const CACHE_TTL_MS = RSS_REVALIDATE_SECONDS * 1000;

interface CachedEntries {
  expiresAt: number;
  promise: Promise<ContentEntry[]>;
}

const contentCache = new Map<ContentType, CachedEntries>();

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeXmlEntities(value: string): string {
  let decoded = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");

  // Run multiple passes to handle nested encodings (e.g. &amp;#24180;).
  for (let i = 0; i < 3; i += 1) {
    const next = decoded
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, dec) => {
        const codePoint = Number.parseInt(dec, 10);
        if (!Number.isFinite(codePoint)) {
          return `&#${dec};`;
        }

        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return `&#${dec};`;
        }
      })
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
        const codePoint = Number.parseInt(hex, 16);
        if (!Number.isFinite(codePoint)) {
          return `&#x${hex};`;
        }

        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return `&#x${hex};`;
        }
      });

    if (next === decoded) {
      break;
    }

    decoded = next;
  }

  return decoded;
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
  const normalized = value.normalize("NFKC").toLowerCase().trim();
  if (!normalized) {
    return "";
  }

  const separatorsCollapsed = normalized.replace(/[\p{Separator}\s]+/gu, "-");
  const stripped = separatorsCollapsed.replace(
    /[^\p{Letter}\p{Number}-]+/gu,
    "",
  );

  return stripped.replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

function createShortHash(value: string): string {
  return createHash("sha1").update(value).digest("hex").slice(0, 10);
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
      const pathname = decodeURIComponent(new URL(link).pathname);
      const candidate = pathname
        .split("/")
        .filter(Boolean)
        .pop();

      if (candidate) {
        const candidateSlug = slugify(candidate);
        if (candidateSlug) {
          return candidateSlug;
        }
      }
    } catch {
      // Ignore parse errors and continue with other fallbacks.
    }
  }

  const guid = extractFirstTagValue(item, ["guid", "id"]);
  if (guid) {
    const guidSlug = slugify(guid);
    if (guidSlug) {
      return guidSlug;
    }
  }

  const titleSlug = slugify(fallbackTitle);
  if (titleSlug) {
    return titleSlug;
  }

  return `entry-${createShortHash(`${link}|${guid}|${fallbackTitle}|${item}`)}`;
}

function buildEntryIdentity(entry: ContentEntry): string {
  return `${entry.externalUrl ?? ""}|${entry.date}|${entry.title}`;
}

function ensureUniqueSlugs(entries: ContentEntry[]): ContentEntry[] {
  const entriesWithMeta = entries.map((entry, index) => ({
    entry,
    index,
    identity: buildEntryIdentity(entry),
  }));
  const groups = new Map<string, typeof entriesWithMeta>();

  for (const item of entriesWithMeta) {
    const group = groups.get(item.entry.slug);
    if (group) {
      group.push(item);
    } else {
      groups.set(item.entry.slug, [item]);
    }
  }

  const usedSlugs = new Set<string>();
  const resolvedSlugs = new Map<number, string>();

  for (const [baseSlug, group] of groups) {
    if (group.length === 1) {
      const item = group[0];
      let candidate = baseSlug;
      let attempt = 1;

      while (usedSlugs.has(candidate)) {
        candidate = `${baseSlug}-${createShortHash(`${item.identity}|${attempt}`)}`;
        attempt += 1;
      }

      usedSlugs.add(candidate);
      resolvedSlugs.set(item.index, candidate);
      continue;
    }

    const stableGroup = [...group].sort(
      (a, b) => a.identity.localeCompare(b.identity) || a.index - b.index,
    );

    for (const item of stableGroup) {
      let attempt = 0;
      let candidate = "";

      do {
        const suffixSeed =
          attempt === 0 ? item.identity : `${item.identity}|${attempt}`;
        candidate = `${baseSlug}-${createShortHash(suffixSeed)}`;
        attempt += 1;
      } while (usedSlugs.has(candidate));

      usedSlugs.add(candidate);
      resolvedSlugs.set(item.index, candidate);
    }
  }

  return entriesWithMeta.map(({ entry, index }) => ({
    ...entry,
    slug: resolvedSlugs.get(index) ?? entry.slug,
  }));
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

  return process.env.PODCAST_RSS_FEED_URL ?? DEFAULT_PODCAST_RSS_FEED;
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

async function loadEntriesByType(type: ContentType): Promise<ContentEntry[]> {
  const remoteEntries = await readRssEntries(type);
  if (remoteEntries.length > 0) {
    return remoteEntries;
  }

  return readMarkdownEntries(type);
}

function getAllEntries(type: ContentType): Promise<ContentEntry[]> {
  const now = Date.now();
  const cached = contentCache.get(type);

  if (cached && cached.expiresAt > now) {
    return cached.promise;
  }

  const refreshPromise = loadEntriesByType(type).catch((error) => {
    const current = contentCache.get(type);
    if (current?.promise === refreshPromise) {
      contentCache.delete(type);
    }
    throw error;
  });

  contentCache.set(type, {
    expiresAt: now + CACHE_TTL_MS,
    promise: refreshPromise,
  });

  return refreshPromise;
}

export async function getAllWriting(): Promise<ContentEntry[]> {
  return getAllEntries("writing");
}

export async function getWritingBySlug(slug: string): Promise<ContentEntry | null> {
  const writing = await getAllWriting();
  return writing.find((entry) => entry.slug === slug) ?? null;
}

export async function getAllEpisodes(): Promise<ContentEntry[]> {
  return getAllEntries("podcast");
}

export async function getEpisodeBySlug(
  slug: string,
): Promise<ContentEntry | null> {
  const episodes = await getAllEpisodes();
  return episodes.find((entry) => entry.slug === slug) ?? null;
}
