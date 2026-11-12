import { newId, nowIso } from "./ids.js";
import { addDays } from "./lagos-time.js";
import { reconcileDay, type DayInput, type DayResult } from "./reconcile.js";
import { loadSales } from "./sales-lines.js";
import { DEFAULT_THRESHOLDS, type Thresholds } from "./setup.js";
import { num, rows, run } from "./sql.js";

/** Days of expense history needed before a category can be said to spike. */
const MIN_HISTORY_DAYS = 7;

/** Everything reconcileDay needs for one day, read from the database. */
export async function loadDayInput(
  orgId: string,
  day: string,
): Promise<DayInput> {
  const sales = await loadSales(orgId, day, day);
  const neighbourReferences = [
    ...(await loadSales(orgId, addDays(day, -1), addDays(day, -1))),
    ...(await loadSales(orgId, addDays(day, 1), addDays(day, 1))),
  ]
    .filter((s) => s.status === "COMPLETED")
    .flatMap((s) => s.legs.map((l) => l.reference).filter(Boolean) as string[]);
  const legRefs = new Set(
    sales.flatMap(
      (s) => s.legs.map((l) => l.reference).filter(Boolean) as string[],
    ),
  );
  const events = (
    await rows(
      `SELECT webhook_id, reference, alt_reference, amount, occurred_at FROM moniepoint_events WHERE org_id = ? AND day >= ? AND day <= ?`,
      [orgId, addDays(day, -1), addDays(day, 1)],
    )
  ).map((e) => ({
    webhookId: e.webhook_id,
    // Use whichever of the event's references the sales export used.
    reference:
      e.alt_reference && legRefs.has(e.alt_reference)
        ? e.alt_reference
        : e.reference,
    amount: num(e.amount),
    occurredAt: e.occurred_at,
  }));
  const expenses = (
    await rows(
      `SELECT e.id, e.amount, e.paid_with, e.category_id, e.status, e.vendor, e.occurred_on, e.image_hash, b.slug
         FROM expenses e LEFT JOIN businesses b ON b.id = e.business_id
        WHERE e.org_id = ? AND e.occurred_on = ?`,
      [orgId, day],
    )
  ).map((e) => ({
    id: e.id,
    amount: num(e.amount),
    paidWith: e.paid_with,
    categoryId: e.category_id ?? null,
    businessSlug: e.slug ?? null,
    status: e.status,
    vendor: e.vendor,
    occurredOn: e.occurred_on,
    imageHash: e.image_hash ?? null,
  }));
  // A category's usual daily spend: over the 4 weeks before, or since Books'
  // first expense if that is later. Under a week of history, there is no usual
  // level yet, so no spike can be called.
  const categoryHistory: Record<string, number> = {};
  const windowStart = addDays(day, -28);
  const [first] = await rows(
    `SELECT MIN(occurred_on) AS d FROM expenses WHERE org_id = ?`,
    [orgId],
  );
  const from =
    first?.d && first.d > windowStart ? (first.d as string) : windowStart;
  const historyDays = Math.round(
    (Date.parse(`${day}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) /
      86_400_000,
  );
  if (historyDays >= MIN_HISTORY_DAYS) {
    for (const r of await rows(
      `SELECT category_id, SUM(amount) AS total FROM expenses
        WHERE org_id = ? AND occurred_on >= ? AND occurred_on < ? AND category_id IS NOT NULL GROUP BY category_id`,
      [orgId, from, day],
    )) {
      categoryHistory[r.category_id] = Math.round(num(r.total) / historyDays);
    }
  }
  const report = await rows(
    `SELECT method, collected FROM payment_method_totals WHERE org_id = ? AND range_start = ? AND range_end_exclusive = ?`,
    [orgId, day, addDays(day, 1)],
  );
  const [settings] = await rows(
    `SELECT thresholds FROM books_settings WHERE org_id = ?`,
    [orgId],
  );
  const thresholds: Thresholds = {
    ...DEFAULT_THRESHOLDS,
    ...(settings ? JSON.parse(settings.thresholds) : {}),
  };
  return {
    day,
    sales,
    events,
    expenses,
    categoryHistory,
    paymentReport: report.length
      ? report.map((r) => ({ method: r.method, collected: num(r.collected) }))
      : null,
    thresholds,
    neighbourReferences,
  };
}

/** Recompute and store one day. */
export async function reconcileOne(
  orgId: string,
  day: string,
): Promise<DayResult> {
  const result = reconcileDay(await loadDayInput(orgId, day));
  const at = nowIso();
  const existing = await rows(
    `SELECT id FROM reconciliations WHERE org_id = ? AND day = ?`,
    [orgId, day],
  );
  if (existing.length) {
    await run(
      `UPDATE reconciliations SET figures = ?, flags = ?, computed_at = ? WHERE org_id = ? AND day = ?`,
      [JSON.stringify(result), JSON.stringify(result.flags), at, orgId, day],
    );
  } else {
    await run(
      `INSERT INTO reconciliations (id, day, figures, flags, computed_at, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, 'org')`,
      [
        newId(),
        day,
        JSON.stringify(result),
        JSON.stringify(result.flags),
        at,
        at,
        orgId,
      ],
    );
  }
  return result;
}

/** Recompute each day (and its neighbours, since events are matched ±1 day). */
export async function reconcileDays(
  orgId: string,
  days: string[],
): Promise<void> {
  const all = new Set<string>();
  for (const d of days) {
    all.add(d);
    all.add(addDays(d, -1));
    all.add(addDays(d, 1));
  }
  const withData = new Set(
    (
      await rows<{ day: string }>(
        `SELECT DISTINCT day FROM sales WHERE org_id = ? UNION SELECT DISTINCT occurred_on AS day FROM expenses WHERE org_id = ? UNION SELECT DISTINCT day FROM moniepoint_events WHERE org_id = ?`,
        [orgId, orgId, orgId],
      )
    ).map((r) => r.day),
  );
  for (const d of [...all].sort())
    if (withData.has(d)) await reconcileOne(orgId, d);
}
