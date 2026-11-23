import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { currentRole, memberOrg } from "../server/lib/access.js";
import { digestFigures, rangeTotals } from "../server/lib/digest-figures.js";
import { DIVIDENDS } from "../server/lib/setup.js";
import { addDays, daysBetween, lagosDay } from "../server/lib/lagos-time.js";
import type { DayResult } from "../server/lib/reconcile.js";
import { num, rows } from "../server/lib/sql.js";

const sum = (o: Record<string, number> | undefined) =>
  Object.values(o ?? {}).reduce((a, b) => a + b, 0);
/** Percentage change, one decimal; null when there is nothing to compare with. */
const change = (now: number, before: number) =>
  before === 0
    ? null
    : Math.round(((now - before) / Math.abs(before)) * 1000) / 10;

export default defineAction({
  description:
    "What the Overview screen shows for days start..end: profit and loss by business (income, cost of goods, gross profit, expenses, net) with the change from the period just before, money in and out by day, where the money went, up to three things to watch, the profit shared (dividends) and what is kept in the business after it, how stale the data is and how many things wait for review. Amounts are kobo.",
  schema: z.object({
    start: z.string().describe("YYYY-MM-DD"),
    end: z.string().describe("YYYY-MM-DD, included"),
  }),
  http: { method: "GET" },
  run: async ({ start, end }) => {
    const orgId = await memberOrg();
    const role = await currentRole();
    const f = await digestFigures(orgId, "range", start, end);
    const [latest] = await rows(
      `SELECT MAX(day) AS day FROM sales WHERE org_id = ?`,
      [orgId],
    );
    const latestDay = (latest?.day as string | null) ?? null;
    // Compare like with like: when sales stop before the period ends, compare
    // only the days up to the last sale with the same number of days before.
    const compareEnd = latestDay && latestDay < end ? latestDay : end;
    const clipped = compareEnd !== end && compareEnd >= start;
    const length = daysBetween(start, clipped ? compareEnd : end).length;
    const prevEnd = addDays(start, -1);
    const prevStart = addDays(start, -length);
    const prev = await rangeTotals(orgId, prevStart, prevEnd);
    const cur = clipped ? await rangeTotals(orgId, start, compareEnd) : f;

    const stored = await rows<{ day: string; figures: string }>(
      `SELECT day, figures FROM reconciliations WHERE org_id = ? AND day >= ? AND day <= ? ORDER BY day`,
      [orgId, start, end],
    );
    const byDay = new Map(
      stored.map((r) => [r.day, JSON.parse(r.figures) as DayResult]),
    );
    const daily = daysBetween(start, end).map((day) => {
      const d = byDay.get(day);
      return {
        day,
        moneyIn: sum(d?.incomeByBusiness),
        moneyOut: sum(d?.expensesByBusiness),
      };
    });

    const today = lagosDay(new Date());
    const staleDays = latestDay
      ? daysBetween(latestDay, today).length - 1
      : null;

    const [toReview] = await rows(
      `SELECT COUNT(*) AS n FROM expenses WHERE org_id = ? AND status = 'needs_review'`,
      [orgId],
    );
    const [pending] = await rows(
      `SELECT COUNT(*) AS n FROM pending_receipts WHERE org_id = ? AND status = 'pending'`,
      [orgId],
    );
    const reviewCount =
      num(toReview?.n) +
      f.review.categoryGuesses +
      f.review.uncategorised +
      num(pending?.n);

    const profitShared = f.notCosts[DIVIDENDS] ?? 0;

    const businesses = ["lounge", "hub"].map((slug) => {
      const now = f.businesses[slug];
      const compared = cur.businesses[slug];
      const before = prev.businesses[slug];
      return {
        slug,
        ...now,
        incomeChange: before ? change(compared.income, before.income) : null,
        netChange: before ? change(compared.net, before.net) : null,
      };
    });

    return {
      start,
      end,
      /** The changes compare start..compared.end with previous.start..previous.end. */
      compared: { start, end: clipped ? compareEnd : end },
      previous: { start: prevStart, end: prevEnd, ...prev.combined },
      canEdit: role === "owner" || role === "admin",
      businesses,
      combined: {
        ...f.combined,
        incomeChange: change(cur.combined.income, prev.combined.income),
        netChange: change(cur.combined.net, prev.combined.net),
      },
      daily,
      daysWithSales: f.daysWithSales,
      spendByCategory: Object.entries(f.expenseByCategory)
        .filter(([, v]) => v > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([category, amount]) => ({ category, amount })),
      expensesTotal: f.combined.expenses,
      ownersPay: f.ownersPay,
      /** Paid out of profit: kept out of Net, then set against it. */
      profitShared,
      /** Net less the profit shared; below zero, more was shared than made. */
      keptInBusiness: f.combined.net - profitShared,
      /** Loans, transfers and other money moved; profit shared is apart. */
      notCosts: sum(f.notCosts) - profitShared,
      watch: f.trends.filter((s) => s.direction === "watch").slice(0, 3),
      good: f.trends.filter((s) => s.direction === "good").slice(0, 2),
      uncostedRevenue: f.uncostedRevenue,
      latestDay,
      staleDays,
      reviewCount,
    };
  },
});
