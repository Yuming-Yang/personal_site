import { NavItem, SiteProfile } from "@/lib/types";

export const siteProfile: SiteProfile = {
  name: "Yuming Yang",
  headline:
    "Finance professional focused on macro investing, crypto research, and quantitative finance",
  summary:
    "I am currently pursuing an M.S. in Financial Economics at Columbia Business School after completing dual B.S. degrees in Mathematics and Economics at Peking University.",
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
      title: "Crypto",
      description:
        "Research and analysis of cryptocurrency markets and blockchain technology.",
    },
    {
      title: "Macro Economics",
      description:
        "Global economic trends and their implications for investment strategy.",
    },
    {
      title: "Quantitative Finance",
      description:
        "Systematic approaches, risk frameworks, and market data interpretation.",
    },
    {
      title: "Market Research",
      description:
        "Data-driven insights across traditional and alternative asset classes.",
    },
  ],
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Podcast", href: "/podcast" },
  { label: "Publications", href: "/publications" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
