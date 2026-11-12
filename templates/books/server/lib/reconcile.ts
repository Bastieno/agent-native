/**
 * One day's reconciliation, as a pure function of that day's rows.
 *
 * Money is kobo. Sale times are Lagos local (`YYYY-MM-DD HH:mm:ss`); event
 * times are ISO instants. See docs/books-design.md, "Reconciliation".
 */
import type { Thresholds } from "./setup.js";
import type { LoadedSale } from "./sales-lines.js";
import { isNotIncome } from "./sales-lines.js";
import { lagosDay } from "./lagos-time.js";

export interface DayInput {
  day: string;
  sales: LoadedSale[];
  /** Moniepoint events from the day before to the day after. */
  events: {
    webhookId: string;
    reference: string | null;
    amount: number;
    occurredAt: string;
  }[];
  expenses: {
    id: string;
    amount: number;
    paidWith: string;
    categoryId: string | null;
    businessSlug: string | null;
    status: string;
    vendor: string;
    occurredOn: string;
    imageHash: string | null;
  }[];
  /** categoryId → average daily spend over the previous 4 weeks (kobo). */
  categoryHistory: Record<string, number>;
  /** A payment method report covering exactly this day, if one was sent. */
  paymentReport: { method: string; collected: number }[] | null;
  thresholds: Thresholds;
  /** Transfer and card references used by sales the day before and after. */
  neighbourReferences?: string[];
}

export type Flag =
  | { kind: "moniepoint_without_sale"; webhookId: string; amount: number }
  | { kind: "transfer_missing"; orderNumber: string; reference: string }
  | { kind: "manual_unmatched"; orderNumber: string; amount: number }
  | {
      kind: "split_short" | "split_over";
      orderNumber: string;
      difference: number;
    }
  | { kind: "split_unknown"; orderNumber: string }
  | {
      kind: "shared_reference_mismatch";
      reference: string;
      orderNumbers: string[];
    }
  | { kind: "cancelled"; orderNumber: string; total: number }
  | { kind: "house_leakages_high"; total: number }
  | { kind: "large_expense"; expenseId: string; amount: number }
  | {
      kind: "category_spike";
      categoryId: string;
      today: number;
      average: number;
    }
  | { kind: "duplicate_receipt"; expenseIds: [string, string] }
  | { kind: "needs_review"; count: number }
  | { kind: "files_disagree"; reportTotal: number; salesTotal: number }
  | { kind: "unconfirmed_category"; items: string[] }
  | { kind: "no_cost"; items: string[]; revenue: number };

type GiftKind = "house" | "perk" | "leakages";

export interface DayResult {
  day: string;
  income: number;
  incomeByMethod: Record<
    "moniepoint" | "opay" | "cash" | "unallocated",
    number
  >;
  incomeByBusiness: Record<string, number>;
  costOfGoodsByBusiness: Record<string, number>;
  grossProfitByBusiness: Record<string, number>;
  uncostedRevenue: number;
  notIncome: {
    atCost: Record<GiftKind, number>;
    atMenu: Record<GiftKind, number>;
    byStaff: Record<string, number>;
  };
  cash: {
    collected: number | null;
    source: "payment-report" | "orders";
    change: number;
  };
  cashInTill: number | null;
  expenses: number;
  expensesByBusiness: Record<string, number>;
  expensesByCategory: Record<string, number>;
  matchedEventIds: string[];
  flags: Flag[];
}

const MONIEPOINT_TRANSFER = new Set(["Bank Transfer", "Card"]);
const GIFT: Record<string, GiftKind> = {
  "The House": "house",
  "Subscription Perk": "perk",
  Leakages: "leakages",
  // Stock that went missing: a loss, counted with leakages.
  "Missing Items": "leakages",
};

const add = (o: Record<string, number>, k: string, v: number) => {
  o[k] = (o[k] ?? 0) + v;
};

/** A Lagos local time as epoch ms. */
const lagosMs = (local: string) =>
  Date.parse(`${local.replace(" ", "T")}+01:00`);

export function reconcileDay(input: DayInput): DayResult {
  const { day, thresholds } = input;
  const flags: Flag[] = [];
  const completed = input.sales.filter((s) => s.status === "COMPLETED");
  const paid = completed.filter((s) => !isNotIncome(s.methods));
  const gifts = completed.filter((s) => isNotIncome(s.methods));
  const feedOn = input.events.length > 0;

  for (const s of input.sales) {
    if (s.status === "CANCELLED")
      flags.push({
        kind: "cancelled",
        orderNumber: s.orderNumber,
        total: s.total,
      });
  }

  // ── 1. Transfers and cards matched to Moniepoint events by reference ──
  const eventsByRef = new Map<string, DayInput["events"]>();
  for (const e of input.events) {
    if (!e.reference) continue;
    eventsByRef.set(e.reference, [...(eventsByRef.get(e.reference) ?? []), e]);
  }
  const salesByRef = new Map<string, LoadedSale[]>();
  for (const s of paid) {
    for (const leg of s.legs) {
      if (MONIEPOINT_TRANSFER.has(leg.method) && leg.reference) {
        const list = salesByRef.get(leg.reference) ?? [];
        if (!list.includes(s)) list.push(s);
        salesByRef.set(leg.reference, list);
      }
    }
  }
  const matched = new Set<string>();
  /** saleId → reference → amount received for it */
  const received = new Map<string, Map<string, number>>();
  const unknownSales = new Set<string>();
  const giveTo = (saleId: string, ref: string, amount: number) => {
    const m = received.get(saleId) ?? new Map<string, number>();
    m.set(ref, amount);
    received.set(saleId, m);
  };
  if (feedOn) {
    for (const [ref, sales] of salesByRef) {
      const evs = eventsByRef.get(ref);
      if (!evs) {
        for (const s of sales) {
          flags.push({
            kind: "transfer_missing",
            orderNumber: s.orderNumber,
            reference: ref,
          });
          unknownSales.add(s.id);
        }
        continue;
      }
      evs.forEach((e) => matched.add(e.webhookId));
      const amount = evs.reduce((a, e) => a + e.amount, 0);
      if (sales.length === 1) {
        giveTo(sales[0].id, ref, amount);
        continue;
      }
      // One transfer paying for several orders: each order needs what it collected.
      const needs = sales.map((s) => s.collectedAmount);
      if (needs.reduce((a, b) => a + b, 0) !== amount) {
        flags.push({
          kind: "shared_reference_mismatch",
          reference: ref,
          orderNumbers: sales.map((s) => s.orderNumber),
        });
        sales.forEach((s) => unknownSales.add(s.id));
      } else sales.forEach((s, i) => giveTo(s.id, ref, needs[i]));
    }
  }

  // ── 2. Accepted manually: nearest unmatched event of the same amount ──
  const manualMatched = new Set<string>();
  for (const s of paid.filter((x) => x.methods.includes("Accepted manually"))) {
    if (!feedOn) continue;
    const at = lagosMs(s.orderedAt);
    const window = thresholds.manualWindowMinutes * 60_000;
    const candidates = input.events
      .filter(
        (e) => !matched.has(e.webhookId) && e.amount === s.collectedAmount,
      )
      .map((e) => ({ e, gap: Math.abs(Date.parse(e.occurredAt) - at) }))
      .filter((c) => c.gap <= window)
      .sort((a, b) => a.gap - b.gap);
    if (candidates.length) {
      matched.add(candidates[0].e.webhookId);
      manualMatched.add(s.id);
    } else
      flags.push({
        kind: "manual_unmatched",
        orderNumber: s.orderNumber,
        amount: s.collectedAmount,
      });
  }

  const neighbours = new Set(input.neighbourReferences ?? []);
  for (const e of input.events) {
    // A transfer that lands just after midnight belongs to yesterday's sale.
    if (e.reference && neighbours.has(e.reference)) continue;
    if (!matched.has(e.webhookId) && lagosDay(e.occurredAt) === day) {
      flags.push({
        kind: "moniepoint_without_sale",
        webhookId: e.webhookId,
        amount: e.amount,
      });
    }
  }

  // ── 3. Each paid sale: income by method, split checks, cash part ──
  const incomeByMethod = { moniepoint: 0, opay: 0, cash: 0, unallocated: 0 };
  let cashFromOrders: number | null = 0;
  for (const s of paid) {
    const transferLegs = s.legs.filter((l) =>
      MONIEPOINT_TRANSFER.has(l.method),
    );
    const hasCash = s.methods.includes("Cash");
    if (s.legs.length <= 1) {
      const method = s.legs[0]?.method ?? s.methods[0];
      if (method === "Transfer to Opay")
        incomeByMethod.opay += s.collectedAmount;
      else if (method === "Cash") {
        incomeByMethod.cash += s.collectedAmount;
        if (cashFromOrders != null) cashFromOrders += s.collectedAmount;
      } else incomeByMethod.moniepoint += s.collectedAmount;
      incomeByMethod.cash -= s.change;
      const got = received.get(s.id);
      if (got && transferLegs.length === 1 && !unknownSales.has(s.id)) {
        const diff = s.collectedAmount - [...got.values()][0];
        if (diff > 0)
          flags.push({
            kind: "split_short",
            orderNumber: s.orderNumber,
            difference: diff,
          });
        if (diff < 0)
          flags.push({
            kind: "split_over",
            orderNumber: s.orderNumber,
            difference: -diff,
          });
      }
      continue;
    }
    // Paid in parts.
    const got = received.get(s.id) ?? new Map<string, number>();
    const known =
      feedOn &&
      !unknownSales.has(s.id) &&
      transferLegs.every((l) => l.reference && got.has(l.reference));
    const transfers = [...got.values()].reduce((a, b) => a + b, 0);
    incomeByMethod.moniepoint += transfers;
    if (!known) {
      if (feedOn)
        flags.push({ kind: "split_unknown", orderNumber: s.orderNumber });
      incomeByMethod.unallocated += s.total - transfers;
      if (hasCash) cashFromOrders = null;
      continue;
    }
    const rest = s.collectedAmount - transfers;
    if (hasCash) {
      if (rest < 0)
        flags.push({
          kind: "split_over",
          orderNumber: s.orderNumber,
          difference: -rest,
        });
      incomeByMethod.cash += rest - s.change;
      if (cashFromOrders != null) cashFromOrders += Math.max(rest, 0);
    } else {
      if (rest > 0)
        flags.push({
          kind: "split_short",
          orderNumber: s.orderNumber,
          difference: rest,
        });
      if (rest < 0)
        flags.push({
          kind: "split_over",
          orderNumber: s.orderNumber,
          difference: -rest,
        });
      incomeByMethod.cash -= s.change;
    }
  }

  // ── 4–6. Cash in the till, and whether the files agree ──
  const change = completed.reduce((a, s) => a + s.change, 0);
  let cash: DayResult["cash"];
  if (input.paymentReport) {
    const reportTotal = input.paymentReport.reduce(
      (a, r) => a + r.collected,
      0,
    );
    const salesTotal = completed.reduce((a, s) => a + s.collectedAmount, 0);
    if (reportTotal !== salesTotal)
      flags.push({ kind: "files_disagree", reportTotal, salesTotal });
    const cashRow = input.paymentReport.find((r) => r.method === "Cash");
    cash = {
      collected: cashRow?.collected ?? 0,
      source: "payment-report",
      change,
    };
  } else cash = { collected: cashFromOrders, source: "orders", change };
  const cashExpenses = input.expenses
    .filter((e) => e.paidWith === "cash")
    .reduce((a, e) => a + e.amount, 0);
  const cashInTill =
    cash.collected == null ? null : cash.collected - change - cashExpenses;

  // ── 7. Cost and gross profit ──
  const incomeByBusiness: Record<string, number> = {};
  const costOfGoodsByBusiness: Record<string, number> = {};
  const giftCostByBusiness: Record<string, number> = {};
  let uncostedRevenue = 0;
  const noCost = new Set<string>();
  const unconfirmed = new Set<string>();
  for (const s of paid) {
    for (const l of s.lines) {
      const biz = l.businessSlug ?? "unassigned";
      add(incomeByBusiness, biz, l.lineTotal);
      if (!l.categoryConfirmed && l.businessSlug) unconfirmed.add(l.itemName);
      if (l.unitCost == null) {
        uncostedRevenue += l.lineTotal;
        noCost.add(l.itemName);
      } else add(costOfGoodsByBusiness, biz, l.quantity * l.unitCost);
    }
  }

  // ── 8. Value given away ──
  const atCost: Record<GiftKind, number> = { house: 0, perk: 0, leakages: 0 };
  const atMenu: Record<GiftKind, number> = { house: 0, perk: 0, leakages: 0 };
  const byStaff: Record<string, number> = {};
  for (const s of gifts) {
    const kind = GIFT[s.methods[0]];
    atMenu[kind] += s.total;
    for (const l of s.lines) {
      if (!l.categoryConfirmed && l.businessSlug) unconfirmed.add(l.itemName);
      if (l.unitCost == null) {
        noCost.add(l.itemName);
        continue;
      }
      const cost = l.quantity * l.unitCost;
      atCost[kind] += cost;
      add(byStaff, s.staffName, cost);
      add(
        giftCostByBusiness,
        kind === "perk" ? "hub" : (l.businessSlug ?? "unassigned"),
        cost,
      );
    }
  }
  const grossProfitByBusiness: Record<string, number> = {};
  for (const biz of new Set([
    ...Object.keys(incomeByBusiness),
    ...Object.keys(giftCostByBusiness),
  ])) {
    grossProfitByBusiness[biz] =
      (incomeByBusiness[biz] ?? 0) -
      (costOfGoodsByBusiness[biz] ?? 0) -
      (giftCostByBusiness[biz] ?? 0);
  }
  if (atCost.house + atCost.leakages > thresholds.houseLeakagesPerDay) {
    flags.push({
      kind: "house_leakages_high",
      total: atCost.house + atCost.leakages,
    });
  }
  if (unconfirmed.size)
    flags.push({
      kind: "unconfirmed_category",
      items: [...unconfirmed].sort(),
    });
  if (noCost.size)
    flags.push({
      kind: "no_cost",
      items: [...noCost].sort(),
      revenue: uncostedRevenue,
    });

  // ── Expenses ──
  const expensesByBusiness: Record<string, number> = {};
  const expensesByCategory: Record<string, number> = {};
  for (const e of input.expenses) {
    add(expensesByBusiness, e.businessSlug ?? "unassigned", e.amount);
    add(expensesByCategory, e.categoryId ?? "uncategorised", e.amount);
    if (e.amount > thresholds.largeExpense)
      flags.push({ kind: "large_expense", expenseId: e.id, amount: e.amount });
  }
  for (const [categoryId, today] of Object.entries(expensesByCategory)) {
    const average = input.categoryHistory[categoryId] ?? 0;
    if (average > 0 && today * 100 >= average * (100 + thresholds.spikePct)) {
      flags.push({ kind: "category_spike", categoryId, today, average });
    }
  }
  const seen = new Map<string, string>();
  for (const e of input.expenses) {
    const keys = [
      e.imageHash ? `h:${e.imageHash}` : null,
      `v:${e.vendor.trim().toLowerCase()}|${e.amount}|${e.occurredOn}`,
    ].filter(Boolean) as string[];
    const twin = keys.map((k) => seen.get(k)).find(Boolean);
    if (twin)
      flags.push({ kind: "duplicate_receipt", expenseIds: [twin, e.id] });
    keys.forEach((k) => seen.has(k) || seen.set(k, e.id));
  }
  const review = input.expenses.filter(
    (e) => e.status === "needs_review",
  ).length;
  if (review) flags.push({ kind: "needs_review", count: review });

  return {
    day,
    income: paid.reduce((a, s) => a + s.total, 0),
    incomeByMethod,
    incomeByBusiness,
    costOfGoodsByBusiness,
    grossProfitByBusiness,
    uncostedRevenue,
    notIncome: { atCost, atMenu, byStaff },
    cash,
    cashInTill,
    expenses: input.expenses.reduce((a, e) => a + e.amount, 0),
    expensesByBusiness,
    expensesByCategory,
    matchedEventIds: [...matched],
    flags,
  };
}
