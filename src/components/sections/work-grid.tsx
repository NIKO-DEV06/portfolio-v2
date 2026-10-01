"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { MagneticButton, MagneticLink } from "@/components/motion/magnetic-button";
import { ArrowUpRight } from "@/components/ui/icons";
import { RollText } from "@/components/ui/roll-text";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const wipe = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 1.4, ease: ease.inOutQuart },
} as const;

/** Screenshot inside a tinted frame; wipes up into view, zooms on hover. */
function Shot({
  project,
  sizes,
  aspect,
}: {
  project: Project;
  sizes: string;
  aspect: string;
}) {
  return (
    <motion.div
      {...wipe}
      className={cn("relative overflow-hidden rounded-lg", aspect)}
      style={{ backgroundColor: project.tone }}
    >
      <div className="absolute inset-[7%] overflow-hidden rounded-[5px] shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
        />
      </div>
      <span
        aria-hidden
        className="absolute right-4 top-4 grid size-12 scale-0 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 ease-out-expo group-hover:scale-100 group-focus-visible:scale-100"
      >
        <ArrowUpRight className="size-5" />
      </span>
    </motion.div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid gap-10 md:grid-cols-12 md:items-end md:gap-x-6">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block md:col-span-8"
      >
        <Shot project={project} aspect="aspect-[16/10]" sizes="(min-width: 768px) 62vw, 92vw" />
      </a>
      <div className="md:col-span-4">
        <p className="eyebrow flex items-center gap-2.5 text-ink-soft">
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          Featured — my own product
        </p>
        <h3 className="mt-6 text-heading">{project.title}</h3>
        <p className="mt-5 text-lead text-ink-soft">{project.summary}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-line px-3 py-1.5 text-[0.8rem]"
            >
              {tool}
            </li>
          ))}
        </ul>
        <MagneticLink
          href={project.href}
          external
          className="mt-9 h-14 rounded-full bg-ink px-7 text-paper"
          labelClassName="group-hover:text-ink group-focus-visible:text-ink"
        >
          Visit {new URL(project.href).hostname.replace(/^www\./, "")}
          <ArrowUpRight className="size-4" />
        </MagneticLink>
      </div>
    </article>
  );
}

function ProjectCard({ project, number }: { project: Project; number: number }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Shot
        project={project}
        aspect="aspect-[4/3]"
        sizes="(min-width: 768px) 44vw, 92vw"
      />
      <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-5">
        <h3 className="text-[clamp(1.85rem,2.8vw,2.75rem)] leading-none tracking-[-0.035em]">
          <RollText text={project.title} stagger={18} />
        </h3>
        <span className="eyebrow text-muted">{String(number).padStart(2, "0")}</span>
      </div>
      <p className="mt-4 flex justify-between gap-4 text-[0.95rem]">
        <span className="text-muted">{project.category}</span>
        <span className="text-right">{project.role}</span>
      </p>
    </a>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const [lead, ...rest] = projects;
  const visible = rest.filter((project) => expanded || project.featured);
  const hiddenCount = rest.filter((project) => !project.featured).length;

  return (
    <>
      <FeaturedProject project={lead} />

      <ul className="mt-[clamp(5rem,10vw,9rem)] grid gap-x-[clamp(1.5rem,4vw,4.5rem)] gap-y-[clamp(3.5rem,7vw,6.5rem)] md:grid-cols-2 md:pb-[clamp(4rem,9vw,8rem)]">
        <AnimatePresence initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.9, ease: ease.outExpo }}
              // Right-hand column sits lower for a staggered, editorial rhythm.
              className={cn(i % 2 === 1 && "md:translate-y-[clamp(4rem,9vw,8rem)]")}
            >
              <ProjectCard project={project} number={i + 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-[clamp(3.5rem,6vw,5rem)] flex justify-center">
          <MagneticButton
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="h-14 rounded-full border border-ink px-8"
            fillClassName="bg-ink"
            labelClassName="group-hover:text-paper group-focus-visible:text-paper"
          >
            {expanded ? "Show fewer" : `Show all projects (${projects.length})`}
          </MagneticButton>
        </div>
      )}
    </>
  );
}
