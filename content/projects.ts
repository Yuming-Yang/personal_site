import { ProjectItem } from "@/lib/types";

export const projects: ProjectItem[] = [
  {
    title: "Polymarket Dashboard",
    summary:
      "A modular analytics dashboard for market intelligence, built with Next.js App Router, TypeScript, and robust route-handler patterns.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Analytics"],
    links: [{ label: "Repository", href: "https://github.com/Yuming-Yang" }],
    featured: true,
    status: "live",
  },
  {
    title: "PLACEHOLDER: Additional Quant Research Project",
    summary: "TODO: confirm project title, objective, and measurable outcomes.",
    tags: ["PLACEHOLDER"],
    links: [],
    featured: false,
    status: "placeholder",
    notes: "TODO: add public link or private summary.",
  },
  {
    title: "PLACEHOLDER: Market Strategy Tool",
    summary:
      "TODO: confirm whether this project should be public and add a factual description.",
    tags: ["PLACEHOLDER"],
    links: [],
    featured: false,
    status: "placeholder",
    notes: "PLACEHOLDER: add stack, timeframe, and role.",
  },
];
