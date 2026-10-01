export type Word = { text: string; accent: boolean };

/**
 * Splits copy into words. Wrapping a word in asterisks marks it as an
 * accent (rendered in the italic serif): "the *last* *pixel*."
 */
export function splitWords(copy: string): Word[] {
  return copy.split(" ").map((raw) => {
    const match = raw.match(/^\*(.+)\*([.,!?;:]*)$/);
    return match
      ? { text: match[1] + match[2], accent: true }
      : { text: raw, accent: false };
  });
}

/** The copy with accent markers removed, for screen readers and metadata. */
export function plainText(copy: string) {
  return copy.replace(/\*/g, "");
}
