import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

// The owner's answers about where money goes (2026-11-23).
const { asOwner, query } = await bootBooks("check-owner-answers");
const { guessExpense } = await import("../server/lib/expense-guess.js");
const { parseNarration } = await import("../shared/narration.js");
const { reconcileDay } = await import("../server/lib/reconcile.js");
const { DEFAULT_THRESHOLDS } = await import("../server/lib/setup.js");
const record = (await import("../actions/record-expense.js")).default;
const update = (await import("../actions/update-expense.js")).default;
const setStaff = (await import("../actions/set-staff-business.js")).default;
const listStaff = (await import("../actions/list-staff.js")).default;

const g = (note: string) => {
  const r = guessExpense(note);
  return [r.category, r.business];
};

await check("diesel, power and repairs are the Hub's", () => {
  assert.deepEqual(g("For Fuel"), ["Diesel / power", "hub"]);
  assert.deepEqual(g("For electricity token"), ["Diesel / power", "hub"]);
  assert.deepEqual(g("Balance for Car Fix"), ["Repairs", "hub"]);
  assert.deepEqual(parseNarration("DIESEL 40 litres")?.business, "hub");
  assert.deepEqual(parseNarration("REPAIR door lock")?.business, "hub");
  // Written as the Lounge's, it stays the Lounge's.
  assert.deepEqual(parseNarration("LOUNGE REPAIR sink")?.business, "lounge");
});

await check(
  "gifts, condolences, data and delegate fees are the owner's",
  () => {
    for (const note of [
      "Birthday gift for Henry",
      "Gift to Lois",
      "Condolences",
      "For data",
      "Delegale fee",
    ])
      assert.deepEqual(g(note), ["Owner's pay", null], note);
  },
);

await check("refunds to customers are their own category", () => {
  assert.deepEqual(g("Refund for half-month hub subscription"), [
    "Refunds to customers",
    "hub",
  ]);
  assert.equal(g("Partial refund on paid 50k")[0], "Refunds to customers");
  assert.deepEqual(g("Refund on Hub usage"), ["Refunds to customers", "hub"]);
  // Paying someone back for stock they bought is that stock, not a refund.
  assert.notEqual(g("Refund for mayonnaise")[0], "Refunds to customers");
  assert.notEqual(g("Refund on drinks")[0], "Refunds to customers");
  assert.notEqual(g("Refund")[0], "Refunds to customers");
  // Money refunded to the business is not a customer refund.
  assert.notEqual(
    g("Refund on expenses made for the court")[0],
    "Refunds to customers",
  );
});

await check("DSTV is the Lounge's TV, and its repairs the Lounge's too", () => {
  assert.deepEqual(g("DSTV subscription"), ["TV & subscriptions", "lounge"]);
  assert.deepEqual(g("Dsiv subscriplion"), ["TV & subscriptions", "lounge"]);
  assert.deepEqual(g("DSTV Compact Plus"), ["TV & subscriptions", "lounge"]);
  assert.deepEqual(g("DSTV fix"), ["Repairs", "lounge"]);
  assert.deepEqual(g("dsiv fix - 18k decoder, 7k workmanship"), [
    "Repairs",
    "lounge",
  ]);
});

await check("work someone did for a business is Services", () => {
  for (const note of [
    "Payment for photographer",
    "For cleaner",
    "Consultant fee",
    "Accountant for October",
    "Service rendered",
  ])
    assert.equal(g(note)[0], "Services", note);
  // Cleaning products are still supplies; fixing things is still repairs.
  assert.equal(g("5k for cleaning")[0], "Supplies");
  assert.equal(g("For welding work")[0], "Repairs");
  assert.deepEqual(
    parseNarration("HUB SERVICE cleaning")?.category,
    "Services",
  );
  assert.deepEqual(parseNarration("HUB SERVICE cleaning")?.business, "hub");
});

await check("Canal+ is the Hub's internet", () => {
  assert.deepEqual(g("For canal box subscription"), ["Internet", "hub"]);
});

await check("waste collection is a levy", () => {
  assert.equal(g("For refuse collection month of August")[0], "Taxes & levies");
  assert.equal(g("Waste collection bill")[0], "Taxes & levies");
});

await check("a refund comes off that business's income, not its costs", () => {
  const r = reconcileDay({
    day: "2026-11-09",
    sales: [],
    events: [],
    expenses: [
      {
        id: "x1",
        amount: 2_000_000,
        paidWith: "transfer",
        categoryId: "c-refund",
        businessSlug: "hub",
        status: "confirmed",
        vendor: "A customer",
        occurredOn: "2026-11-09",
        imageHash: null,
        isCost: false,
        isRefund: true,
      },
    ],
    categoryHistory: {},
    paymentReport: null,
    thresholds: DEFAULT_THRESHOLDS,
  });
  assert.equal(r.incomeByBusiness.hub, -2_000_000);
  assert.equal(r.grossProfitByBusiness.hub, -2_000_000);
  assert.equal(r.income, -2_000_000);
  assert.equal(r.expenses, 0);
  assert.equal(r.notCosts, 0);
});

await check("a salary goes to the business its person works for", async () => {
  await asOwner(() =>
    setStaff.run({ payee: "Tunde Bello Adeyemi", business: "hub" }),
  );
  await asOwner(() =>
    setStaff.run({ payee: "KEMI ADUNNI OGUN", business: "lounge" }),
  );
  const staff = await asOwner(() => listStaff.run({}));
  assert.deepEqual(staff.staff.map((s) => [s.payee, s.business]).sort(), [
    ["KEMI ADUNNI", "lounge"],
    ["TUNDE BELLO", "hub"],
  ]);
  const base = { occurredOn: "2026-11-05", paidWith: "transfer" as const };
  // Recorded as a salary with the Lounge guessed, it takes the person's business.
  const a = await asOwner(() =>
    record.run({
      ...base,
      vendor: "TUNDE BELLO ADEYEMI 1234567A8B",
      amount: 60000,
      category: "Salaries",
      business: "lounge",
    }),
  );
  const [ra] = await query(
    `SELECT b.slug FROM expenses e JOIN businesses b ON b.id = e.business_id WHERE e.code = ?`,
    [a.code],
  );
  assert.equal(ra.slug, "hub");
  // The same person paid for fuel is not a salary: the Hub because fuel is.
  const fuel = await asOwner(() =>
    record.run({
      ...base,
      vendor: "TUNDE BELLO ADEYEMI",
      amount: 7000,
      category: "Diesel / power",
      business: "lounge",
    }),
  );
  assert.ok(fuel.code);
  // Changing an expense to Salaries picks up the person's business.
  const b = await asOwner(() =>
    record.run({
      ...base,
      vendor: "KEMI ADUNNI OGUN",
      amount: 60001,
      category: "Other",
      business: "hub",
    }),
  );
  await asOwner(() => update.run({ code: b.code, category: "Salaries" }));
  const [rb] = await query(
    `SELECT b.slug FROM expenses e JOIN businesses b ON b.id = e.business_id WHERE e.code = ?`,
    [b.code],
  );
  assert.equal(rb.slug, "lounge");
});

await check("dollar purchases are the owner's pay", async () => {
  // The owner's answer (2026-11-23): dollars pay for the owner's own
  // subscriptions and servers, and never come back to the business.
  assert.equal(
    parseNarration("DOLLAR 200 USD for software")?.category,
    "Owner's pay",
  );
  assert.equal(parseNarration("DOLLAR 200 USD for software")?.business, null);
  const list = (await import("../actions/list-expense-categories.js")).default;
  const { categories } = await asOwner(() => list.run({}));
  assert.equal(categories.includes("Dollar purchases"), false);
});

await finish();
