"use client";

import { useEffect, useState } from "react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Pill that copies the email address and confirms with a rolling label. */
export function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <MagneticButton
      onClick={copy}
      strength={0.2}
      aria-label={`Copy ${email}`}
      className={cn(
        "h-16 rounded-full border border-night-line px-8 text-[1.05rem]",
        className,
      )}
      fillClassName="bg-paper"
      labelClassName="group-data-filled:text-ink"
    >
      <span className="relative block h-[1.3em] overflow-hidden leading-[1.3]">
        <span
          className={cn(
            "flex flex-col transition-transform duration-700 ease-out-expo",
            copied && "-translate-y-1/2",
          )}
        >
          <span className="flex items-center gap-3">
            {email}
            <CopyIcon className="size-4 opacity-60" />
          </span>
          <span className="flex items-center gap-3">
            Copied to clipboard
            <CheckIcon className="size-4" />
          </span>
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </MagneticButton>
  );
}
