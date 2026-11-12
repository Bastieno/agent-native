import assert from "node:assert/strict";
import { bootBooks, check, fixture, finish } from "./helpers.js";

const { asOwner, query } = await bootBooks("check-import-reports");
const importSales = (await import("../actions/import-sales-export.js")).default;
const importItems = (await import("../actions/import-item-report.js")).default;
const importPayments = (
  await import("../actions/import-payment-method-report.js")
).default;
const setItemCategory = (await import("../actions/set-item-category.js"))
  .default;
const setCategoryBusiness = (
  await import("../actions/set-category-business.js")
).default;
const needing = (await import("../actions/list-items-needing-category.js"))
  .default;
const listSales = (await import("../actions/list-sales.js")).default;

const ITEM_NAME = "item-sales-report-2026-11-01-2026-11-10.csv";
const PAY_NAME = "payment-method-report-2026-11-01-2026-11-10.csv";
await asOwner(() =>
  importSales.run({
    csv: fixture("sales-sample.csv"),
    fileName: "sales-summary2026-11-10-2026-11-01.csv",
  }),
);
const nineDays = () =>
  asOwner(() => listSales.run({ start: "2026-11-01", end: "2026-11-09" }));

await check("item report sets categories", async () => {
  const r = await asOwner(() =>
    importItems.run({ csv: fixture("item-sample.csv"), fileName: ITEM_NAME }),
  );
  assert.deepEqual(r.needingCategory, ["Heineken Can"]);
  assert.equal(r.check.agrees, true);
  assert.equal(r.check.reportTotal, 106290000);
  assert.equal(r.check.salesTotal, 106290000);
  const s = await nineDays();
  assert.equal(s.byBusiness.hub, 40200000);
  assert.equal(s.byBusiness.lounge, 61220000);
  assert.equal(s.byBusiness.unassigned, 120000);
});
await check("costs before the guess", async () => {
  const s = await nineDays();
  assert.equal(s.costOfGoods.hub, 19000000);
  assert.equal(s.costOfGoods.lounge, 36585880);
  assert.equal(s.uncostedRevenue, 0);
});
await check("agent guess counts at once", async () => {
  await asOwner(() =>
    setItemCategory.run({
      itemName: "Heineken Can",
      category: "Drinks",
      confirmed: false,
    }),
  );
  const s = await nineDays();
  assert.equal(s.byBusiness.lounge, 61340000);
  assert.equal(s.byBusiness.unassigned ?? 0, 0);
  assert.equal(s.costOfGoods.lounge, 36660880);
});
await check("guess stays unconfirmed", async () => {
  const r = await asOwner(() => needing.run({}));
  assert.deepEqual(r.unconfirmed, ["Heineken Can"]);
  assert.deepEqual(r.uncategorised, ["More"]);
  assert.deepEqual(r.unmappedCategories, []);
});
await check("owner confirms", async () => {
  await asOwner(() =>
    setItemCategory.run({ itemName: "Heineken Can", category: "Drinks" }),
  );
  assert.deepEqual((await asOwner(() => needing.run({}))).unconfirmed, []);
});
await check("new category needs a business", async () => {
  await asOwner(() =>
    setItemCategory.run({ itemName: "More", category: "Snacks" }),
  );
  assert.deepEqual((await asOwner(() => needing.run({}))).unmappedCategories, [
    "Snacks",
  ]);
  await asOwner(() =>
    setCategoryBusiness.run({ category: "Snacks", business: "lounge" }),
  );
  assert.deepEqual(
    (await asOwner(() => needing.run({}))).unmappedCategories,
    [],
  );
});
await check("full range agrees", async () => {
  const r = await asOwner(() =>
    importPayments.run({
      csv: fixture("payment-method-sample.csv"),
      fileName: PAY_NAME,
    }),
  );
  assert.equal(r.check.agrees, true);
  assert.equal(r.check.reportTotal, 106810000);
  assert.equal(r.check.salesTotal, 106810000);
  const rows = await query(
    `SELECT range_end_exclusive FROM payment_method_totals`,
  );
  assert.equal(rows.length, 8);
  assert.ok(rows.every((x) => x.range_end_exclusive === "2026-11-10"));
});
await check("same range replaces", async () => {
  await asOwner(() =>
    importPayments.run({
      csv: fixture("payment-method-sample.csv"),
      fileName: PAY_NAME,
    }),
  );
  assert.equal((await query(`SELECT id FROM payment_method_totals`)).length, 8);
});
await check("short range flagged", async () => {
  const r = await asOwner(() =>
    importPayments.run({
      csv: fixture("payment-method-sample.csv"),
      fileName: "x.csv",
      range: { start: "2026-11-01", endExclusive: "2026-11-09" },
    }),
  );
  assert.equal(r.check.agrees, false);
  assert.equal(r.check.reportTotal, 106810000);
  assert.ok(r.check.salesTotal < 106810000);
});
await check("no range asks", async () => {
  await assert.rejects(
    () =>
      asOwner(() =>
        importPayments.run({
          csv: fixture("payment-method-sample.csv"),
          fileName: "report.csv",
        }),
      ),
    { message: "Which dates does this file cover?" },
  );
});
await finish();
