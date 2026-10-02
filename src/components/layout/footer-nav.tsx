"use client";

import type { PointerEvent } from "react";

import { ArrowRight } from "@/components/ui/icons";

const pages = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
];

/**
 * Notes which half of the row the pointer crossed, so the fill grows from
 * the edge it came in by and shrinks towards the edge it leaves by. Moving
 * down the list, the highlight seems to travel with the cursor.
 */
function trackEdge(event: PointerEvent<HTMLAnchorElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.dataset.edge =
    event.clientY < rect.top + rect.height / 2 ? "top" : "bottom";
}

/** Big page links on rules; hovering one fills its row and shows an arrow. */
export function FooterNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Footer" className={className}>
      <ul>
        {pages.map((page) => (
          <li key={page.href}>
            <a
              href={page.href}
              onPointerEnter={trackEdge}
              onPointerLeave={trackEdge}
              className="group relative isolate flex items-center justify-between border-b border-night-line py-[0.18em] text-[clamp(2.25rem,3.6vw,3.75rem)] font-semibold leading-none tracking-[-0.04em]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px top-0 -z-10 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100 group-data-[edge=top]:origin-top"
              />
              <span className="transition-[translate,color] duration-500 ease-out-expo group-hover:translate-x-[0.2em] group-hover:text-ink group-focus-visible:translate-x-[0.2em] group-focus-visible:text-ink">
                {page.label}
              </span>
              <ArrowRight
                strokeWidth={2.25}
                className="mr-[0.2em] size-[0.6em] -translate-x-[0.4em] text-ink opacity-0 transition-[translate,opacity] duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
