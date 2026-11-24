import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

// Costs both businesses share (the owner's answer, 2026-11-24): taxes and
// levies, waste disposal and electricity tokens are split half each between
// the Lounge and the Hub.
const { asOwner } = await bootBooks("check-shared-costs");
const record = (await import("../actions/record-expense.js")).default;
const update = (await import("../actions/update-expense.js")).default;
const reconcileDay = (await import("../actions/reconcile-day.js")).default;
const listExpenses = (await import("../actions/list-expenses.js")).default;
const { guessExpense } = await import("../server/lib/expense-guess.js");
const { parseNarration } = await import("../shared/narration.js");

const day = "2026-11-05";
const land = (await asOwner(() =>
  record.run({
    occurredOn: day,
    vendor: "OYSG Land Use Charge",
    amount: 100000.01,
    category: "Taxes & levies",
    business: "both",
    paidWith: "transfer",
  }),
)) as { code: string };
const gas = (await asOwner(() =>
  record.run({
    occurredOn: day,
    vendor: "Total",
    amount: 40000,
    category: "Diesel / power",
    business: "hub",
    paidWith: "transfer",
  }),
)) as { code: string };

await check("a cost for both counts half to each business", async () => {
  const r = await asOwner(() => reconcileDay.run({ day }));
  // ₦100,000.01: the odd kobo goes to the Lounge.
  assert.equal(r.expensesByBusiness.lounge, 5000001);
  assert.equal(r.expensesByBusiness.hub, 5000000 + 4000000);
  assert.equal(r.expensesByBusiness.both, undefined);
});

await check("an entry can be moved to both, and is shown so", async () => {
  await asOwner(() => update.run({ code: gas.code, business: "both" }));
  const r = await asOwner(() => reconcileDay.run({ day }));
  assert.equal(r.expensesByBusiness.lounge, 7000001);
  assert.equal(r.expensesByBusiness.hub, 7000000);
  const list = await asOwner(() =>
    listExpenses.run({ start: day, end: day, business: "both" }),
  );
  assert.deepEqual(
    list.expenses.map((e) => e.code).sort(),
    [gas.code, land.code].sort(),
  );
  await asOwner(() => update.run({ code: gas.code, status: "confirmed" }));
});

await check("taxes, waste and electricity tokens are guessed as both", () => {
  assert.equal(guessExpense("Land use charge 2026").business, "both");
  assert.equal(guessExpense("For waste disposal").business, "both");
  assert.equal(guessExpense("For light token").business, "both");
  assert.equal(guessExpense("Electricity token").business, "both");
  // Diesel and the generator stay the Hub's.
  assert.equal(guessExpense("For diesel").business, "hub");
});

await check("the narration can say BOTH, and TAX is both unless told", () => {
  assert.equal(parseNarration("BOTH SERVICE waste disposal")?.business, "both");
  assert.equal(parseNarration("TAX land use charge")?.business, "both");
  assert.equal(parseNarration("HUB TAX signage permit")?.business, "hub");
});

await finish();
