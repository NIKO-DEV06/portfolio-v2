import { WorkList } from "@/components/sections/work-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { projects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" className="gutter pb-[clamp(4rem,8vw,7rem)]">
      <div className="grid grid-cols-12 items-end gap-6 border-b border-line pb-6">
        <Eyebrow index="02" className="col-span-12 lg:col-span-7">
          Selected work
        </Eyebrow>
        <p className="eyebrow col-span-3 hidden text-muted lg:block">
          Category
        </p>
        <p className="eyebrow col-span-2 hidden text-right text-muted lg:block">
          Role
        </p>
      </div>
      <WorkList projects={projects} />
    </section>
  );
}
