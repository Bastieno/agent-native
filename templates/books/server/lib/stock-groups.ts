import {
  STOCK_GROUPS,
  STOCK_KEYS,
  SHARED,
  UNSORTED,
  stockKeyName,
  type StockKey,
} from "../../shared/stock-groups.js";
import { expenseNote } from "./expense-note.js";
import { newId, nowIso } from "./ids.js";
import { isNotIncome, loadSales } from "./sales-lines.js";
import { MANAGER_FLOAT, STOCK_CATEGORIES } from "./setup.js";
import { num, rows, run } from "./sql.js";
import { saleGroup, splitStock, type StockSplit } from "./stock-split.js";

/**
 * Lounge stock bought and sales for each menu group (the owner's answers,
 * 2026-11-24). A stock purchase's split is read from its note unless the
 * owner has set one (stock_splits). Floats are never itemised: Not sorted.
 */
export interface PurchaseSplit extends StockSplit {
  /** The owner set this split; it is not read from the note. */
  byOwner: boolean;
}

interface StockRow {
  id: string;
  amount: unknown;
  raw_text: string | null;
  category: string | null;
}

export const isStock = (category: string | null | undefined) =>
  !!category && STOCK_CATEGORIES.includes(category);

/** The split of each stock purchase given; other expenses get null. */
export async function purchaseSplits(
  orgId: string,
  expenses: StockRow[],
): Promise<Map<string, PurchaseSplit | null>> {
  const out = new Map<string, PurchaseSplit | null>();
  const stock = expenses.filter((e) => isStock(e.category));
  const set = new Map<string, { group: StockKey; amount: number }[]>();
  if (stock.length) {
    for (const r of await rows(
      `SELECT expense_id, stock_group, amount FROM stock_splits WHERE org_id = ? AND expense_id IN (${stock.map(() => "?").join(", ")})`,
      [orgId, ...stock.map((e) => e.id)],
    ))
      set.set(r.expense_id as string, [
        ...(set.get(r.expense_id as string) ?? []),
        { group: r.stock_group as StockKey, amount: num(r.amount) },
      ]);
  }
  for (const e of expenses) {
    if (!isStock(e.category)) {
      out.set(e.id, null);
      continue;
    }
    const owners = set.get(e.id);
    out.set(
      e.id,
      owners
        ? {
            parts: STOCK_KEYS.flatMap((k) =>
              owners
                .filter((p) => p.group === k)
                .map((p) => ({ group: k, amount: p.amount })),
            ),
            mismatch: false,
            byOwner: true,
          }
        : {
            ...splitStock(expenseNote(e.raw_text), num(e.amount), {
              float: e.category === MANAGER_FLOAT,
            }),
            byOwner: false,
          },
    );
  }
  return out;
}

async function stockRows(orgId: string, start: string, end: string) {
  return rows<StockRow & { code: string }>(
    `SELECT e.id, e.code, e.amount, e.raw_text, c.name AS category
       FROM expenses e JOIN expense_categories c ON c.id = e.category_id
      WHERE e.org_id = ? AND e.occurred_on >= ? AND e.occurred_on <= ?
        AND c.name IN (${STOCK_CATEGORIES.map(() => "?").join(", ")})`,
    [orgId, start, end, ...STOCK_CATEGORIES],
  );
}

/** Codes of the stock purchases in a range with some of it in `key`. */
export async function purchasesIn(
  orgId: string,
  start: string,
  end: string,
  key: StockKey,
): Promise<Set<string>> {
  const found = await stockRows(orgId, start, end);
  const splits = await purchaseSplits(orgId, found);
  return new Set(
    found
      .filter((e) => splits.get(e.id)?.parts.some((p) => p.group === key))
      .map((e) => e.code),
  );
}

export async function stockGroups(orgId: string, start: string, end: string) {
  const sales = new Map<string, number>();
  for (const s of await loadSales(orgId, start, end)) {
    if (s.status !== "COMPLETED" || isNotIncome(s.methods)) continue;
    for (const l of s.lines) {
      const g = saleGroup(l.itemName, l.categoryName);
      if (g) sales.set(g, (sales.get(g) ?? 0) + l.lineTotal);
    }
  }
  const bought = new Map<string, number>();
  const counts = new Map<string, number>();
  let mismatched = 0;
  const found = await stockRows(orgId, start, end);
  const splits = await purchaseSplits(orgId, found);
  for (const e of found) {
    const s = splits.get(e.id)!;
    if (s.mismatch) mismatched++;
    for (const p of s.parts) {
      bought.set(p.group, (bought.get(p.group) ?? 0) + p.amount);
      counts.set(p.group, (counts.get(p.group) ?? 0) + 1);
    }
  }
  const line = (key: string) => ({
    bought: bought.get(key) ?? 0,
    count: counts.get(key) ?? 0,
  });
  return {
    start,
    end,
    /** Sales, stock bought and what is left after stock, per group. Kobo. */
    groups: STOCK_GROUPS.map((g) => {
      const s = sales.get(g.id) ?? 0;
      const b = bought.get(g.id) ?? 0;
      return {
        group: g.id,
        name: g.name,
        sales: s,
        bought: b,
        difference: s - b,
        count: counts.get(g.id) ?? 0,
      };
    }),
    /** General items used across the menu. */
    shared: line(SHARED),
    /** Stock that could not be placed, floats included: for the owner to file. */
    unsorted: line(UNSORTED),
    /** Purchases whose note lines don't add up to what was paid. */
    mismatched,
  };
}

/**
 * Sets how a stock purchase is shared among the groups: one group for all of
 * it, or parts (naira) adding up to what was paid. No parts goes back to
 * reading it from the note.
 */
export async function setStockSplit(
  orgId: string,
  code: string,
  input: { group?: StockKey; parts?: { group: StockKey; amount: number }[] },
) {
  const [e] = await rows(
    `SELECT e.id, e.code, e.amount, c.name AS category FROM expenses e
       LEFT JOIN expense_categories c ON c.id = e.category_id
      WHERE e.org_id = ? AND UPPER(e.code) = UPPER(?)`,
    [orgId, code.trim()],
  );
  if (!e) throw new Error(`No expense ${code}.`);
  if (!isStock(e.category as string | null))
    throw new Error(
      `${e.code} is not a stock purchase: only ${STOCK_CATEGORIES.join(" and ")} are shared among the menu groups.`,
    );
  const amount = num(e.amount);
  const parts = input.group
    ? [{ group: input.group, amount }]
    : (input.parts ?? []).map((p) => ({
        group: p.group,
        amount: Math.round(p.amount * 100),
      }));
  for (const p of parts)
    if (!STOCK_KEYS.includes(p.group))
      throw new Error(`Unknown stock group: ${p.group}`);
  if (parts.length) {
    const total = parts.reduce((a, p) => a + p.amount, 0);
    if (total !== amount)
      throw new Error(
        `The parts must add up to what was paid (₦${(amount / 100).toLocaleString("en-NG")}).`,
      );
  }
  await run(`DELETE FROM stock_splits WHERE org_id = ? AND expense_id = ?`, [
    orgId,
    e.id,
  ]);
  for (const p of parts.filter((x) => x.amount > 0))
    await run(
      `INSERT INTO stock_splits (id, expense_id, stock_group, amount, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 'org')`,
      [newId(), e.id, p.group, p.amount, nowIso(), orgId],
    );
  return {
    code: e.code as string,
    parts: parts.map((p) => ({ ...p, name: stockKeyName(p.group) })),
    fromNote: parts.length === 0,
  };
}
