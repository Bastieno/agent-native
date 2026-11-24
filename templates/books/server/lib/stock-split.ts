import { parseNarration } from "../../shared/narration.js";
import {
  SHARED,
  STOCK_KEYS,
  UNSORTED,
  type StockGroupId,
  type StockKey,
} from "../../shared/stock-groups.js";

/**
 * Which Lounge menu group a stock purchase was for, read from its note (the
 * owner's answers, 2026-11-24). A note tagged with a group ("SHAWARMA …") is
 * that group's, except general items (nylon, serviette, transport: Shared).
 * Otherwise each line is placed by its items: a note with an amount on each
 * line is split line by line; one without amounts goes to its one group. Gas
 * and pepper go with the rest of the note. What can't be placed is Not sorted.
 */

/** Gas and pepper are bought for whichever group the rest of the note is. */
type Context = "gas" | "pepper";
/** Engine oil and the like: not menu stock. */
type NotStock = "none";
type Key = StockKey | Context | NotStock;

/**
 * Item words, most specific first. A match is taken out of the text before the
 * next rule runs, so "chicken fillet" is not also chicken and "origin bitter"
 * not also origin. Misreadings seen on slips are spelt alongside.
 */
const RULES: [RegExp, Key][] = [
  [/\bengine\s+oil\b/g, "none"],
  // Shawarma
  // "Chicken for shawarma", "Pepper for sharwama", "Chicken for meal".
  [/\b[a-z]+\s+for\s+(sh|sn)[a-z]*/g, "shawarma"],
  [/\b[a-z]+\s+for\s+meals?\b/g, "meals"],
  [/\bfoil(\s+paper)?s?\b/g, "shawarma"],
  [
    /\b(c\w*k\w*n\s+|giticken\s+)?(fill?l?[ec]ts?|fil+e[lt]s?|lilel)\b/g,
    "shawarma",
  ],
  [
    /\b(shawarma|sh[ae]r?w[ae]r?m[ae]|shawama|shwarma|sharvame|snarwama|sharvama|sharwarma)s?(\s+br\w*)?\b/g,
    "shawarma",
  ],
  [/\bbama\b|\bbarra\b|\bmayo(nnaise)?\b/g, "shawarma"],
  [/\bk[ea][tl]c?[hn]?up\b|\bketchup\b|\bheinz\b/g, "shawarma"],
  [/\bca\w?b+\w?ges?\b/g, "shawarma"],
  [/\bcarr?o[tl]s?\b|\bcarrols?\b/g, "shawarma"],
  [/\bsausages?\b/g, "shawarma"],
  [/\bbread\b/g, "shawarma"],
  // Drinks
  // Black Bullet and Smirnoff Double Black are Energy drinks (the owner,
  // 2026-11-24), as in Moniebook.
  [
    /\bred\s*bull\b|\bmonster\b|\bpower\s*horse\b|\bblack\s*bullet\b|\b(smirnoff\s+)?d[eo]u?ble\s*black\b/g,
    "energy",
  ],
  [
    /\b((or[iy]j?g?in|orijin|arigin|action)\s+)?bitters?\b|\bsatibo\b/g,
    "bitters",
  ],
  [/\bmalta\s+guinness\b|\bmalt\w*\b|\bmall?ina\b|\bmaitina\b/g, "soft"],
  [/\bsmirnoff\s+vodka\b/g, "liquor"],
  [/\bsmirnoff(\s+(ice|big))?\b/g, "beer"],
  [
    /\bliquors?\b|\bwines?\b|\bwhisk(e)?y\b|\bvodka\b|\btequila\b|\bgin\b|\brum\b|\bbrandy\b|\bcognac\b|\bchampagne\b|\bjameson\b|\bjack\s*daniels?\b|\bred\s*label\b|\bimper[il]?al\b|\b(william\s*)?lawson\b|\bcaptain\s*morgan\b|\bbacardi\b|\bolmeca\b|\bsierra\b|\bmartini\b|\bcarlo\s*rossi\b|\bfour\s*cousins?\b|\bnederburg\b|\bandre\b|\b4\s*th\s*street\b|\bbest\s*classic\b|\b8\s*pm\b|\bhennessy\b|\bbaileys\b|\bcampari\b|\broyal\s*circle\b|\bfrontera\b|\brobertson\b|\bbree\b|\bagor\b/g,
    "liquor",
  ],
  [
    /\bbeers?\b|\bheinek\w*\b|\bbudweiser\b|\bor[iy]j?g?in\b|\borijin\b|\barigin\b|\bgold\w*berg\b|\bgolaberg\b|\btro[ph]+[iy]+\b|\bstar\b|\bradd?[il]?er\b|\braddier\b|\b[tl]iger\b|\bcastle(\s+lite)?\b|\bflying\s*fish\b|\bthree\s*three\b|\bdesperados?\b|\bguin+es+\b|\bstouts?\b|\blegend\b|\bgulder\b|\bhero\b|^\W*\d+\s+more\b/g,
    "beer",
  ],
  [/\bwa[tl]er\b/g, "water"],
  [
    /\bcoke\b|\bfanta\b|\bsprite\b|\bpepsi\b|\b7\s*up\b|\bfayrouz\b|\bholl?an[dc]ia\b|\bviju\b|\bex[ol]tic\b|\bexolic\b|\bchivita\b|\bactive\b|\b(5|five)\s*alive\b|\bcoco\s*samba\b|\bsoft\s*drinks?\b|\byogh?urt\b|\bmilk\b|\bschweppes\b|\bjuice\b/g,
    "soft",
  ],
  // Shared: general items used across the menu
  [
    /\bnylons?\b|\bserv\w*[tl]+e?s?\b|\b[tl]issues?\b|\bnapkins?\b|\bsoap\b|\bdetergent\b|\bbleach\b|\btowels?\b|\bfreshe?ners?\b|\bcups?\b|\bice\b|\bstraws?\b|\btoothpicks?\b|\bgloves?\b|\bsponges?\b|\btf\b|\btransport\w*\b|\bfare\b|\bdelivery\b|\blogistics\b|\bpaper\b|\blighters?\b|\bblocks?\b|\btoil\w*tr\w*\b|\butensils?\b|\bexercise\s+books?\b|\ba4\b/g,
    SHARED,
  ],
  // Meals
  [
    /\btake\s*-?\s*(out|away)(\s+(packs?|plates?))?\b|\btakeaway\b|\bcling\s*film\b/g,
    "meals",
  ],
  [/\bc[hn]?i[ck]+[ei]n\b|\bchiken\b|\bgiticken\b/g, "meals"],
  [
    /\bcray\w*\b|\bgarl?i?c\b|\bginger\b|\bindomie\b|\bnoodles?\b|\bs[op]a?g\w*\b|\beggs?\b|\boil\b|\bonions?\b|\bmaggi\b|\bcurry\b|\bcarry\b|\bc[hi]?[it]?[ip]+s\b|\bchios\b|\bpotato(es)?\b|\bthyme\b|\bsalt\b|\bsall\b|\bseasoning\b|\bplantains?\b|\brice\b|\bturkey\b|\bcat\s*fish\b|\bfish\b|\bcroaker\b|\bspices?\b|\btomato(es)?\b|\bflour\b|\bgroundnut\b|\bbutter\b|\bcucumbers?\b|\blettuce\b|\bsugar\b|\bpaste\b|\bcharcoal\b|\bsoy\b|\bonga\b|\bngion\b|\bplates?\b|\bfoam\b|\bburgers?\b|\bbbq\b|\bhoney\b|\bsauce\b/g,
    "meals",
  ],
  [/\bpep+[eo]?r\w*\b|\bpep[co]er\b/g, "pepper"],
  [/\bgas\b|\bcylinders?\b/g, "gas"],
];

/** Cyrillic letters text recognition reads for Latin ones ("слiскen"). */
const LOOKALIKE: Record<string, string> = {
  А: "A",
  В: "B",
  С: "C",
  Е: "E",
  Н: "H",
  К: "K",
  М: "M",
  О: "O",
  Р: "P",
  Т: "T",
  Х: "X",
  У: "Y",
  а: "a",
  в: "b",
  с: "c",
  е: "e",
  к: "k",
  м: "m",
  н: "h",
  о: "o",
  р: "p",
  т: "t",
  х: "x",
  у: "y",
  і: "i",
  п: "n",
  л: "n",
  г: "r",
  и: "u",
};
/** Look-alike letters made Latin, and a number run into a word split ("2chips"). */
function normalise(text: string): string {
  return text
    .replace(/[\u0400-\u04ff]/g, (c) => LOOKALIKE[c] ?? c)
    .replace(/(\d)(?=[a-jl-z])/gi, "$1 ");
}

/** "Tf" (transport fare) as slips misread it: "If", "U", "1I", "Tl", "tr". */
const FARE = new Set([
  "tf",
  "if",
  "uf",
  "u",
  "i",
  "t",
  "tl",
  "tr",
  "lr",
  "lf",
  "1f",
  "1i",
  "i1",
  "11",
  "ii",
  "f",
  "l",
  "1t",
]);
const isFare = (rest: string) =>
  FARE.has(rest.replace(/[^a-z0-9]/gi, "").toLowerCase());

const GROUPS = new Set<string>(
  STOCK_KEYS.filter((k) => k !== SHARED && k !== UNSORTED),
);

/** What a piece of text names: a group, Shared, gas/pepper, or nothing known. */
function classify(text: string): {
  group: StockGroupId | null;
  ambiguous: boolean;
  shared: boolean;
  context: Context | null;
  notStock: boolean;
  known: boolean;
} {
  let t = ` ${text.toLowerCase()} `;
  const found = new Set<Key>();
  for (const [re, key] of RULES) {
    re.lastIndex = 0;
    if (re.test(t)) {
      found.add(key);
      re.lastIndex = 0;
      t = t.replace(re, " ");
    }
  }
  const groups = [...found].filter((k) => GROUPS.has(k)) as StockGroupId[];
  const context = found.has("pepper")
    ? "pepper"
    : found.has("gas")
      ? "gas"
      : null;
  return {
    group: groups.length === 1 ? groups[0] : null,
    ambiguous: groups.length > 1,
    shared: found.has(SHARED),
    context,
    notStock: found.has("none"),
    known: found.size > 0,
  };
}

/** The first amount in a line, in kobo: "12.6k", "2,5k", "₦3,000", "15,000", "800". */
const AMOUNT =
  /(?:₦|\bn(?=\d)|\bngn\s*)?(\d+(?:[.,]\d{1,2})?)\s*k\b|(?:₦|\bn(?=\d))\s*(\d[\d,]*(?:\.\d+)?)|\b(\d{1,3}(?:,\d{3})+)(?:\.\d+)?\b|\b(\d{3,})\b/i;

function amountOf(line: string): { kobo: number; rest: string } | null {
  const m = AMOUNT.exec(line);
  if (!m) return null;
  let naira: number;
  if (m[1] != null) naira = Number(m[1].replace(",", ".")) * 1000;
  else naira = Number((m[2] ?? m[3] ?? m[4]).replace(/,/g, ""));
  if (!Number.isFinite(naira) || naira <= 0) return null;
  return {
    kobo: Math.round(naira * 100),
    rest: line.slice(0, m.index) + " " + line.slice(m.index + m[0].length),
  };
}

const TOTAL_LINE = /^\W*t[o0][tl]a[l1i]\b/i;

/** The note in lines: new lines, commas (not inside a number), ". ", " / ", "; ". */
function segments(note: string): string[] {
  return note
    .split(/\n|;|(?<!\d),|,(?!\d)|\.\s+|\s+\/\s+|\s+and\s+(?=₦?\d)/i)
    .map((s) => s.trim())
    .filter((s) => /[a-z0-9]/i.test(s));
}

/** Takes the tag (and LOUNGE/HUB) off the front of a tagged note. */
function withoutTag(note: string): string {
  let t = note;
  for (let i = 0; i < 2; i++) {
    const m = /^\s*([A-Za-z]+)[\s:,.\-–]*/.exec(t);
    if (!m || m[1] !== m[1].toUpperCase() || m[1].length < 2) break;
    if (!parseNarration(m[1]) && !/^(LOUNGE|HUB)$/i.test(m[1])) break;
    t = t.slice(m[0].length);
  }
  return t;
}

export interface StockSplit {
  /** In the order of the groups, then Shared, then Not sorted. Kobo. */
  parts: { group: StockKey; amount: number }[];
  /** The note's lines do not add up to what was paid. */
  mismatch: boolean;
  /** Shared by Moniebook cost prices: the note gave no amounts. */
  estimated?: boolean;
}

function finish(amounts: Map<StockKey, number>, mismatch: boolean): StockSplit {
  return {
    parts: STOCK_KEYS.filter((k) => (amounts.get(k) ?? 0) > 0).map((k) => ({
      group: k,
      amount: amounts.get(k)!,
    })),
    mismatch,
  };
}

const whole = (key: StockKey, amount: number, mismatch = false) =>
  finish(new Map([[key, amount]]), mismatch);

/** How a stock purchase of `amount` kobo is shared among the groups. */
export function splitStock(
  note: string | null | undefined,
  amount: number,
  opts: {
    float?: boolean;
    /** Each group's cost price per unit (kobo), from Moniebook. */
    groupCosts?: Partial<Record<StockGroupId, number>>;
  } = {},
): StockSplit {
  if (opts.float || !note?.trim() || amount <= 0)
    return whole(UNSORTED, amount);
  const tag = parseNarration(note)?.stockGroup ?? null;
  const text = normalise(note);
  const lines = segments(tag ? withoutTag(text) : text).filter(
    (l) => !TOTAL_LINE.test(l),
  );

  // Lines with an amount; a line without one is the start of the next (a
  // note wrapped across lines), or the end of the last.
  // An item without an amount ("5 packs chicken, 1k delivery") takes what
  // the priced lines leave of the payment.
  const priced: { kobo: number; text: string; fare: boolean }[] = [];
  const unpriced: string[] = [];
  let carry = "";
  let lastUnpriced = false;
  for (const l of lines) {
    const a = amountOf(l);
    if (!a) {
      lastUnpriced = classify(l).known || isFare(l);
      if (lastUnpriced) unpriced.push(l);
      else carry += ` ${l}`;
      continue;
    }
    // "Kelchup. 30k": an amount on its own belongs to the item just before.
    if (lastUnpriced && !classify(a.rest).known && !isFare(a.rest))
      carry = `${unpriced.pop()} ${carry}`;
    lastUnpriced = false;
    priced.push({
      kobo: a.kobo,
      text: `${carry} ${a.rest}`,
      fare: !carry && isFare(a.rest),
    });
    carry = "";
  }
  if (carry && priced.length) priced[priced.length - 1].text += carry;

  if (!priced.length) {
    if (tag) return whole(tag, amount);
    const read = lines.map(classify);
    if (read.some((r) => r.notStock || r.ambiguous))
      return whole(UNSORTED, amount);
    const groups = new Set(read.map((r) => r.group).filter(Boolean));
    const unknown = read.some((r) => !r.known);
    if (groups.size === 1 && !unknown) return whole([...groups][0]!, amount);
    if (groups.size > 1 && !unknown && opts.groupCosts) {
      const est = byCostPrice(lines, read, opts.groupCosts, amount);
      if (est) return est;
    }
    if (groups.size === 0 && !unknown) {
      if (read.some((r) => r.context === "gas")) return whole(UNSORTED, amount);
      if (read.some((r) => r.context === "pepper"))
        return whole("meals", amount);
      if (read.some((r) => r.shared)) return whole(SHARED, amount);
    }
    return whole(UNSORTED, amount);
  }

  const read = priced.map((p) => ({ ...p, ...classify(p.text) }));
  const groups = new Set(read.map((r) => r.group).filter(Boolean));
  const only = groups.size === 1 ? [...groups][0]! : null;
  const out = new Map<StockKey, number>();
  const add = (k: StockKey, v: number) => out.set(k, (out.get(k) ?? 0) + v);
  for (const r of read) {
    let key: StockKey;
    if (r.notStock || r.ambiguous) key = tag ?? UNSORTED;
    else if (r.group) key = tag ?? r.group;
    else if (r.context)
      key = tag ?? only ?? (r.context === "pepper" ? "meals" : UNSORTED);
    else if (r.shared || r.fare) key = SHARED;
    else key = tag ?? UNSORTED;
    add(key, r.kobo);
  }
  const total = [...out.values()].reduce((a, b) => a + b, 0);
  if (total === amount) return finish(out, false);
  if (total < amount) {
    const rest = tag ?? unpricedKey(unpriced, only);
    add(rest ?? UNSORTED, amount - total);
    return finish(out, !rest);
  }
  // The lines come to more than was paid: share the payment in proportion.
  const scaled = new Map<StockKey, number>();
  let given = 0;
  let biggest: StockKey | null = null;
  for (const [k, v] of out) {
    const s = Math.round((v * amount) / total);
    scaled.set(k, s);
    given += s;
    if (!biggest || v > out.get(biggest)!) biggest = k;
  }
  if (biggest) scaled.set(biggest, scaled.get(biggest)! + amount - given);
  return finish(scaled, true);
}

const DRINK_GROUPS = new Set<string>([
  "water",
  "soft",
  "energy",
  "beer",
  "bitters",
  "liquor",
]);
const NUMBER_WORDS: Record<string, number> = {
  half: 0.5,
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  twelve: 12,
};
/** How many a line bought: its leading number ("10 packs water"), else one. */
function quantityOf(line: string): number {
  const m = /^\W*(?:for\s+)?(\d+(?:\.\d+)?|[a-z]+)\b/i.exec(line);
  if (!m) return 1;
  const n = Number(m[1]);
  if (Number.isFinite(n) && n > 0) return n;
  return NUMBER_WORDS[m[1].toLowerCase()] ?? 1;
}

/**
 * A list of drinks without amounts ("2 origin, 1 maltina, 10 packs water"),
 * shared among its groups by quantity times each group's cost price (the
 * owner's answer, 2026-11-24). An estimate: packs and crates are taken as
 * alike. Ice in a drinks list is Smirnoff Ice; other general items are left
 * out. Null when a line isn't a drink or a group has no cost price.
 */
function byCostPrice(
  lines: string[],
  read: ReturnType<typeof classify>[],
  costs: Partial<Record<StockGroupId, number>>,
  amount: number,
): StockSplit | null {
  const weight = new Map<StockGroupId, number>();
  for (let i = 0; i < lines.length; i++) {
    const r = read[i];
    const g: StockGroupId | null =
      r.group ?? (r.shared && /\bice\b/i.test(lines[i]) ? "beer" : null);
    if (!g) {
      if (r.shared) continue;
      return null;
    }
    const cost = costs[g];
    if (!DRINK_GROUPS.has(g) || !cost) return null;
    weight.set(g, (weight.get(g) ?? 0) + quantityOf(lines[i]) * cost);
  }
  const total = [...weight.values()].reduce((a, b) => a + b, 0);
  if (weight.size < 2 || total <= 0) return null;
  const out = new Map<StockKey, number>();
  let given = 0;
  let biggest: StockGroupId | null = null;
  for (const [g, w] of weight) {
    const share = Math.round((w * amount) / total);
    out.set(g, share);
    given += share;
    if (!biggest || w > weight.get(biggest)!) biggest = g;
  }
  out.set(biggest!, out.get(biggest!)! + amount - given);
  return { ...finish(out, false), estimated: true };
}

/** The one place the items without an amount point to, or null. */
function unpricedKey(
  unpriced: string[],
  only: StockGroupId | null,
): StockKey | null {
  if (!unpriced.length) return null;
  const read = unpriced.map((u) => ({ ...classify(u), fare: isFare(u) }));
  if (read.some((r) => r.notStock || r.ambiguous)) return null;
  const groups = new Set(read.map((r) => r.group).filter(Boolean));
  if (groups.size === 1) return [...groups][0]!;
  if (groups.size > 1) return null;
  if (read.some((r) => r.context))
    return only ?? (read.every((r) => r.context === "pepper") ? "meals" : null);
  return read.every((r) => r.shared || r.fare) ? SHARED : null;
}

const CATEGORY_GROUPS: [RegExp, StockGroupId][] = [
  [/^water$/i, "water"],
  [/^soft\s*drinks?$/i, "soft"],
  [/^energy\s*drinks?$/i, "energy"],
  [/^beers?$/i, "beer"],
  [/^bitters?$/i, "bitters"],
  [/^(liquors?|wines?|spirits?)$/i, "liquor"],
  [/^meals?$/i, "meals"],
  [/^shawarma$/i, "shawarma"],
];
const DRINKS = new Set<string>([
  "water",
  "soft",
  "energy",
  "beer",
  "bitters",
  "liquor",
]);

/**
 * The menu group a sale item belongs to, from its Moniebook category (once
 * the owner splits Drinks there, the names match) or else its name. Null for
 * what is not Lounge food and drink (Hub subscriptions).
 */
export function saleGroup(
  itemName: string,
  categoryName: string | null,
): StockGroupId | null {
  const cat = (categoryName ?? "").trim();
  const byCat = CATEGORY_GROUPS.find(([re]) => re.test(cat))?.[1] ?? null;
  if (byCat === "meals")
    return /shawarma/i.test(itemName) && !/chips/i.test(itemName)
      ? "shawarma"
      : "meals";
  if (byCat) return byCat;
  if (/^drinks?$/i.test(cat)) {
    const g = classify(itemName).group;
    return g && DRINKS.has(g) ? g : "soft";
  }
  return null;
}
