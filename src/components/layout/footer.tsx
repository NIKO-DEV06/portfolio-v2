import { FooterNav } from '@/components/layout/footer-nav';
import { FooterReveal } from '@/components/layout/footer-reveal';
import { ArcText } from '@/components/motion/arc-text';
import {
  ArrowUpRight,
  CornerDownRight,
  TallynMark,
} from '@/components/ui/icons';
import { LocalTime } from '@/components/ui/local-time';
import { RollText } from '@/components/ui/roll-text';
import { site } from '@/content/site';

const detailText = 'text-[clamp(1rem,1.1vw,1.1rem)] leading-snug';

/**
 * Big page links on rules down the left, contact details and socials on the
 * right, and the name across the whole screen.
 */
export function Footer() {
  return (
    // The top padding doubles as the reveal's travel, so the parallax only
    // ever hides empty space above the content.
    <footer
      id="contact"
      className="relative bg-night text-paper [--reveal-travel:clamp(6rem,11vw,10rem)]"
    >
      <FooterReveal>
        <div className="flex min-h-svh flex-col justify-between gap-[clamp(2rem,8vw,2rem)] pt-(--reveal-travel)">
          <div className="gutter grid gap-y-14 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-12 lg:col-span-6">
              <p className="flex items-center gap-3 text-[clamp(1.05rem,1.3vw,1.25rem)]">
                <span
                  aria-hidden
                  className="size-[0.65em] rounded-full bg-night-muted"
                />
                Navigation
              </p>
              <FooterNav className="mt-[clamp(2rem,3.8vw,3.5rem)]" />
            </div>

            {/* One column wider until xl, so the email clears the socials. */}
            <div className="md:col-span-7 lg:col-span-4 lg:col-start-7 xl:col-span-3 xl:col-start-8">
              <p className="eyebrow text-night-muted">(Contact)</p>
              {/* <a
                href={site.founderOf.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-[3px] bg-white/[0.07] px-2.5 py-1.5 text-[0.95rem] transition-colors duration-300 hover:bg-white/[0.13]"
              >
                <TallynMark className="h-[0.8em]" />
                Founder of {site.founderOf.name}
              </a> */}
              <p className={`mt-6 ${detailText}`}>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 underline decoration-night-muted underline-offset-[0.25em] transition-colors duration-300 hover:decoration-paper"
                >
                  <CornerDownRight className="size-[0.95em] shrink-0" />
                  {site.email}
                </a>
              </p>
              <p className={`mt-6 text-night-muted ${detailText}`}>
                Based in the {site.location}.
                <br />
                Local time <LocalTime timeZone={site.timeZone} />
              </p>
            </div>

            <div className="md:col-span-5 lg:col-span-2 lg:col-start-11">
              <p className="eyebrow text-night-muted">(Socials)</p>
              <ul className="mt-6 space-y-1.5">
                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-1 text-[clamp(1.4rem,1.65vw,1.75rem)] font-semibold tracking-[-0.025em]"
                    >
                      <RollText text={social.label} />
                      <ArrowUpRight
                        strokeWidth={2.25}
                        className="mt-[0.15em] size-[0.6em] transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The name, its letters spanning the screen edge to edge: the
              word's ink is 4.292em wide, so 100cqw / 4.292 ≈ 23.3cqw, and
              the margin cancels the 0.05em space before the "E". */}

          <div
            aria-hidden
            className="@container select-none overflow-x-clip translate-y-1/4 scale-[1.025] origin-bottom"
          >
            {/* The visible ink starts about halfway down the word's box: the
                lowercase tops sit a quarter of the way down, and the wrapper
                drops it another quarter. Start straightening as it peeks in. */}
            <ArcText
              text={site.firstName}
              startAt={0.5}
              className="-ml-[0.05em] whitespace-nowrap text-[23.3cqw] font-bold leading-[0.8] tracking-[-0.055em] text-night-muted"
            />
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
