import { newId, nowIso } from "./ids.js";
import { ensureItems } from "./catalog.js";
import { rows, run } from "./sql.js";
import type { ParsedOrder } from "./sales-export.js";

export interface ImportMeta {
  fileName: string;
  receivedVia: "whatsapp" | "upload";
}

/** A stable fingerprint of what an order says, to tell "unchanged" from "updated". */
function fingerprint(o: ParsedOrder): string {
  return JSON.stringify([
    o.status,
    o.total,
    o.collectedAmount,
    o.change,
    o.refundAmount,
    o.methods,
    o.legs,
    o.lines,
  ]);
}

export async function importParsedOrders(
  orgId: string,
  orders: ParsedOrder[],
  meta: ImportMeta,
) {
  const importId = newId();
  const at = nowIso();
  const { ids: itemIds, created } = await ensureItems(
    orgId,
    orders.flatMap((o) => o.lines.map((l) => l.name)),
  );
  const existing = new Map<string, { id: string; fp: string }>();
  for (const r of await rows<{
    id: string;
    order_number: string;
    fp: string | null;
  }>(`SELECT id, order_number, fingerprint AS fp FROM sales WHERE org_id = ?`, [
    orgId,
  ])) {
    existing.set(r.order_number, { id: r.id, fp: r.fp ?? "" });
  }
  let added = 0;
  let updated = 0;
  let unchanged = 0;
  const days = new Set<string>();
  for (const o of orders) {
    const fp = fingerprint(o);
    const found = existing.get(o.orderNumber);
    if (found && found.fp === fp) {
      unchanged++;
      continue;
    }
    const saleId = found?.id ?? newId();
    if (found) {
      await run(
        `UPDATE sales SET ordered_at = ?, day = ?, branch_name = ?, status = ?, refund_amount = ?, staff_name = ?, customer_name = ?, total = ?, collected_amount = ?, change_amount = ?, payment_mode = ?, methods = ?, import_id = ?, fingerprint = ? WHERE org_id = ? AND id = ?`,
        [
          o.orderedAt,
          o.day,
          o.branchName,
          o.status,
          o.refundAmount,
          o.staffName,
          o.customerName,
          o.total,
          o.collectedAmount,
          o.change,
          o.paymentMode,
          JSON.stringify(o.methods),
          importId,
          fp,
          orgId,
          saleId,
        ],
      );
      await run(`DELETE FROM sale_lines WHERE org_id = ? AND sale_id = ?`, [
        orgId,
        saleId,
      ]);
      await run(`DELETE FROM sale_payments WHERE org_id = ? AND sale_id = ?`, [
        orgId,
        saleId,
      ]);
      updated++;
    } else {
      await run(
        `INSERT INTO sales (id, order_number, ordered_at, day, branch_name, status, refund_amount, staff_name, customer_name, total, collected_amount, change_amount, payment_mode, methods, import_id, fingerprint, created_at, org_id, visibility)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
        [
          saleId,
          o.orderNumber,
          o.orderedAt,
          o.day,
          o.branchName,
          o.status,
          o.refundAmount,
          o.staffName,
          o.customerName,
          o.total,
          o.collectedAmount,
          o.change,
          o.paymentMode,
          JSON.stringify(o.methods),
          importId,
          fp,
          at,
          orgId,
        ],
      );
      added++;
    }
    for (const l of o.lines) {
      await run(
        `INSERT INTO sale_lines (id, sale_id, item_id, quantity, unit_price, line_total, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
        [
          newId(),
          saleId,
          itemIds.get(l.name),
          l.quantity,
          l.unitPrice,
          l.lineTotal,
          at,
          orgId,
        ],
      );
    }
    const single = o.legs.length === 1;
    for (const [i, leg] of o.legs.entries()) {
      await run(
        `INSERT INTO sale_payments (id, sale_id, leg_index, method, reference, amount, bank, sender_name, sender_account_masked, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
        [
          newId(),
          saleId,
          i,
          leg.method,
          leg.reference,
          single ? o.collectedAmount : null,
          leg.bank,
          leg.senderName,
          leg.senderAccountMasked,
          at,
          orgId,
        ],
      );
    }
    days.add(o.day);
  }
  const sorted = orders.map((o) => o.day).sort();
  await run(
    `INSERT INTO imports (id, kind, file_name, range_start, range_end, rows_added, rows_updated, received_via, created_at, org_id, visibility) VALUES (?, 'sales-summary', ?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
    [
      importId,
      meta.fileName,
      sorted[0] ?? null,
      sorted[sorted.length - 1] ?? null,
      added,
      updated,
      meta.receivedVia,
      at,
      orgId,
    ],
  );
  return {
    importId,
    added,
    updated,
    unchanged,
    newItems: created,
    days: [...days].sort(),
  };
}
