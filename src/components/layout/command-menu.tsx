"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

import { ArrowUpRight } from "@/components/ui/icons";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

/** Dispatch this on `window` to open the menu from anywhere. */
export const OPEN_COMMAND_MENU = "command-menu:open";

type Command = {
  id: string;
  group: "Navigate" | "Projects" | "Contact";
  label: string;
  hint?: string;
  keywords?: string;
  external?: boolean;
  run: () => void;
};

const noop = () => () => {};

/** "⌘" on Apple devices, "Ctrl" elsewhere. */
export function useModifierKey() {
  return useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

/**
 * ⌘K / Ctrl+K command palette: jump to sections, open projects, copy the
 * email address. A nod to Tallyn's natural-language command bar.
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const lenis = useLenis();
  const listId = useId();
  const returnFocus = useRef<HTMLElement | null>(null);

  function show() {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setCopied(false);
    setOpen(true);
  }

  function hide() {
    setOpen(false);
    returnFocus.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) hide();
        else show();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_MENU, show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_MENU, show);
    };
  });

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  function scrollTo(target: string) {
    setOpen(false);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { duration: 1.4, force: true });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function openUrl(url: string) {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const commands: Command[] = [
    { id: "home", group: "Navigate", label: "Home", run: () => scrollTo("#home") },
    { id: "about", group: "Navigate", label: "About", run: () => scrollTo("#about") },
    { id: "work", group: "Navigate", label: "Selected work", run: () => scrollTo("#work") },
    {
      id: "capabilities",
      group: "Navigate",
      label: "Capabilities",
      keywords: "skills stack services",
      run: () => scrollTo("#capabilities"),
    },
    {
      id: "experience",
      group: "Navigate",
      label: "Experience",
      keywords: "career jobs cv",
      run: () => scrollTo("#experience"),
    },
    { id: "contact", group: "Navigate", label: "Contact", run: () => scrollTo("#contact") },
    ...projects.map<Command>((project) => ({
      id: project.slug,
      group: "Projects",
      label: project.title,
      hint: project.category,
      keywords: project.stack.join(" "),
      external: true,
      run: () => openUrl(project.href),
    })),
    {
      id: "copy-email",
      group: "Contact",
      label: copied ? "Copied to clipboard" : "Copy email address",
      hint: site.email,
      keywords: "mail",
      run: () => {
        navigator.clipboard.writeText(site.email).then(() => {
          setCopied(true);
          window.setTimeout(() => setOpen(false), 700);
        });
      },
    },
    {
      id: "resume",
      group: "Contact",
      label: "Open résumé",
      keywords: "cv resume",
      external: true,
      run: () => openUrl(site.resumeUrl),
    },
    ...site.socials.map<Command>((social) => ({
      id: social.label,
      group: "Contact",
      label: social.label,
      external: true,
      run: () => openUrl(social.href),
    })),
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? commands.filter((c) =>
        [c.label, c.hint, c.keywords, c.group].join(" ").toLowerCase().includes(q),
      )
    : commands;
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));
  const optionId = (index: number) => `${listId}-option-${index}`;

  function move(next: number) {
    setActive(next);
    document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(Math.min(activeIndex + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[activeIndex]?.run();
    } else if (event.key === "Escape") {
      event.preventDefault();
      hide();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  }

  const groups = (["Navigate", "Projects", "Contact"] as const)
    .map((group) => ({
      group,
      items: results
        .map((command, index) => ({ command, index }))
        .filter(({ command }) => command.group === group),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
        >
          <div aria-hidden onClick={hide} className="absolute inset-0 bg-night/45" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: ease.outExpo }}
            className="relative w-full max-w-[38rem] overflow-hidden rounded-2xl border border-line bg-paper text-ink shadow-[0_30px_90px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <span aria-hidden className="size-2 rounded-full bg-accent" />
              <input
                autoFocus
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
                aria-label="Search commands"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Where to? Try “work”, “email” or “Next.js”"
                className="h-16 w-full bg-transparent text-[1.05rem] outline-none placeholder:text-muted"
              />
              <kbd className="eyebrow rounded border border-line px-1.5 py-0.5 text-muted">
                Esc
              </kbd>
            </div>

            <ul
              id={listId}
              role="listbox"
              aria-label="Commands"
              data-lenis-prevent
              className="max-h-[min(58vh,26rem)] overflow-y-auto overscroll-contain p-2"
            >
              {groups.map(({ group, items }) => (
                <li key={group} role="presentation">
                  <p className="eyebrow px-3 pb-2 pt-3 text-muted">{group}</p>
                  <ul role="presentation">
                    {items.map(({ command, index }) => (
                      <li
                        key={command.id}
                        id={optionId(index)}
                        role="option"
                        aria-selected={index === activeIndex}
                        onPointerMove={() => setActive(index)}
                        onClick={() => command.run()}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors duration-150",
                          index === activeIndex && "bg-ink text-paper",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={cn(
                              "size-1.5 rounded-full transition-colors",
                              index === activeIndex ? "bg-accent" : "bg-line",
                            )}
                          />
                          {command.label}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-2 truncate text-[0.85rem]",
                            index === activeIndex ? "text-paper/60" : "text-muted",
                          )}
                        >
                          {command.hint}
                          {command.external && <ArrowUpRight className="size-3.5 shrink-0" />}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-3 py-10 text-center text-muted">
                  Nothing for “{query}” — try “contact”.
                </li>
              )}
            </ul>

            <div className="eyebrow flex justify-between border-t border-line px-5 py-3 text-muted">
              <span>↑↓ Navigate · ↵ Open</span>
              <span>{site.name}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
