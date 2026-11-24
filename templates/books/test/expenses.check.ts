import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

const { asOwner, asPartner, query } = await bootBooks("check-expenses");
const record = (await import("../actions/record-expense.js")).default;
const fromReceipt = (await import("../actions/record-expense-from-receipt.js"))
  .default;
const update = (await import("../actions/update-expense.js")).default;
const list = (await import("../actions/list-expenses.js")).default;
const reconcileDay = (await import("../actions/reconcile-day.js")).default;

const diesel = {
  occurredOn: "2026-11-09",
  vendor: "Total Ikeja",
  amount: 45000,
  business: "hub" as const,
  category: "Diesel / power",
  paidWith: "cash" as const,
};
const png = Buffer.from("fake receipt image").toString("base64");

await check("sequence codes", async () => {
  const a = await asOwner(() => record.run(diesel));
  const b = await asOwner(() =>
    record.run({
      ...diesel,
      vendor: "Gateman",
      amount: 5000,
      category: "Salaries",
    }),
  );
  assert.equal(a.code, "E-1");
  assert.equal(b.code, "E-2");
  assert.equal(a.status, "confirmed");
});
await check("duplicate by vendor/amount/date blocked", async () => {
  const r = await asOwner(() =>
    record.run({ ...diesel, vendor: " total ikeja " }),
  );
  assert.equal(r.duplicateOf, "E-1");
  assert.equal(r.code, undefined);
  assert.equal((await query(`SELECT id FROM expenses`)).length, 2);
});
await check("confirmDuplicate saves", async () => {
  const r = await asOwner(() =>
    record.run({ ...diesel, confirmDuplicate: true }),
  );
  assert.equal(r.code, "E-3");
});
await check("not confident needs review", async () => {
  const r = await asOwner(() =>
    fromReceipt.run({
      ...diesel,
      vendor: "Shoprite",
      amount: 12000,
      receipt: { mimeType: "image/jpeg", dataBase64: png },
      confident: false,
    }),
  );
  assert.equal(r.status, "needs_review");
  const [row] = await query(
    `SELECT receipt_file_id, image_hash, source FROM expenses WHERE code = ?`,
    [r.code],
  );
  assert.ok(row.receipt_file_id);
  assert.match(row.image_hash, /^[0-9a-f]{64}$/);
  assert.equal(row.source, "whatsapp");
});
await check("duplicate by hash blocked", async () => {
  const r = await asOwner(() =>
    fromReceipt.run({
      ...diesel,
      vendor: "Other",
      amount: 1,
      receipt: { mimeType: "image/jpeg", dataBase64: png },
      confident: true,
    }),
  );
  assert.equal(r.duplicateOf, "E-4");
});
await check("update and reconcile", async () => {
  await asOwner(() =>
    update.run({
      code: "E-4",
      business: "lounge",
      category: "Food & drink stock",
      status: "confirmed",
    }),
  );
  const r = await asOwner(() => reconcileDay.run({ day: "2026-11-09" }));
  // Food & drink stock is already in cost of goods: shown apart, not an expense.
  assert.equal(r.expensesByBusiness.lounge, undefined);
  assert.equal(r.stockBought, 1200000);
  assert.equal(r.expenses, 4500000 + 500000 + 4500000);
});
await check("list for a range", async () => {
  const r = await asPartner(() =>
    list.run({ start: "2026-11-01", end: "2026-11-30" }),
  );
  assert.equal(r.expenses.length, 4);
  assert.equal(r.expenses[0].code, "E-4", "newest first");
  const e1 = r.expenses.find((e: any) => e.code === "E-1");
  assert.equal(e1.amount, 4500000);
  assert.equal(e1.business, "hub");
  assert.equal(e1.category, "Diesel / power");
});
await check("unknown category refused", async () => {
  await assert.rejects(
    () =>
      asOwner(() =>
        record.run({ ...diesel, vendor: "X", category: "Holidays" }),
      ),
    /Unknown expense category: Holidays/,
  );
});
await check("partner cannot record", async () => {
  await assert.rejects(
    () => asPartner(() => record.run({ ...diesel, vendor: "Y" })),
    /Only the owner can change Books\./,
  );
});
await check("owner's pay and money moved belong to no business", async () => {
  const { code } = await asOwner(() =>
    record.run({ ...diesel, vendor: "Owner", amount: 7000 }),
  );
  // Changing the category to Owner's pay takes the business away…
  await asOwner(() => update.run({ code, category: "Owner's pay" }));
  const [a] = await query(`SELECT business_id FROM expenses WHERE code = ?`, [
    code,
  ]);
  assert.equal(a.business_id, null);
  // …and a business sent with it is ignored.
  await asOwner(() =>
    update.run({ code, category: "Loans & repayments", business: "lounge" }),
  );
  const [b] = await query(`SELECT business_id FROM expenses WHERE code = ?`, [
    code,
  ]);
  assert.equal(b.business_id, null);
  // Recorded straight under Owner's pay, it has no business either.
  const made = await asOwner(() =>
    record.run({
      ...diesel,
      vendor: "Owner 2",
      amount: 8000,
      category: "Owner's pay",
    }),
  );
  const [c] = await query(`SELECT business_id FROM expenses WHERE code = ?`, [
    made.code,
  ]);
  assert.equal(c.business_id, null);
});

await check("settings say which categories have no business", async () => {
  const settings = (await import("../actions/get-settings.js")).default;
  const s = await asOwner(() => settings.run({}));
  assert.ok(s.noBusinessCategories.includes("Owner's pay"));
  assert.ok(s.noBusinessCategories.includes("Loans & repayments"));
  assert.ok(!s.noBusinessCategories.includes("Salaries"));
});

await check("an expense can't be confirmed before it is filed", async () => {
  const { code } = await asOwner(() =>
    record.run({ ...diesel, vendor: "Unfiled", amount: 3100 }),
  );
  // Back to waiting, with no category and no business.
  await query(
    `UPDATE expenses SET status = 'needs_review', category_id = NULL, business_id = NULL WHERE code = ?`,
    [code],
  );
  await assert.rejects(
    () => asOwner(() => update.run({ code, status: "confirmed" })),
    /category/i,
  );
  // A category that needs a business, without one: still refused.
  await asOwner(() => update.run({ code, category: "Supplies" }));
  await assert.rejects(
    () => asOwner(() => update.run({ code, status: "confirmed" })),
    /Lounge, the Hub or both/,
  );
  // Filed in one go with the confirm: accepted.
  await asOwner(() =>
    update.run({ code, business: "lounge", status: "confirmed" }),
  );
  const [e] = await query(`SELECT status FROM expenses WHERE code = ?`, [code]);
  assert.equal(e.status, "confirmed");
});

await check("owner's pay is confirmed without a business", async () => {
  const { code } = await asOwner(() =>
    record.run({ ...diesel, vendor: "Own", amount: 3200 }),
  );
  await query(`UPDATE expenses SET status = 'needs_review' WHERE code = ?`, [
    code,
  ]);
  await asOwner(() =>
    update.run({ code, category: "Owner's pay", status: "confirmed" }),
  );
  const [e] = await query(
    `SELECT status, business_id FROM expenses WHERE code = ?`,
    [code],
  );
  assert.deepEqual([e.status, e.business_id], ["confirmed", null]);
});

await check("a group with no category can't be confirmed", async () => {
  const confirm = (await import("../actions/confirm-expenses.js")).default;
  await assert.rejects(
    () =>
      asOwner(() => confirm.run({ group: { category: null, business: null } })),
    /category/i,
  );
});

await finish();
