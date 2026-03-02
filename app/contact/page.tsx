import type { Metadata } from "next";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { siteProfile } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact details and social links for Yuming Yang.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="I am always open to thoughtful discussions around finance, macro, crypto, and quantitative research."
      />

      <Card>
        <CardContent className="space-y-4 p-6 text-sm text-slate-700">
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a
              href={`mailto:${siteProfile.email}`}
              className="text-slate-900 underline"
            >
              {siteProfile.email}
            </a>
          </p>
          <p>
            <span className="font-medium">Location:</span>{" "}
            {siteProfile.location}
          </p>

          <ul className="space-y-2 pt-2">
            {siteProfile.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 underline hover:text-slate-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
