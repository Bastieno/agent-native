/**
 * "Going well" and "To watch": signals computed from a period against its
 * comparison. The agent words them; it never adds its own. Thresholds are in
 * docs/books-plan.md (Global Constraints).
 */

export const TREND = {
  pct: 10, // income, gross profit, expense category, The House + Leakages
  marginPoints: 2,
  flagFreeRun: 3,
  maxEach: 3,
};

export interface PeriodStats {
  income: number;
  expenses: number;
  incomeByBusiness: Record<string, number>;
  grossProfitByBusiness: Record<string, number>;
  /** Moniebook category → margin % (gross profit ÷ income × 100) */
  marginByCategory: Record<string, number>;
  /** Expense category name → spend */
  expenseByCategory: Record<string, number>;
  houseLeakagesAtCost: number;
  /** 0 = Monday … 6 = Sunday → income */
  incomeByWeekday: Record<number, number>;
  items: Record<string, { units: number; margin: number }>;
}

export const emptyStats = (): PeriodStats => ({
  income: 0,
  expenses: 0,
  incomeByBusiness: {},
  grossProfitByBusiness: {},
  marginByCategory: {},
  expenseByCategory: {},
  houseLeakagesAtCost: 0,
  incomeByWeekday: {},
  items: {},
});

export interface Signal {
  direction: "good" | "watch";
  kind:
    | "income"
    | "gross_profit"
    | "category_margin"
    | "expense_category"
    | "house_leakages"
    | "expenses_outpace_income"
    | "weakest_weekday"
    | "item_margin_falling"
    | "best_ever"
    | "new_subscribers"
    | "flag_free_run";
  subject: string;
  now: number;
  before: number;
  /** Percent change for amounts, points for margins, a count otherwise. */
  change: number;
}

export interface TrendHistory {
  flagFreeRun: number;
  /** Best income of an earlier period of the same length, or null if none. */
  bestEver: number | null;
  subscribers: { new: number; returning: number };
}

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const pct = (now: number, before: number) =>
  before > 0 ? ((now - before) / before) * 100 : 0;
const round1 = (n: number) => Math.round(n * 10) / 10;

export function trendSignals(
  current: PeriodStats,
  comparison: PeriodStats | null,
  history: TrendHistory,
  opts: { weekdays?: boolean } = {},
): Signal[] {
  const out: Signal[] = [];
  const amount = (
    kind: Signal["kind"],
    subject: string,
    now: number,
    before: number,
    upIsGood = true,
  ) => {
    if (!(before > 0)) return;
    const change = pct(now, before);
    if (Math.abs(change) < TREND.pct) return;
    const good = change > 0 === upIsGood;
    out.push({
      direction: good ? "good" : "watch",
      kind,
      subject,
      now,
      before,
      change: round1(change),
    });
  };

  if (comparison) {
    for (const [biz, now] of Object.entries(current.incomeByBusiness)) {
      amount("income", biz, now, comparison.incomeByBusiness[biz] ?? 0);
    }
    for (const [biz, now] of Object.entries(current.grossProfitByBusiness)) {
      amount(
        "gross_profit",
        biz,
        now,
        comparison.grossProfitByBusiness[biz] ?? 0,
      );
    }
    for (const [cat, now] of Object.entries(current.marginByCategory)) {
      const before = comparison.marginByCategory[cat];
      if (before == null) continue;
      const change = now - before;
      if (Math.abs(change) >= TREND.marginPoints) {
        out.push({
          direction: change > 0 ? "good" : "watch",
          kind: "category_margin",
          subject: cat,
          now,
          before,
          change: round1(change),
        });
      }
    }
    for (const [cat, now] of Object.entries(current.expenseByCategory)) {
      amount(
        "expense_category",
        cat,
        now,
        comparison.expenseByCategory[cat] ?? 0,
        false,
      );
    }
    if (comparison.houseLeakagesAtCost > 0) {
      const change = pct(
        current.houseLeakagesAtCost,
        comparison.houseLeakagesAtCost,
      );
      if (change >= TREND.pct) {
        out.push({
          direction: "watch",
          kind: "house_leakages",
          subject: "The House and leakages",
          now: current.houseLeakagesAtCost,
          before: comparison.houseLeakagesAtCost,
          change: round1(change),
        });
      }
    }
    const expenseChange = pct(current.expenses, comparison.expenses);
    const incomeChange = pct(current.income, comparison.income);
    if (
      comparison.expenses > 0 &&
      expenseChange >= TREND.pct &&
      expenseChange > incomeChange
    ) {
      out.push({
        direction: "watch",
        kind: "expenses_outpace_income",
        subject: "Expenses",
        now: current.expenses,
        before: comparison.expenses,
        change: round1(expenseChange - incomeChange),
      });
    }
    for (const [name, now] of Object.entries(current.items)) {
      const before = comparison.items[name];
      if (!before) continue;
      if (
        now.units > before.units &&
        before.margin - now.margin >= TREND.marginPoints
      ) {
        out.push({
          direction: "watch",
          kind: "item_margin_falling",
          subject: name,
          now: now.margin,
          before: before.margin,
          change: round1(now.margin - before.margin),
        });
      }
    }
  }

  if (opts.weekdays) {
    const days = Object.entries(current.incomeByWeekday).filter(
      ([, v]) => v > 0,
    );
    if (days.length >= 2) {
      const [weakest, value] = days.sort((a, b) => a[1] - b[1])[0];
      const average = days.reduce((a, [, v]) => a + v, 0) / days.length;
      out.push({
        direction: "watch",
        kind: "weakest_weekday",
        subject: WEEKDAYS[Number(weakest)],
        now: value,
        before: Math.round(average),
        change: round1(pct(value, average)),
      });
    }
  }
  // Fixed-weight signals sit between large and small moves when ranked.
  if (history.bestEver != null && current.income > history.bestEver) {
    out.push({
      direction: "good",
      kind: "best_ever",
      subject: "Income",
      now: current.income,
      before: history.bestEver,
      change: 50,
    });
  }
  if (history.subscribers.new > 0) {
    out.push({
      direction: "good",
      kind: "new_subscribers",
      subject: "Hub subscribers",
      now: history.subscribers.new,
      before: history.subscribers.returning,
      change: 40,
    });
  }
  if (history.flagFreeRun >= TREND.flagFreeRun) {
    out.push({
      direction: "good",
      kind: "flag_free_run",
      subject: "Checks",
      now: history.flagFreeRun,
      before: 0,
      change: 30,
    });
  }

  const ranked = out.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  return [
    ...ranked.filter((s) => s.direction === "good").slice(0, TREND.maxEach),
    ...ranked.filter((s) => s.direction === "watch").slice(0, TREND.maxEach),
  ];
}
