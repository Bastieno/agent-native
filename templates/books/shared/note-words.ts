/**
 * Corrects the narration read off a transfer slip. The Moniepoint slip font
 * makes text recognition read t as l ("waler", "Carrols", "Kelchup"), and a
 * few other look-alike letters (n for h, u for a, S for 5). A word is changed
 * only when it is not a known word and a known word differs from it by
 * look-alike letters alone; names and anything else are left as they are.
 */

/** Words the notes use, spelt right. Lower case. */
const WORDS = `
for and of the with from to in on at by per each all part full half balance payment pay paid refund
remark business support supply supplies service services servicing transport transportation fare
delivery logistics total misc things items order purchase use usage monthly month week weekly daily
january february march april may june july august september october november december
monday tuesday wednesday thursday friday saturday sunday
salary salaries overtime wage stipend allowance staff gateman cleaner cleaning security
pack packs piece pieces pcs crate crates carton cartons bottle bottles can cans bag bags box boxes
roll rolls bundle bundles dozen tin tins sachet sachets litre litres liter liters gallon gallons kg
cylinder plate plates cup cups each unit units
food meal meals breakfast lunch dinner snacks snack drinks drink provisions ingredients spice spices
bread chicken chips fries cabbage carrot carrots onion onions pepper peppers tomato tomatoes garlic
ginger crayfish sausage sausages egg eggs rice beans yam plantain potato potatoes noodles spaghetti
indomie pasta beef meat goat turkey fish fillet fillets suya shawarma burger pizza pie curry thyme
maggi seasoning salt sugar milk cream butter yogurt honey oil groundnut flour vegetable vegetables
lettuce cucumber corn ketchup mayonnaise mayo bama sauce soy
water coke fanta sprite pepsi malt maltina fayrouz hollandia viju exotic active chivita
beer stout heineken budweiser guinness star trophy origin smirnoff desperado raddler goldberg
jameson liquor wine whisky ice
gas diesel fuel petrol generator token light lights electricity electric electrical power solar
inverter battery batteries bulb bulbs lamp lamps wire wires cable cables socket switch extension
data airtime internet network subscription starlink fiberx dstv netflix router
repair repairs fix fixing fixes work works workmanship welding plumbing carpentry painting paint
cement sand tiles tiling ceiling roof roofing door doors window windows lock locks padlock padlocks
pipe pipes plank planks nail nails screw screws iron rod rods metal metallic bars beam block blocks
board wall walls glass mechanic engine car tyre brake installation maintenance construction
material materials completion complete
foil nylon nylons takeaway takeout serviette serviettes tissue tissues napkin napkins straw straws
soap detergent bleach sponge broom mop brush towel towels toilet toothpick gloves clingfilm
container containers sticker stickers flier fliers paper tape table tables chair chairs fan
shelf freezer fridge television laptop phone printer
rent lease tax levy levies land charge charges fee fees commission loan repayment profit dividend
float stock owner client dollar move moved account transfer paste usd
lounge hub equipment other restaurant
`
  .split(/\s+/)
  .filter(Boolean);

/** Real words that are close to a list word but must stay as written. */
const PLAIN =
  `taken when was sent date starting started hall clearing near late rate new old
free rest best last first next same also only just more less into over under after before
this that these those there their them they then than what which who whom your yours our
ours his her hers its not but are were been being have has had will would could should
car ear bug bag far fan`
    .split(/\s+/)
    .filter(Boolean);

/** Misreads seen often in these notes whose right word the letters alone can't settle. */
const ALIASES: Record<string, string> = {
  far: "for",
  cartol: "carrot",
  carrcl: "carrot",
  carcl: "carrot",
  usc: "usd",
};

const KNOWN = new Set([...WORDS, ...PLAIN.filter((w) => !ALIASES[w])]);

/** Look-alike pairs the slip font produces, and what swapping them costs. */
const CHEAP = new Map<string, number>();
for (const [a, b, cost] of [
  ["l", "t", 0.25],
  ["i", "t", 0.25],
  ["l", "i", 0.3],
  ["n", "h", 0.3],
  ["u", "a", 0.3],
  ["e", "a", 0.4],
  ["c", "e", 0.4],
  ["c", "o", 0.4],
  ["o", "p", 0.4],
  ["z", "t", 0.4],
  ["r", "n", 0.4],
  ["s", "c", 0.5],
] as const) {
  CHEAP.set(a + b, cost);
  CHEAP.set(b + a, cost);
}

function cost(from: string, to: string): number {
  const d: number[][] = Array.from({ length: from.length + 1 }, () =>
    new Array(to.length + 1).fill(0),
  );
  for (let i = 0; i <= from.length; i++) d[i][0] = i;
  for (let j = 0; j <= to.length; j++) d[0][j] = j;
  for (let i = 1; i <= from.length; i++)
    for (let j = 1; j <= to.length; j++) {
      const a = from[i - 1];
      const b = to[j - 1];
      const swap = a === b ? 0 : (CHEAP.get(a + b) ?? 1);
      // A letter read twice ("Filllet") is cheap to drop.
      const drop = i > 1 && from[i - 2] === a ? 0.3 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + drop,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + swap,
      );
    }
  return d[from.length][to.length];
}

const cache = new Map<string, string | null>();

/** The known word this one was misread from, or null. */
function bestWord(word: string): string | null {
  if (cache.has(word)) return cache.get(word)!;
  let best: string | null = null;
  let bestCost = Infinity;
  let tied = false;
  const limit = Math.max(0.5, word.length * 0.17);
  for (const w of WORDS) {
    if (Math.abs(w.length - word.length) > 2) continue;
    const c = cost(word, w);
    if (c < bestCost) {
      best = w;
      bestCost = c;
      tied = false;
    } else if (c === bestCost && w !== best) tied = true;
  }
  const found = best && bestCost <= limit && !tied ? best : null;
  cache.set(word, found);
  return found;
}

const sameCase = (model: string, word: string) =>
  model === model.toUpperCase() && model.length > 1
    ? word.toUpperCase()
    : model[0] === model[0].toUpperCase()
      ? word[0].toUpperCase() + word.slice(1)
      : word;

function correctWord(word: string): string {
  const lower = word.toLowerCase();
  if (ALIASES[lower]) return sameCase(word, ALIASES[lower]);
  if (lower.length < 3 || KNOWN.has(lower)) return word;
  // Plurals and the like of known words are fine as they are.
  if (KNOWN.has(lower.replace(/s$/, "")) || KNOWN.has(lower.replace(/es$/, "")))
    return word;
  // All capitals of four letters or fewer are tags and names (TF, CEO, DSTV).
  if (word === word.toUpperCase() && word.length <= 4) return word;
  const found = bestWord(lower);
  return found ? sameCase(word, found) : word;
}

const COUNT =
  "packs?|pcs|pieces?|crates?|bags?|kg|kilos?|litres?|liters?|bottles?|cartons?|cans?|rolls?|tubers?|bundles?|boxes|box|dozens?|cylinders?|tins?|sachets?|loaves|plates?";

/** Corrects a narration read off a slip. Safe to run more than once. */
export function correctNote(note: string): string {
  return (
    note
      // 5 read as S: "Sk", "S.5k", "S packs".
      .replace(/(^|[\s:,(])S(?=(\d*(?:[.,]\d+)?k)\b)/g, "$15")
      .replace(new RegExp(`(^|[\\s,(])S(?=\\s+(?:${COUNT})\\b)`, "gi"), "$15")
      // 0 read as D or O after a digit: "1D packs".
      .replace(new RegExp(`(\\d)[DO](?=\\s*(?:${COUNT})\\b)`, "g"), "$10")
      // A decimal point read as a comma: "12,0k", "53,3k".
      .replace(/(\d),(\d)k\b/g, "$1.$2k")
      // TF (transport fare) read as TL.
      .replace(/\bTL(?=\s*[:\d])/g, "TF")
      .replace(/[A-Za-z]+/g, correctWord)
  );
}
