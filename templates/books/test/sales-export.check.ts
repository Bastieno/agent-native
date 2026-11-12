import assert from "node:assert/strict";
import { check, fixture, sum } from "./helpers.js";
import { parseCsv } from "../server/lib/csv.js";
import {
  parseSalesExport,
  type ParsedOrder,
} from "../server/lib/sales-export.js";

const salesCsv = fixture("sales-sample.csv");
const { orders, missingColumns } = parseSalesExport(salesCsv);
const completed = orders.filter((o) => o.status === "COMPLETED");

function totalsByMethodSet(os: ParsedOrder[]) {
  const t: Record<string, number> = {};
  for (const o of os)
    t[o.methods.join(", ")] = (t[o.methods.join(", ")] ?? 0) + o.total;
  return t;
}

check("csv quoted fields", () => {
  assert.deepEqual(parseCsv('a,b\n"x, y","He said ""hi"""\n'), [
    ["a", "b"],
    ["x, y", 'He said "hi"'],
  ]);
});
check("columns", () => assert.deepEqual(missingColumns, []));
check("count", () => {
  assert.equal(orders.length, 175);
  assert.equal(orders.filter((o) => o.status === "CANCELLED").length, 1);
  assert.equal(orders.filter((o) => o.paymentMode === "SPLIT").length, 33);
});
check("completed totals by method set", () => {
  const t = totalsByMethodSet(completed);
  assert.equal(t["Bank Transfer"], 45180000);
  assert.equal(t["Transfer to Opay"], 41300000);
  assert.equal(t["Bank Transfer, Cash"], 12400000);
  assert.equal(t["Card"], 6540000);
  assert.equal(t["Cash"], 2840000);
  assert.equal(t["The House"], 3400000);
  assert.equal(t["Subscription Perk"], 1250000);
  assert.equal(t["Leakages"], 100000);
  assert.equal(t["Accepted manually"], 30000);
});
check("transfer refs and cards", () => {
  const legs = completed.flatMap((o) => o.legs);
  assert.equal(
    legs.filter((l) => l.method === "Bank Transfer" && l.reference).length,
    112,
  );
  assert.equal(legs.filter((l) => l.method === "Card").length, 14);
  assert.ok(legs.filter((l) => l.method === "Card").every((l) => l.reference));
});
check("three-transfer split", () => {
  const o = orders.find(
    (o) =>
      o.paymentMode === "SPLIT" &&
      o.legs.filter((l) => l.method === "Bank Transfer").length === 3,
  )!;
  assert.ok(o, "no three-transfer split found");
  assert.ok(o.legs.every((l) => l.reference));
});
check("lines and prices", () => {
  const o = orders.find((o) => o.orderNumber === "1-20261110220008")!;
  assert.deepEqual(o.lines, [
    { name: "ORIGIN BEER", quantity: 8, unitPrice: 150000, lineTotal: 1200000 },
    {
      name: "ORIGIN BITTER",
      quantity: 1,
      unitPrice: 150000,
      lineTotal: 150000,
    },
  ]);
  assert.equal(o.day, "2026-11-10");
  assert.match(o.staffName, /^Staff \d+$/);
});
check("change", () => {
  const upTo9 = completed.filter((o) => o.day <= "2026-11-09");
  assert.equal(sum(upTo9.map((o) => o.change)), 520000);
  assert.equal(sum(upTo9.map((o) => o.collectedAmount)), 106810000);
});
check("lines add up to the order total when prices have since changed", () => {
  const header =
    "orderNumber,orderDate,branchName,staffName,customerName,total,collectedAmount,change,status,refundAmount,paymentMode,paymentMethodNames,paymentDetails,itemNames,unitPrice";
  const row =
    "1-x,2025-10-20 20:00:00,B,S,,2000.00,2000.00,0.00,COMPLETED,0.00,REGULAR,Cash,Cash Payment,1 x ORIGIN BEER | 1 x Fanta,ORIGIN BEER - 1500.00 | Fanta - 700.00";
  const [o] = parseSalesExport(`${header}\n${row}\n`).orders;
  assert.equal(
    o.lines.reduce((a, l) => a + l.lineTotal, 0),
    200000,
  );
  assert.deepEqual(
    o.lines.map((l) => l.lineTotal),
    [136364, 63636],
  );
  const free = parseSalesExport(
    `${header}\n${row.replace("ORIGIN BEER - 1500.00 | Fanta - 700.00", "ORIGIN BEER - 0.00 | Fanta - 0.00")}\n`,
  ).orders[0];
  assert.deepEqual(
    free.lines.map((l) => l.lineTotal),
    [100000, 100000],
    "no prices: split evenly",
  );
});
check("every real order's lines add up to its total", () => {
  for (const o of orders)
    assert.equal(
      o.lines.reduce((a, l) => a + l.lineTotal, 0),
      o.total,
      o.orderNumber,
    );
});
check("missing column reported", () =>
  assert.equal(
    parseSalesExport("orderNumber,total\n").missingColumns.includes(
      "paymentDetails",
    ),
    true,
  ),
);
