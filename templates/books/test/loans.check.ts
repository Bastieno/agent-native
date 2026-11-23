import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

// Loans the owner gives out (the owner's answers, 2026-11-23): every Money out
// entry filed under Loans & repayments is a loan; repayments are recorded on
// it, and its status follows.
const { asOwner, asPartner } = await bootBooks("check-loans");
const setup = await import("../server/lib/setup.js");
const record = (await import("../actions/record-expense.js")).default;
const update = (await import("../actions/update-expense.js")).default;
const listLoans = (await import("../actions/list-loans.js")).default;
const repay = (await import("../actions/record-loan-repayment.js")).default;
const unrepay = (await import("../actions/delete-loan-repayment.js")).default;
const setLoan = (await import("../actions/set-loan-status.js")).default;

const base = { paidWith: "transfer" as const };
const ada = (await asOwner(() =>
  record.run({
    ...base,
    occurredOn: "2026-10-01",
    vendor: "ADA OKORO",
    amount: 50000,
    note: "A loan",
    category: setup.LOANS,
  }),
)) as { code: string };
const ben = (await asOwner(() =>
  record.run({
    ...base,
    occurredOn: "2026-10-05",
    vendor: "BEN EZE",
    amount: 20000,
    note: "Laptop loan",
    category: setup.LOANS,
  }),
)) as { code: string };
await asOwner(() =>
  record.run({
    ...base,
    occurredOn: "2026-10-05",
    vendor: "Total",
    amount: 45000,
    category: "Diesel / power",
    business: "hub",
  }),
);

const loan = async (code: string, status?: "all") =>
  (await asOwner(() => listLoans.run(status ? { status } : {}))).loans.find(
    (l) => l.code === code,
  );

await check("every loan paid out is a loan, outstanding", async () => {
  const r = await asOwner(() => listLoans.run({}));
  assert.deepEqual(
    r.loans.map((l) => l.code).sort(),
    [ada.code, ben.code].sort(),
  );
  const a = r.loans.find((l) => l.code === ada.code)!;
  assert.equal(a.borrower, "ADA OKORO");
  assert.equal(a.amount, 5000000);
  assert.equal(a.repaid, 0);
  assert.equal(a.balance, 5000000);
  assert.equal(a.status, "outstanding");
  assert.equal(a.note, "A loan");
  assert.equal(r.totals.owed, 7000000);
});

await check("a repayment makes it part paid, then paid in full", async () => {
  await asOwner(() =>
    repay.run({ code: ada.code, amount: 20000, paidOn: "2026-10-20" }),
  );
  let a = (await loan(ada.code))!;
  assert.equal(a.status, "part_paid");
  assert.equal(a.repaid, 2000000);
  assert.equal(a.balance, 3000000);
  assert.equal(a.repayments.length, 1);
  await assert.rejects(
    asOwner(() =>
      repay.run({ code: ada.code, amount: 40000, paidOn: "2026-10-21" }),
    ),
    /more than is owed/i,
  );
  await asOwner(() =>
    repay.run({ code: ada.code, full: true, paidOn: "2026-10-22" }),
  );
  a = (await loan(ada.code, "all"))!;
  assert.equal(a.status, "paid");
  assert.equal(a.balance, 0);
  // Paid loans leave the default list, which shows what is still owed.
  assert.equal(await loan(ada.code), undefined);
  const r = await asOwner(() => listLoans.run({}));
  assert.equal(r.totals.owed, 2000000);
});

await check("a repayment entered by mistake can be removed", async () => {
  const a = (await loan(ada.code, "all"))!;
  await asOwner(() => unrepay.run({ id: a.repayments[1].id }));
  const after = (await loan(ada.code))!;
  assert.equal(after.status, "part_paid");
  assert.equal(after.balance, 3000000);
});

await check("a payment that was not a loan given leaves the list", async () => {
  await asOwner(() => setLoan.run({ code: ben.code, notALoan: true }));
  assert.equal(await loan(ben.code), undefined);
  assert.equal((await loan(ben.code, "all"))?.status, "not_a_loan");
  await asOwner(() => setLoan.run({ code: ben.code, notALoan: false }));
  assert.equal((await loan(ben.code))?.status, "outstanding");
});

await check(
  "filed under another category, it is no longer a loan",
  async () => {
    await asOwner(() =>
      update.run({ code: ben.code, category: "Supplies", business: "lounge" }),
    );
    assert.equal(await loan(ben.code, "all"), undefined);
  },
);

await check("the partner sees loans but cannot change them", async () => {
  const r = await asPartner(() => listLoans.run({}));
  assert.ok(r.loans.length >= 1);
  await assert.rejects(
    asPartner(() =>
      repay.run({ code: ada.code, amount: 1000, paidOn: "2026-10-25" }),
    ),
  );
});

await finish();
