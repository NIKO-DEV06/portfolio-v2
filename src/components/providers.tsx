"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Smooth scrolling (Lenis) for the whole page. Lenis also handles in-page
 * anchor links and turns itself off for people who prefer reduced motion;
 * MotionConfig does the same for transform animations.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ autoRaf: true, lerp: 0.1, anchors: { duration: 1.4 } }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
