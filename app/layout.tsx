import type { Metadata } from "next";
import "./globals.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yumingyang.com",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Yuming Yang | Personal Website",
    template: "%s | Yuming Yang",
  },
  description:
    "Personal website of Yuming Yang, M.S. candidate in Financial Economics at Columbia Business School.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yuming Yang | Personal Website",
    description:
      "Personal website of Yuming Yang, M.S. candidate in Financial Economics at Columbia Business School.",
    url: "/",
    siteName: "Yuming Yang",
    type: "website",
    images: ["/og-default.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuming Yang | Personal Website",
    description:
      "Personal website of Yuming Yang, M.S. candidate in Financial Economics at Columbia Business School.",
    images: ["/og-default.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-slate-900 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main
          id="main-content"
          className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8"
        >
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
