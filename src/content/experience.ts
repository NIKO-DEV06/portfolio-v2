export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  href?: string;
};

export const experience: Role[] = [
  {
    company: "Tallyn",
    role: "Founder & Full-Stack Product Engineer",
    period: "2026 — Now",
    location: "United Kingdom",
    href: "https://www.tallyn.app",
    summary:
      "Founded and built a multi-tenant SaaS for sales, inventory, customer debt, expenses and staff. Shipped an AI command system that turns natural-language requests into validated business actions, Stripe billing, branded invoice and receipt generation, and PostHog-driven onboarding — about 50 early users so far.",
  },
  {
    company: "Bloco",
    role: "Software Engineer",
    period: "2024 — Now",
    location: "United Kingdom",
    summary:
      "Full-stack features across ticketing, organiser platforms and internal tools: visual page builders, white-label theming, Stripe payments, recurring and timezone-aware events, memberships, and AI-powered event discovery and support.",
  },
  {
    company: "GO WFO",
    role: "Software Engineer",
    period: "2023 — 2024",
    location: "United States · Remote",
    summary:
      "Built responsive product experiences for a social platform for the extreme-sports community, working across React, Next.js, PHP, Node.js, MySQL and PostgreSQL.",
  },
  {
    company: "Felsunny Technology",
    role: "Frontend Engineer",
    period: "2022 — 2023",
    location: "Abuja · Remote",
    summary:
      "Designed and built an electric-mobility platform with data-driven catalogues, charger recommendations and motion-rich UI — cutting load time by 50% and lifting conversion by 15%.",
  },
  {
    company: "Walker’s Supermarket",
    role: "Frontend Engineer, part-time",
    period: "2023",
    location: "United Kingdom · Remote",
    summary:
      "Reusable React components and responsive interfaces for an existing Shopify storefront, plus cross-browser QA and code reviews.",
  },
  {
    company: "Loved Youngsters",
    role: "Web Developer, contract",
    period: "2023",
    location: "Remote",
    summary:
      "Designed and delivered a responsive Next.js and TypeScript website with a maintainable component architecture.",
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2020 — 2022",
    location: "Self-employed",
    summary:
      "Custom web and mobile apps for 10+ clients, managing delivery end to end with a focus on performance and scalability.",
  },
];
