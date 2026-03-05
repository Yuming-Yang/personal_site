export type ContentType = "writing" | "podcast";

export interface ContentFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
  type: ContentType;
  readTime?: string;
  externalUrl?: string;
}

export interface ContentEntry extends ContentFrontmatter {
  content: string;
}

export interface SiteProfile {
  name: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  socialLinks: Array<{ label: string; href: string }>;
  focusAreas: Array<{ title: string; description: string }>;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  summary: string;
  tags: string[];
  links: Array<{ label: string; href: string }>;
  featured: boolean;
  status: "live" | "in-progress" | "placeholder";
  notes?: string;
}

export interface ResearchItem {
  title: string;
  venue: string;
  date: string;
  abstract: string;
  links: Array<{ label: string; href: string }>;
  status: "published" | "under-review" | "placeholder";
}
