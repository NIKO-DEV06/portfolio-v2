import type { SVGProps } from "react";

import { cn } from "@/lib/cn";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

/** "↳" — points from a label to the line beneath it. */
export function CornerDownRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 4v7a4 4 0 0 0 4 4h11M15 10l5 5-5 5" />
    </svg>
  );
}

export function ArrowDownRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 7l10 10M17 8v9H8" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Wireframe globe whose meridians sweep to suggest rotation. */
export function Globe({ className, ...props }: IconProps) {
  const meridian =
    "origin-center [transform-box:fill-box] motion-safe:animate-meridian";
  return (
    <svg
      viewBox="0 0 32 32"
      {...base}
      strokeWidth={1.3}
      className={className}
      {...props}
    >
      <circle cx="16" cy="16" r="13" />
      <path d="M3 16h26M5.2 9h21.6M5.2 23h21.6" />
      <ellipse className={cn(meridian, "[--delay:0s]")} cx="16" cy="16" rx="13" ry="13" />
      <ellipse
        className={cn(meridian, "[--delay:-1.33s]")}
        cx="16"
        cy="16"
        rx="13"
        ry="13"
      />
      <ellipse
        className={cn(meridian, "[--delay:-2.66s]")}
        cx="16"
        cy="16"
        rx="13"
        ry="13"
      />
    </svg>
  );
}

// Brand marks are filled shapes rather than strokes.
const mark = { fill: "currentColor", "aria-hidden": true } as const;

/** Tallyn's "//." mark, from the Tallyn site's logo. */
export function TallynMark(props: IconProps) {
  return (
    <svg viewBox="0 0 42.04 28.96" {...mark} {...props}>
      <path d="M0 28.8957L14.4815 0L21.7223 0L7.24076 28.8957H0Z" />
      <path
        opacity="0.35"
        d="M15.9297 28.8957L30.4112 0L37.652 0L23.1704 28.8957H15.9297Z"
      />
      <path d="M37.5799 20.043L42.0339 24.4969L37.5799 28.9509L33.126 24.4969L37.5799 20.043Z" />
    </svg>
  );
}
