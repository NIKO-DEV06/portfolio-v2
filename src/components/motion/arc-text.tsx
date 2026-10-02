"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useEffect, useRef } from "react";

// How sharply the line curves when the word first appears, in 1/em
// (a circle about 3.3 letter-heights across). 0 is a straight line.
const START_BEND = 0.3;

/**
 * Letters set on an arc that flattens into a straight line as the word
 * scrolls into view, like text on a circle whose radius grows to infinity.
 * Each letter tilts in proportion to its distance from the middle and dips
 * by its square, so the outer letters trail in last.
 */
export function ArcText({
  text,
  className,
  startAt = 0,
}: {
  text: string;
  className?: string;
  /**
   * Share of the word's height that must pass the bottom of the screen
   * before it starts straightening; useful when a transform pushes it down.
   * It's fully straight once the word's bottom reaches the bottom.
   */
  startAt?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [
      [startAt, 1],
      [1, 1],
    ],
  });
  const bend = useTransform(scrollYProgress, (progress) =>
    reduce ? 0 : START_BEND * (1 - progress),
  );

  // Each letter's distance from the middle of the word, in em, so it holds
  // at every font size. Re-measured once the web font swaps in.
  useEffect(() => {
    const word = ref.current;
    if (!word) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const letters = Array.from(word.children) as HTMLElement[];
      const first = letters[0];
      const last = letters[letters.length - 1];
      const middle = (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;
      const em = parseFloat(getComputedStyle(word).fontSize);
      for (const letter of letters) {
        const offset = (letter.offsetLeft + letter.offsetWidth / 2 - middle) / em;
        letter.style.setProperty("--offset", offset.toFixed(4));
      }
    };
    measure();
    void document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(word);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [text]);

  return (
    <motion.p
      ref={ref}
      style={{ "--bend": bend } as MotionStyle}
      className={className}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="inline-block origin-bottom [--offset:0] [transform:translateY(calc(var(--offset)*var(--offset)*var(--bend)*0.5em))_rotate(calc(var(--offset)*var(--bend)*1rad))]"
        >
          {char}
        </span>
      ))}
    </motion.p>
  );
}
