import { NavItem, SiteProfile } from "@/lib/types";

export const siteProfile: SiteProfile = {
  name: "Yuming Yang",
  headline: "M.S. candidate in Financial Economics at Columbia Business School",
  summary:
    "Currently pursuing an M.S. in Financial Economics at Columbia Business School after completing dual B.S. degrees in Mathematics and Economics at Peking University, and graduated from Shanghai High School.",
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
      title: "Quantitative Finance",
      description:
        "Systematic research, data analysis, and model-driven investment frameworks.",
    },
    {
      title: "AI",
      description:
        "Applying AI methods to financial research workflows and decision support.",
    },
    {
      title: "Crypto",
      description:
        "Market structure research and on-chain analysis across digital assets.",
    },
    {
      title: "Macro Investing",
      description:
        "Top-down investment perspectives informed by global economic regimes.",
    },
  ],
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Podcast", href: "/podcast" },
  { label: "Research", href: "/research" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
