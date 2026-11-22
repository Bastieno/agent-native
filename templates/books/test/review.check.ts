import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

const { asOwner, asPartner, query } = await bootBooks("check-review");
const record = (await import("../actions/record-expense.js")).default;
const update = (await import("../actions/update-expense.js")).default;
const listReview = (await import("../actions/list-review.js")).default;
const confirm = (await import("../actions/confirm-expenses.js")).default;
const listExpenses = (await import("../actions/list-expenses.js")).default;
const overview = (await import("../actions/get-overview.js")).default;
const { expenseNote } = await import("../server/lib/expense-note.js");

const base = {
  occurredOn: "2026-11-09",
  amount: 5000,
  paidWith: "transfer" as const,
};
// Three imported slips waiting for review: two diesel (Lounge), one salary.
for (const [vendor, category, note, amount] of [
  ["A", "Diesel / power", "For fuel", 5000],
  ["B", "Diesel / power", "For light token", 7000],
  ["C", "Salaries", "June Salary", 40000],
] as const) {
  const { code } = await asOwner(() =>
    record.run({ ...base, vendor, category, amount, business: "lounge" }),
  );
  await asOwner(() => update.run({ code, status: "needs_review" }));
  await query(`UPDATE expenses SET raw_text = ? WHERE code = ?`, [
    `${note} · Paid from Moniepoint (lounge)`,
    code,
  ]);
}

await check("the note is what the slip says it was for", () => {
  assert.equal(
    expenseNote("Гor business Provider Reterence 1234 · Paid from Opay"),
    "For business",
  );
  assert.equal(
    expenseNote("5 packs of chicken · Paid from Opay"),
    "5 packs of chicken",
  );
  assert.equal(expenseNote(null), null);
  // A slip with no note keeps only where it was paid from: there is no note.
  assert.equal(expenseNote("Paid from Moniepoint (main)"), null);
  // Text recognition reads a 5 before a count word as S.
  assert.equal(
    expenseNote("S packs sausages · Paid from Moniepoint (lounge)"),
    "5 packs sausages",
  );
  assert.equal(
    expenseNote("2 crates, S bottles of water"),
    "2 crates, 5 bottles of water",
  );
  assert.equal(expenseNote("Pay S Ade for cleaning"), "Pay S Ade for cleaning");
});

await check(
  "waiting expenses come grouped by category and business",
  async () => {
    const r = await asOwner(() => listReview.run({}));
    assert.equal(r.expensesWaiting, 3);
    const diesel = r.expenseGroups.find((g) => g.category === "Diesel / power");
    assert.ok(diesel);
    assert.equal(diesel.count, 2);
    assert.equal(diesel.total, 1200000);
    assert.equal(diesel.business, "lounge");
    assert.deepEqual(diesel.examples.sort(), ["For fuel", "For light token"]);
  },
);

await check("the partner can't confirm a group", async () => {
  await assert.rejects(() =>
    asPartner(() =>
      confirm.run({
        group: { category: "Diesel / power", business: "lounge" },
      }),
    ),
  );
});

await check("confirming a group confirms only that group", async () => {
  const r = await asOwner(() =>
    confirm.run({ group: { category: "Diesel / power", business: "lounge" } }),
  );
  assert.equal(r.confirmed, 2);
  const after = await asOwner(() => listReview.run({}));
  assert.equal(after.expensesWaiting, 1);
  assert.equal(after.expenseGroups[0].category, "Salaries");
});

await check("expenses filter by category and carry their note", async () => {
  const r = await asOwner(() =>
    listExpenses.run({
      start: "2026-11-01",
      end: "2026-11-30",
      category: "Salaries",
    }),
  );
  assert.equal(r.expenses.length, 1);
  assert.equal(r.expenses[0].note, "June Salary");
});

await check(
  "the overview gives a period's figures, by day, with the review count",
  async () => {
    const r = await asOwner(() =>
      overview.run({ start: "2026-11-01", end: "2026-11-30" }),
    );
    assert.equal(r.daily.length, 30);
    assert.equal(r.businesses.length, 2);
    assert.equal(r.combined.expenses, 5200000);
    assert.equal(r.previous.start, "2026-10-02");
    assert.equal(r.previous.end, "2026-10-31");
    assert.equal(r.reviewCount, 1);
    assert.equal(r.latestDay, null);
  },
);

await check(
  "the owner can correct what an expense was for and who was paid",
  async () => {
    const { expenses } = await asOwner(() =>
      listExpenses.run({
        start: "2026-11-01",
        end: "2026-11-30",
        category: "Salaries",
      }),
    );
    const code = expenses[0].code;
    await asOwner(() =>
      update.run({ code, note: "Gateman November salary", vendor: "Gateman" }),
    );
    const [row] = await query(
      `SELECT raw_text, vendor FROM expenses WHERE code = ?`,
      [code],
    );
    // The account it was paid from is kept.
    assert.equal(
      row.raw_text,
      "Gateman November salary · Paid from Moniepoint (lounge) · written by the owner",
    );
    assert.equal(row.vendor, "Gateman");
    const after = await asOwner(() =>
      listExpenses.run({
        start: "2026-11-01",
        end: "2026-11-30",
        category: "Salaries",
      }),
    );
    assert.equal(after.expenses[0].note, "Gateman November salary");
  },
);

await check("a note can be added to a slip that had none", async () => {
  await query(
    `UPDATE expenses SET raw_text = 'Paid from Opay' WHERE vendor = 'Gateman'`,
  );
  const [{ code }] = await query(
    `SELECT code FROM expenses WHERE vendor = 'Gateman'`,
  );
  await asOwner(() => update.run({ code, note: "Overtime" }));
  const [row] = await query(`SELECT raw_text FROM expenses WHERE code = ?`, [
    code,
  ]);
  assert.equal(
    row.raw_text,
    "Overtime · Paid from Opay · written by the owner",
  );
});

await check(
  "the owner's words are shown as written, a slip's reading corrected",
  async () => {
    assert.equal(
      expenseNote("10 packs waler\n2 packs coke · Paid from Opay"),
      "10 packs water\n2 packs coke",
    );
    assert.equal(
      expenseNote("Gift for Waler · Paid from Opay · written by the owner"),
      "Gift for Waler",
    );
  },
);

await check("the partner can't change a note", async () => {
  const [{ code }] = await query(
    `SELECT code FROM expenses WHERE vendor = 'Gateman'`,
  );
  await assert.rejects(() => asPartner(() => update.run({ code, note: "x" })));
});

await finish();
