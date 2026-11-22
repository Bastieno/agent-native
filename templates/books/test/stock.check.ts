import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture } from "./helpers.js";

// Stock bought is already counted once, as cost of goods in gross profit.
// Counting it again as an expense would take it off twice.
const { asOwner } = await bootBooks("check-stock");
const importFile = (await import("../server/lib/import-file.js"))
  .importMoniebookFile;
const record = (await import("../actions/record-expense.js")).default;
const reconcileDay = (await import("../actions/reconcile-day.js")).default;
const buildDigest = (await import("../actions/build-digest.js")).default;
const { renderWhatsApp } = await import("../server/lib/digest-render.js");

await asOwner(async () => {
  await importFile("org1", fixture("sales-sample.csv"), {
    fileName: "sales-summary2026-11-10-2026-11-01.csv",
    receivedVia: "upload",
  });
  await importFile("org1", fixture("item-sample.csv"), {
    fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
    receivedVia: "upload",
  });
  const day = { occurredOn: "2026-11-05", paidWith: "transfer" as const };
  await record.run({
    ...day,
    vendor: "Market",
    amount: 100000,
    category: "Food & drink stock",
    business: "lounge",
  });
  await record.run({
    ...day,
    vendor: "Buyer",
    amount: 20000,
    category: "Manager float (not itemised)",
    business: "lounge",
  });
  await record.run({
    ...day,
    vendor: "Fuel",
    amount: 40000,
    category: "Diesel / power",
    business: "lounge",
  });
});

await check("a day's expenses leave out stock bought", async () => {
  const r = await asOwner(() => reconcileDay.run({ day: "2026-11-05" }));
  assert.equal(r.expenses, 4000000);
  assert.equal(r.expensesByBusiness.lounge, 4000000);
  assert.equal(r.stockBought, 12000000);
});

await check("net takes off operating expenses, not stock", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "weekly",
      start: "2026-11-02",
      end: "2026-11-08",
    }),
  );
  assert.equal(figures.combined.expenses, 4000000);
  assert.equal(figures.combined.net, figures.combined.grossProfit - 4000000);
  assert.equal(figures.stockBought, 12000000);
  assert.match(
    renderWhatsApp(figures, "https://books.test/r"),
    /stock bought/i,
  );
});

await finish();
