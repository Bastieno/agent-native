/**
 * The transfer-note format. Whoever sends money writes the narration as
 *
 *   [LOUNGE|HUB] TAG what it was for
 *
 * ("LOUNGE STOCK 5 packs chicken", "HUB REPAIR door lock"), the tag in
 * capitals. Books then files
 * the expense under that category and business as said, instead of guessing
 * from the words. The business can be left out (most costs are the Lounge's)
 * or come after the tag. Shared by the slip reader and the Settings guide.
 */

export interface NarrationTag {
  tag: string;
  category: string;
  /** Business when none is written; null for money that is not a running cost. */
  business: "lounge" | "hub" | null;
  /** A narration that uses this tag. */
  example: string;
}

export const NARRATION_TAGS: NarrationTag[] = [
  {
    tag: "STOCK",
    category: "Food & drink stock",
    business: "lounge",
    example: "LOUNGE STOCK 5 packs chicken, 2 crates eggs",
  },
  {
    tag: "FLOAT",
    category: "Manager float (not itemised)",
    business: "lounge",
    example: "LOUNGE FLOAT market run Saturday",
  },
  {
    tag: "DIESEL",
    category: "Diesel / power",
    business: "hub",
    example: "DIESEL 40 litres for generator",
  },
  {
    tag: "SALARY",
    category: "Salaries",
    business: "lounge",
    example: "LOUNGE SALARY gateman November",
  },
  {
    tag: "RENT",
    category: "Rent",
    business: "lounge",
    example: "HUB RENT December",
  },
  {
    tag: "REPAIR",
    category: "Repairs",
    business: "hub",
    example: "REPAIR door lock and hinges",
  },
  {
    tag: "INTERNET",
    category: "Internet",
    business: "hub",
    example: "HUB INTERNET Starlink November",
  },
  {
    tag: "SUPPLIES",
    category: "Supplies",
    business: "lounge",
    example: "LOUNGE SUPPLIES takeaway packs, foil",
  },
  {
    tag: "EQUIPMENT",
    category: "Equipment & furniture",
    business: "lounge",
    example: "HUB EQUIPMENT 2 office chairs",
  },
  {
    tag: "TAX",
    category: "Taxes & levies",
    business: "lounge",
    example: "LOUNGE TAX land use charge 2026",
  },
  {
    tag: "COMMISSION",
    category: "Commissions",
    business: "lounge",
    example: "HUB COMMISSION agent for new member",
  },
  {
    tag: "SERVICE",
    category: "Services",
    business: "lounge",
    example: "HUB SERVICE cleaning",
  },
  {
    tag: "OTHER",
    category: "Other",
    business: "lounge",
    example: "LOUNGE OTHER delivery bike",
  },
  {
    tag: "OWNER",
    category: "Owner's pay",
    business: null,
    example: "OWNER November pay",
  },
  {
    tag: "LOAN",
    category: "Loans & repayments",
    business: null,
    example: "LOAN repayment to Ada",
  },
  {
    tag: "MOVE",
    category: "Moved between accounts",
    business: null,
    example: "MOVE to Opay account",
  },
  {
    tag: "CLIENT",
    category: "Paid for a client (repaid)",
    business: null,
    example: "CLIENT printing for Tunde, to be repaid",
  },
  {
    tag: "DOLLAR",
    category: "Dollar purchases",
    business: null,
    example: "DOLLAR 200 USD for software",
  },
  {
    tag: "PROFIT",
    category: "Dividends & profit share",
    business: null,
    example: "PROFIT partner share October",
  },
];

const BUSINESS_WORDS: Record<string, "lounge" | "hub"> = {
  lounge: "lounge",
  hub: "hub",
};

/** Text recognition swaps look-alike characters; compare on a folded form. */
const fold = (w: string) =>
  w
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/[1l|]/g, "i")
    .replace(/5/g, "s")
    .replace(/[^a-z]/g, "");

function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return d[a.length][b.length];
}

/** Exact after folding; words of five letters or more may be one letter off. */
function same(word: string, target: string): boolean {
  const w = fold(word);
  const t = fold(target);
  if (w === t || w === `${t}s`) return true;
  return (
    t.length >= 5 && Math.abs(w.length - t.length) <= 1 && distance(w, t) <= 1
  );
}

/** Written in capitals (a misread letter or two allowed), so "Move the chairs" is not a tag. */
const capitals = (word: string) => {
  const letters = word.replace(/[^A-Za-z]/g, "");
  if (!letters) return false;
  const upper = letters.replace(/[^A-Z]/g, "").length;
  return upper / letters.length >= 0.7;
};
const tagOf = (word: string) =>
  capitals(word) ? NARRATION_TAGS.find((t) => same(word, t.tag)) : undefined;
const businessOf = (word: string) =>
  Object.keys(BUSINESS_WORDS).find((b) => same(word, b)) as
    | "lounge"
    | "hub"
    | undefined;

export interface ParsedNarration {
  category: string;
  business: "lounge" | "hub" | null;
  details: string;
  tag: string;
}

/** Reads a narration written in the format; null when it isn't. */
export function parseNarration(
  text: string | null | undefined,
): ParsedNarration | null {
  const words = (text ?? "")
    .trim()
    .split(/[\s:,.\-–]+/)
    .filter(Boolean);
  if (words.length < 1) return null;
  let business: "lounge" | "hub" | undefined;
  let tag: NarrationTag | undefined;
  let used = 0;
  for (let i = 0; i < Math.min(2, words.length); i++) {
    const b = !business ? businessOf(words[i]) : undefined;
    const t = !tag ? tagOf(words[i]) : undefined;
    if (b) business = b;
    else if (t) tag = t;
    else break;
    used = i + 1;
  }
  if (!tag) return null;
  const rest = (text ?? "")
    .trim()
    .split(/\s+/)
    .slice(used)
    .join(" ")
    .replace(/^[:,.\-–\s]+/, "");
  return {
    category: tag.category,
    business: tag.business === null ? null : (business ?? tag.business),
    details: rest,
    tag: tag.tag,
  };
}

/** The format as plain text, to send to whoever makes transfers. */
export function narrationGuide(): string {
  return [
    "How to write the narration on every transfer:",
    "BUSINESS TAG what it was for",
    "BUSINESS is LOUNGE or HUB. Leave it out for the usual one: Diesel, repairs and internet are the Hub's, the rest the Lounge's.",
    "",
    ...NARRATION_TAGS.map((t) => `${t.tag}: ${t.category}. e.g. ${t.example}`),
  ].join("\n");
}
