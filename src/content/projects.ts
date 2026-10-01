import type { StaticImageData } from "next/image";

import certifi from "@/assets/work/certifi.png";
import tallyn from "@/assets/work/tallyn.png";

// Ask Cloudinary for a capped-width JPEG instead of the 2–3 MB source PNGs,
// so the Next.js image optimiser has a small, fast file to work from.
const cloudinary = (path: string) =>
  `https://res.cloudinary.com/djabkdvek/image/upload/c_limit,w_1800,f_jpg,q_auto/${path}`;

export type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  stack: string[];
  href: string;
  image: StaticImageData | string;
  /** Background colour behind the screenshot in previews and tiles. */
  tone: string;
  /** Featured projects show first; the rest sit behind "More work". */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "tallyn",
    title: "Tallyn",
    category: "SaaS platform",
    role: "Founder · Full-stack & AI",
    summary:
      "Multi-tenant SaaS for sales, inventory, customer debt, expenses and profit, with an AI command system that turns plain-English requests into validated business actions.",
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Stripe", "OpenAI"],
    href: "https://www.tallyn.app",
    image: tallyn,
    tone: "#16181a",
    featured: true,
  },
  {
    slug: "we-move",
    title: "We Move",
    category: "Website & admin platform",
    role: "Frontend lead · Full-stack",
    summary:
      "Led frontend for The We Move Project website and contributed heavily across the full-stack admin dashboard.",
    stack: ["Next.js", "NestJS", "GraphQL", "TypeORM", "Framer Motion"],
    href: "https://www.thewemoveproject.co.uk/",
    image: cloudinary("v1748167949/wemove_yhctuf.png"),
    tone: "#d9d2c5",
    featured: true,
  },
  {
    slug: "pengame",
    title: "PenGame",
    category: "Events & e-commerce",
    role: "Full-stack development",
    summary:
      "The official PenGame Rap Battle platform — Sanity CMS, Shopify merch and ticket sales, built for speed.",
    stack: ["Next.js", "Sanity", "GROQ", "Shopify", "Tailwind CSS"],
    href: "https://www.pengame.co.uk/",
    image: cloudinary("v1748167947/pengame-new_lcpc15.png"),
    tone: "#1e1e20",
    featured: true,
  },
  {
    slug: "certifi",
    title: "Certifi",
    category: "Marketing website",
    role: "Lead developer",
    summary:
      "A polished marketing experience with strong visual storytelling, smooth motion and a responsive modern UI.",
    stack: ["Next.js", "Sanity", "GSAP", "Framer Motion"],
    href: "https://www.certifi.world/",
    image: certifi,
    tone: "#dfe3df",
    featured: true,
  },
  {
    slug: "the-shuts",
    title: "The Shuts",
    category: "Creator site & store",
    role: "Lead developer",
    summary:
      "Website and Shopify storefront for UK professional eater Leah Shutkever.",
    stack: ["Next.js", "Shopify", "Tailwind CSS", "Framer Motion"],
    href: "https://the-shuts-website.vercel.app/",
    image: cloudinary(
      "v1751361412/Screenshot_2025-06-27_at_19.13.42_jf6aqj.png",
    ),
    tone: "#e7d8c3",
    featured: true,
  },
  {
    slug: "media-beast",
    title: "Media Beast",
    category: "Agency website",
    role: "Development",
    summary:
      "An interactive agency site with smooth animation and intuitive navigation.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    href: "https://www.mediabeast.co.uk/",
    image: cloudinary("v1748167943/mb_wpc3ei.png"),
    tone: "#232325",
    featured: true,
  },
  {
    slug: "rareboots",
    title: "Rareboots",
    category: "Marketplace",
    role: "Frontend & API integration",
    summary: "Frontend and API integration for a football boots marketplace.",
    stack: ["Next.js", "Medusa", "GraphQL", "shadcn/ui"],
    href: "https://www.rarebootsmarketplace.com/",
    image: cloudinary("v1748167947/rbm_oc6jlx.png"),
    tone: "#d6dadf",
    featured: false,
  },
  {
    slug: "originals-dubai",
    title: "Originals Dubai",
    category: "Event booking site",
    role: "Development",
    summary:
      "Promotional site for Originals Island Dubai with a smooth booking flow.",
    stack: ["Next.js", "Firebase", "Framer Motion"],
    href: "https://dubai.originalsworld.co.uk/",
    image: cloudinary("v1748167950/originals_bfyvn6.png"),
    tone: "#cdbb9f",
    featured: false,
  },
  {
    slug: "hessian",
    title: "Hessian",
    category: "Event catering website",
    role: "Development",
    summary: "A sleek, animated site for a premium UK event caterer.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    href: "https://www.hessianevents.com/",
    image: cloudinary("v1748167942/hessian_sdif9o.png"),
    tone: "#e3ddd2",
    featured: false,
  },
  {
    slug: "felsunny",
    title: "Felsunny",
    category: "E-mobility platform",
    role: "Frontend lead",
    summary:
      "Electric-mobility platform with data-driven catalogues — 50% faster loads and a 15% lift in conversion.",
    stack: ["Next.js", "TypeScript", "GSAP", "Framer Motion"],
    href: "https://www.felsunny.com/",
    image: cloudinary("v1748168019/felsunny_umnbkb.png"),
    tone: "#d5e2da",
    featured: false,
  },
];
