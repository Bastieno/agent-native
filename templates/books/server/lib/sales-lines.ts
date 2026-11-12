import { rows, num } from "./sql.js";

/** Payment methods that record value leaving without payment. */
export const NOT_INCOME_METHODS = [
  "The House",
  "Subscription Perk",
  "Leakages",
] as const;
export const isNotIncome = (methods: string[]) =>
  methods.length > 0 &&
  methods.every((m) => (NOT_INCOME_METHODS as readonly string[]).includes(m));

export interface LoadedLine {
  itemName: string;
  businessSlug: string | null;
  categoryName: string | null;
  categoryConfirmed: boolean;
  quantity: number;
  lineTotal: number;
  unitCost: number | null;
}
export interface LoadedSale {
  id: string;
  orderNumber: string;
  orderedAt: string;
  day: string;
  status: string;
  total: number;
  collectedAmount: number;
  change: number;
  staffName: string;
  customerName: string | null;
  methods: string[];
  legs: {
    index: number;
    method: string;
    reference: string | null;
    amount: number | null;
  }[];
  lines: LoadedLine[];
}

/** Unit cost lookup: the latest cost on or before a day. */
export async function costLookup(orgId: string) {
  const byItem = new Map<string, { from: string; cost: number }[]>();
  for (const r of await rows<{
    item_id: string;
    effective_from: string;
    unit_cost: number;
  }>(
    `SELECT item_id, effective_from, unit_cost FROM item_costs WHERE org_id = ? ORDER BY effective_from`,
    [orgId],
  )) {
    const list = byItem.get(r.item_id) ?? [];
    list.push({ from: r.effective_from, cost: num(r.unit_cost) });
    byItem.set(r.item_id, list);
  }
  return (itemId: string, day: string): number | null => {
    let cost: number | null = null;
    for (const c of byItem.get(itemId) ?? []) if (c.from <= day) cost = c.cost;
    return cost;
  };
}

/** Every sale (any status) with its lines and payment parts, for days start..end inclusive. */
export async function loadSales(
  orgId: string,
  start: string,
  end: string,
): Promise<LoadedSale[]> {
  const sales = await rows(
    `SELECT id, order_number, ordered_at, day, status, total, collected_amount, change_amount, staff_name, customer_name, methods
       FROM sales WHERE org_id = ? AND day >= ? AND day <= ? ORDER BY ordered_at`,
    [orgId, start, end],
  );
  if (!sales.length) return [];
  const lines = await rows(
    `SELECT l.sale_id, l.item_id, l.quantity, l.line_total, i.name AS item_name, i.confirmed, c.name AS category_name, b.slug AS business_slug
       FROM sale_lines l
       JOIN sales s ON s.id = l.sale_id
       JOIN items i ON i.id = l.item_id
       LEFT JOIN item_categories c ON c.id = i.category_id
       LEFT JOIN businesses b ON b.id = c.business_id
      WHERE s.org_id = ? AND s.day >= ? AND s.day <= ?`,
    [orgId, start, end],
  );
  const legs = await rows(
    `SELECT p.sale_id, p.leg_index, p.method, p.reference, p.amount
       FROM sale_payments p JOIN sales s ON s.id = p.sale_id
      WHERE s.org_id = ? AND s.day >= ? AND s.day <= ? ORDER BY p.leg_index`,
    [orgId, start, end],
  );
  const cost = await costLookup(orgId);
  const byId = new Map<string, LoadedSale>();
  for (const s of sales) {
    byId.set(s.id, {
      id: s.id,
      orderNumber: s.order_number,
      orderedAt: s.ordered_at,
      day: s.day,
      status: s.status,
      total: num(s.total),
      collectedAmount: num(s.collected_amount),
      change: num(s.change_amount),
      staffName: s.staff_name ?? "",
      customerName: s.customer_name ?? null,
      methods: JSON.parse(s.methods || "[]"),
      legs: [],
      lines: [],
    });
  }
  for (const l of lines) {
    const sale = byId.get(l.sale_id)!;
    sale.lines.push({
      itemName: l.item_name,
      businessSlug: l.business_slug ?? null,
      categoryName: l.category_name ?? null,
      categoryConfirmed: num(l.confirmed) === 1,
      quantity: num(l.quantity),
      lineTotal: num(l.line_total),
      unitCost: cost(l.item_id, sale.day),
    });
  }
  for (const p of legs) {
    byId.get(p.sale_id)!.legs.push({
      index: num(p.leg_index),
      method: p.method,
      reference: p.reference ?? null,
      amount: p.amount == null ? null : num(p.amount),
    });
  }
  return [...byId.values()];
}
