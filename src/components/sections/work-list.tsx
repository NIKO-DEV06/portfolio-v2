"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState, type PointerEvent } from "react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { ArrowUpRight } from "@/components/ui/icons";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const previewSpring = { stiffness: 210, damping: 26, mass: 0.6 };
const cursorSpring = { stiffness: 480, damping: 34, mass: 0.4 };

export function WorkList({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, previewSpring);
  const previewY = useSpring(mouseY, previewSpring);
  const cursorX = useSpring(mouseX, cursorSpring);
  const cursorY = useSpring(mouseY, cursorSpring);

  const rows = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => expanded || project.featured);
  const extraCount = projects.filter((p) => !p.featured).length;

  function onPointerEnter(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse") return;
    // Start the preview at the cursor instead of flying in from the corner.
    for (const value of [mouseX, previewX, cursorX]) value.jump(event.clientX);
    for (const value of [mouseY, previewY, cursorY]) value.jump(event.clientY);
    setHovering(true);
  }

  function onPointerMove(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse") return;
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  }

  return (
    <>
      {/* Desktop: list rows with a floating preview */}
      <ul
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHovering(false)}
        className="hidden lg:block"
      >
        <AnimatePresence initial={false}>
          {rows.map(({ project, index }, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              transition={{ duration: 0.9, ease: ease.outExpo, delay: (i % 6) * 0.06 }}
              className="border-b border-line"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  "group grid grid-cols-12 items-center gap-6 py-[clamp(2rem,3.3vw,3.4rem)] transition-opacity duration-500",
                  hovering && active !== index && "opacity-30",
                )}
              >
                <h3 className="col-span-7 text-heading transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
                  {project.title}
                </h3>
                <p className="col-span-3 text-muted transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                  {project.category}
                </p>
                <p className="col-span-2 text-right">{project.role}</p>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Preview card that trails the cursor and slides between projects */}
      <motion.div
        aria-hidden
        style={{ x: previewX, y: previewY }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      >
        <motion.div
          initial={false}
          animate={{ scale: hovering ? 1 : 0 }}
          transition={{
            duration: 0.5,
            ease: hovering ? ease.outExpo : ease.inOutQuart,
          }}
          className="relative h-[21rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        >
          <div
            className="h-full w-full transition-transform duration-700 ease-out-expo"
            style={{ transform: `translateY(${active * -100}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project.slug}
                className="grid h-full w-full place-items-center"
                style={{ backgroundColor: project.tone }}
              >
                <div className="relative aspect-[16/10] w-[84%] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="22rem"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* "Visit" cursor that rides on top of the preview */}
      <motion.div
        aria-hidden
        style={{ x: cursorX, y: cursorY }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      >
        <motion.div
          initial={false}
          animate={{ scale: hovering ? 1 : 0 }}
          transition={{
            duration: 0.45,
            ease: hovering ? ease.outExpo : ease.inOutQuart,
          }}
          className="flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-accent text-[0.9rem] text-white"
        >
          Visit
          <ArrowUpRight className="size-3.5" />
        </motion.div>
      </motion.div>

      {/* Mobile and tablet: image cards */}
      <ul className="grid gap-x-6 gap-y-14 pt-10 sm:grid-cols-2 lg:hidden">
        <AnimatePresence initial={false}>
          {rows.map(({ project }) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.9, ease: ease.outExpo }}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-md"
                  style={{ backgroundColor: project.tone }}
                >
                  <div className="absolute inset-[9%] overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.25)]">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.category}`}
                      fill
                      sizes="(min-width: 640px) 42vw, 85vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 border-b border-line pb-5">
                  <h3 className="text-[2rem] leading-none tracking-[-0.03em]">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="size-5" />
                </div>
                <p className="mt-4 flex justify-between gap-4 text-[0.9rem]">
                  <span className="text-muted">{project.category}</span>
                  <span className="text-right">{project.role}</span>
                </p>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {extraCount > 0 && (
        <div className="mt-[clamp(3.5rem,6vw,5.5rem)] flex justify-center">
          <MagneticButton
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            strength={0.25}
            className="h-16 rounded-full border border-line px-10 text-[1rem]"
            fillClassName="bg-ink"
            labelClassName="group-data-filled:text-paper"
          >
            {expanded ? (
              "Show less"
            ) : (
              <>
                More work
                <sup className="eyebrow -mt-2 text-[0.65rem]">{extraCount}</sup>
              </>
            )}
          </MagneticButton>
        </div>
      )}
    </>
  );
}
