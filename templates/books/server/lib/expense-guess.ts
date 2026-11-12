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
    words: ["salary", "salaries", "wage", "stipend", "allowance"],
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
    category: "Repairs",
    business: null,
    words: [
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
      "refuse",
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

const NOT_EXPENSE =
  /\bloan\b|\bprofi[lt]s?\b|commission|se[tl]+ement|confab|\bdividend|\bdrawing/i;

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
  };
  if (kind === "AIRTIME")
    return { ...none, category: "Other", because: "airtime" };
  if (!note) return none;
  const text = ` ${note.toLowerCase()} `;
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
          category: rule.category,
          business: rule.business,
          notAnExpense: false,
          because: word,
        };
  return none;
}
