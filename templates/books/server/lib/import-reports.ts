import { newId, nowIso } from "./ids.js";
import { ensureItems, setItemCategory } from "./catalog.js";
import { rows, run, num } from "./sql.js";
import type { ItemRow, PaymentMethodRow } from "./moniebook-reports.js";
import type { ImportMeta } from "./import-sales.js";

export interface Range {
  start: string;
  endExclusive: string;
}
export interface RangeCheck {
  agrees: boolean;
  reportTotal: number;
  salesTotal: number;
}

async function completedTotals(orgId: string, range: Range) {
  const [r] = await rows(
    `SELECT COALESCE(SUM(total), 0) AS total, COALESCE(SUM(collected_amount), 0) AS collected
       FROM sales WHERE org_id = ? AND status = 'COMPLETED' AND day >= ? AND day < ?`,
    [orgId, range.start, range.endExclusive],
  );
  return { total: num(r?.total), collected: num(r?.collected) };
}

async function daysWithSales(
  orgId: string,
  from: string,
  toExclusive?: string,
): Promise<string[]> {
  const found = await rows<{ day: string }>(
    `SELECT DISTINCT day FROM sales WHERE org_id = ? AND day >= ?${toExclusive ? " AND day < ?" : ""} ORDER BY day`,
    toExclusive ? [orgId, from, toExclusive] : [orgId, from],
  );
  return found.map((r) => r.day);
}

async function recordImport(
  orgId: string,
  kind: string,
  range: Range,
  meta: ImportMeta,
  added: number,
  check: RangeCheck,
) {
  const id = newId();
  await run(
    `INSERT INTO imports (id, kind, file_name, range_start, range_end, rows_added, rows_updated, received_via, check_result, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, 'org')`,
    [
      id,
      kind,
      meta.fileName,
      range.start,
      range.endExclusive,
      added,
      meta.receivedVia,
      JSON.stringify(check),
      nowIso(),
      orgId,
    ],
  );
  return id;
}

export async function importPaymentMethodReport(
  orgId: string,
  report: PaymentMethodRow[],
  range: Range,
  meta: ImportMeta,
) {
  const reportTotal = report.reduce((a, r) => a + r.collected, 0);
  const salesTotal = (await completedTotals(orgId, range)).collected;
  const check: RangeCheck = {
    agrees: reportTotal === salesTotal,
    reportTotal,
    salesTotal,
  };
  const importId = await recordImport(
    orgId,
    "payment-method",
    range,
    meta,
    report.length,
    check,
  );
  await run(
    `DELETE FROM payment_method_totals WHERE org_id = ? AND range_start = ? AND range_end_exclusive = ?`,
    [orgId, range.start, range.endExclusive],
  );
  const at = nowIso();
  for (const r of report) {
    await run(
      `INSERT INTO payment_method_totals (id, range_start, range_end_exclusive, method, payments, collected, refunded, net, import_id, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
      [
        newId(),
        range.start,
        range.endExclusive,
        r.method,
        r.payments,
        r.collected,
        r.refunded,
        r.net,
        importId,
        at,
        orgId,
      ],
    );
  }
  return {
    importId,
    days: await daysWithSales(orgId, range.start, range.endExclusive),
    check,
  };
}

export async function importItemReport(
  orgId: string,
  report: ItemRow[],
  range: Range,
  meta: ImportMeta,
) {
  const reportTotal = report.reduce((a, r) => a + r.gross, 0);
  const salesTotal = (await completedTotals(orgId, range)).total;
  const check: RangeCheck = {
    agrees: reportTotal === salesTotal,
    reportTotal,
    salesTotal,
  };
  const importId = await recordImport(
    orgId,
    "item-sales",
    range,
    meta,
    report.length,
    check,
  );
  const { ids } = await ensureItems(
    orgId,
    report.map((r) => r.name),
  );
  let categorised = 0;
  let costsAdded = 0;
  const needingCategory: string[] = [];
  const at = nowIso();
  for (const r of report) {
    if (r.category) {
      await setItemCategory(orgId, r.name, r.category, "moniebook", true);
      categorised++;
    } else {
      const [item] = await rows(
        `SELECT category_id FROM items WHERE org_id = ? AND id = ?`,
        [orgId, ids.get(r.name)],
      );
      if (!item?.category_id) needingCategory.push(r.name);
    }
    if (r.unitCost != null) {
      await run(
        `DELETE FROM item_costs WHERE org_id = ? AND item_id = ? AND effective_from = ?`,
        [orgId, ids.get(r.name), range.start],
      );
      await run(
        `INSERT INTO item_costs (id, item_id, unit_cost, effective_from, import_id, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, 'org')`,
        [
          newId(),
          ids.get(r.name),
          r.unitCost,
          range.start,
          importId,
          at,
          orgId,
        ],
      );
      costsAdded++;
    }
  }
  return {
    importId,
    categorised,
    needingCategory,
    costsAdded,
    days: await daysWithSales(orgId, range.start),
    check,
  };
}
