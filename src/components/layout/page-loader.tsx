import type { CSSProperties } from "react";

// Grid of square cells: 12 columns on desktop (120px at 1440 wide, like the
// reference), 6 on phones. Enough rows to cover tall screens; extras clip.
const COLS = 12;
const MOBILE_COLS = 6;
const ROWS = 20;

// Timings measured from the reference, in seconds.
const BEAT = 0.05; // before the first column
const COLUMN_STEP = 0.047; // between neighbouring columns (desktop)
const JITTER = 0.12; // random extra start per cell — the ragged wave edges
const LIFE_MIN = 0.22; // each cell fades in, holds, then fades out…
const LIFE_RANGE = 0.14; // …over 0.22–0.36s

/** Small seeded PRNG so the "random" pattern is identical on every render. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const random = seeded(i + 1);
  const jitter = random() * JITTER;
  const life = LIFE_MIN + random() * LIFE_RANGE;
  // Same sweep time on phones: half the columns, twice the step.
  const desktopDelay = BEAT + (i % COLS) * COLUMN_STEP + jitter;
  const mobileDelay = BEAT + (i % MOBILE_COLS) * COLUMN_STEP * 2 + jitter;
  return {
    "--d12": `${desktopDelay.toFixed(3)}s`,
    "--d6": `${mobileDelay.toFixed(3)}s`,
    "--life": `${life.toFixed(3)}s`,
  } as CSSProperties;
});

/**
 * First-load pixel wave: square cells sweep left to right, each fading from
 * the paper backdrop to the accent and then away to reveal the site — a
 * ragged, pixelated band crossing the screen in about a second.
 * Pure CSS, so it plays on first paint; skipped for reduced motion.
 */
export function PageLoader() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden motion-safe:animate-loader-done motion-reduce:hidden"
    >
      <div className="grid grid-cols-6 md:grid-cols-12">
        {cells.map((style, i) => (
          <span
            key={i}
            style={style}
            className="aspect-square bg-paper [--delay:var(--d6)] motion-safe:animate-pixel-cell md:[--delay:var(--d12)]"
          />
        ))}
      </div>
    </div>
  );
}
