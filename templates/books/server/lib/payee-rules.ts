import { businessIdBySlug } from "./catalog.js";
import { expenseCategoryId } from "./expenses.js";
import { newId, nowIso } from "./ids.js";
import { num, rows, run } from "./sql.js";

/**
 * A payee's identity for rules: their first two name words, upper case, letters
 * only ("Ada Okoro 0123456789" and "ADA OKORO" match). A payee that is only an
 * account number matches on those digits.
 */
export function payeeKey(vendor: string): string {
  const words = vendor
    .toUpperCase()
    .replace(/[^A-Z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (words.length) return words.slice(0, 2).join(" ");
  return vendor.replace(/\D/g, "");
}

export interface PayeeRule {
  matchKey: string;
  category: string;
  businessSlug: string | null;
  minAmount: number | null;
}

export async function loadPayeeRules(orgId: string): Promise<PayeeRule[]> {
  return (
    await rows(
      `SELECT r.match_key, c.name AS category, r.min_amount, b.slug FROM payee_rules r JOIN expense_categories c ON c.id = r.category_id LEFT JOIN businesses b ON b.id = r.business_id WHERE r.org_id = ?`,
      [orgId],
    )
  ).map((r) => ({
    matchKey: r.match_key,
    category: r.category,
    businessSlug: r.slug ?? null,
    minAmount: r.min_amount == null ? null : num(r.min_amount),
  }));
}

export function matchPayeeRule(
  rules: PayeeRule[],
  vendor: string,
  amount: number,
): PayeeRule | null {
  const key = payeeKey(vendor);
  return (
    rules.find(
      (r) =>
        r.matchKey === key && (r.minAmount == null || amount >= r.minAmount),
    ) ?? null
  );
}

/** Replaces any rule for the same payee. */
export async function savePayeeRule(
  orgId: string,
  input: {
    payee: string;
    category: string;
    business?: "lounge" | "hub" | "both";
    minAmount?: number; // kobo
  },
) {
  const key = payeeKey(input.payee);
  if (!key) throw new Error("Which payee?");
  const categoryId = await expenseCategoryId(orgId, input.category);
  const businessId = input.business
    ? await businessIdBySlug(orgId, input.business)
    : null;
  await run(`DELETE FROM payee_rules WHERE org_id = ? AND match_key = ?`, [
    orgId,
    key,
  ]);
  await run(
    `INSERT INTO payee_rules (id, match_key, category_id, business_id, min_amount, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, 'org')`,
    [
      newId(),
      key,
      categoryId,
      businessId,
      input.minAmount ?? null,
      nowIso(),
      orgId,
    ],
  );
  return { payee: key };
}
