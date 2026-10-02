'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/cn';

type ProximityTextProps = {
  lines: string[];
  className?: string;
  /** Weight at rest and right under the cursor — the font must be variable. */
  rest?: number;
  peak?: number;
  /** How far the effect reaches, as a fraction of the viewport width. */
  reach?: number;
  /** Letters rise from behind a mask on first paint. */
  intro?: boolean;
};

/**
 * Display text whose letters shift weight (heavier or lighter, depending on
 * `rest`/`peak`) the closer the cursor gets. Listens
 * across the whole enclosing section, so the type reacts before you reach it.
 * Decorative — pair it with real text for screen readers.
 */
export function ProximityText({
  lines,
  className,
  rest = 400,
  peak = 800,
  reach = 0.3,
  intro = false,
}: ProximityTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    const area = root?.closest<HTMLElement>('section, footer');
    if (!root || !area || reduce) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;

    const letters = Array.from(
      root.querySelectorAll<HTMLElement>('[data-letter]'),
    );
    const weights = letters.map(() => rest);
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const tick = () => {
      // Read every position first, then write, so layout runs once per frame.
      const rects = letters.map((el) => el.getBoundingClientRect());
      const radius = window.innerWidth * reach;
      let settling = false;

      letters.forEach((el, i) => {
        let target = rest;
        if (pointer) {
          const r = rects[i];
          const distance = Math.hypot(
            pointer.x - (r.left + r.width / 2),
            pointer.y - (r.top + r.height / 2),
          );
          const t = Math.max(0, 1 - distance / radius);
          target = rest + (peak - rest) * t * t * (3 - 2 * t);
        }
        weights[i] += (target - weights[i]) * 0.15;
        if (Math.abs(target - weights[i]) > 0.5) settling = true;
        el.style.fontWeight = String(Math.round(weights[i]));
      });

      frame = settling ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
    };
  }, [rest, peak, reach, reduce]);

  const offsets = lines.map((_, i) => lines.slice(0, i).join('').length);

  return (
    <span ref={ref} aria-hidden className={cn('block', className)}>
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="block overflow-hidden whitespace-nowrap pb-[0.1em] -mb-[0.1em]"
        >
          {Array.from(line).map((char, i) => (
            <span
              key={i}
              data-letter
              style={{
                fontWeight: rest,
                animationDelay: intro
                  ? `calc(var(--intro-delay, 0s) + ${(offsets[lineIndex] + i) * 35}ms)`
                  : undefined,
              }}
              className={cn(
                'inline-block',
                intro && 'motion-safe:animate-letter-rise',
              )}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
