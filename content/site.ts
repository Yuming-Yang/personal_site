import { NavItem, SiteProfile } from "@/lib/types";

export const siteProfile: SiteProfile = {
  name: "Yuming Yang",
  headline: "Building the architecture for the new macro regime.",
  summary:
    'I view markets as complex systems governed by incentives and technological friction. With a background in Mathematics and Economics from Peking University and current graduate work at Columbia Business School (MSFE), my focus is on the "how" - designing research processes that scale beyond intuition.',
  location: "Shanghai",
  email: "YYang26@gsb.columbia.edu",
  socialLinks: [
    { label: "LinkedIn", href: "https://linkedin.com/in/yumingyang0" },
    { label: "X / Twitter", href: "https://twitter.com/Alanyang00" },
    { label: "GitHub", href: "https://github.com/Yuming-Yang" },
    { label: "Substack", href: "https://alanyang0.substack.com" },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/6TDS5fvxERSlGCapP7hsdp",
    },
    { label: "Telegram", href: "https://t.me/alanyang2002" },
  ],
  focusAreas: [
    {
      title: "Global Macro & Data",
      summary:
        "I combine macro thinking with systematic data to understand and invest in global markets. I develop frameworks to navigate shifting regimes, constantly refining my thesis by stress-testing ideas against real-world outcomes.",
    },
    {
      title: "Digital Assets & Web3",
      summary:
        "I treat crypto as a core macro asset class, supplemented by deep-dives into on-chain data for specific trading signals. I stay in the weeds of Web3 - tracking protocol shifts and emerging startups to find the next structural edge.",
    },
    {
      title: "AI Tooling",
      summary:
        "I don't just follow AI; I build with it. I engineer custom tools and automated workflows to turn high-entropy data into structured, testable ideas.",
    },
  ],
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Podcast", href: "/podcast" },
  { label: "Research", href: "/research" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
