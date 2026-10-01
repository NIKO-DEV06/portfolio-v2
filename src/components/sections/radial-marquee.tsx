import Image from 'next/image';
import type { CSSProperties } from 'react';

import { RadialRing } from '@/components/motion/radial-ring';
import { projects, type Project } from '@/content/projects';

/** Cards around the full circle — 30° apart, like the reference. */
const SLOTS = 12;

/**
 * Fills the ring's slots with projects. When there are fewer projects than
 * slots, the repeats go half a turn away from their originals, so the same
 * project never appears twice on screen.
 */
function ringOrder(list: Project[]): Project[] {
  if (list.length >= SLOTS) return list.slice(0, SLOTS);
  const half = SLOTS / 2;
  const extra = SLOTS - list.length;
  const unique = [...list];
  return Array.from({ length: SLOTS }, (_, slot) =>
    slot >= half && slot < half + extra ? list[slot - half] : unique.shift()!,
  );
}

/**
 * A wheel of project cards whose top arc rises into view and turns slowly,
 * right to left. Pure CSS: one rotating ring, cards placed around it.
 * Sizes derive from `--r` (the ring radius) so the whole thing scales.
 */
export function RadialMarquee() {
  const ring = ringOrder(projects);

  return (
    <section
      aria-label="Live projects"
      // radial-geometry (globals.css) defines --r, --card-w, --card-h, --lift.
      className="radial-geometry relative overflow-hidden"
    >
      <div
        aria-hidden
        className="relative mt-[calc(clamp(2.5rem,6vw,5.5rem)-var(--lift))] h-[calc(var(--r)*0.508+var(--lift))] [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
      >
        {/* Zero-size point at the centre of the circle; everything orbits it. */}
        <RadialRing className="absolute left-1/2 top-[calc(var(--lift)+var(--card-h)/2+var(--r))] motion-safe:animate-radial-spin">
          <svg
            viewBox="-1 -1 2 2"
            className="pointer-events-none absolute left-0 top-0 size-[calc(var(--r)*2.03)] -translate-x-1/2 -translate-y-1/2 overflow-visible text-ink/25"
          >
            {/* 240 radial ticks: the dash pattern repeats 240 times around the
                circle (pathLength), each dash ~1px wide and ~1.2% of r long. */}
            <circle
              r="1"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.0117}
              pathLength={240}
              strokeDasharray="0.055 0.945"
            />
          </svg>

          {ring.map((project, slot) => (
            <a
              key={`${project.slug}-${slot}`}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              style={
                {
                  transform: `translate(-50%, -50%) rotate(${slot * (360 / SLOTS)}deg) translateY(calc(var(--r) * -1))`,
                } as CSSProperties
              }
              className="group absolute left-0 top-0 block w-[var(--card-w)] rounded-[0.55em] bg-[#1a1819] p-[0.66em] text-[calc(var(--card-w)*0.045)] text-white shadow-[0_0.6em_1.6em_rgba(0,0,0,0.14)]"
            >
              <span
                className="relative block aspect-[1.47] overflow-hidden rounded-[0.27em]"
                style={{ backgroundColor: project.tone }}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 24vw, 62vw"
                  className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                />
              </span>
              <span className="flex items-baseline justify-between gap-3 px-[0.25em] pb-[0.2em] pt-[0.75em] leading-tight">
                <span className="truncate">{project.title}</span>
                <span className="shrink-0 text-white/45">
                  {project.category}
                </span>
              </span>
            </a>
          ))}
        </RadialRing>
      </div>
    </section>
  );
}
