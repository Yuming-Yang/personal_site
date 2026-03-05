import { NavItem, SiteProfile } from "@/lib/types";

export const siteProfile: SiteProfile = {
  name: "Yuming Yang",
  headline: "Building the architecture for the new macro regime.",
  summary:
    'I view markets as complex systems shaped by incentives and technological friction. Trained in Mathematics and Economics at Peking University and currently pursuing a Master of Science in Financial Economics at Columbia Business School, my focus is on the "how": building research processes that scale beyond intuition.',
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
      title: "Macro Systems and Strategy",
      heroSummary:
        "Regime frameworks that turn macro volatility into repeatable playbooks.",
      description:
        "I build top-down macro frameworks and pair them with systematic testing so every thesis is measurable, updateable, and deployable. The goal is institutional-grade decision quality with founder-level speed.",
    },
    {
      title: "Digital Assets and Market Structure",
      heroSummary:
        "On-chain and microstructure research to surface mispriced narratives early.",
      description:
        "I treat crypto as both a macro asset class and a technology adoption curve. I combine protocol analysis, on-chain flows, and market structure signals to identify where durable value can emerge before it becomes consensus.",
    },
    {
      title: "AI Engineering and Research Ops",
      heroSummary:
        "AI-native workflows that compress research cycles from weeks to days.",
      description:
        "I design internal tools and agents that automate data collection, synthesis, and hypothesis testing. This turns high-entropy information into a compounding research engine that scales insight without scaling headcount.",
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
