import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type UnderlineLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

/** Underline draws in from the left on hover and retracts to the right. */
export function UnderlineLink({
  href,
  children,
  external,
  className,
}: UnderlineLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("group relative inline-flex items-center", className)}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
      />
    </a>
  );
}
