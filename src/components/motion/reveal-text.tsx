"use client";

import { motion, stagger, type Variants } from "motion/react";

import { plainText, splitWords } from "@/components/ui/accent-words";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: ease.outExpo } },
};

type RevealTextProps = {
  text: string;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  /** Seconds between words. */
  interval?: number;
};

/**
 * Words slide up from behind a mask, one after another, the first time the
 * text scrolls into view. `*word*` renders in the italic serif.
 */
export function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  interval = 0.04,
}: RevealTextProps) {
  const Tag = tags[as];
  const words = splitWords(text);

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: stagger(interval, { startDelay: delay }) },
        },
      }}
    >
      <span className="sr-only">{plainText(text)}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span
              variants={word}
              className={cn(
                "inline-block",
                w.accent && "font-serif font-normal italic tracking-normal",
              )}
            >
              {w.text}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
