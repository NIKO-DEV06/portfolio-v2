import { MagneticLink } from "@/components/motion/magnetic-button";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";

export function Intro() {
  return (
    <section id="about" className="gutter py-[clamp(6rem,13vw,12rem)]">
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-6">
        <Eyebrow index="01" className="md:col-span-4">
          About
        </Eyebrow>

        <div className="md:col-span-8">
          <ScrollRevealText
            text="I turn ideas into *production-ready* products — owning everything from architecture and AI workflows to the *last* *pixel.*"
            className="text-statement"
          />

          <div className="mt-12 grid gap-10 md:grid-cols-8 md:gap-x-6">
            <p className="text-lead text-ink-soft md:col-span-5">
              Product-minded Full-Stack & AI Engineer with 5+ years building
              SaaS, event-commerce and e-commerce products. Founder of Tallyn
              and Software Engineer at Bloco.
            </p>
            <div className="flex flex-wrap items-start gap-3 md:col-span-3 md:justify-end">
              <MagneticLink
                href={site.resumeUrl}
                external
                className="h-14 rounded-full bg-ink px-7 text-paper"
                labelClassName="group-hover:text-ink group-focus-visible:text-ink"
              >
                Résumé
                <ArrowUpRight className="size-4" />
              </MagneticLink>
              <MagneticLink
                href="#contact"
                className="h-14 rounded-full border border-ink px-7"
                fillClassName="bg-ink"
                labelClassName="group-hover:text-paper group-focus-visible:text-paper"
              >
                Get in touch
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
