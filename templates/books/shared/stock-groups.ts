/**
 * The Lounge's menu groups (the owner's answers, 2026-11-24). Stock bought
 * for each is set against what each sells. A transfer note starting with a
 * group's tag ("SHAWARMA", "BEER") is stock for that group. General items
 * (nylon, serviette, transport) are Shared; what can't be placed is Not sorted.
 */
export const STOCK_GROUPS = [
  { id: "water", name: "Water", tag: "WATER", example: "WATER 10 packs" },
  {
    id: "soft",
    name: "Soft drinks",
    tag: "SOFT",
    example: "SOFT 2 packs coke, 1 pack maltina",
  },
  {
    id: "energy",
    name: "Energy drinks",
    tag: "ENERGY",
    example: "ENERGY 1 pack Monster",
  },
  { id: "beer", name: "Beer", tag: "BEER", example: "BEER 2 crates Trophy" },
  {
    id: "bitters",
    name: "Bitters",
    tag: "BITTERS",
    example: "BITTERS 1 carton Origin bitter",
  },
  {
    id: "liquor",
    name: "Liquors",
    tag: "LIQUOR",
    example: "LIQUOR 2 bottles Red Label",
  },
  {
    id: "meals",
    name: "Meals",
    tag: "MEALS",
    example: "MEALS chicken 24k, indomie 9.7k, gas refill 15k",
  },
  {
    id: "shawarma",
    name: "Shawarma",
    tag: "SHAWARMA",
    example: "SHAWARMA bama 12.6k, chicken fillet 15k, nylon 3k",
  },
] as const;

export type StockGroupId = (typeof STOCK_GROUPS)[number]["id"];
export const SHARED = "shared";
export const UNSORTED = "unsorted";
/** A group, or Shared, or Not sorted. */
export type StockKey = StockGroupId | typeof SHARED | typeof UNSORTED;

export const STOCK_KEYS: StockKey[] = [
  ...STOCK_GROUPS.map((g) => g.id),
  SHARED,
  UNSORTED,
];

export function stockKeyName(key: string): string {
  if (key === SHARED) return "Shared";
  if (key === UNSORTED) return "Not sorted";
  return STOCK_GROUPS.find((g) => g.id === key)?.name ?? key;
}
