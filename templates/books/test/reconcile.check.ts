import assert from "node:assert/strict";
import { check } from "./helpers.js";
import {
  reconcileDay,
  type DayInput,
  type Flag,
} from "../server/lib/reconcile.js";
import { DEFAULT_THRESHOLDS } from "../server/lib/setup.js";

type Sale = DayInput["sales"][number];
let n = 0;
const DAY = "2026-11-09";
function sale(over: Partial<Sale> & { total: number }): Sale {
  n++;
  return {
    id: `s${n}`,
    orderNumber: `o${n}`,
    orderedAt: `${DAY} 20:00:00`,
    status: "COMPLETED",
    collectedAmount: over.total,
    change: 0,
    staffName: "Staff 1",
    customerName: null,
    methods: ["Bank Transfer"],
    legs: [
      {
        index: 0,
        method: "Bank Transfer",
        reference: `r${n}`,
        amount: over.total,
      },
    ],
    lines: [
      {
        itemName: "Thing",
        businessSlug: "lounge",
        categoryConfirmed: true,
        quantity: 1,
        lineTotal: over.total,
        unitCost: Math.round(over.total / 2),
      },
    ],
    ...over,
  };
}
const ev = (
  reference: string | null,
  amount: number,
  at = `${DAY}T19:00:00Z`,
) => ({
  webhookId: `w${reference}-${amount}-${at}`,
  reference,
  amount,
  occurredAt: at,
});
function day(over: Partial<DayInput>): DayInput {
  return {
    day: DAY,
    sales: [],
    events: [],
    expenses: [],
    categoryHistory: {},
    paymentReport: null,
    thresholds: DEFAULT_THRESHOLDS,
    ...over,
  };
}
const kinds = (flags: Flag[]) => flags.map((f) => f.kind).sort();
const legs = (...xs: [string, string | null, number | null][]) =>
  xs.map(([method, reference, amount], index) => ({
    index,
    method,
    reference,
    amount,
  }));

check("reference match", () => {
  const s = sale({
    total: 450000,
    legs: legs(["Bank Transfer", "r-a", 450000]),
  });
  const r = reconcileDay(day({ sales: [s], events: [ev("r-a", 450000)] }));
  assert.deepEqual(r.flags, []);
  assert.equal(r.incomeByMethod.moniepoint, 450000);
});
check("two-transfer split exact", () => {
  const s = sale({
    total: 60000,
    methods: ["Bank Transfer"],
    legs: legs(["Bank Transfer", "a", null], ["Bank Transfer", "b", null]),
  });
  const r = reconcileDay(
    day({ sales: [s], events: [ev("a", 30000), ev("b", 30000)] }),
  );
  assert.deepEqual(r.flags, []);
});
check("two-transfer split short", () => {
  const s = sale({
    total: 450000,
    legs: legs(["Bank Transfer", "a", null], ["Bank Transfer", "b", null]),
  });
  const r = reconcileDay(
    day({ sales: [s], events: [ev("a", 200000), ev("b", 200000)] }),
  );
  assert.deepEqual(r.flags, [
    { kind: "split_short", orderNumber: s.orderNumber, difference: 50000 },
  ]);
});
check("transfer plus cash", () => {
  const s = sale({
    total: 1350000,
    methods: ["Bank Transfer", "Cash"],
    legs: legs(["Cash", null, null], ["Bank Transfer", "a", null]),
  });
  const r = reconcileDay(day({ sales: [s], events: [ev("a", 600000)] }));
  assert.deepEqual(r.flags, []);
  assert.equal(r.cash.collected, 750000);
  assert.equal(r.cash.source, "orders");
});
check("overpaid with change", () => {
  const s = sale({
    total: 5370000,
    collectedAmount: 5860000,
    change: 490000,
    legs: legs(["Bank Transfer", "a", null], ["Bank Transfer", "b", null]),
  });
  const r = reconcileDay(
    day({ sales: [s], events: [ev("a", 5000000), ev("b", 860000)] }),
  );
  assert.deepEqual(r.flags, []);
});
check("transfer plus cash over", () => {
  const s = sale({
    total: 400000,
    methods: ["Bank Transfer", "Cash"],
    legs: legs(["Cash", null, null], ["Bank Transfer", "a", null]),
  });
  const r = reconcileDay(day({ sales: [s], events: [ev("a", 450000)] }));
  assert.deepEqual(r.flags, [
    { kind: "split_over", orderNumber: s.orderNumber, difference: 50000 },
  ]);
});
check("unmatched leg is unknown", () => {
  const s = sale({
    total: 1350000,
    methods: ["Bank Transfer", "Cash"],
    legs: legs(
      ["Cash", null, null],
      ["Bank Transfer", "a", null],
      ["Bank Transfer", "b", null],
    ),
  });
  const r = reconcileDay(day({ sales: [s], events: [ev("a", 600000)] }));
  assert.deepEqual(kinds(r.flags), ["split_unknown", "transfer_missing"]);
  assert.equal(r.cash.collected, null);
  assert.equal(r.cashInTill, null);
});
check("one reference two orders", () => {
  const a = sale({
    total: 100000,
    legs: legs(["Bank Transfer", "shared", null]),
  });
  const b = sale({
    total: 200000,
    legs: legs(["Bank Transfer", "shared", null]),
  });
  assert.deepEqual(
    reconcileDay(day({ sales: [a, b], events: [ev("shared", 300000)] })).flags,
    [],
  );
  const r = reconcileDay(
    day({ sales: [a, b], events: [ev("shared", 250000)] }),
  );
  assert.deepEqual(kinds(r.flags), ["shared_reference_mismatch"]);
});
check("accepted manually matched", () => {
  const s = sale({
    total: 30000,
    orderedAt: `${DAY} 22:38:00`,
    methods: ["Accepted manually"],
    legs: legs(["Accepted manually", null, 30000]),
  });
  const r = reconcileDay(
    day({ sales: [s], events: [ev(null, 30000, `${DAY}T21:10:00Z`)] }),
  );
  assert.deepEqual(r.flags, []);
});
check("accepted manually unmatched", () => {
  const s = sale({
    total: 30000,
    orderedAt: `${DAY} 22:38:00`,
    methods: ["Accepted manually"],
    legs: legs(["Accepted manually", null, 30000]),
  });
  const r = reconcileDay(
    day({ sales: [s], events: [ev(null, 30000, `${DAY}T18:00:00Z`)] }),
  );
  assert.deepEqual(kinds(r.flags), [
    "manual_unmatched",
    "moniepoint_without_sale",
  ]);
});
check("money without sale", () => {
  const r = reconcileDay(day({ events: [ev("nobody", 500000)] }));
  assert.deepEqual(kinds(r.flags), ["moniepoint_without_sale"]);
});
check("no events means no transfer checks", () => {
  const s = sale({
    total: 450000,
    legs: legs(["Bank Transfer", "r-a", 450000]),
  });
  assert.deepEqual(reconcileDay(day({ sales: [s] })).flags, []);
});
check("cancelled excluded", () => {
  const s = sale({
    total: 2500000,
    status: "CANCELLED",
    methods: ["Transfer to Opay"],
    legs: legs(["Transfer to Opay", null, 2500000]),
  });
  const r = reconcileDay(day({ sales: [s] }));
  assert.equal(r.incomeByMethod.opay, 0);
  assert.deepEqual(r.flags, [
    { kind: "cancelled", orderNumber: s.orderNumber, total: 2500000 },
  ]);
});
check("cash from payment report", () => {
  const s = sale({
    total: 100000,
    methods: ["Cash"],
    legs: legs(["Cash", null, 100000]),
    change: 0,
  });
  const r = reconcileDay(
    day({
      sales: [
        s,
        sale({ total: 4000000, collectedAmount: 4520000, change: 520000 }),
      ],
      paymentReport: [
        { method: "Cash", collected: 3450000 },
        { method: "Bank Transfer", collected: 1170000 },
      ],
      expenses: [
        {
          id: "e1",
          amount: 100000,
          paidWith: "cash",
          categoryId: "c1",
          businessSlug: "lounge",
          status: "confirmed",
          vendor: "Gate",
          occurredOn: DAY,
          imageHash: null,
        },
      ],
    }),
  );
  assert.equal(r.cash.source, "payment-report");
  assert.equal(r.cash.collected, 3450000);
  assert.equal(r.cash.change, 520000);
  assert.equal(r.cashInTill, 2830000);
});
check("daily files disagree", () => {
  const r = reconcileDay(
    day({
      sales: [sale({ total: 106700000 })],
      paymentReport: [{ method: "Bank Transfer", collected: 106810000 }],
    }),
  );
  assert.deepEqual(r.flags, [
    { kind: "files_disagree", reportTotal: 106810000, salesTotal: 106700000 },
  ]);
});
check("gross profit", () => {
  const hub = sale({
    total: 4000000,
    lines: [
      {
        itemName: "Monthly",
        businessSlug: "hub",
        categoryConfirmed: true,
        quantity: 1,
        lineTotal: 4000000,
        unitCost: 2000000,
      },
    ],
  });
  const lounge = sale({
    total: 450000,
    lines: [
      {
        itemName: "Shawarma",
        businessSlug: "lounge",
        categoryConfirmed: true,
        quantity: 1,
        lineTotal: 450000,
        unitCost: 280000,
      },
    ],
  });
  const perk = sale({
    total: 450000,
    methods: ["Subscription Perk"],
    legs: legs(["Subscription Perk", null, 450000]),
    lines: [
      {
        itemName: "Chicken",
        businessSlug: "lounge",
        categoryConfirmed: true,
        quantity: 1,
        lineTotal: 450000,
        unitCost: 270000,
      },
    ],
  });
  const r = reconcileDay(day({ sales: [hub, lounge, perk] }));
  assert.equal(r.grossProfitByBusiness.hub, 1730000);
  assert.equal(r.grossProfitByBusiness.lounge, 170000);
  assert.equal(r.notIncome.atMenu.perk, 450000);
  assert.equal(r.notIncome.atCost.perk, 270000);
  assert.equal(r.incomeByBusiness.hub, 4000000);
});
check("no cost", () => {
  const s = sale({
    total: 120000,
    lines: [
      {
        itemName: "Heineken Can",
        businessSlug: "lounge",
        categoryConfirmed: true,
        quantity: 1,
        lineTotal: 120000,
        unitCost: null,
      },
    ],
  });
  const r = reconcileDay(day({ sales: [s] }));
  assert.equal(r.uncostedRevenue, 120000);
  assert.deepEqual(r.flags, [
    { kind: "no_cost", items: ["Heineken Can"], revenue: 120000 },
  ]);
});
check("unconfirmed category", () => {
  const s = sale({
    total: 120000,
    lines: [
      {
        itemName: "Heineken Can",
        businessSlug: "lounge",
        categoryConfirmed: false,
        quantity: 1,
        lineTotal: 120000,
        unitCost: 75000,
      },
    ],
  });
  assert.deepEqual(reconcileDay(day({ sales: [s] })).flags, [
    { kind: "unconfirmed_category", items: ["Heineken Can"] },
  ]);
});
check("house above threshold", () => {
  const house = (cost: number) =>
    sale({
      total: 3000000,
      methods: ["The House"],
      legs: legs(["The House", null, 3000000]),
      lines: [
        {
          itemName: "Meal",
          businessSlug: "lounge",
          categoryConfirmed: true,
          quantity: 1,
          lineTotal: 3000000,
          unitCost: cost,
        },
      ],
    });
  assert.deepEqual(
    kinds(reconcileDay(day({ sales: [house(2100000)] })).flags),
    ["house_leakages_high"],
  );
  assert.deepEqual(reconcileDay(day({ sales: [house(1900000)] })).flags, []);
});
const expense = (
  id: string,
  amount: number,
  over: Record<string, unknown> = {},
) => ({
  id,
  amount,
  paidWith: "transfer",
  categoryId: "diesel",
  businessSlug: "hub",
  status: "confirmed",
  vendor: "Total",
  occurredOn: DAY,
  imageHash: null,
  ...over,
});
check("large expense", () => {
  const r = reconcileDay(day({ expenses: [expense("e1", 10000100)] }));
  assert.deepEqual(r.flags, [
    { kind: "large_expense", expenseId: "e1", amount: 10000100 },
  ]);
});
check("category spike", () => {
  const flagged = reconcileDay(
    day({ expenses: [expense("e1", 130)], categoryHistory: { diesel: 100 } }),
  );
  assert.deepEqual(kinds(flagged.flags), ["category_spike"]);
  const quiet = reconcileDay(
    day({ expenses: [expense("e1", 129)], categoryHistory: { diesel: 100 } }),
  );
  assert.deepEqual(quiet.flags, []);
});
check("needs review", () => {
  const r = reconcileDay(
    day({ expenses: [expense("e1", 500, { status: "needs_review" })] }),
  );
  assert.deepEqual(r.flags, [{ kind: "needs_review", count: 1 }]);
});
check("duplicate receipt", () => {
  const r = reconcileDay(
    day({
      expenses: [
        expense("e1", 500, { imageHash: "h" }),
        expense("e2", 700, { imageHash: "h" }),
      ],
    }),
  );
  assert.deepEqual(r.flags, [
    { kind: "duplicate_receipt", expenseIds: ["e1", "e2"] },
  ]);
});
