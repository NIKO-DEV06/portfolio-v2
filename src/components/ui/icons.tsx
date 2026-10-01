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
