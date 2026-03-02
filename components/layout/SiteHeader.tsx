import Link from "next/link";

import { primaryNav } from "@/content/site";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-slate-900"
          >
            Yuming Yang
          </Link>
          <Separator className="hidden h-5 w-px bg-slate-200 md:block" />
          <nav
            className="hidden items-center gap-2 text-sm md:flex"
            aria-label="Primary"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-800 transition hover:border-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
