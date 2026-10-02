import type { StaticImageData } from 'next/image';

import beast from '@/assets/project-images/beast.png';
import bloco from '@/assets/project-images/bloco.png';
import certifi from '@/assets/project-images/certifi.png';
import felsmart from '@/assets/project-images/felsmart.png';
import players from '@/assets/project-images/players.png';
import shuts from '@/assets/project-images/shuts.png';
import tallyn from '@/assets/project-images/tallyn.png';

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
    slug: 'tallyn',
    title: 'Tallyn',
    category: 'SaaS platform',
    role: 'Founder · Full-stack & AI',
    summary:
      'Multi-tenant SaaS for sales, inventory, customer debt, expenses and profit, with an AI command system that turns plain-English requests into validated business actions.',
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Stripe', 'OpenAI'],
    href: 'https://www.tallyn.app',
    image: tallyn,
    tone: '#e8e7e2',
    featured: true,
  },
  {
    slug: 'bloco',
    title: 'Bloco',
    category: 'Event ticketing platform',
    role: 'Software engineer · Full-stack',
    summary:
      'Ticketing for events and organisers — discovery and checkout, white-label shops, visual page builders, memberships and payouts, plus AI-powered event discovery.',
    stack: ['Next.js', 'React', 'GraphQL', 'NestJS', 'Stripe', 'TypeScript'],
    href: 'https://bloco.co.uk',
    image: bloco,
    tone: '#1b1b1d',
    featured: true,
  },
  {
    slug: 'players-party-rooms',
    title: 'Players Party Rooms',
    category: 'Booking platform',
    role: 'Sole developer · Full-stack & AI',
    summary:
      'Hourly booking for a Coventry venue with 21 party rooms — live availability and pricing, Stripe checkout, an AI assistant that recommends rooms in chat, and a staff dashboard.',
    stack: [
      'Next.js',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'Stripe',
      'OpenAI',
    ],
    href: 'https://www.playerspartyrooms.co.uk/',
    image: players,
    tone: '#141a33',
    featured: true,
  },
  {
    slug: 'the-shuts',
    title: 'The Shuts',
    category: 'Creator site & store',
    role: 'Lead developer',
    summary:
      'Website and Shopify storefront for UK professional eater Leah Shutkever.',
    stack: ['Next.js', 'Shopify', 'Tailwind CSS', 'Framer Motion'],
    href: 'https://www.theshuts.co.uk/',
    image: shuts,
    tone: '#e8e7e2',
    featured: true,
  },
  {
    slug: 'felsmart',
    title: 'Felsmart',
    category: 'E-mobility platform',
    role: 'Sole developer',
    summary:
      'Electric vehicles and EV charging in Abuja — vehicle and charger catalogues, test-drive bookings and commercial enquiries, with motion-rich UI.',
    stack: ['Next.js', 'TypeScript', 'GSAP', 'Motion'],
    href: 'https://felsmart.com',
    image: felsmart,
    tone: '#202124',
    featured: true,
  },
  {
    slug: 'media-beast',
    title: 'Media Beast',
    category: 'Agency website',
    role: 'Development',
    summary:
      'An interactive agency site with smooth animation and intuitive navigation.',
    stack: ['Next.js', 'TypeScript', 'Framer Motion'],
    href: 'https://www.mediabeast.co.uk/',
    image: beast,
    tone: '#232325',
    featured: true,
  },
  {
    slug: 'we-move',
    title: 'We Move',
    category: 'Website & admin platform',
    role: 'Frontend lead · Full-stack',
    summary:
      'Led frontend for The We Move Project website and contributed heavily across the full-stack admin dashboard.',
    stack: ['Next.js', 'NestJS', 'GraphQL', 'TypeORM', 'Framer Motion'],
    href: 'https://www.thewemoveproject.co.uk/',
    image: cloudinary('v1748167949/wemove_yhctuf.png'),
    tone: '#d9d2c5',
    featured: true,
  },

  {
    slug: 'rareboots',
    title: 'Rareboots',
    category: 'Marketplace',
    role: 'Frontend & API integration',
    summary: 'Frontend and API integration for a football boots marketplace.',
    stack: ['Next.js', 'Medusa', 'GraphQL', 'shadcn/ui'],
    href: 'https://www.rarebootsmarketplace.com/',
    image: cloudinary('v1748167947/rbm_oc6jlx.png'),
    tone: '#d6dadf',
    featured: false,
  },
  {
    slug: 'certifi',
    title: 'Certifi',
    category: 'Marketing website',
    role: 'Lead developer',
    summary:
      'A polished marketing experience with strong visual storytelling, smooth motion and a responsive modern UI.',
    stack: ['Next.js', 'Sanity', 'GSAP', 'Framer Motion'],
    href: 'https://www.certifi.world/',
    image: certifi,
    tone: '#0e1d2c',
    featured: false,
  },
  {
    slug: 'pengame',
    title: 'PenGame',
    category: 'Events & e-commerce',
    role: 'Full-stack development',
    summary:
      'The official PenGame Rap Battle platform — Sanity CMS, Shopify merch and ticket sales, built for speed.',
    stack: ['Next.js', 'Sanity', 'GROQ', 'Shopify', 'Tailwind CSS'],
    href: 'https://www.pengame.co.uk/',
    image: cloudinary('v1748167947/pengame-new_lcpc15.png'),
    tone: '#1e1e20',
    featured: false,
  },
  {
    slug: 'hessian',
    title: 'Hessian',
    category: 'Event catering website',
    role: 'Development',
    summary: 'A sleek, animated site for a premium UK event caterer.',
    stack: ['Next.js', 'TypeScript', 'Framer Motion'],
    href: 'https://www.hessianevents.com/',
    image: cloudinary('v1748167942/hessian_sdif9o.png'),
    tone: '#e3ddd2',
    featured: false,
  },
];
