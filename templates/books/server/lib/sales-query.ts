import { isNotIncome, loadSales } from "./sales-lines.js";

const add = (o: Record<string, number>, k: string, v: number) => {
  o[k] = (o[k] ?? 0) + v;
};

/** Completed sales over a range: income by business and method, and cost of goods. */
export async function salesSummary(orgId: string, start: string, end: string) {
  const sales = (await loadSales(orgId, start, end)).filter(
    (s) => s.status === "COMPLETED",
  );
  let income = 0;
  let uncostedRevenue = 0;
  const byBusiness: Record<string, number> = {};
  const byMethod: Record<string, number> = {};
  const costOfGoods: Record<string, number> = {};
  const notIncome: Record<string, number> = {};
  for (const s of sales) {
    const key = s.methods.join(", ");
    if (isNotIncome(s.methods)) {
      add(notIncome, key, s.total);
      continue;
    }
    income += s.total;
    add(byMethod, key, s.total);
    for (const l of s.lines) {
      const biz = l.businessSlug ?? "unassigned";
      add(byBusiness, biz, l.lineTotal);
      if (l.unitCost == null) uncostedRevenue += l.lineTotal;
      else add(costOfGoods, biz, l.quantity * l.unitCost);
    }
  }
  return {
    start,
    end,
    income,
    byBusiness,
    byMethod,
    costOfGoods,
    uncostedRevenue,
    notIncome,
    orders: sales.length,
  };
}
