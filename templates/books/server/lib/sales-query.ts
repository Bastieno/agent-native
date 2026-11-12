import { isNotIncome, loadSales } from "./sales-lines.js";

const add = (o: Record<string, number>, k: string, v: number) => {
  o[k] = (o[k] ?? 0) + v;
};

/**
 * Completed sales over a range: income by business and method, cost of goods,
 * the cost of what was given away, and gross profit — the same definition the
 * reconciliation and digests use.
 */
export async function salesSummary(orgId: string, start: string, end: string) {
  const sales = (await loadSales(orgId, start, end)).filter(
    (s) => s.status === "COMPLETED",
  );
  let income = 0;
  let uncostedRevenue = 0;
  const byBusiness: Record<string, number> = {};
  const byMethod: Record<string, number> = {};
  const costOfGoods: Record<string, number> = {};
  const givenAwayAtCost: Record<string, number> = {};
  const notIncome: Record<string, number> = {};
  for (const s of sales) {
    const key = s.methods.join(", ");
    if (isNotIncome(s.methods)) {
      add(notIncome, key, s.total);
      // Subscriber meals are a Hub cost; The House and leakages fall on the item's business.
      for (const l of s.lines) {
        if (l.unitCost == null) continue;
        const biz =
          s.methods[0] === "Subscription Perk"
            ? "hub"
            : (l.businessSlug ?? "unassigned");
        add(givenAwayAtCost, biz, l.quantity * l.unitCost);
      }
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
  const grossProfit: Record<string, number> = {};
  for (const biz of new Set([
    ...Object.keys(byBusiness),
    ...Object.keys(givenAwayAtCost),
  ])) {
    grossProfit[biz] =
      (byBusiness[biz] ?? 0) -
      (costOfGoods[biz] ?? 0) -
      (givenAwayAtCost[biz] ?? 0);
  }
  return {
    start,
    end,
    income,
    byBusiness,
    byMethod,
    costOfGoods,
    givenAwayAtCost,
    grossProfit,
    uncostedRevenue,
    notIncome,
    orders: sales.length,
  };
}
