import type { Metadata } from "next";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { research } from "@/content/research";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Research",
  description: "Research notes and outputs.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Research"
        title="Research"
        subtitle="Selected Financial Economics Research Projects."
      />

      <section className="grid gap-5">
        {research.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{item.title}</CardTitle>
                <Badge>{item.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-medium">Venue:</span> {item.venue}
              </p>
              <p>
                <span className="font-medium">Date:</span> {item.date}
              </p>
              <p>{item.abstract}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
