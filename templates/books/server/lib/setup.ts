import { getDbExec } from "@agent-native/core/db";
import { newId, nowIso } from "./ids.js";

export const BUSINESSES = [
  { slug: "lounge", name: "Restaurant & Lounge" },
  { slug: "hub", name: "Hub" },
] as const;

/** Moniebook category → business, seeded per org and editable afterwards. */
export const CATEGORY_BUSINESS: Record<string, "lounge" | "hub"> = {
  Subscription: "hub",
  Drinks: "lounge",
  Shawarma: "lounge",
  Meals: "lounge",
  Water: "lounge",
};

/** Money to the owner for their own pay, kept out of the running costs. */
export const OWNERS_PAY = "Owner's pay";
/** Money sent to a manager to buy stock, with no breakdown of what was bought. */
export const MANAGER_FLOAT = "Manager float (not itemised)";

/**
 * Stock bought is already counted once, as cost of goods in gross profit, so it
 * is shown apart and not taken off again as an expense.
 */
export const STOCK_CATEGORIES = ["Food & drink stock", MANAGER_FLOAT];

export const LOANS = "Loans & repayments";
export const MOVED = "Moved between accounts";
export const CLIENT = "Paid for a client (repaid)";
export const DOLLARS = "Dollar purchases";
/** Money that moved but is not a running cost: counted apart, never in expenses or profit. */
export const DIVIDENDS = "Dividends & profit share";
export const NOT_COSTS = [LOANS, MOVED, CLIENT, DOLLARS, DIVIDENDS];
/** DSTV and other TV subscriptions: the Lounge's (the owner's answer, 2026-11-23). */
export const TV = "TV & subscriptions";
/** Money given back to customers: taken off that business's income, not a cost. */
export const REFUNDS = "Refunds to customers";
/** Categories that belong to no business: the owner's own pay and money moved. */
export const NO_BUSINESS = [OWNERS_PAY, ...NOT_COSTS];

export const EXPENSE_CATEGORIES = [
  "Food & drink stock",
  "Diesel / power",
  "Salaries",
  "Rent",
  "Repairs",
  "Internet",
  "Supplies",
  "Equipment & furniture",
  "Taxes & levies",
  "Commissions",
  OWNERS_PAY,
  MANAGER_FLOAT,
  ...NOT_COSTS,
  REFUNDS,
  TV,
  "Other",
];

export interface Thresholds {
  houseLeakagesPerDay: number; // kobo, at cost
  largeExpense: number; // kobo
  spikePct: number;
  manualWindowMinutes: number;
}

export const DEFAULT_THRESHOLDS: Thresholds = {
  houseLeakagesPerDay: 2_000_000,
  largeExpense: 10_000_000,
  spikePct: 30,
  manualWindowMinutes: 120,
};

const seeded = new Set<string>();

/** Adds any default expense category the org doesn't have yet; never touches existing ones. */
export async function ensureExpenseCategories(orgId: string): Promise<void> {
  const exec = getDbExec();
  const have = new Set(
    (
      await exec.execute({
        sql: `SELECT name FROM expense_categories WHERE org_id = ?`,
        args: [orgId],
      })
    ).rows.map((r) => String((r as { name: string }).name)),
  );
  const top = await exec.execute({
    sql: `SELECT COALESCE(MAX(sort), -1) AS top FROM expense_categories WHERE org_id = ?`,
    args: [orgId],
  });
  let sort = Number((top.rows[0] as { top: number }).top) + 1;
  for (const name of EXPENSE_CATEGORIES) {
    if (have.has(name)) continue;
    await exec.execute({
      sql: `INSERT INTO expense_categories (id, name, sort, is_cost, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 'org')`,
      args: [
        newId(),
        name,
        sort++,
        NOT_COSTS.includes(name) || name === REFUNDS ? 0 : 1,
        nowIso(),
        orgId,
      ],
    });
  }
}

const running = new Map<string, Promise<void>>();

/**
 * Idempotent: businesses, item categories, expense categories and settings for
 * an org. Requests that arrive together share one run: two runs at once each
 * found nothing and both seeded, which left two Lounges and two Hubs.
 */
export function ensureBooksSetup(orgId: string): Promise<void> {
  if (seeded.has(orgId)) return Promise.resolve();
  let run = running.get(orgId);
  if (!run) {
    run = seedBooks(orgId).finally(() => running.delete(orgId));
    running.set(orgId, run);
  }
  return run;
}

async function seedBooks(orgId: string): Promise<void> {
  if (seeded.has(orgId)) return;
  const exec = getDbExec();
  const at = nowIso();
  const businessIds: Record<string, string> = {};
  for (const b of BUSINESSES) {
    const found = await exec.execute({
      sql: `SELECT id FROM businesses WHERE org_id = ? AND slug = ? ORDER BY created_at, id LIMIT 1`,
      args: [orgId, b.slug],
    });
    let id = (found.rows[0] as { id?: string } | undefined)?.id;
    if (!id) {
      id = newId();
      await exec.execute({
        sql: `INSERT INTO businesses (id, name, slug, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, 'org')`,
        args: [id, b.name, b.slug, at, orgId],
      });
    }
    businessIds[b.slug] = id;
  }
  for (const [name, slug] of Object.entries(CATEGORY_BUSINESS)) {
    const found = await exec.execute({
      sql: `SELECT id FROM item_categories WHERE org_id = ? AND name = ? ORDER BY created_at, id LIMIT 1`,
      args: [orgId, name],
    });
    if (found.rows.length === 0) {
      await exec.execute({
        sql: `INSERT INTO item_categories (id, name, business_id, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, 'org')`,
        args: [newId(), name, businessIds[slug], at, orgId],
      });
    }
  }
  await ensureExpenseCategories(orgId);
  const settings = await exec.execute({
    sql: `SELECT org_id FROM books_settings WHERE org_id = ?`,
    args: [orgId],
  });
  if (settings.rows.length === 0) {
    await exec.execute({
      sql: `INSERT INTO books_settings (org_id, thresholds, recipients, allowed_numbers, reminders, created_at) VALUES (?, ?, '[]', '{}', '{}', ?)`,
      args: [orgId, JSON.stringify(DEFAULT_THRESHOLDS), at],
    });
  }
  seeded.add(orgId);
}
