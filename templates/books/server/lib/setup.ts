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

export const EXPENSE_CATEGORIES = [
  "Food & drink stock",
  "Diesel / power",
  "Salaries",
  "Rent",
  "Repairs",
  "Internet",
  "Supplies",
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

/** Idempotent: businesses, item categories, expense categories and settings for an org. */
export async function ensureBooksSetup(orgId: string): Promise<void> {
  if (seeded.has(orgId)) return;
  const exec = getDbExec();
  const at = nowIso();
  const businessIds: Record<string, string> = {};
  for (const b of BUSINESSES) {
    const found = await exec.execute({
      sql: `SELECT id FROM businesses WHERE org_id = ? AND slug = ?`,
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
      sql: `SELECT id FROM item_categories WHERE org_id = ? AND name = ?`,
      args: [orgId, name],
    });
    if (found.rows.length === 0) {
      await exec.execute({
        sql: `INSERT INTO item_categories (id, name, business_id, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, 'org')`,
        args: [newId(), name, businessIds[slug], at, orgId],
      });
    }
  }
  const expenseCount = await exec.execute({
    sql: `SELECT COUNT(*) AS n FROM expense_categories WHERE org_id = ?`,
    args: [orgId],
  });
  if (Number((expenseCount.rows[0] as { n: number }).n) === 0) {
    let sort = 0;
    for (const name of EXPENSE_CATEGORIES) {
      await exec.execute({
        sql: `INSERT INTO expense_categories (id, name, sort, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, 'org')`,
        args: [newId(), name, sort++, at, orgId],
      });
    }
  }
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
