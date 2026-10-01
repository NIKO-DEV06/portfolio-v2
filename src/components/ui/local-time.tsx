"use client";

import { useSyncExternalStore } from "react";

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatterFor(timeZone: string) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    formatters.set(timeZone, formatter);
  }
  return formatter;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

/** Live clock for a time zone, e.g. "14:32 BST". */
export function LocalTime({
  timeZone,
  className,
}: {
  timeZone: string;
  className?: string;
}) {
  const time = useSyncExternalStore(
    subscribe,
    () => {
      const parts = formatterFor(timeZone).formatToParts(new Date());
      const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? "";
      return `${get("hour")}:${get("minute")} ${get("timeZoneName")}`;
    },
    () => "--:--",
  );

  return (
    <time suppressHydrationWarning className={className}>
      {time}
    </time>
  );
}
