import { MagneticLink } from "@/components/motion/magnetic-button";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";

export function Intro() {
  return (
    <section
      id="about"
      className="gutter py-[clamp(6rem,13vw,12rem)]"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <Eyebrow index="01" className="mb-10">
            About
          </Eyebrow>
          <ScrollRevealText
            text="I turn ideas into *production-ready* products — owning everything from architecture and AI workflows to the *last* *pixel.*"
            className="text-statement"
          />
        </div>

        <div className="flex flex-col items-start gap-12 md:col-span-4 md:pt-[4.6rem]">
          <p className="max-w-[34ch] text-lead text-ink-soft">
            Product-minded Full-Stack & AI Engineer with 5+ years building
            SaaS, event-commerce and e-commerce products. Founder of Tallyn and
            Software Engineer at Bloco.
          </p>
          <MagneticLink
            href={site.resumeUrl}
            external
            className="size-[clamp(9rem,12vw,11.5rem)] rounded-full bg-ink text-paper"
            fillClassName="bg-accent"
            labelClassName="text-[1rem]"
          >
            Résumé
            <ArrowUpRight className="size-4" />
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
