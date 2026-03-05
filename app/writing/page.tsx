import type { Metadata } from "next";

import { ContentCard } from "@/components/sections/ContentCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getAllWriting } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Writing",
  description:
    "Essays and market notes on macro, crypto, and quantitative finance.",
  path: "/writing",
});

export default async function WritingPage() {
  const writing = await getAllWriting();

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Writing"
        title="Essays and Notes"
        subtitle="Perspectives on macro investing, digital assets, and quantitative strategy design."
      />

      <section className="grid gap-5 md:grid-cols-2">
        {writing.map((entry) => (
          <ContentCard
            key={entry.slug}
            href={`/writing/${entry.slug}`}
            title={entry.title}
            excerpt={entry.excerpt}
            date={entry.date}
            tags={entry.tags}
            meta={entry.readTime}
          />
        ))}
      </section>
    </div>
  );
}
