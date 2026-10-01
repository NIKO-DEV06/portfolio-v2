"use client";

import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const links = [{ label: "Home", href: "#home" }, ...nav];

const DESKTOP = "(min-width: 768px)";

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );
}

// The panel's left edge bulges out as it slides in, then settles flat.
const curved = "M100 0 L100 1000 Q-100 500 100 0";
const straight = "M100 0 L100 1000 Q100 500 100 0";

/**
 * Floating round menu button (appears once the header has scrolled away,
 * always on mobile) and the slide-in navigation panel it opens.
 */
export function Menu() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const isDesktop = useIsDesktop();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const toggleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useMotionValueEvent(scrollY, "change", (y) => {
    setPastHero(y > window.innerHeight * 0.6);
    // Flip the button to light once the dark footer sits underneath it.
    const footerTop = document.getElementById("contact")?.getBoundingClientRect().top;
    setOverFooter(footerTop !== undefined && footerTop < 80);
  });

  // Freeze the page behind the open menu.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  // Focus the first link, close on Escape, keep Tab inside the menu.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current?.querySelector("button");
    panel?.querySelector("a")?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel || !toggle) return;
      const focusable = [toggle, ...panel.querySelectorAll<HTMLElement>("a")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setOpen(false);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(href, { duration: 1.4, force: true });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const showToggle = open || pastHero || !isDesktop;
  const lightToggle = open || overFooter;

  return (
    <>
      <motion.div
        ref={toggleRef}
        inert={!showToggle}
        initial={false}
        animate={{ scale: showToggle ? 1 : 0 }}
        transition={{ duration: 0.5, ease: ease.outExpo }}
        className="fixed right-4 top-4 z-[60] md:right-8 md:top-8"
      >
        <MagneticButton
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "size-14 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-colors duration-500 md:size-[4.75rem]",
            lightToggle ? "bg-paper text-ink" : "bg-ink text-paper",
          )}
          fillClassName="bg-accent"
          labelClassName="group-data-filled:text-white"
        >
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-[1.5px] bg-current transition-transform duration-500 ease-out-expo",
                open && "translate-y-[5.25px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition-transform duration-500 ease-out-expo",
                open && "-translate-y-[5.25px] -rotate-45",
              )}
            />
          </span>
        </MagneticButton>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-40 bg-night/40"
            />
            <motion.div
              key="panel"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "calc(100% + 6.5rem)" }}
              animate={{ x: "0%" }}
              exit={{ x: "calc(100% + 6.5rem)" }}
              transition={{ duration: 0.9, ease: ease.inOutQuart }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[34rem] flex-col justify-between bg-night px-10 pb-10 pt-28 text-paper md:px-20 md:pt-36"
            >
              <svg
                aria-hidden
                viewBox="0 0 100 1000"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-[-99px] top-0 h-full w-[100px] fill-night"
              >
                <motion.path
                  initial={{ d: curved }}
                  animate={{ d: straight }}
                  exit={{ d: curved }}
                  transition={{ duration: 1, ease: ease.inOutQuart }}
                />
              </svg>

              <nav aria-label="Menu">
                <p className="eyebrow border-b border-night-line pb-6 text-night-muted">
                  Navigation
                </p>
                <ul className="mt-10 flex flex-col gap-1">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 80, opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: ease.outExpo,
                        delay: 0.12 + i * 0.06,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={(event) => navigate(event, link.href)}
                        className="group relative block py-1 text-[clamp(2.6rem,5vw,3.6rem)] leading-[1.1] tracking-[-0.035em]"
                      >
                        <span
                          aria-hidden
                          className="absolute -left-6 top-1/2 size-2.5 -translate-y-1/2 scale-0 rounded-full bg-paper transition-transform duration-500 ease-out-expo group-hover:scale-100 group-focus-visible:scale-100"
                        />
                        <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                          {link.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div>
                <p className="eyebrow text-night-muted">Socials</p>
                <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
                  {site.socials.map((social) => (
                    <li key={social.href}>
                      <UnderlineLink href={social.href} external>
                        {social.label}
                      </UnderlineLink>
                    </li>
                  ))}
                  <li>
                    <UnderlineLink href={site.resumeUrl} external>
                      Résumé
                    </UnderlineLink>
                  </li>
                  <li>
                    <UnderlineLink href={`mailto:${site.email}`}>Email</UnderlineLink>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
