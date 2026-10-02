"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * The footer's contents start shifted up by --reveal-travel and settle as you
 * reach the end of the page, so the footer feels revealed from underneath.
 * Give the contents that much top padding and only the padding is ever
 * hidden behind the top edge, never the content itself.
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Share of the travel still to go: 1 as the footer enters, 0 at the end.
  const remaining = useTransform(scrollYProgress, (progress) =>
    reduce ? 0 : 1 - progress,
  );

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ "--remaining": remaining } as MotionStyle}
        className="-translate-y-[calc(var(--remaining)*var(--reveal-travel))]"
      >
        {children}
      </motion.div>
    </div>
  );
}
