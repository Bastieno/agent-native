/**
 * Everything a digest says, computed in code. The agent only words it.
 * Money is kobo; days are Lagos `YYYY-MM-DD`.
 */
import { addDays, daysBetween, weekdayIndex } from "./lagos-time.js";
import type { DayResult, Flag } from "./reconcile.js";
import { reconcileOne } from "./reconcile-days.js";
import { isNotIncome, loadSales, type LoadedSale } from "./sales-lines.js";
import { num, rows } from "./sql.js";
import {
  emptyStats,
  trendSignals,
  type PeriodStats,
  type Signal,
  type TrendHistory,
} from "./trends.js";

export type DigestPeriod = "daily" | "weekly" | "monthly" | "range";

export interface BusinessFigures {
  income: number;
  costOfGoods: number;
  grossProfit: number;
  expenses: number;
  net: number;
}

export interface DigestFigures {
  period: DigestPeriod;
  start: string;
  end: string;
  businesses: Record<string, BusinessFigures>;
  combined: BusinessFigures & { margin: number | null };
  incomeByMethod: Record<string, number>;
  cashInTill: number | null;
  notIncome: DayResult["notIncome"];
  uncostedRevenue: number;
  topExpenses: {
    code: string;
    vendor: string;
    amount: number;
    business: string | null;
    category: string | null;
  }[];
  flags: Flag[];
  flagCounts: Record<string, number>;
  review: { receipts: number; categoryGuesses: number; uncategorised: number };
  previous: (BusinessFigures & { start: string; end: string }) | null;
  sellers: Record<string, { best: Seller[]; worst: Seller[] }>;
  byStaff: {
    sales: Record<string, number>;
    givenAwayAtCost: Record<string, number>;
  };
  marginByCategory: Record<string, number>;
  expenseByCategory: Record<string, number>;
  subscriptionsByPlan: Record<string, number>;
  categoryMonths: { month: string; byCategory: Record<string, number> }[];
  trends: Signal[];
  daysWithSales: number;
}

interface Seller {
  item: string;
  units: number;
  revenue: number;
  grossProfit: number | null;
}

const SIGNIFICANT = (f: Flag) =>
  !["needs_review", "unconfirmed_category", "no_cost"].includes(f.kind);
const add = (o: Record<string, number>, k: string, v: number) => {
  o[k] = (o[k] ?? 0) + v;
};
const pct = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 10000) / 100 : 0;

async function dayResults(
  orgId: string,
  start: string,
  end: string,
): Promise<DayResult[]> {
  const out: DayResult[] = [];
  for (const d of daysBetween(start, end))
    out.push(await reconcileOne(orgId, d));
  return out;
}

async function expenseRows(orgId: string, start: string, end: string) {
  return (
    await rows(
      `SELECT e.code, e.vendor, e.amount, b.slug AS business, c.name AS category
         FROM expenses e
         LEFT JOIN businesses b ON b.id = e.business_id
         LEFT JOIN expense_categories c ON c.id = e.category_id
        WHERE e.org_id = ? AND e.occurred_on >= ? AND e.occurred_on <= ?`,
      [orgId, start, end],
    )
  ).map((e) => ({
    code: e.code as string,
    vendor: e.vendor as string,
    amount: num(e.amount),
    business: (e.business as string) ?? null,
    category: (e.category as string) ?? null,
  }));
}

function totals(days: DayResult[]) {
  const businesses: Record<string, BusinessFigures> = {};
  const get = (b: string) =>
    (businesses[b] ??= {
      income: 0,
      costOfGoods: 0,
      grossProfit: 0,
      expenses: 0,
      net: 0,
    });
  for (const d of days) {
    for (const [b, v] of Object.entries(d.incomeByBusiness)) get(b).income += v;
    for (const [b, v] of Object.entries(d.costOfGoodsByBusiness))
      get(b).costOfGoods += v;
    for (const [b, v] of Object.entries(d.grossProfitByBusiness))
      get(b).grossProfit += v;
    for (const [b, v] of Object.entries(d.expensesByBusiness))
      get(b).expenses += v;
  }
  for (const b of ["lounge", "hub"]) get(b);
  const combined = {
    income: 0,
    costOfGoods: 0,
    grossProfit: 0,
    expenses: 0,
    net: 0,
  };
  for (const f of Object.values(businesses)) {
    f.net = f.grossProfit - f.expenses;
    combined.income += f.income;
    combined.costOfGoods += f.costOfGoods;
    combined.grossProfit += f.grossProfit;
    combined.expenses += f.expenses;
  }
  combined.net = combined.grossProfit - combined.expenses;
  return { businesses, combined };
}

/** The inputs trends compare: one period's shape. `scale` averages several comparison days into one. */
function periodStats(
  days: DayResult[],
  sales: LoadedSale[],
  expenseByCategory: Record<string, number>,
  scale = 1,
): PeriodStats {
  const s = emptyStats();
  const { businesses, combined } = totals(days);
  s.income = combined.income / scale;
  s.expenses = combined.expenses / scale;
  for (const [b, f] of Object.entries(businesses)) {
    s.incomeByBusiness[b] = f.income / scale;
    s.grossProfitByBusiness[b] = f.grossProfit / scale;
  }
  for (const [c, v] of Object.entries(expenseByCategory))
    s.expenseByCategory[c] = v / scale;
  s.houseLeakagesAtCost =
    days.reduce(
      (a, d) => a + d.notIncome.atCost.house + d.notIncome.atCost.leakages,
      0,
    ) / scale;
  const catIncome: Record<string, number> = {};
  const catProfit: Record<string, number> = {};
  const itemUnits: Record<string, number> = {};
  const itemIncome: Record<string, number> = {};
  const itemProfit: Record<string, number> = {};
  for (const sale of sales) {
    add(
      s.incomeByWeekday as Record<string, number>,
      String(weekdayIndex(sale.day)),
      sale.total / scale,
    );
    for (const l of sale.lines) {
      if (l.unitCost == null) continue;
      const profit = l.lineTotal - l.quantity * l.unitCost;
      if (l.categoryName) {
        add(catIncome, l.categoryName, l.lineTotal);
        add(catProfit, l.categoryName, profit);
      }
      add(itemUnits, l.itemName, l.quantity / scale);
      add(itemIncome, l.itemName, l.lineTotal);
      add(itemProfit, l.itemName, profit);
    }
  }
  for (const c of Object.keys(catIncome))
    s.marginByCategory[c] = pct(catProfit[c], catIncome[c]);
  for (const i of Object.keys(itemUnits))
    s.items[i] = {
      units: itemUnits[i],
      margin: pct(itemProfit[i], itemIncome[i]),
    };
  return s;
}

const paidCompleted = (sales: LoadedSale[]) =>
  sales.filter((s) => s.status === "COMPLETED" && !isNotIncome(s.methods));

function comparisonDays(
  period: DigestPeriod,
  start: string,
  end: string,
): { start: string; end: string; days: string[] } | null {
  if (period === "daily") {
    const days = [1, 2, 3, 4].map((w) => addDays(start, -7 * w));
    return { start: days[3], end: days[0], days };
  }
  if (period === "weekly") {
    const s = addDays(start, -7);
    return {
      start: s,
      end: addDays(end, -7),
      days: daysBetween(s, addDays(end, -7)),
    };
  }
  if (period === "monthly") {
    const prevEnd = addDays(start, -1);
    const prevStart = `${prevEnd.slice(0, 7)}-01`;
    return {
      start: prevStart,
      end: prevEnd,
      days: daysBetween(prevStart, prevEnd),
    };
  }
  return null;
}

async function trendHistory(
  orgId: string,
  period: DigestPeriod,
  start: string,
  end: string,
  sales: LoadedSale[],
): Promise<TrendHistory> {
  const stored = await rows<{ day: string; figures: string }>(
    `SELECT day, figures FROM reconciliations WHERE org_id = ? AND day <= ? ORDER BY day DESC`,
    [orgId, end],
  );
  let flagFreeRun = 0;
  for (const r of stored) {
    const f = JSON.parse(r.figures) as DayResult;
    if (f.flags.some(SIGNIFICANT)) break;
    flagFreeRun++;
  }
  // Best income of an earlier period of the same kind.
  const incomeByDay = new Map<string, number>();
  for (const r of stored)
    if (r.day < start)
      incomeByDay.set(r.day, (JSON.parse(r.figures) as DayResult).income ?? 0);
  const bucket = (day: string) =>
    period === "daily"
      ? day
      : period === "weekly"
        ? addDays(day, -weekdayIndex(day))
        : period === "monthly"
          ? day.slice(0, 7)
          : null;
  let bestEver: number | null = null;
  if (period !== "range" && incomeByDay.size) {
    const sums = new Map<string, number>();
    for (const [d, v] of incomeByDay)
      sums.set(bucket(d)!, (sums.get(bucket(d)!) ?? 0) + v);
    bestEver = Math.max(...sums.values());
  }
  // Hub subscribers: counted, never named.
  const subscribersNow = new Set<string>();
  for (const s of sales) {
    if (
      s.customerName &&
      s.lines.some((l) => l.categoryName === "Subscription")
    )
      subscribersNow.add(s.customerName.toLowerCase());
  }
  let returning = 0;
  if (subscribersNow.size) {
    const earlier = await rows<{ name: string }>(
      `SELECT DISTINCT LOWER(customer_name) AS name FROM sales WHERE org_id = ? AND day >= ? AND day < ? AND customer_name IS NOT NULL`,
      [orgId, addDays(start, -30), start],
    );
    const seen = new Set(earlier.map((r) => r.name));
    for (const n of subscribersNow) if (seen.has(n)) returning++;
  }
  return {
    flagFreeRun,
    bestEver,
    subscribers: { new: subscribersNow.size - returning, returning },
  };
}

function sellers(sales: LoadedSale[]) {
  const byBiz: Record<string, Map<string, Seller>> = {};
  for (const s of sales) {
    for (const l of s.lines) {
      const biz = l.businessSlug ?? "unassigned";
      const m = (byBiz[biz] ??= new Map());
      const cur = m.get(l.itemName) ?? {
        item: l.itemName,
        units: 0,
        revenue: 0,
        grossProfit: 0,
      };
      cur.units += l.quantity;
      cur.revenue += l.lineTotal;
      cur.grossProfit =
        l.unitCost == null || cur.grossProfit == null
          ? null
          : cur.grossProfit + l.lineTotal - l.quantity * l.unitCost;
      m.set(l.itemName, cur);
    }
  }
  const out: DigestFigures["sellers"] = {};
  for (const [biz, m] of Object.entries(byBiz)) {
    const list = [...m.values()].sort(
      (a, b) => (b.grossProfit ?? b.revenue) - (a.grossProfit ?? a.revenue),
    );
    out[biz] = {
      best: list.slice(0, 3),
      worst: list.length > 3 ? list.slice(-3).reverse() : [],
    };
  }
  return out;
}

export async function digestFigures(
  orgId: string,
  period: DigestPeriod,
  start: string,
  end: string,
): Promise<DigestFigures> {
  const days = await dayResults(orgId, start, end);
  const allSales = await loadSales(orgId, start, end);
  const sales = paidCompleted(allSales);
  const expenses = await expenseRows(orgId, start, end);
  const expenseByCategory: Record<string, number> = {};
  for (const e of expenses)
    add(expenseByCategory, e.category ?? "Uncategorised", e.amount);
  const { businesses, combined } = totals(days);

  const incomeByMethod: Record<string, number> = {};
  const notIncome: DayResult["notIncome"] = {
    atCost: { house: 0, perk: 0, leakages: 0 },
    atMenu: { house: 0, perk: 0, leakages: 0 },
    byStaff: {},
  };
  const flags: Flag[] = [];
  const flagCounts: Record<string, number> = {};
  let cashInTill: number | null = 0;
  let uncostedRevenue = 0;
  for (const d of days) {
    for (const [k, v] of Object.entries(d.incomeByMethod))
      add(incomeByMethod, k, v);
    for (const k of ["house", "perk", "leakages"] as const) {
      notIncome.atCost[k] += d.notIncome.atCost[k];
      notIncome.atMenu[k] += d.notIncome.atMenu[k];
    }
    for (const [k, v] of Object.entries(d.notIncome.byStaff))
      add(notIncome.byStaff, k, v);
    for (const f of d.flags) {
      flags.push(f);
      add(flagCounts, f.kind, 1);
    }
    cashInTill =
      cashInTill == null || d.cashInTill == null
        ? null
        : cashInTill + d.cashInTill;
    uncostedRevenue += d.uncostedRevenue;
  }
  const salesByStaff: Record<string, number> = {};
  for (const s of sales) add(salesByStaff, s.staffName, s.total);
  const subscriptionsByPlan: Record<string, number> = {};
  for (const s of sales)
    for (const l of s.lines)
      if (l.categoryName === "Subscription")
        add(subscriptionsByPlan, l.itemName, l.lineTotal);

  const [receipts] = await rows(
    `SELECT COUNT(*) AS n FROM expenses WHERE org_id = ? AND status = 'needs_review'`,
    [orgId],
  );
  const [guesses] = await rows(
    `SELECT COUNT(*) AS n FROM items WHERE org_id = ? AND category_id IS NOT NULL AND confirmed = 0`,
    [orgId],
  );
  const [uncat] = await rows(
    `SELECT COUNT(*) AS n FROM items i WHERE i.org_id = ? AND i.category_id IS NULL AND EXISTS (SELECT 1 FROM sale_lines l WHERE l.item_id = i.id)`,
    [orgId],
  );

  const current = periodStats(days, sales, expenseByCategory);
  const cmp = comparisonDays(period, start, end);
  let comparison: PeriodStats | null = null;
  let previous: DigestFigures["previous"] = null;
  if (cmp) {
    const cmpDays: DayResult[] = [];
    let cmpSales: LoadedSale[] = [];
    for (const d of cmp.days) {
      const [stored] = await rows<{ figures: string }>(
        `SELECT figures FROM reconciliations WHERE org_id = ? AND day = ?`,
        [orgId, d],
      );
      if (stored) cmpDays.push(JSON.parse(stored.figures));
      cmpSales = cmpSales.concat(paidCompleted(await loadSales(orgId, d, d)));
    }
    if (cmpDays.length) {
      const cmpExpenses: Record<string, number> = {};
      for (const e of await expenseRows(orgId, cmp.start, cmp.end)) {
        add(cmpExpenses, e.category ?? "Uncategorised", e.amount);
      }
      const scale = period === "daily" ? cmpDays.length : 1;
      comparison = periodStats(cmpDays, cmpSales, cmpExpenses, scale);
      if (period !== "daily")
        previous = {
          ...totals(cmpDays).combined,
          start: cmp.start,
          end: cmp.end,
        };
    }
  }
  const history = await trendHistory(orgId, period, start, end, sales);
  const trends = trendSignals(current, comparison, history, {
    weekdays: period === "weekly" || period === "monthly",
  });

  const categoryMonths: DigestFigures["categoryMonths"] = [];
  if (period === "monthly") {
    let monthStart = start;
    for (let i = 0; i < 3; i++) {
      const monthEnd = addDays(`${addDays(monthStart, 31).slice(0, 7)}-01`, -1);
      const byCategory: Record<string, number> = {};
      for (const e of await expenseRows(orgId, monthStart, monthEnd))
        add(byCategory, e.category ?? "Uncategorised", e.amount);
      categoryMonths.unshift({ month: monthStart.slice(0, 7), byCategory });
      const prevEnd = addDays(monthStart, -1);
      monthStart = `${prevEnd.slice(0, 7)}-01`;
    }
  }

  return {
    period,
    start,
    end,
    businesses,
    combined: {
      ...combined,
      margin:
        combined.income > 0 ? pct(combined.grossProfit, combined.income) : null,
    },
    incomeByMethod,
    cashInTill,
    notIncome,
    uncostedRevenue,
    topExpenses: [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 5),
    flags: period === "daily" ? flags : flags.filter(SIGNIFICANT).slice(0, 20),
    flagCounts,
    review: {
      receipts: num(receipts?.n),
      categoryGuesses: num(guesses?.n),
      uncategorised: num(uncat?.n),
    },
    previous,
    sellers: sellers(sales),
    byStaff: { sales: salesByStaff, givenAwayAtCost: notIncome.byStaff },
    marginByCategory: current.marginByCategory,
    expenseByCategory,
    subscriptionsByPlan,
    categoryMonths,
    trends,
    daysWithSales: new Set(allSales.map((s) => s.day)).size,
  };
}
