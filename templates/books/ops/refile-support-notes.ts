/**
 * Files expenses whose note is support or "For snacks" (or a misreading), and
 * airtime bought from a slip (a phone number paid, no note),
 * under Owner's pay, with no business, and recalculates those days. Only
 * expenses still waiting for review are changed.
 *
 * Usage: pnpm tsx ops/refile-support-notes.ts [--dry]
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
process.env.DATABASE_URL ??= "file:./data/app.db";
const dry = process.argv.includes("--dry");
// --no-reconcile: change the expenses only; recalculate on the server after
// (POST /api/books/cron/reconcile), which is much faster than over a tunnel.
const skipReconcile = process.argv.includes("--no-reconcile");

const { rows, run } = await import("../server/lib/sql.js");
const { expenseNote } = await import("../server/lib/expense-note.js");
const { guessExpense } = await import("../server/lib/expense-guess.js");
const { OWNERS_PAY } = await import("../server/lib/setup.js");
const { reconcileDays } = await import("../server/lib/reconcile-days.js");

const waiting = await rows<{
  id: string;
  org_id: string;
  occurred_on: string;
  raw_text: string;
  amount: number;
  category: string | null;
  business_id: string | null;
  vendor: string;
  source: string;
}>(
  `SELECT e.id, e.org_id, e.occurred_on, e.raw_text, e.amount, e.vendor, e.source, c.name AS category, e.business_id
     FROM expenses e LEFT JOIN expense_categories c ON c.id = e.category_id
    WHERE e.status = 'needs_review'`,
);
/** Airtime from a slip: a Nigerian phone number paid, and no note. */
const airtime = (e: { vendor: string; source: string; raw_text: string }) =>
  e.source === "history" &&
  /^0[789][01]\d{8}$/.test(e.vendor.trim()) &&
  !expenseNote(e.raw_text);
const move = waiting.filter((e) => {
  const g = guessExpense(
    expenseNote(e.raw_text),
    airtime(e) ? "AIRTIME" : null,
  );
  return (
    g.category === OWNERS_PAY &&
    (g.because === "owner's own" || g.because === "airtime") &&
    (e.category !== OWNERS_PAY || e.business_id !== null)
  );
});
const total = move.reduce((a, e) => a + Number(e.amount), 0);
console.log(
  `${move.length} expenses to file under ${OWNERS_PAY}, ₦${(total / 100).toLocaleString()}`,
);
if (!dry) {
  for (const e of move)
    await run(
      `UPDATE expenses SET category_id = (SELECT id FROM expense_categories WHERE org_id = ? AND name = ? ORDER BY created_at, id LIMIT 1), business_id = NULL
        WHERE id = ? AND status = 'needs_review'`,
      [e.org_id, OWNERS_PAY, e.id],
    );
  const byOrg = new Map<string, Set<string>>();
  for (const e of move)
    byOrg.set(e.org_id, (byOrg.get(e.org_id) ?? new Set()).add(e.occurred_on));
  if (!skipReconcile)
    for (const [org, days] of byOrg) await reconcileDays(org, [...days]);
  console.log(
    `done; ${[...byOrg.values()].reduce((a, d) => a + d.size, 0)} days recalculated`,
  );
}
process.exit(0);
