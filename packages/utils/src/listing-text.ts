// Listings are often entered in ALL CAPS with " | " separators. These helpers
// turn that into readable headings, subtitles and lists without touching the data.

const KEEP_UPPER = new Set([
  "UAE", "DIFC", "DXB", "JVC", "JLT", "JBR", "JVT", "DSO", "MBR", "SZR", "HQ",
  "RERA", "DLD", "AED", "USD", "GBP", "EUR", "VAT", "ROI", "LLC", "FZE", "FZCO",
  "AHS", "MEP", "HVAC", "GCC", "DMCC", "JAFZA", "DWC", "BUA",
  "II", "III", "IV", "VI", "VII", "VIII", "IX", "XI", "XII",
]);

const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with",
]);

// A single letter after one of these is a grade or block label ("GRADE A", "TOWER A"), not the article
const DESIGNATOR_BEFORE = new Set([
  "grade", "tower", "block", "plot", "phase", "type", "class", "wing", "unit", "level", "zone",
  "floor", "cluster", "category",
]);

function isShouting(text: string): boolean {
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3) return false;
  const upper = letters.replace(/[^A-Z]/g, "").length;
  return upper / letters.length >= 0.8;
}

function caseWord(word: string, first: boolean, prev = ""): string {
  const core = word.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "");
  if (!core) return word;
  if (KEEP_UPPER.has(core.toUpperCase())) return word.toUpperCase();
  if (/\d/.test(core)) return word.toUpperCase();
  if (core.length === 1 && DESIGNATOR_BEFORE.has(prev.replace(/[^A-Za-z]/g, "").toLowerCase())) {
    return word.toUpperCase();
  }
  const lower = word.toLowerCase();
  if (!first && SMALL_WORDS.has(core.toLowerCase())) return lower;
  // Capitalise after hyphens and slashes too: "AL-BARSHA" -> "Al-Barsha"
  return lower.replace(/(^|[-/(])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

/** Title-cases text that was entered in ALL CAPS; leaves mixed-case text alone. */
export function smartCase(text: string): string {
  const trimmed = text?.trim() ?? "";
  if (!trimmed || !isShouting(trimmed)) return trimmed;
  return trimmed
    .split(/(\s+)/)
    .map((part, i, parts) => {
      if (/^\s+$/.test(part)) return part;
      const prevSeparator = i === 0 || /[|:,–—-]\s*$/.test(parts.slice(0, i).join(""));
      const prev = parts.slice(0, i).reverse().find((p) => !/^\s+$/.test(p)) ?? "";
      return caseWord(part, prevSeparator, prev);
    })
    .join("");
}

/**
 * Splits a pipe-separated listing title into a headline and its remaining parts.
 * "SOL LUXE | OFFICES & RETAIL | SZR" -> { headline: "Sol Luxe", details: ["Offices & Retail", "SZR"] }
 */
export function splitListingTitle(title: string): { headline: string; details: string[] } {
  const parts = title.split(/\s*\|\s*/).map((p) => smartCase(p.trim())).filter(Boolean);
  const headline = parts[0] ?? title.trim();
  return { headline, details: parts.slice(1) };
}

/** Joins address parts, dropping ones already contained in an earlier part ("Dubai" after "Dubai, UAE"). */
export function formatPlace(...parts: Array<string | null | undefined>): string {
  const kept: string[] = [];
  for (const raw of parts) {
    // Drop stray commas left at either end of an admin field, so "Village Triangle," + "Dubai" isn't ",,"
    const part = smartCase((raw ?? "").replace(/^[\s,]+|[\s,]+$/g, ""));
    if (!part) continue;
    const seen = kept.join(" ").toLowerCase();
    if (seen.includes(part.toLowerCase())) continue;
    kept.push(part);
  }
  return kept.join(", ");
}

export type DescriptionBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function pipeSegments(line: string): string[] | null {
  const segments = line.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
  if (segments.length < 2) return null;
  // A pipe list reads as bullets only when each entry is a phrase, not a lone number
  return segments.every((s) => s.split(/\s+/).length >= 2) ? segments : null;
}

/** Turns a plain-text listing description into headings, paragraphs and bullet lists. */
export function parseDescription(description: string): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  const pushItems = (items: string[]) => {
    const last = blocks[blocks.length - 1];
    if (last?.type === "list") last.items.push(...items);
    else blocks.push({ type: "list", items });
  };

  for (const raw of description.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;

    const bullet = line.match(/^(?:[-•*]|\d+[.)])\s+(.*)$/);
    if (bullet?.[1]) {
      pushItems([bullet[1]]);
      continue;
    }

    if (line.length <= 80 && !/[.!?]$/.test(line) && isShouting(line) && !line.includes("|")) {
      blocks.push({ type: "heading", text: smartCase(line.replace(/:$/, "")) });
      continue;
    }

    const segments = pipeSegments(line);
    if (segments) {
      pushItems(segments);
      continue;
    }

    blocks.push({ type: "paragraph", text: line.replace(/\s*\|\s*/g, " · ") });
  }
  return blocks;
}
