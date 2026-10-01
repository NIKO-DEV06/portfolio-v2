"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { MouseEvent, PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

const spring = { stiffness: 170, damping: 15, mass: 0.15 };

/** A gentle pull towards the cursor; the label travels a little further. */
function useMagnetic<T extends HTMLElement>(strength: number) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const labelX = useTransform(springX, (v) => v * 0.35);
  const labelY = useTransform(springY, (v) => v * 0.35);

  const offsets = { x: springX, y: springY, labelX, labelY };
  const handlers = {
    onPointerMove: (e: PointerEvent<T>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };

  return [offsets, handlers] as const;
}

const shell =
  "group relative isolate inline-flex items-center justify-center overflow-hidden";

/** Fill that wipes in from the left on hover and out to the right on leave. */
function Fill({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 origin-right scale-x-0 transition-transform duration-[650ms] ease-out-expo group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100",
        className,
      )}
    />
  );
}

type BaseProps = {
  children: ReactNode;
  className?: string;
  /** Classes for the hover fill, e.g. its background colour. */
  fillClassName?: string;
  /** Style the hovered label with `group-hover:` classes. */
  labelClassName?: string;
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
  "aria-label"?: string;
};

type MagneticLinkProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function MagneticLink({
  href,
  external,
  onClick,
  children,
  className,
  fillClassName = "bg-accent",
  labelClassName,
  strength = 0.2,
  "aria-label": ariaLabel,
}: MagneticLinkProps) {
  const [offsets, handlers] = useMagnetic<HTMLAnchorElement>(strength);

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x: offsets.x, y: offsets.y }}
      className={cn(shell, className)}
      onPointerMove={handlers.onPointerMove}
      onPointerLeave={handlers.onPointerLeave}
    >
      <Fill className={fillClassName} />
      <motion.span
        style={{ x: offsets.labelX, y: offsets.labelY }}
        className={cn(
          "inline-flex items-center gap-2 transition-colors duration-500",
          labelClassName,
        )}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

type MagneticButtonProps = BaseProps & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export function MagneticButton({
  onClick,
  children,
  className,
  fillClassName = "bg-accent",
  labelClassName,
  strength = 0.2,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: MagneticButtonProps) {
  const [offsets, handlers] = useMagnetic<HTMLButtonElement>(strength);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      style={{ x: offsets.x, y: offsets.y }}
      className={cn(shell, "cursor-pointer", className)}
      onPointerMove={handlers.onPointerMove}
      onPointerLeave={handlers.onPointerLeave}
    >
      <Fill className={fillClassName} />
      <motion.span
        style={{ x: offsets.labelX, y: offsets.labelY }}
        className={cn(
          "inline-flex items-center gap-2 transition-colors duration-500",
          labelClassName,
        )}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
