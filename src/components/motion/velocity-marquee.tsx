"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/cn";

const COPIES = 4;

type VelocityMarqueeProps = {
  text: string;
  /** Resting speed in % of one copy per second. Negative scrolls left. */
  baseVelocity?: number;
  className?: string;
};

/**
 * An endless line of text that drifts on its own, speeds up with scroll
 * velocity, and flips direction when the scroll direction flips.
 */
export function VelocityMarquee({
  text,
  baseVelocity = -2.5,
  className,
}: VelocityMarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <span className="sr-only">{text}</span>
      <motion.div aria-hidden style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {Array.from({ length: COPIES }, (_, i) => (
          <span key={i} className="block pr-[0.3em]">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
