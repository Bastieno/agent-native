/**
 * The paper a school actually prints on.
 *
 * A4 was written into every print view, which is right for most of the world
 * and wrong for the United States, Canada, Mexico and the Philippines — where
 * a page laid out for A4 comes out of a Letter printer either scaled down or
 * with its last line on a second sheet. It is a setting like any other, and
 * like any other it has a fallback that is named rather than hidden.
 *
 * Only the size is here. What goes on the page is the school's own data.
 */

export type PaperSize = "a4" | "letter";

export const PAPER_SIZES: PaperSize[] = ["a4", "letter"];

type Paper = {
  /** What `@page { size: … }` takes. */
  css: string;
  /** Printable width, for the on-screen preview of a page. */
  width: string;
  /** The same, turned on its side. */
  landscapeWidth: string;
  margin: string;
};

const PAPER: Record<PaperSize, Paper> = {
  a4: {
    css: "A4",
    width: "210mm",
    landscapeWidth: "297mm",
    margin: "14mm",
  },
  letter: {
    css: "Letter",
    width: "216mm",
    landscapeWidth: "279mm",
    margin: "14mm",
  },
};

/** A4 unless the school has said otherwise; `check-school-setup` says so. */
export function paperFor(config: unknown): Paper {
  const raw = (config as { paperSize?: unknown } | null)?.paperSize;
  const size: PaperSize =
    typeof raw === "string" && (PAPER_SIZES as string[]).includes(raw)
      ? (raw as PaperSize)
      : "a4";
  return PAPER[size];
}
