import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { MarkdownArticle } from "@/components/sections/MarkdownArticle";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getAllWriting, getWritingBySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const writing = await getAllWriting();
  return writing.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWritingBySlug(slug);

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
  const entry = await getWritingBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Writing"
        title={entry.title}
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

        {entry.externalUrl ? (
          <div className="mt-8">
            <Link
              href={entry.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-900"
            >
              Read on Substack
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
