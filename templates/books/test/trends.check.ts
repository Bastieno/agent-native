import assert from "node:assert/strict";
import { check } from "./helpers.js";
import {
  trendSignals,
  emptyStats,
  type PeriodStats,
} from "../server/lib/trends.js";

const stats = (over: Partial<PeriodStats>): PeriodStats => ({
  ...emptyStats(),
  ...over,
});
const history = {
  flagFreeRun: 0,
  bestEver: null,
  subscribers: { new: 0, returning: 0 },
};
const has = (
  signals: ReturnType<typeof trendSignals>,
  direction: string,
  kind: string,
  subject?: string,
) =>
  signals.some(
    (s) =>
      s.direction === direction &&
      s.kind === kind &&
      (subject == null || s.subject === subject),
  );

check("margin up is good, under 2 points is nothing", () => {
  const small = trendSignals(
    stats({ marginByCategory: { Shawarma: 34.35 } }),
    stats({ marginByCategory: { Shawarma: 32.61 } }),
    history,
  );
  assert.equal(has(small, "good", "category_margin", "Shawarma"), false);
  const big = trendSignals(
    stats({ marginByCategory: { Shawarma: 35.0 } }),
    stats({ marginByCategory: { Shawarma: 32.61 } }),
    history,
  );
  assert.equal(has(big, "good", "category_margin", "Shawarma"), true);
});
check("income up 10% is good, 9% is nothing", () => {
  const up10 = trendSignals(
    stats({ incomeByBusiness: { lounge: 110 } }),
    stats({ incomeByBusiness: { lounge: 100 } }),
    history,
  );
  assert.equal(has(up10, "good", "income", "lounge"), true);
  const up9 = trendSignals(
    stats({ incomeByBusiness: { lounge: 109 } }),
    stats({ incomeByBusiness: { lounge: 100 } }),
    history,
  );
  assert.equal(has(up9, "good", "income", "lounge"), false);
});
check("income down 10% is watch", () => {
  const s = trendSignals(
    stats({ incomeByBusiness: { hub: 90 } }),
    stats({ incomeByBusiness: { hub: 100 } }),
    history,
  );
  assert.equal(has(s, "watch", "income", "hub"), true);
});
check("house up is watch", () => {
  const s = trendSignals(
    stats({ houseLeakagesAtCost: 130 }),
    stats({ houseLeakagesAtCost: 100 }),
    history,
  );
  assert.equal(has(s, "watch", "house_leakages"), true);
});
check("expenses faster than income is watch", () => {
  const s = trendSignals(
    stats({ income: 105, expenses: 130 }),
    stats({ income: 100, expenses: 100 }),
    history,
  );
  assert.equal(has(s, "watch", "expenses_outpace_income"), true);
});
check("expense category down is good", () => {
  const s = trendSignals(
    stats({ expenseByCategory: { "Diesel / power": 80 } }),
    stats({ expenseByCategory: { "Diesel / power": 100 } }),
    history,
  );
  assert.equal(has(s, "good", "expense_category", "Diesel / power"), true);
});
check("item selling more while its margin falls", () => {
  const s = trendSignals(
    stats({ items: { WATER: { units: 200, margin: 50 } } }),
    stats({ items: { WATER: { units: 150, margin: 56.67 } } }),
    history,
  );
  assert.equal(has(s, "watch", "item_margin_falling", "WATER"), true);
});
check("flag-free run of 3", () => {
  assert.equal(
    has(
      trendSignals(stats({}), null, { ...history, flagFreeRun: 3 }),
      "good",
      "flag_free_run",
    ),
    true,
  );
  assert.equal(
    has(
      trendSignals(stats({}), null, { ...history, flagFreeRun: 2 }),
      "good",
      "flag_free_run",
    ),
    false,
  );
});
check("best ever", () => {
  const s = trendSignals(stats({ income: 500 }), null, {
    ...history,
    bestEver: 400,
  });
  assert.equal(has(s, "good", "best_ever"), true);
  assert.equal(
    has(
      trendSignals(stats({ income: 300 }), null, { ...history, bestEver: 400 }),
      "good",
      "best_ever",
    ),
    false,
  );
});
check("new subscribers counted, names absent", () => {
  const s = trendSignals(stats({}), null, {
    ...history,
    subscribers: { new: 2, returning: 5 },
  });
  assert.equal(has(s, "good", "new_subscribers"), true);
  assert.ok(!JSON.stringify(s).includes("Customer"));
});
check("three of each at most", () => {
  const many = trendSignals(
    stats({
      incomeByBusiness: { lounge: 200, hub: 200 },
      grossProfitByBusiness: { lounge: 200, hub: 200 },
    }),
    stats({
      incomeByBusiness: { lounge: 100, hub: 100 },
      grossProfitByBusiness: { lounge: 100, hub: 100 },
    }),
    { ...history, flagFreeRun: 5 },
  );
  assert.equal(many.filter((s) => s.direction === "good").length, 3);
});
check("weakest weekday is watch", () => {
  const s = trendSignals(
    stats({ incomeByWeekday: { 0: 500, 1: 100, 2: 400 } }),
    null,
    history,
    { weekdays: true },
  );
  assert.equal(has(s, "watch", "weakest_weekday", "Tuesday"), true);
});
