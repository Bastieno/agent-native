import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { check, sum } from "./helpers.js";
import {
  detectReport,
  rangeFromFileName,
  parsePaymentMethodReport,
  parseItemReport,
} from "../server/lib/moniebook-reports.js";

const salesFixture = readFileSync("test/fixtures/sales-sample.csv", "utf8");
const paymentFixture = readFileSync(
  "test/fixtures/payment-method-sample.csv",
  "utf8",
);
const itemFixture = readFileSync("test/fixtures/item-sample.csv", "utf8");

check("detect", () => {
  assert.equal(detectReport(salesFixture), "sales-summary");
  assert.equal(detectReport(paymentFixture), "payment-method");
  assert.equal(detectReport(itemFixture), "item-sales");
  assert.equal(detectReport("a,b\n1,2\n"), null);
});
check("range is end-exclusive", () =>
  assert.deepEqual(
    rangeFromFileName("payment-method-report-2026-11-01-2026-11-10.csv"),
    {
      start: "2026-11-01",
      endExclusive: "2026-11-10",
    },
  ),
);
check("reversed name", () =>
  assert.deepEqual(
    rangeFromFileName("sales-summary2026-11-10-2026-11-01.csv"),
    {
      start: "2026-11-01",
      endExclusive: "2026-11-10",
    },
  ),
);
check("no range in name", () =>
  assert.equal(rangeFromFileName("report.csv"), null),
);
check("payment method rows", () => {
  const { rows, missingColumns } = parsePaymentMethodReport(paymentFixture);
  assert.deepEqual(missingColumns, []);
  const by = Object.fromEntries(rows.map((r) => [r.method, r]));
  assert.equal(rows.length, 8);
  assert.equal(by["Bank Transfer"].payments, 105);
  assert.equal(by["Bank Transfer"].collected, 52430000);
  assert.equal(by["Cash"].collected, 3450000);
  assert.equal(sum(rows.map((r) => r.collected)), 106810000);
});
check("item rows", () => {
  const { rows, missingColumns } = parseItemReport(itemFixture);
  assert.deepEqual(missingColumns, []);
  const by = Object.fromEntries(rows.map((r) => [r.name, r]));
  assert.equal(rows.length, 52);
  assert.equal(by["WATER"].unitCost, 13000);
  assert.equal(by["BUDWEISER"].unitCost, 82895);
  assert.equal(by["Heineken Can"].category, null);
  assert.equal(by["HUB MONTHLY SUBSCRIPTION PREMIUM"].category, "Subscription");
  assert.equal(sum(rows.map((r) => r.gross)), 106290000);
});
