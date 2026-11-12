import assert from "node:assert/strict";
import { bootBooks, check, fixture, finish } from "./helpers.js";

const { asOwner, asPartner } = await bootBooks("check-import-sales");
const importSales = (await import("../actions/import-sales-export.js")).default;
const listSales = (await import("../actions/list-sales.js")).default;

const sales = fixture("sales-sample.csv");
const run = (csv: string) =>
  asOwner(() =>
    importSales.run({
      csv,
      fileName: "sales-summary2026-11-10-2026-11-01.csv",
    }),
  );
const range = (start: string, end: string) =>
  asOwner(() => listSales.run({ start, end }));

await check("first import", async () => {
  const r = await run(sales);
  assert.equal(r.added, 175);
  assert.equal(r.updated, 0);
  assert.deepEqual(r.missingColumns, []);
});
const before = await range("2026-11-01", "2026-11-10");
await check("reimport is idempotent", async () => {
  const r = await run(sales);
  assert.equal(r.added, 0);
  assert.equal(r.updated, 0);
  assert.equal(r.unchanged, 175);
  assert.deepEqual(await range("2026-11-01", "2026-11-10"), before);
});
await check("completed income", async () => {
  assert.equal(before.income, 108290000);
});
await check("before item report everything is unassigned", async () => {
  const r = await range("2026-11-01", "2026-11-09");
  assert.equal(r.byBusiness.unassigned, 101540000);
});
await check("later cancellation updates", async () => {
  const flipped = sales.replace(
    /^(1-20261110220126,[^\n]*?),COMPLETED,/m,
    "$1,CANCELLED,",
  );
  assert.notEqual(flipped, sales, "fixture row not found");
  const r = await run(flipped);
  assert.equal(r.updated, 1);
  const after = await range("2026-11-01", "2026-11-10");
  assert.equal(after.income, 108290000 - 450000);
});
await check("missing columns rejected", async () => {
  await assert.rejects(
    () => run("orderNumber,total\n1,2\n"),
    /This file is missing: /,
  );
});
await check("partner cannot import", async () => {
  await assert.rejects(
    () => asPartner(() => importSales.run({ csv: sales, fileName: "x.csv" })),
    /Only the owner can change Books\./,
  );
});
await finish();
