import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownArticle } from "@/components/sections/MarkdownArticle";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getAllWriting, getWritingBySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllWriting().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);

  if (!entry) {
    return buildPageMetadata({
      title: "Writing",
      description: "Writing post not found.",
      path: "/writing",
    });
  }

  return buildPageMetadata({
    title: entry.title,
    description: entry.excerpt,
    path: `/writing/${entry.slug}`,
  });
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Writing"
        title={entry.title}
        subtitle={entry.excerpt}
      />
      <p className="font-mono text-sm text-slate-500">
        {new Date(entry.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {entry.readTime ? ` · ${entry.readTime}` : ""}
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <MarkdownArticle content={entry.content} />
      </div>
    </div>
  );
}
