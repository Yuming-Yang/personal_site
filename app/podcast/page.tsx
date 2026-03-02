import type { Metadata } from "next";

import { ContentCard } from "@/components/sections/ContentCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getAllEpisodes } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Podcast",
  description: "Podcast episodes on markets, crypto, and personal reflections.",
  path: "/podcast",
});

export default function PodcastPage() {
  const episodes = getAllEpisodes();

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Podcast"
        title="Conversations and Reflections"
        subtitle="Audio notes covering financial markets, crypto, and selected personal observations."
      />

      <section className="grid gap-5 md:grid-cols-2">
        {episodes.map((entry) => (
          <ContentCard
            key={entry.slug}
            href={`/podcast/${entry.slug}`}
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
