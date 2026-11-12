import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture } from "./helpers.js";

const { asOwner, query } = await bootBooks("check-reconcile-days");
const importSales = (await import("../actions/import-sales-export.js")).default;
const importItems = (await import("../actions/import-item-report.js")).default;
const reconcileDay = (await import("../actions/reconcile-day.js")).default;
const { storeMoniepointEvent } =
  await import("../server/lib/moniepoint-store.js");

await asOwner(() =>
  importSales.run({
    csv: fixture("sales-sample.csv"),
    fileName: "sales-summary2026-11-10-2026-11-01.csv",
  }),
);
await asOwner(() =>
  importItems.run({
    csv: fixture("item-sample.csv"),
    fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
  }),
);
const ev = (id: string, reference: string, amount: number, at: string) => ({
  webhookId: id,
  type: "V1_TRANSFER_TRANSACTION",
  reference,
  altReference: null,
  amount,
  occurredAt: at,
  payload: "{}",
});

await check("persisted with figures", async () => {
  const listSales = (await import("../actions/list-sales.js")).default;
  const r = await asOwner(() => reconcileDay.run({ day: "2026-11-09" }));
  const s = await asOwner(() =>
    listSales.run({ start: "2026-11-09", end: "2026-11-09" }),
  );
  assert.equal(r.income, s.income);
  assert.deepEqual(r.incomeByBusiness, s.byBusiness);
  assert.equal(
    (await query(`SELECT day FROM reconciliations WHERE day = '2026-11-09'`))
      .length,
    1,
  );
});

await check("late event clears flag", async () => {
  // 10 Nov 22:01 — Bank Transfer ₦4,500, reference 2120251503250616320. One other event that day turns the checks on.
  await storeMoniepointEvent(
    "org1",
    ev("w-a", "2120211878431797248", 300000, "2026-11-10T21:03:00Z"),
  );
  let r = await asOwner(() => reconcileDay.run({ day: "2026-11-10" }));
  assert.ok(
    r.flags.some(
      (f: any) =>
        f.kind === "transfer_missing" && f.reference === "2120251503250616320",
    ),
    "expected the ₦4,500 transfer to be missing",
  );
  await storeMoniepointEvent(
    "org1",
    ev("w-b", "2120251503250616320", 450000, "2026-11-10T21:01:28Z"),
  );
  r = await asOwner(() => reconcileDay.run({ day: "2026-11-10" }));
  assert.ok(
    !r.flags.some(
      (f: any) =>
        f.kind === "transfer_missing" && f.reference === "2120251503250616320",
    ),
  );
});

await check("duplicate webhook stored once", async () => {
  const first = await storeMoniepointEvent(
    "org1",
    ev("w-c", "x", 100, "2026-11-10T10:00:00Z"),
  );
  const again = await storeMoniepointEvent(
    "org1",
    ev("w-c", "x", 100, "2026-11-10T10:00:00Z"),
  );
  assert.equal(first.stored, true);
  assert.equal(again.stored, false);
  assert.equal(
    (await query(`SELECT id FROM moniepoint_events WHERE webhook_id = 'w-c'`))
      .length,
    1,
  );
});

await check("no cost spike without a week of history", async () => {
  const record = (await import("../actions/record-expense.js")).default;
  await asOwner(() =>
    record.run({
      occurredOn: "2026-11-01",
      vendor: "Total",
      amount: 20000,
      business: "hub",
      category: "Diesel / power",
      paidWith: "cash",
    }),
  );
  await asOwner(() =>
    record.run({
      occurredOn: "2026-11-02",
      vendor: "Total",
      amount: 25000,
      business: "hub",
      category: "Diesel / power",
      paidWith: "cash",
    }),
  );
  const r = await asOwner(() => reconcileDay.run({ day: "2026-11-02" }));
  assert.ok(
    !r.flags.some((f: any) => f.kind === "category_spike"),
    "one day of history is not a usual level",
  );
});

await finish();
