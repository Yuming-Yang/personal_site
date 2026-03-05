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
    title: "FactorModeling",
    summary:
      "A quantitative equity factor research framework in Python with reusable factor operators, rolling factor selection (ICIR, momentum, and MVO), composite-factor construction, and long/short portfolio simulation with turnover and transaction-cost controls.",
    tags: ["Python", "Pandas", "NumPy", "CVXPY", "Statsmodels", "Jupyter"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Yuming-Yang/FactorModeling",
      },
      {
        label: "Pipeline Notebook",
        href: "https://github.com/Yuming-Yang/FactorModeling/blob/main/pipeline.ipynb",
      },
    ],
    featured: false,
    status: "live",
    notes:
      "Includes multi-manager backtesting and a performance analyzer for annualized return, drawdown, Sharpe/Sortino, turnover, and leg attribution.",
  },
];
