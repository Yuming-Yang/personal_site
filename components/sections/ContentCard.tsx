import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContentCard({
  href,
  title,
  excerpt,
  date,
  tags,
  meta,
  ctaLabel = "Read more",
  ctaHref,
}: {
  href: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  meta?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.12em] text-slate-500 uppercase">
          <span>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {meta ? (
            <span className="font-mono tracking-normal normal-case">
              {meta}
            </span>
          ) : null}
        </div>
        <CardTitle className="leading-snug">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        <CardDescription>{excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <Link
          href={ctaHref ?? href}
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
