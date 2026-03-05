import Image from "next/image";
import Link from "next/link";

import { AnimatedReveal } from "@/components/sections/AnimatedReveal";
import { ContentCard } from "@/components/sections/ContentCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { siteProfile } from "@/content/site";
import { getAllEpisodes, getAllWriting } from "@/lib/content";

export default async function HomePage() {
  const writing = await getAllWriting();
  const episodes = await getAllEpisodes();
  const latestWriting = writing[0];
  const latestEpisode = episodes[0];
  const socialHrefByLabel = new Map(
    siteProfile.socialLinks.map((link) => [link.label, link.href]),
  );

  const contactLinks = [
    { label: "Email", href: `mailto:${siteProfile.email}` },
    { label: "LinkedIn", href: socialHrefByLabel.get("LinkedIn") ?? "#" },
    { label: "Twitter", href: socialHrefByLabel.get("X / Twitter") ?? "#" },
    { label: "Telegram", href: socialHrefByLabel.get("Telegram") ?? "#" },
    { label: "Substack", href: socialHrefByLabel.get("Substack") ?? "#" },
    { label: "Spotify", href: socialHrefByLabel.get("Spotify") ?? "#" },
  ];

  return (
    <div className="space-y-16">
      <AnimatedReveal>
        <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_260px]">
          <div>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {siteProfile.name}
            </h1>
            <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
              {siteProfile.summary}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[260px]">
            <Image
              src="/images/avatar.png"
              alt="Portrait of Yuming Yang"
              width={260}
              height={260}
              className="rounded-2xl border border-slate-200 bg-slate-50 object-cover shadow-sm"
              priority
            />
          </div>
        </section>
      </AnimatedReveal>

      <section>
        <SectionHeader
          eyebrow="Current Focus"
          title="Focus Areas"
        />
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

      <section>
        <SectionHeader eyebrow="Connect" title="Contact and Channels" />
        <div className="flex flex-wrap gap-3">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Email" ? undefined : "_blank"}
              rel={item.label === "Email" ? undefined : "noreferrer"}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-900"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Full Contact Page
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {latestWriting ? (
          <div>
            <SectionHeader
              eyebrow="Latest Writing"
              title="Recent Essays"
            />
            <ContentCard
              href={`/writing/${latestWriting.slug}`}
              title={latestWriting.title}
              excerpt={latestWriting.excerpt}
              date={latestWriting.date}
              tags={latestWriting.tags}
              meta={latestWriting.readTime}
              ctaHref="/writing"
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
              ctaLabel="More episodes"
              ctaHref="/podcast"
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
