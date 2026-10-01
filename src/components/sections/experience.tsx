import { RevealText } from "@/components/motion/reveal-text";
import { ExperienceList } from "@/components/sections/experience-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "@/components/ui/icons";
import { UnderlineLink } from "@/components/ui/underline-link";
import { experience } from "@/content/experience";
import { site } from "@/content/site";

export function Experience() {
  return (
    <section
      id="experience"
      className="gutter pb-[clamp(8rem,15vw,13rem)] pt-[clamp(2rem,4vw,3rem)]"
    >
      <div className="grid gap-y-8 pb-[clamp(3rem,5vw,4.5rem)] md:grid-cols-12 md:gap-x-8">
        <Eyebrow index="04" className="md:col-span-4">
          Experience
        </Eyebrow>
        <div className="md:col-span-8">
          <RevealText
            text="Shipping production software since *2020.*"
            className="text-heading"
          />
          <UnderlineLink
            href={site.resumeUrl}
            external
            className="mt-8 gap-1.5 text-[0.95rem]"
          >
            Full résumé
            <ArrowUpRight className="size-3.5" />
          </UnderlineLink>
        </div>
      </div>
      <ExperienceList items={experience} />
    </section>
  );
}
