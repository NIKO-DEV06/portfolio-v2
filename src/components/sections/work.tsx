import { RevealText } from "@/components/motion/reveal-text";
import { WorkGrid } from "@/components/sections/work-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { projects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" className="gutter pb-[clamp(5rem,10vw,9rem)]">
      <div className="grid gap-y-8 border-t border-line pb-[clamp(3.5rem,7vw,6rem)] pt-6 md:grid-cols-12 md:gap-x-6">
        <Eyebrow index="02" className="md:col-span-4">
          Selected work
        </Eyebrow>
        <RevealText
          text="Products I've *built,* led and shipped."
          className="text-heading md:col-span-8"
        />
      </div>
      <WorkGrid projects={projects} />
    </section>
  );
}
