/**
 * Points everything at one row per business and per expense category.
 *
 * Two set-up runs at once (fixed since) each created the Lounge, the Hub and
 * a category, so some orgs have two of each, with expenses split between
 * them. The earliest row of each is kept; every expense, menu category, payee
 * rule and staff entry using a later copy is moved to it. The copies are left
 * in place, unused: nothing is deleted.
 *
 * Usage: pnpm tsx ops/merge-duplicates.ts [--dry]
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
process.env.DATABASE_URL ??= "file:./data/app.db";
const dry = process.argv.includes("--dry");

const { rows, run } = await import("../server/lib/sql.js");

const USES: Record<"businesses" | "expense_categories", [string, string][]> = {
  businesses: [
    ["expenses", "business_id"],
    ["item_categories", "business_id"],
    ["payee_rules", "business_id"],
    ["staff_businesses", "business_id"],
  ],
  expense_categories: [
    ["expenses", "category_id"],
    ["payee_rules", "category_id"],
  ],
};

let moved = 0;
for (const [table, key] of [
  ["businesses", "slug"],
  ["expense_categories", "name"],
] as const) {
  const all = await rows<{
    org_id: string;
    k: string;
    id: string;
  }>(
    `SELECT org_id, ${key} AS k, id FROM ${table} ORDER BY org_id, ${key}, created_at, id`,
  );
  const keep = new Map<string, string>();
  for (const r of all) {
    const group = `${r.org_id}|${r.k}`;
    const first = keep.get(group);
    if (!first) {
      keep.set(group, r.id);
      continue;
    }
    for (const [user, col] of USES[table]) {
      const [{ n }] = await rows<{ n: number }>(
        `SELECT COUNT(*) AS n FROM ${user} WHERE ${col} = ?`,
        [r.id],
      );
      if (!Number(n)) continue;
      console.log(
        `${table} ${r.k}: ${n} ${user} from ${r.id.slice(0, 8)} → ${first.slice(0, 8)}`,
      );
      moved += Number(n);
      if (!dry)
        await run(`UPDATE ${user} SET ${col} = ? WHERE ${col} = ?`, [
          first,
          r.id,
        ]);
    }
  }
}
console.log(dry ? `(dry run) ${moved} to move` : `moved ${moved}`);
process.exit(0);
