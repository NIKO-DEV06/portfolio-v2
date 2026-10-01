"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type CSSProperties, type PointerEvent } from "react";

import { VelocityMarquee } from "@/components/motion/velocity-marquee";
import { ArrowDownRight, ArrowUpRight, Globe } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { site } from "@/content/site";
import { INTRO_DELAY } from "@/lib/motion";

const drift = { stiffness: 50, damping: 20, mass: 0.8 };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Portrait sinks slightly slower than the page as you scroll away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitScroll = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  // ...and leans gently towards the cursor.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const portraitX = useSpring(pointerX, drift);
  const portraitY = useSpring(pointerY, drift);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 28);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 14);
  }

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      style={{ "--intro-delay": `${INTRO_DELAY}s` } as CSSProperties}
      className="relative isolate flex h-svh min-h-[40rem] flex-col justify-end overflow-hidden bg-paper"
    >
      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>

      {/* Portrait, multiplied into the paper so its white backdrop disappears. */}
      <motion.div
        style={{ y: portraitScroll }}
        className="pointer-events-none absolute inset-x-0 -bottom-8 flex justify-center mix-blend-multiply"
      >
        <motion.div style={{ x: portraitX, y: portraitY }}>
          <div className="relative aspect-[826/1062] h-[66svh] [--rise-distance:6%] [--delay:var(--intro-delay)] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] motion-safe:animate-rise-in md:h-[86svh]">
            <Image
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover object-top contrast-[1.06] grayscale"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Location pill — hover it for local time. */}
      <div className="absolute left-0 top-[48%] z-10 hidden -translate-y-1/2 [--delay:calc(var(--intro-delay)+0.5s)] motion-safe:animate-slide-in-left md:block">
        {/* Left padding matches the `gutter` utility so text lines up. */}
        <div className="group flex items-center gap-10 rounded-r-full bg-ink py-3.5 pl-[clamp(1rem,3.125vw,2.8125rem)] pr-3.5 text-paper">
          <div className="relative h-[2.6em] overflow-hidden text-[0.95rem] leading-[1.3]">
            <p className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-full">
              Based in the
              <br />
              {site.location}
            </p>
            <p
              aria-hidden
              className="absolute inset-0 translate-y-full transition-transform duration-700 ease-out-expo group-hover:translate-y-0"
            >
              Local time
              <br />
              <LocalTime timeZone={site.timeZone} />
            </p>
          </div>
          <span className="grid size-[4.25rem] place-items-center rounded-full bg-white/12">
            <Globe className="size-7" />
          </span>
        </div>
      </div>

      {/* Role */}
      <div className="absolute left-[clamp(1rem,3.125vw,2.8125rem)] top-28 z-10 [--delay:calc(var(--intro-delay)+0.6s)] motion-safe:animate-rise-in md:left-auto md:right-[clamp(1rem,3.125vw,2.8125rem)] md:top-[30%]">
        <ArrowDownRight className="mb-6 size-5 md:mb-12 md:size-6" />
        <p className="text-[clamp(1.55rem,2.1vw,2.25rem)] leading-[1.15] tracking-[-0.025em]">
          Full-Stack & AI
          <br />
          Product Engineer
        </p>
        <a
          href={site.founderOf.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group eyebrow mt-5 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
        >
          Founder of {site.founderOf.name}
          <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Name — inverted against whatever sits behind it. */}
      <div
        aria-hidden
        className="relative z-10 mb-[clamp(1.25rem,4svh,3rem)] overflow-hidden text-white mix-blend-difference"
      >
        <div className="[--delay:calc(var(--intro-delay)+0.25s)] motion-safe:animate-mask-up">
          <VelocityMarquee
            text={`${site.name} —`}
            className="text-[clamp(5.75rem,27vw,9rem)] leading-[1.12] tracking-[-0.045em] md:text-display"
          />
        </div>
      </div>
    </section>
  );
}
