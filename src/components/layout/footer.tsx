import type { ReactNode } from 'react';

import { FooterReveal } from '@/components/layout/footer-reveal';
import { ProximityText } from '@/components/motion/proximity-text';
import { RollText } from '@/components/ui/roll-text';
import { site } from '@/content/site';

const pages = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
];

const [emailUser, emailDomain] = site.email.split('@');

// Link size tracks the footer's width (cqw) once the three columns appear.
const linkClass =
  'group inline-flex text-[1.9rem] font-semibold leading-[1.17] tracking-[-0.03em] xl:text-[2.9cqw]';

function Column({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[clamp(0.95rem,1.1cqw,1.2rem)] text-night-muted">
        ( {label} )
      </p>
      <div className="mt-[clamp(1.25rem,3cqw,3rem)]">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative bg-night text-paper">
      <FooterReveal>
        <div className="gutter @container flex min-h-svh flex-col justify-between gap-[clamp(5rem,12vw,6rem)] pb-[clamp(0.75rem,2vw,1.75rem)] pt-[clamp(2.5rem,4vw,3.75rem)]">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            <Column label="Pages">
              <nav aria-label="Footer">
                <ul>
                  {pages.map((page) => (
                    <li key={page.href}>
                      <a href={page.href} className={linkClass}>
                        <RollText text={page.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Column>

            <Column label="Socials">
              <ul>
                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <RollText text={social.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </Column>

            <div className="sm:col-span-2 xl:col-span-1">
              <Column label="Contact">
                {/* Breaks at the @ so the long address sits like a two-line block. */}
                <a
                  href={`mailto:${site.email}`}
                  className={`${linkClass} flex-col`}
                >
                  <RollText text={emailUser} />
                  <RollText text={`@${emailDomain}`} />
                </a>
              </Column>
            </div>
          </div>

          <div>
            <p className="mb-[clamp(0.75rem,1.4cqw,1.5rem)] text-[clamp(0.95rem,1.1cqw,1.2rem)] text-night-muted">
              Full-Stack & AI Product Engineer, based in the UK
            </p>
            <p className="sr-only">© 2026 {site.name}</p>
            <div aria-hidden className="flex select-none items-start uppercase">
              <ProximityText
                lines={[site.firstName]}
                rest={800}
                peak={520}
                reach={0.25}
                // Sized in container units so the name always spans edge to edge.
                className="text-[19.5cqw] leading-[0.8] tracking-[-0.055em] text-night-muted"
              />
              <span className="ml-[0.6cqw] mt-[0.4cqw] text-[5.7cqw] font-bold leading-none transition-transform duration-1000 ease-out-expo hover:rotate-[360deg] text-night-muted">
                ©
              </span>
            </div>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
