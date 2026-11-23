/**
 * Sorts Owner's pay into what it went on (the owner's answer, 2026-11-23):
 * car fuel, phone & data, subscriptions & software, gifts & support, snacks &
 * food, fees. Dollar purchases become subscriptions & software. What no rule
 * places stays plain Owner's pay ("Other"). Payee rules that pointed at
 * Owner's pay or Dollar purchases follow. Only the category changes; every
 * update is guarded by the old category, so anything already moved is left.
 *
 * Usage: pnpm tsx ops/sort-owners-pay.ts [--dry] [--no-reconcile]
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
process.env.DATABASE_URL ??= "file:./data/app.db";
const dry = process.argv.includes("--dry");
// --no-reconcile: recalculate on the server after instead
// (POST /api/books/cron/reconcile); only dollar days change figures.
const skipReconcile = process.argv.includes("--no-reconcile");

const { rows, run } = await import("../server/lib/sql.js");
const { expenseNote } = await import("../server/lib/expense-note.js");
const { fuelOnly, guessExpense } =
  await import("../server/lib/expense-guess.js");
const { staffBusiness } = await import("../server/lib/staff.js");
const { DOLLARS, OWNER_KINDS, OWNERS_PAY, ensureExpenseCategories } =
  await import("../server/lib/setup.js");
const { reconcileDays } = await import("../server/lib/reconcile-days.js");

const KINDS: string[] = Object.values(OWNER_KINDS);
const FUEL_STATION = /\bweeldr[oc]p\b/i;
/** Airtime from a slip: a Nigerian phone number paid, and no note. */
const airtime = (e: { vendor: string; source: string; raw_text: string }) =>
  e.source === "history" &&
  /^0[789][01]\d{8}$/.test(e.vendor.trim()) &&
  !expenseNote(e.raw_text);

const orgs = await rows<{ org_id: string }>(
  `SELECT DISTINCT org_id FROM expense_categories WHERE name = ?`,
  [OWNERS_PAY],
);
if (!dry) for (const o of orgs) await ensureExpenseCategories(o.org_id);

const found = await rows<{
  id: string;
  org_id: string;
  occurred_on: string;
  raw_text: string;
  vendor: string;
  source: string;
  category: string;
}>(
  `SELECT e.id, e.org_id, e.occurred_on, e.raw_text, e.vendor, e.source, c.name AS category
     FROM expenses e JOIN expense_categories c ON c.id = e.category_id
    WHERE c.name IN (?, ?)`,
  [OWNERS_PAY, DOLLARS],
);

const moves: {
  id: string;
  org: string;
  day: string;
  from: string;
  to: string;
}[] = [];
for (const e of found) {
  let to: string | null = null;
  if (e.category === DOLLARS) to = OWNER_KINDS.software;
  else {
    const note = expenseNote(e.raw_text);
    const g = guessExpense(note, airtime(e) ? "AIRTIME" : null);
    if (g.category && KINDS.includes(g.category)) to = g.category;
    else if (FUEL_STATION.test(e.vendor)) to = OWNER_KINDS.fuel;
    else if (fuelOnly(note) && !(await staffBusiness(e.org_id, e.vendor)))
      to = OWNER_KINDS.fuel;
  }
  if (to)
    moves.push({
      id: e.id,
      org: e.org_id,
      day: e.occurred_on,
      from: e.category,
      to,
    });
}

const count: Record<string, number> = {};
for (const m of moves) count[m.to] = (count[m.to] ?? 0) + 1;
console.log(
  `${found.length} owner's pay and dollar expenses; ${moves.length} sorted:`,
);
for (const [k, n] of Object.entries(count)) console.log(`  ${k}: ${n}`);
console.log(`  left as Owner's pay (Other): ${found.length - moves.length}`);

const rules = await rows<{
  id: string;
  org_id: string;
  match_key: string;
  category: string;
}>(
  `SELECT r.id, r.org_id, r.match_key, c.name AS category
     FROM payee_rules r JOIN expense_categories c ON c.id = r.category_id
    WHERE c.name IN (?, ?)`,
  [OWNERS_PAY, DOLLARS],
);
const ruleMoves = rules
  .map((r) => ({
    ...r,
    to:
      r.category === DOLLARS
        ? OWNER_KINDS.software
        : FUEL_STATION.test(r.match_key)
          ? OWNER_KINDS.fuel
          : null,
  }))
  .filter((r) => r.to);
console.log(`${ruleMoves.length} payee rules follow`);

if (!dry) {
  const kindId = `(SELECT id FROM expense_categories WHERE org_id = ? AND name = ? ORDER BY created_at, id LIMIT 1)`;
  const wasId = `(SELECT id FROM expense_categories WHERE org_id = ? AND name = ? ORDER BY created_at, id LIMIT 1)`;
  for (const m of moves)
    await run(
      `UPDATE expenses SET category_id = ${kindId}, business_id = NULL
        WHERE id = ? AND category_id IN (SELECT id FROM expense_categories WHERE org_id = ? AND name = ?)`,
      [m.org, m.to, m.id, m.org, m.from],
    );
  for (const r of ruleMoves)
    await run(
      `UPDATE payee_rules SET category_id = ${kindId}
        WHERE id = ? AND category_id = ${wasId}`,
      [r.org_id, r.to, r.id, r.org_id, r.category],
    );
  // Only dollar purchases change the figures (they were not a cost).
  const byOrg = new Map<string, Set<string>>();
  for (const m of moves)
    if (m.from === DOLLARS)
      byOrg.set(m.org, (byOrg.get(m.org) ?? new Set()).add(m.day));
  const days = [...byOrg.values()].flatMap((d) => [...d]);
  if (!skipReconcile)
    for (const [org, d] of byOrg) await reconcileDays(org, [...d]);
  console.log(
    `done; days to recalculate: ${days.sort().join(", ") || "none"}${skipReconcile ? " (not yet)" : ""}`,
  );
}
process.exit(0);
