import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type RollTextProps = {
  text: string;
  className?: string;
  /** Delay between letters, in ms. */
  stagger?: number;
};

/**
 * Letters roll up and are replaced by a copy from below when the closest
 * `.group` ancestor is hovered or focused. Pure CSS, so it works in server
 * components too.
 *
 * Each letter is a two-line column moved by exactly one line (1.2em). The
 * window uses `items-start` so the columns keep their full two-line height
 * instead of being stretched to the window, which would halve the shift.
 */
export function RollText({ text, className, stagger = 14 }: RollTextProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden
        className="inline-flex h-[1.2em] items-start overflow-hidden leading-[1.2]"
      >
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            style={{ transitionDelay: `${i * stagger}ms` } as CSSProperties}
            className="flex flex-col transition-transform duration-[650ms] ease-out-expo group-hover:-translate-y-[1.2em] group-focus-visible:-translate-y-[1.2em]"
          >
            <span>{char === " " ? " " : char}</span>
            <span>{char === " " ? " " : char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
