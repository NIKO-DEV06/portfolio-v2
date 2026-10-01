"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * The footer's contents start shifted up and settle as you reach the end of
 * the page, so it feels revealed from underneath rather than scrolled in.
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-28%", "0%"]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
