/** Shared easing curves so every animation on the site feels related. */
export const ease = {
  outExpo: [0.19, 1, 0.22, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} as const;

/**
 * Seconds before the hero intro starts (exposed to CSS as --intro-delay).
 * When the preloader lands, set this to its exit time so the hero
 * animates in right after it.
 */
export const INTRO_DELAY = 0.15;
