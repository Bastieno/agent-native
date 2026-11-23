import { parseNarration } from "../../shared/narration.js";
import { correctNote } from "../../shared/note-words.js";
import { DIVIDENDS, LOANS, OWNERS_PAY } from "./setup.js";

/**
 * Guesses an expense's category and business from the note on a transfer
 * ("5 packs of chicken" → Food & drink stock · Lounge). Always a guess: the
 * expense is saved as needs_review. Notes that aren't running costs (loans,
 * profit payouts, commissions) come back as `notAnExpense`.
 */

export interface Guess {
  category: string | null;
  business: "lounge" | "hub" | null;
  notAnExpense: boolean;
  because: string | null;
  /** The note was written in the transfer-note format: taken as said, not guessed. */
  tagged: boolean;
}

type Rule = {
  category: string;
  business: "lounge" | "hub" | null;
  words: string[];
};

// Order matters: the first rule with a matching word wins.
const RULES: Rule[] = [
  {
    category: "Salaries",
    business: null,
    words: ["overtime", "salary", "salaries", "wage", "stipend", "allowance"],
  },
  {
    category: "Internet",
    business: "hub",
    words: [
      "starlink",
      "fiberx",
      "fibre",
      "fiber",
      "internet",
      "wifi",
      "network",
      "router",
    ],
  },
  {
    category: "Diesel / power",
    business: null,
    words: [
      "token",
      "credit",
      "electricity",
      "diesel",
      "fuel",
      "petrol",
      "nepa",
      "ikedc",
      "inverter",
      "solar",
      "battery",
      "generator",
      "electric",
    ],
  },
  { category: "Rent", business: null, words: ["rent", "lease"] },
  {
    category: "Commissions",
    business: null,
    words: ["commission"],
  },
  {
    category: "Taxes & levies",
    business: null,
    words: [
      "igr",
      "taxpayer",
      "land use",
      "levy",
      "levies",
      "tax",
      "refuse",
      "lasepa",
      "firs",
    ],
  },
  {
    category: "Equipment & furniture",
    business: null,
    words: [
      "fan",
      "surge",
      "ups",
      "extension",
      "fog light",
      "ear buds",
      "earbud",
      "sofa",
      "shelf",
      "chair",
      "table",
      "freezer",
      "fridge",
      "television",
      "inch",
      "aircon",
      "air condition",
      "machine",
      "furniture",
      "signage",
      "cladding",
    ],
  },
  {
    category: "Repairs",
    business: null,
    words: [
      "celling",
      "rooling",
      "roofing sheet",
      "bulb",
      "lamp holder",
      "lighting",
      "fixing",
      "sewage",
      "tiling",
      "tile",
      "wire",
      "wiring",
      "ceiling",
      "repair",
      "fix",
      "weld",
      "plumb",
      "carpent",
      "paint",
      "mechanic",
      "install",
      "cement",
      "sand",
      "workmanship",
      "ceiling",
      "roof",
      "brick",
      "casting",
      "padlock",
      "asbestos",
      "iron",
      "profile",
      "wall",
      "beam",
      "door",
      "pipe",
      "reconnect",
      "maintenance",
      "works",
    ],
  },
  {
    category: "Food & drink stock",
    business: "lounge",
    words: [
      "goat",
      "ingredient",
      "breakfast",
      "lunch",
      "dinner",
      "liquor",
      "lawson",
      "imperial",
      "kelchuo",
      "chicken",
      "sausage",
      "onion",
      "cabbage",
      "beef",
      "fish",
      "meat",
      "rice",
      "oil",
      "pepper",
      "tomato",
      "bread",
      "flour",
      "shawarma",
      "drink",
      "beer",
      "water",
      "chips",
      "ketchup",
      "mayo",
      "bama",
      "egg",
      "spice",
      "frozen",
      "snack",
      "coke",
      "juice",
      "malt",
      "wine",
      "ice",
      "yam",
      "plantain",
      "potato",
      "vegetable",
      "cream",
      "sugar",
      "milk",
      "carrot",
      "sauce",
      "maggi",
      "food",
      "meal",
      "pizza",
      "fayrouz",
      "monster",
      "indomie",
      "spaghetti",
      "crate",
      "garlic",
      "ginger",
      "origin",
      "budweiser",
      "heineken",
      "guinness",
      "provisions",
      "groundnut",
    ],
  },
  {
    category: "Supplies",
    business: null,
    words: [
      "clothing",
      "uniform",
      "tarpaulin",
      "tarpa",
      "flier",
      "sticker",
      "foil",
      "film",
      "nylon",
      "takeaway",
      "plate",
      "cup",
      "tissue",
      "soap",
      "detergent",
      "cleaning",
      "gas",
      "stationer",
      "paper",
      "straw",
      "napkin",
      "bleach",
      "blender",
      "brush",
      "container",
      "serviette",
    ],
  },
  {
    category: "Other",
    business: null,
    words: [
      "airtime",
      "recharge",
      "support",
      "delivery",
      "transport",
      "logistics",
    ],
  },
];

const LOAN = /\bloans?\b/i;
const DIVIDEND = /\bdividends?\b|\bprofi[lt]s?\b/i;
const NOT_EXPENSE = /se[tl]+ement|confab|drawing/i;

/** OCR often turns "t" into "l", "d" into "c" and so on; compare on a folded form. */
const fold = (s: string) =>
  s
    .toLowerCase()
    .replace(/l/g, "t")
    .replace(/c/g, "d")
    .replace(/[^a-z ]/g, " ");

function hit(note: string, word: string): boolean {
  const tokens = note.split(/[^a-z]+/).filter(Boolean);
  // Short words must stand alone ("oil" is not "foil", "ice" is not "service");
  // four-letter ones may also start a misread word ("welcing" for "weld").
  if (word.length <= 4)
    return tokens.some(
      (t) =>
        t === word ||
        t === `${word}s` ||
        (word.length === 4 && fold(t).startsWith(fold(word))),
    );
  if (note.includes(word)) return true;
  const w = fold(word);
  return tokens.some((t) => fold(t).includes(w));
}

export function guessExpense(note: string | null, kind?: string | null): Guess {
  const none: Guess = {
    category: null,
    business: null,
    notAnExpense: false,
    because: null,
    tagged: false,
  };
  const said = parseNarration(note);
  if (said)
    return {
      category: said.category,
      business: said.business,
      notAnExpense: false,
      because: `tagged ${said.tag}`,
      tagged: true,
    };
  // Support of any kind (family, church, school fees…) and "For snacks" are the
  // owner's own money, not Lounge costs. A list of several things with amounts,
  // or a salary, is left to the other rules.
  if (note) {
    const text = correctNote(note).replace(/\s+/g, " ").trim();
    const support = /\bsupport\b/i.test(text);
    const list = /\d+(\.\d+)?k\b|\d{3,}|,/i.test(text);
    if (
      (support && !list && !/salar/i.test(text)) ||
      /^(for\s+)?snacks?$/i.test(text)
    )
      return { ...none, category: OWNERS_PAY, because: "owner's own" };
  }
  // Airtime is the owner's own, for no business.
  if (kind === "AIRTIME")
    return { ...none, category: OWNERS_PAY, because: "airtime" };
  if (!note) return none;
  const text = ` ${note.toLowerCase()} `;
  if (LOAN.test(text)) return { ...none, category: LOANS, because: "loan" };
  if (DIVIDEND.test(text))
    return {
      ...none,
      category: DIVIDENDS,
      because: "dividend or profit share",
    };
  if (NOT_EXPENSE.test(text))
    return {
      ...none,
      notAnExpense: true,
      because: "loan, profit or commission",
    };
  for (const rule of RULES)
    for (const word of rule.words)
      if (hit(text, word))
        return {
          ...none,
          category: rule.category,
          business: rule.business ?? "lounge",
          because: word,
        };
  return none;
}
