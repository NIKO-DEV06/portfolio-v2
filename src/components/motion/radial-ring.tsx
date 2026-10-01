'use client';

import { animate, type AnimationPlaybackControls } from 'motion/react';
import { useRef, type PointerEvent, type ReactNode } from 'react';

/**
 * Wraps the radial marquee's rotating ring. The spin itself is a CSS
 * animation; hovering a card eases its speed down to a stop (rather than
 * freezing mid-motion) and leaving eases it back up to full speed.
 */
export function RadialRing({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tween = useRef<AnimationPlaybackControls | null>(null);

  function easeSpeedTo(rate: number) {
    const spin = ref.current
      ?.getAnimations()
      .find(
        (animation): animation is CSSAnimation =>
          animation instanceof CSSAnimation &&
          animation.animationName === 'radial-spin',
      );
    // No animation when reduced motion is on — nothing to ease.
    if (!spin) return;

    tween.current?.stop();
    tween.current = animate(spin.playbackRate, rate, {
      duration: rate === 0 ? 0.9 : 1.3,
      ease: rate === 0 ? 'easeOut' : 'easeInOut',
      onUpdate: (value) => {
        // Changing playbackRate keeps the current position, so no jumps.
        spin.playbackRate = value;
      },
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'mouse') easeSpeedTo(0);
      }}
      onPointerLeave={(event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'mouse') easeSpeedTo(1);
      }}
    >
      {children}
    </div>
  );
}
