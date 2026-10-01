"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import type { Project } from "@/content/projects";

/** Two rows of project tiles that slide in opposite directions on scroll. */
export function Gallery({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = reduce ? 0 : 14;
  const rowA = useTransform(scrollYProgress, [0, 1], ["0%", `-${shift}%`]);
  const rowB = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, "0%"]);

  const half = Math.ceil(projects.length / 2);

  return (
    <section
      ref={ref}
      aria-label="Project gallery"
      className="flex flex-col gap-[max(0.75rem,1.6vw)] overflow-hidden py-[clamp(2rem,5vw,4rem)]"
    >
      <motion.ul style={{ x: rowA }} className="flex w-max gap-[max(0.75rem,1.6vw)]">
        {projects.slice(0, half).map((project) => (
          <Tile key={project.slug} project={project} />
        ))}
      </motion.ul>
      <motion.ul style={{ x: rowB }} className="flex w-max gap-[max(0.75rem,1.6vw)]">
        {projects.slice(half).map((project) => (
          <Tile key={project.slug} project={project} />
        ))}
      </motion.ul>
    </section>
  );
}

function Tile({ project }: { project: Project }) {
  return (
    <li className="w-[64vw] shrink-0 sm:w-[40vw] lg:w-[25vw]">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — ${project.category}`}
        className="group relative block aspect-[16/11] overflow-hidden rounded-md"
        style={{ backgroundColor: project.tone }}
      >
        <span className="absolute inset-[10%] overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 21vw, (min-width: 640px) 33vw, 52vw"
            className="object-cover object-top"
          />
        </span>
      </a>
    </li>
  );
}
