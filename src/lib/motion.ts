/** Shared easing curves so every animation on the site feels related. */
export const ease = {
  outExpo: [0.19, 1, 0.22, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} as const;

/**
 * Seconds before the hero intro starts (exposed to CSS as --intro-delay).
 * Matches the page loader: its pixel wave starts uncovering the left of the
 * screen at ~0.3s and clears the right by ~1.05s, so the hero animates in
 * as it's revealed (see page-loader.tsx).
 */
export const INTRO_DELAY = 0.35;
