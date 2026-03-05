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
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {siteProfile.name}
            </h1>
            <p className="mt-3 max-w-3xl text-xl leading-snug font-medium text-slate-900 sm:text-2xl">
              {siteProfile.headline}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {siteProfile.summary}
            </p>
            <ul className="mt-4 max-w-3xl list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              {siteProfile.focusAreas.map((area) => (
                <li key={area.title}>
                  <span className="font-semibold text-slate-900">{area.title}:</span>{" "}
                  {area.summary}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-l-2 border-slate-300 pl-4">
              <p className="text-sm font-medium text-slate-800 sm:text-base">
                I&apos;m not just studying the markets; I&apos;m building the
                tools to navigate them.
              </p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[300px] rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image
                src="/images/avatar.png"
                alt="Portrait of Yuming Yang"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 340px, 78vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </figure>
        </section>
      </AnimatedReveal>

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
    </div>
  );
}
