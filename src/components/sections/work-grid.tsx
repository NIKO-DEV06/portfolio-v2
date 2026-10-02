'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import {
  MagneticButton,
  MagneticLink,
} from '@/components/motion/magnetic-button';
import { RevealText } from '@/components/motion/reveal-text';
import { ArrowUpRight } from '@/components/ui/icons';
import { RollText } from '@/components/ui/roll-text';
import type { Project } from '@/content/projects';
import { cn } from '@/lib/cn';
import { ease } from '@/lib/motion';

const wipe = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 1.4, ease: ease.inOutQuart },
} as const;

/**
 * Screenshot inside a tinted frame; wipes up into view, zooms on hover.
 * With `mat`, the screenshot keeps its own 16:10 shape, centred on a frame
 * of any shape, so a taller frame never crops it.
 */
function Shot({
  project,
  sizes,
  aspect,
  mat = false,
}: {
  project: Project;
  sizes: string;
  aspect: string;
  mat?: boolean;
}) {
  return (
    <motion.div
      {...wipe}
      className={cn('relative overflow-hidden rounded-lg', aspect)}
      style={{ backgroundColor: project.tone }}
    >
      <div
        className={cn(
          'absolute overflow-hidden rounded-[5px] shadow-[0_18px_44px_rgba(0,0,0,0.22)]',
          mat
            ? 'inset-x-[7%] top-1/2 aspect-[16/10] -translate-y-1/2'
            : 'inset-[7%]',
        )}
      >
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

/**
 * The lead project: text on the left (label at the top, story in the
 * middle, button at the bottom) spread over the height of the screenshot,
 * which sits on a tall mount on the right.
 */
function FeaturedProject({ project }: { project: Project }) {
  const host = new URL(project.href).hostname.replace(/^www\./, '');

  return (
    <article className="grid gap-10 lg:grid-cols-2 lg:gap-x-6">
      <div className="flex flex-col gap-10 lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow inline-flex items-center gap-2.5 border border-line px-3 py-2">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            Featured — my own product
          </p>
          {project.period && (
            <p className="eyebrow text-muted">{project.period}</p>
          )}
        </div>

        <div>
          <RevealText as="h3" text={project.title} className="text-heading" />
          {project.tagline && (
            <p className="mt-2 font-serif text-[clamp(1.35rem,1.9vw,1.85rem)] italic leading-tight text-ink-soft">
              {project.tagline}
            </p>
          )}
          <p className="mt-5 max-w-[36rem] text-lead text-ink-soft">
            {project.summary}
          </p>
          <p className="eyebrow mt-6 text-muted">{project.stack.join(' · ')}</p>
        </div>

        <MagneticLink
          href={project.href}
          external
          className="h-14 self-start rounded-full bg-ink px-7 text-paper"
          labelClassName="group-hover:text-ink group-focus-visible:text-ink"
        >
          Visit {host}
          <ArrowUpRight className="size-4" />
        </MagneticLink>
      </div>

      {/* Image first when stacked, so phones lead with the screenshot. */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group order-first block lg:order-none"
      >
        <Shot
          project={project}
          mat
          aspect="aspect-[16/10] lg:aspect-[4/3]"
          sizes="(min-width: 1024px) 48vw, 92vw"
        />
      </a>
    </article>
  );
}

function ProjectCard({
  project,
  number,
}: {
  project: Project;
  number: number;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Shot
        project={project}
        aspect="aspect-[16/10]"
        sizes="(min-width: 768px) 44vw, 92vw"
      />
      <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-5">
        <h3 className="text-[clamp(1.85rem,2.8vw,2.75rem)] leading-none tracking-[-0.035em]">
          <RollText text={project.title} stagger={18} />
        </h3>
        <span className="eyebrow text-muted">
          {String(number).padStart(2, '0')}
        </span>
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

      <ul className="mt-[clamp(5rem,10vw,7rem)] grid gap-x-[clamp(1.5rem,4vw,4.5rem)] gap-y-[clamp(3.5rem,7vw,6.5rem)] md:grid-cols-2 md:pb-[clamp(4rem,9vw,8rem)]">
        <AnimatePresence initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.9, ease: ease.outExpo }}
              // Right-hand column sits lower for a staggered, editorial rhythm.
              className={cn(
                i % 2 === 1 && 'md:translate-y-[clamp(4rem,9vw,8rem)]',
              )}
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
            {expanded ? 'Show fewer' : `Show all projects (${projects.length})`}
          </MagneticButton>
        </div>
      )}
    </>
  );
}
