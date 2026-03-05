import type { Metadata } from "next";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resume",
  description: "Education and professional profile summary.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Resume"
        title="Resume"
      />

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-medium">Columbia Business School</span> - M.S.
            Financial Economics (Expected 2027)
          </p>
          <p>
            <span className="font-medium">Peking University</span> - B.S.
            Mathematics & Economics (2024)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <p>
            TODO: confirm roles, organizations, and dates for professional
            experience entries.
          </p>
          <p>
            PLACEHOLDER: add 2-4 quantified impact bullets for each confirmed
            role.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & Interests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <p>
            Crypto research, macro investing, quantitative finance, and market
            intelligence tooling.
          </p>
          <p>
            TODO: confirm technical stack and research methods to include in
            final resume.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
