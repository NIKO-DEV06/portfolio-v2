"use client";

import { motion, stagger } from "motion/react";
import type { ReactNode } from "react";

import { ease } from "@/lib/motion";

const tags = { div: motion.div, h2: motion.h2 } as const;

type RevealLinesProps = {
  lines: ReactNode[];
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
};

/** Each line slides up from behind a mask when the block scrolls into view. */
export function RevealLines({
  lines,
  as = "div",
  className,
  delay = 0,
}: RevealLinesProps) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: stagger(0.09, { startDelay: delay }) },
        },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 1.2, ease: ease.outExpo },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
