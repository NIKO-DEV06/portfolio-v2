import { RollText } from "@/components/ui/roll-text";
import { nav, site } from "@/content/site";

/** Top bar over the hero. Scrolls away; the floating menu button takes over. */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="gutter flex items-center justify-between pt-7 motion-safe:animate-fade-down md:pt-9 [animation-delay:0.6s]">
        <a
          href="#home"
          className="group flex items-center gap-1.5 text-[0.95rem] font-medium"
        >
          <span
            aria-hidden
            className="inline-block transition-transform duration-1000 ease-out-expo group-hover:rotate-[360deg]"
          >
            ©
          </span>
          <RollText text={site.name} />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative flex flex-col items-center text-[0.95rem]"
                >
                  <RollText text={item.label} />
                  <span
                    aria-hidden
                    className="absolute -bottom-3 size-[5px] scale-0 rounded-full bg-current transition-transform duration-500 ease-out-expo group-hover:scale-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
