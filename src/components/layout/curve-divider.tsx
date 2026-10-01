"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * A paper-coloured curve that hangs over the top of the dark footer and
 * flattens out as the footer scrolls into view.
 */
export function CurveDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["9vw", "0vw"]);

  return (
    // overflow-x-clip trims the 120%-wide curve sideways but lets it hang down.
    <div ref={ref} aria-hidden className="relative z-10 overflow-x-clip">
      <motion.div
        style={{ height }}
        className="absolute left-[-10%] top-0 w-[120%] rounded-b-[50%] bg-paper shadow-[0_45px_45px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
