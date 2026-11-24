/**
 * How the Lounge's stock purchases sort into the menu groups (read only).
 * Each purchase's split is read from its note when figures are shown, so
 * nothing is written; this prints the result to check before relying on it.
 *
 * Usage: pnpm tsx ops/stock-groups-report.ts [start] [end] [--list]
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
process.env.DATABASE_URL ??= "file:./data/app.db";
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const list = process.argv.includes("--list");
const start = args[0] ?? "2000-01-01";
const end = args[1] ?? "2999-12-31";

const { rows, num } = await import("../server/lib/sql.js");
const { MANAGER_FLOAT, STOCK_CATEGORIES } = await import("../server/lib/setup.js");
const { splitStock, saleGroup } = await import("../server/lib/stock-split.js");
const { isNotIncome, loadSales } = await import("../server/lib/sales-lines.js");
const { expenseNote } = await import("../server/lib/expense-note.js");
const { STOCK_KEYS, stockKeyName } = await import("../shared/stock-groups.js");

// Reads the note only (no owner splits), so it also runs on a database that
// does not have the stock_splits table yet.
const naira = (k: number) => `₦${Math.round(k / 100).toLocaleString("en-NG")}`;
const orgs = await rows<{ org_id: string }>(
  `SELECT DISTINCT org_id FROM expenses WHERE org_id IS NOT NULL`,
);
for (const { org_id } of orgs) {
  const sales = new Map<string, number>();
  for (const s of await loadSales(org_id, start, end)) {
    if (s.status !== "COMPLETED" || isNotIncome(s.methods)) continue;
    for (const l of s.lines) {
      const g = saleGroup(l.itemName, l.categoryName);
      if (g) sales.set(g, (sales.get(g) ?? 0) + l.lineTotal);
    }
  }
  const found = await rows<{
    code: string;
    amount: number;
    raw_text: string | null;
    category: string;
  }>(
    `SELECT e.code, e.amount, e.raw_text, c.name AS category
       FROM expenses e JOIN expense_categories c ON c.id = e.category_id
      WHERE e.org_id = ? AND e.occurred_on >= ? AND e.occurred_on <= ?
        AND c.name IN (${STOCK_CATEGORIES.map(() => "?").join(", ")})
      ORDER BY e.occurred_on`,
    [org_id, start, end, ...STOCK_CATEGORIES],
  );
  const bought = new Map<string, number>();
  const count = new Map<string, number>();
  let mismatched = 0;
  const lines: string[] = [];
  for (const e of found) {
    const note = expenseNote(e.raw_text);
    const s = splitStock(note, num(e.amount), {
      float: e.category === MANAGER_FLOAT,
    });
    if (s.mismatch) mismatched++;
    for (const p of s.parts) {
      bought.set(p.group, (bought.get(p.group) ?? 0) + p.amount);
      count.set(p.group, (count.get(p.group) ?? 0) + 1);
    }
    lines.push(
      `${e.code}\t${naira(num(e.amount))}\t${s.mismatch ? "! " : ""}${s.parts.map((p) => `${stockKeyName(p.group)} ${naira(p.amount)}`).join(", ")}\t${e.category === MANAGER_FLOAT ? "[float] " : ""}${(note ?? "").replace(/\n/g, " / ")}`,
    );
  }
  console.log(`\n${start} to ${end}: ${found.length} stock purchases`);
  for (const k of STOCK_KEYS)
    console.log(
      `  ${stockKeyName(k).padEnd(14)} sales ${naira(sales.get(k) ?? 0).padStart(13)}  bought ${naira(bought.get(k) ?? 0).padStart(12)} (${count.get(k) ?? 0})`,
    );
  console.log(`  note lines not adding up: ${mismatched}`);
  if (list) console.log(lines.join("\n"));
}
process.exit(0);
