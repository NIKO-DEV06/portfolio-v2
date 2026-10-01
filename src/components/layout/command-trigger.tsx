"use client";

import {
  OPEN_COMMAND_MENU,
  useModifierKey,
} from "@/components/layout/command-menu";

/** Header pill that opens the ⌘K command menu. */
export function CommandTrigger() {
  const modifier = useModifierKey();

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
      aria-label="Open command menu"
      className="group flex h-10 cursor-pointer items-center gap-3 rounded-full border border-line pl-4 pr-1.5 text-[0.9rem] text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
    >
      Quick jump
      <kbd className="eyebrow rounded-full bg-ink px-2.5 py-1 text-paper transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
        {modifier} K
      </kbd>
    </button>
  );
}
