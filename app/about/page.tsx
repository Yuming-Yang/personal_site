import type { Metadata } from "next";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { siteProfile } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Background, focus areas, and education details for Yuming Yang.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="About"
        title="Macro, Crypto, and Quantitative Finance"
        subtitle="I focus on understanding complex market dynamics through rigorous, data-driven analysis."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          I am a finance professional with a strong quantitative foundation and
          a passion for understanding complex market dynamics. I am currently
          pursuing an M.S. in Financial Economics at Columbia Business School
          and hold dual B.S. degrees in Mathematics and Economics from Peking
          University.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {siteProfile.focusAreas.map((area) => (
          <article
            key={area.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {area.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{area.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Education</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li>
            <span className="font-medium">M.S. Financial Economics</span> -
            Columbia Business School (Expected 2027)
          </li>
          <li>
            <span className="font-medium">B.S. Mathematics & Economics</span> -
            Peking University (2024)
          </li>
        </ul>
      </section>
    </div>
  );
}
