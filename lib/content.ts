import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { ContentEntry, ContentFrontmatter, ContentType } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readMarkdownEntries(type: ContentType): ContentEntry[] {
  const dir = path.join(CONTENT_ROOT, type);
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

export function getAllWriting(): ContentEntry[] {
  return readMarkdownEntries("writing");
}

export function getWritingBySlug(slug: string): ContentEntry | null {
  return getAllWriting().find((entry) => entry.slug === slug) ?? null;
}

export function getAllEpisodes(): ContentEntry[] {
  return readMarkdownEntries("podcast");
}

export function getEpisodeBySlug(slug: string): ContentEntry | null {
  return getAllEpisodes().find((entry) => entry.slug === slug) ?? null;
}
