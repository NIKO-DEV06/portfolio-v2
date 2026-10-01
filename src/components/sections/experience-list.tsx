"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

import { ArrowUpRight, Plus } from "@/components/ui/icons";
import { UnderlineLink } from "@/components/ui/underline-link";
import type { Role } from "@/content/experience";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

/** Accordion of roles; one open at a time, the first open by default. */
export function ExperienceList({ items }: { items: Role[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-role-${i}`;

        return (
          <li key={item.company} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group relative grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-7 text-left md:grid-cols-12 md:py-9"
              >
                <span className="eyebrow col-start-1 text-muted md:col-span-2">
                  {item.period}
                </span>
                <span className="col-start-1 text-[clamp(1.75rem,2.7vw,2.75rem)] leading-none tracking-[-0.035em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:col-span-4 md:col-start-3">
                  {item.company}
                </span>
                <span className="col-start-1 text-ink-soft md:col-span-5 md:col-start-7">
                  {item.role}
                </span>
                <span className="col-start-2 row-span-3 row-start-1 grid size-11 place-items-center justify-self-end rounded-full border border-line transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:col-span-1 md:col-start-12 md:row-span-1">
                  <Plus
                    className={cn(
                      "size-4 transition-transform duration-500 ease-out-expo",
                      isOpen && "rotate-45",
                    )}
                  />
                </span>
                {/* Hover underline sits on the row's border, so only draw it
                    while closed — open, it would split the row from its details. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-out-expo",
                    !isOpen && "group-hover:scale-x-100",
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: ease.outExpo }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-x-6 gap-y-5 pb-10 md:grid-cols-12">
                    <p className="eyebrow text-muted md:col-span-4 md:col-start-3">
                      {item.location}
                    </p>
                    <div className="md:col-span-5 md:col-start-7">
                      <p className="text-lead text-ink-soft">{item.summary}</p>
                      {item.href && (
                        <UnderlineLink
                          href={item.href}
                          external
                          className="mt-5 gap-1.5 text-[0.95rem]"
                        >
                          Visit {item.company}
                          <ArrowUpRight className="size-3.5" />
                        </UnderlineLink>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
