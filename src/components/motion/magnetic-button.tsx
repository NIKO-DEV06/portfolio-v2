"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useRef,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const spring = { stiffness: 170, damping: 15, mass: 0.15 };

/**
 * Magnetic pull towards the cursor plus a fill that rises from the bottom on
 * hover and exits through the top on leave.
 */
function useMagneticFill<T extends HTMLElement>(strength: number) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<T>();
  const hovered = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  // The label travels a little further than the button for a sense of depth.
  const labelX = useTransform(springX, (v) => v * 0.4);
  const labelY = useTransform(springY, (v) => v * 0.4);

  // `data-filled` lets labels change colour in sync with the fill
  // (style them with `group-data-filled:`).
  const fillIn = () => {
    hovered.current = true;
    scope.current?.setAttribute("data-filled", "");
    animate(
      "[data-fill]",
      { top: ["100%", "-25%"] },
      { duration: 0.6, ease: ease.outExpo },
    );
  };

  const fillOut = () => {
    hovered.current = false;
    scope.current?.removeAttribute("data-filled");
    x.set(0);
    y.set(0);
    animate(
      "[data-fill]",
      { top: "-160%" },
      { duration: 0.6, ease: ease.outExpo },
    ).then(() => {
      if (!hovered.current) {
        animate("[data-fill]", { top: "100%" }, { duration: 0 });
      }
    });
  };

  // The scope ref is returned on its own so render code never reads it.
  const offsets = { x: springX, y: springY, labelX, labelY };
  const handlers = {
    onPointerMove: (e: PointerEvent<T>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    onPointerEnter: (e: PointerEvent<T>) => {
      if (e.pointerType === "mouse") fillIn();
    },
    onPointerLeave: (e: PointerEvent<T>) => {
      if (e.pointerType === "mouse") fillOut();
    },
    onFocus: (e: FocusEvent<T>) => {
      if (e.currentTarget.matches(":focus-visible")) fillIn();
    },
    onBlur: () => {
      if (hovered.current) fillOut();
    },
  };

  return [scope, offsets, handlers] as const;
}

const shell =
  "group relative isolate inline-flex items-center justify-center overflow-hidden";

type BaseProps = {
  children: ReactNode;
  className?: string;
  /** Classes for the rising fill, e.g. its background colour. */
  fillClassName?: string;
  labelClassName?: string;
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
  "aria-label"?: string;
};

function Fill({ className }: { className?: string }) {
  return (
    <span
      data-fill
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-full z-0 h-[210%] w-[160%] -translate-x-1/2 rounded-[50%]",
        className,
      )}
    />
  );
}

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
  strength = 0.3,
  "aria-label": ariaLabel,
}: MagneticLinkProps) {
  const [scope, offsets, handlers] =
    useMagneticFill<HTMLAnchorElement>(strength);

  return (
    <motion.a
      ref={scope}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x: offsets.x, y: offsets.y }}
      className={cn(shell, className)}
      onPointerMove={handlers.onPointerMove}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onFocus={handlers.onFocus}
      onBlur={handlers.onBlur}
    >
      <Fill className={fillClassName} />
      <motion.span
        style={{ x: offsets.labelX, y: offsets.labelY }}
        className={cn(
          "relative z-10 inline-flex items-center gap-2 transition-colors duration-500",
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
  strength = 0.3,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: MagneticButtonProps) {
  const [scope, offsets, handlers] =
    useMagneticFill<HTMLButtonElement>(strength);

  return (
    <motion.button
      ref={scope}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      style={{ x: offsets.x, y: offsets.y }}
      className={cn(shell, "cursor-pointer", className)}
      onPointerMove={handlers.onPointerMove}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onFocus={handlers.onFocus}
      onBlur={handlers.onBlur}
    >
      <Fill className={fillClassName} />
      <motion.span
        style={{ x: offsets.labelX, y: offsets.labelY }}
        className={cn(
          "relative z-10 inline-flex items-center gap-2 transition-colors duration-500",
          labelClassName,
        )}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
