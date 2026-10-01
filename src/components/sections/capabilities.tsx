import { RevealText } from '@/components/motion/reveal-text';
import { Eyebrow } from '@/components/ui/eyebrow';
import { capabilities } from '@/content/capabilities';

export function Capabilities() {
  return (
    <section id="capabilities" className="gutter py[clamp(6rem,11vw,10rem)]">
      <div className="grid gap-y-8 border-b border-line pb-[clamp(3rem,5vw,4.5rem)] md:grid-cols-12 md:gap-x-8">
        <Eyebrow index="03" className="md:col-span-4">
          Capabilities
        </Eyebrow>
        <RevealText
          text="End-to-end product engineering, from *first* *idea* to real users."
          className="text-heading md:col-span-8"
        />
      </div>

      <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item, i) => (
          <li
            key={item.title}
            className="group relative flex flex-col border-b border-line py-10 lg:border-b-0 lg:pb-0"
          >
            <span
              aria-hidden
              className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
            />
            <span className="eyebrow text-muted transition-colors duration-500 group-hover:text-accent">
              {String(i + 1).padStart(2, '0')}.
            </span>
            <h3 className="mt-10 text-[1.6rem] leading-tight tracking-[-0.02em] transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
              {item.title}
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">{item.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-line px-3 py-1.5 text-[0.8rem] transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
