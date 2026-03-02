import Link from "next/link";
import Image from "next/image";

import { AnimatedReveal } from "@/components/sections/AnimatedReveal";
import { ContentCard } from "@/components/sections/ContentCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { siteProfile } from "@/content/site";
import { getAllEpisodes, getAllWriting } from "@/lib/content";

export default function HomePage() {
  const latestWriting = getAllWriting()[0];
  const latestEpisode = getAllEpisodes()[0];

  return (
    <div className="space-y-16">
      <AnimatedReveal>
        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-12 lg:grid-cols-[1fr_260px]">
          <div>
            <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">
              Personal Website v2
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {siteProfile.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base text-slate-600 sm:text-lg">
              {siteProfile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:border-slate-900"
              >
                View Projects
              </Link>
              <Link
                href="/writing"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:border-slate-900"
              >
                Read Writing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:border-slate-900"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[260px]">
            <Image
              src="/images/profile-fallback.svg"
              alt="Profile image placeholder for Yuming Yang"
              width={260}
              height={260}
              className="rounded-2xl border border-slate-200 bg-slate-50 object-cover shadow-sm"
              priority
            />
          </div>
        </section>
      </AnimatedReveal>

      <section>
        <SectionHeader eyebrow="Current Focus" title="Areas of Work" />
        <div className="grid gap-4 sm:grid-cols-2">
          {siteProfile.focusAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {area.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {latestWriting ? (
          <div>
            <SectionHeader
              eyebrow="Latest Writing"
              title="Recent Market Essay"
            />
            <ContentCard
              href={`/writing/${latestWriting.slug}`}
              title={latestWriting.title}
              excerpt={latestWriting.excerpt}
              date={latestWriting.date}
              tags={latestWriting.tags}
              meta={latestWriting.readTime}
            />
          </div>
        ) : null}

        {latestEpisode ? (
          <div>
            <SectionHeader eyebrow="Latest Podcast" title="Recent Episode" />
            <ContentCard
              href={`/podcast/${latestEpisode.slug}`}
              title={latestEpisode.title}
              excerpt={latestEpisode.excerpt}
              date={latestEpisode.date}
              tags={latestEpisode.tags}
              meta={latestEpisode.readTime}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
