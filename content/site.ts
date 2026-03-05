import { NavItem, SiteProfile } from "@/lib/types";

export const siteProfile: SiteProfile = {
  name: "Yuming Yang",
  headline: "Building the architecture for the new macro regime.",
  summary:
    "I view markets as complex systems governed by incentives and technological friction. Trained in Mathematics and Economics at Peking University and currently pursuing a Master of Science in Financial Economics at Columbia Business School, my focus is on the how: designing research processes that scale beyond intuition.",
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
      title: "Global Macro & Systematic Modeling",
      description:
        "I build frameworks to decode the world’s economic architecture. By bridging discretionary macro thinking with data-driven modeling, I develop investment strategies that operate with the rigor of a global macro fund.",
    },
    {
      title: "Digital Asset Research",
      description:
        "I deep-dive into the crypto frontier, leveraging on-chain analytics and protocol-level research to find signal in decentralized markets.",
    },
    {
      title: "AI Engineering",
      description:
        "I do not just follow AI. I build with it. I engineer custom tools and automated workflows to turn high-velocity, high-entropy data into structured, testable ideas.",
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
