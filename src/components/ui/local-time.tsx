"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatterFor(timeZone: string, seconds: boolean) {
  const key = `${timeZone}:${seconds}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: seconds ? "2-digit" : undefined,
      timeZoneName: "short",
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

/** Live clock for a time zone, e.g. "14:32 BST" or "14:32:08 BST". */
export function LocalTime({
  timeZone,
  seconds = false,
  className,
}: {
  timeZone: string;
  seconds?: boolean;
  className?: string;
}) {
  const time = useSyncExternalStore(
    subscribe,
    () => {
      const parts = formatterFor(timeZone, seconds).formatToParts(new Date());
      const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? "";
      const clock = [get("hour"), get("minute"), seconds ? get("second") : ""]
        .filter(Boolean)
        .join(":");
      return `${clock} ${get("timeZoneName")}`;
    },
    () => (seconds ? "--:--:--" : "--:--"),
  );

  return (
    <time suppressHydrationWarning className={cn("tabular-nums", className)}>
      {time}
    </time>
  );
}
