// The most important tools from each area of the CV, about two rows of
// pills per column.
export const capabilities = [
  {
    title: "Product engineering",
    body: "Zero-to-one SaaS, multi-tenancy, system design, monetisation and onboarding — owned from discovery to iteration.",
    tools: ["SaaS architecture", "System design", "Stripe", "PostHog", "CI/CD", "AWS"],
  },
  {
    title: "Frontend",
    body: "Accessible, fast interfaces in TypeScript, React and Next.js, with motion that earns its place.",
    tools: ["TypeScript", "React", "Next.js", "React Native", "Tailwind CSS", "GSAP"],
  },
  {
    title: "Backend & data",
    body: "Reliable APIs and data workflows built on Node.js, NestJS, GraphQL and PostgreSQL.",
    tools: ["Node.js", "NestJS", "GraphQL", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    title: "AI engineering",
    body: "LLM-powered workflows, natural-language command systems, AI search, recommendations and business insights.",
    tools: ["OpenAI", "Claude", "LLM workflows", "AI search", "Prompt design"],
  },
] as const;
