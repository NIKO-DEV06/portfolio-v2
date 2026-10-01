import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  index?: string;
  children: ReactNode;
  className?: string;
};

/** Small mono label, e.g. "(01) Selected work". */
export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3 self-start text-muted",
        className,
      )}
    >
      {index && <span>({index})</span>}
      <span>{children}</span>
    </p>
  );
}
