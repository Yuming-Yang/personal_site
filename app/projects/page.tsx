import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/content/projects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description: "Selected projects, tooling, and ongoing work.",
  path: "/projects",
});

function statusVariant(status: "live" | "in-progress" | "placeholder") {
  if (status === "live") {
    return "success" as const;
  }

  if (status === "in-progress") {
    return "warning" as const;
  }

  return "default" as const;
}

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Projects"
        title="Selected Work"
        subtitle="Data products, market research tooling, and ongoing quantitative initiatives."
      />

      <section className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="leading-snug">{project.title}</CardTitle>
                <Badge variant={statusVariant(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              {project.links.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              ) : null}

              {project.notes ? (
                <p className="text-sm text-slate-500">{project.notes}</p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
