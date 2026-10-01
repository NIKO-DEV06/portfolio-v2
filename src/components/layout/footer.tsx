import Image from "next/image";

import { CurveDivider } from "@/components/layout/curve-divider";
import { MagneticLink } from "@/components/motion/magnetic-button";
import { RevealLines } from "@/components/motion/reveal-lines";
import { CopyEmail } from "@/components/ui/copy-email";
import { ArrowDownRight, ArrowUpRight } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { UnderlineLink } from "@/components/ui/underline-link";
import { site } from "@/content/site";

export function Footer() {
  const linkedIn = site.socials.find((s) => s.label === "LinkedIn");

  return (
    <>
      <CurveDivider />
      <footer
        id="contact"
        className="relative z-0 overflow-hidden bg-night text-paper"
      >
        <div className="gutter pt-[clamp(10rem,18vw,16rem)]">
          <div className="relative">
            <RevealLines
              as="h2"
              className="text-mega font-normal"
              lines={[
                <span key="a" className="flex items-center gap-[0.22em]">
                  <span className="relative inline-block size-[0.82em] shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={site.avatar}
                      alt=""
                      fill
                      sizes="9rem"
                      className="object-cover"
                    />
                  </span>
                  Let&apos;s build
                </span>,
                <span key="b">
                  something{" "}
                  <span className="font-serif italic tracking-normal">
                    great.
                  </span>
                </span>,
              ]}
            />
            <ArrowDownRight className="absolute right-0 top-2 hidden size-[clamp(1.5rem,2.4vw,2.5rem)] text-night-muted md:block" />
          </div>

          {/* Divider with the call to action sitting on it */}
          <div className="relative mt-[clamp(4rem,8vw,7rem)]">
            <div className="h-px w-full bg-night-line" />
            <div className="absolute right-[6%] top-0 -translate-y-1/2">
              <MagneticLink
                href={`mailto:${site.email}`}
                className="size-[clamp(9rem,12.5vw,12.5rem)] rounded-full bg-accent text-[1.05rem] text-white"
                fillClassName="bg-paper"
                labelClassName="group-data-filled:text-ink"
                strength={0.35}
              >
                Get in touch
              </MagneticLink>
            </div>
          </div>

          <div className="mt-[clamp(6rem,9vw,7rem)] flex flex-wrap gap-4">
            <CopyEmail email={site.email} />
            {linkedIn && (
              <MagneticLink
                href={linkedIn.href}
                external
                strength={0.2}
                className="h-16 rounded-full border border-night-line px-8 text-[1.05rem]"
                fillClassName="bg-paper"
                labelClassName="group-data-filled:text-ink"
              >
                LinkedIn
                <ArrowUpRight className="size-4" />
              </MagneticLink>
            )}
          </div>

          <div className="mt-[clamp(5rem,10vw,8rem)] flex flex-col gap-10 border-t border-night-line py-8 text-[0.95rem] md:flex-row md:items-end md:justify-between">
            <div className="flex gap-14">
              <dl>
                <dt className="eyebrow text-night-muted">Edition</dt>
                <dd className="mt-3">2026 — v2.0</dd>
              </dl>
              <dl>
                <dt className="eyebrow text-night-muted">Local time</dt>
                <dd className="mt-3">
                  <LocalTime timeZone={site.timeZone} />
                </dd>
              </dl>
            </div>
            <div>
              <p className="eyebrow text-night-muted">Socials</p>
              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
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
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
