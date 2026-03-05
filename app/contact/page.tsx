import type { Metadata } from "next";
import {
  ArrowUpRight,
  Globe2,
  Mail,
  MapPin,
  type LucideIcon,
  Linkedin,
  Music2,
  Newspaper,
  Send,
  Twitter,
} from "lucide-react";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { siteProfile } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact details and social links for Yuming Yang.",
  path: "/contact",
});

const socialIconByLabel: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  "X / Twitter": Twitter,
  GitHub: Globe2,
  Substack: Newspaper,
  Spotify: Music2,
  Telegram: Send,
};

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="I am always open to thoughtful discussions."
      />

      <section className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${siteProfile.email}`}
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="text-base font-medium text-slate-900">
                {siteProfile.email}
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-slate-900" />
        </a>

        <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-slate-500">Location</p>
            <p className="text-base font-medium text-slate-900">
              {siteProfile.location}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">
          Social Channels
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {siteProfile.socialLinks.map((link) => {
            const Icon = socialIconByLabel[link.label] ?? Globe2;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[72px] items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-base font-medium text-slate-900">
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-slate-900" />
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
