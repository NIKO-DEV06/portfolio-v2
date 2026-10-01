"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import { plainText, splitWords, type Word } from "@/components/ui/accent-words";
import { cn } from "@/lib/cn";

type ScrollRevealTextProps = {
  text: string;
  className?: string;
};

/** Each word brightens from faint to full as the paragraph scrolls past. */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = splitWords(text);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plainText(text)}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <FadingWord
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
          {i < words.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}

function FadingWord({
  word,
  progress,
  range,
}: {
  word: Word;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn(word.accent && "font-serif italic tracking-normal")}
    >
      {word.text}
    </motion.span>
  );
}
