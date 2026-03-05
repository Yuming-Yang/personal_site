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
            Mathematics & Economics (2020 - 2024)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-medium">NextGen Digital Venture</span> -
              Intern (Dec 2025 - Now)
            </li>
            <li>
              <span className="font-medium">Five Dimensions Energy</span> -
              Quantitative Research Intern (June 2025 - August 2025)
            </li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
