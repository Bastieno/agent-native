import assert from "node:assert/strict";
import { bootBooks, check, finish, ORG } from "./helpers.js";

const { asOwner, asPartner, query } = await bootBooks("check-not-costs");
const setup = await import("../server/lib/setup.js");
const record = (await import("../actions/record-expense.js")).default;
const reconcileDay = (await import("../actions/reconcile-day.js")).default;
const buildDigest = (await import("../actions/build-digest.js")).default;
const list = (await import("../actions/list-expenses.js")).default;
const setRule = (await import("../actions/set-payee-rule.js")).default;
const listRules = (await import("../actions/list-payee-rules.js")).default;
const queue = (await import("../actions/queue-history-receipts.js")).default;
const listPending = (await import("../actions/list-pending-receipts.js"))
  .default;
const fromText = (await import("../actions/record-expenses-from-text.js"))
  .default;
const { renderWhatsApp } = await import("../server/lib/digest-render.js");

const day = { occurredOn: "2026-11-09", paidWith: "transfer" as const };

await check("money moved is not a cost category", async () => {
  const rows = await query(
    `SELECT name, is_cost FROM expense_categories WHERE org_id = ?`,
    [ORG],
  );
  const flag = (n: string) =>
    Number(rows.find((r: any) => r.name === n)?.is_cost);
  for (const n of setup.NOT_COSTS) assert.equal(flag(n), 0, n);
  assert.equal(flag("Diesel / power"), 1);
  assert.equal(flag(setup.OWNERS_PAY), 1);
});

await asOwner(async () => {
  await record.run({
    ...day,
    vendor: "Total",
    amount: 45000,
    category: "Diesel / power",
    business: "lounge",
  });
  await record.run({
    ...day,
    vendor: "Partner",
    amount: 5000,
    category: setup.LOANS,
  });
  await record.run({
    ...day,
    vendor: "Mover",
    amount: 3000,
    category: setup.MOVED,
  });
});

await check("a day's expenses leave out money moved", async () => {
  const r = await asOwner(() => reconcileDay.run({ day: "2026-11-09" }));
  assert.equal(r.expenses, 4500000);
  assert.equal(r.expensesByBusiness.lounge, 4500000);
  assert.equal(r.notCosts, 800000);
});

await check("digests show money moved apart from costs", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "range",
      start: "2026-11-09",
      end: "2026-11-09",
    }),
  ).catch(async () =>
    asOwner(() =>
      buildDigest.run({
        period: "weekly",
        start: "2026-11-09",
        end: "2026-11-15",
      }),
    ),
  );
  assert.equal(figures.combined.expenses, 4500000);
  assert.equal(figures.notCosts[setup.LOANS], 500000);
  assert.equal(figures.notCosts[setup.MOVED], 300000);
  assert.match(
    renderWhatsApp(figures, "https://books.test/r"),
    /not counted|moved/i,
  );
});

await check("the expense list marks them", async () => {
  const r = await asPartner(() =>
    list.run({ start: "2026-11-09", end: "2026-11-09" }),
  );
  assert.deepEqual(r.expenses.map((e: any) => [e.vendor, e.isCost]).sort(), [
    ["Mover", false],
    ["Partner", false],
    ["Total", true],
  ]);
});

const slip = (amount: string, who: string, narration: string) => [
  "Moniepoint",
  "DEBIT",
  amount,
  "Transaction Type",
  "TRANSFER",
  "Beneficiary",
  who,
  "Business Name",
  "ACME LTD",
  "Transaction Date",
  "Wednesday, November 11th, 2026 | 9:05 AM",
  "Narration",
  narration,
];
const receipt = (n: number) => ({
  sentAt: "2026-11-11T09:30:00.000Z",
  note: null,
  fileName: `r${n}.jpg`,
  mimeType: "image/jpeg",
  dataBase64: Buffer.from(`receipt ${n}`).toString("base64"),
});
await asOwner(() => queue.run({ receipts: [1, 2, 3, 4].map(receipt) }));
const ids: string[] = (await asOwner(() => listPending.run({}))).receipts.map(
  (r: any) => r.id,
);

await check("a payee rule applies to big transfers only", async () => {
  await asOwner(() =>
    setRule.run({
      payee: "ADA OKORO",
      category: setup.MOVED,
      minAmount: 200000,
    }),
  );
  const r = await asOwner(() =>
    fromText.run({
      receipts: [
        {
          pendingReceiptId: ids[0],
          lines: slip("N500,000.00", "ADA OKORO 0123456789", "For business"),
        },
        {
          pendingReceiptId: ids[1],
          lines: slip(
            "N5,000.00",
            "ADA OKORO 0123456789",
            "5 packs of chicken",
          ),
        },
      ],
    }),
  );
  assert.equal(r.recorded, 2);
  const rows = await query(
    `SELECT e.amount, c.name FROM expenses e JOIN expense_categories c ON c.id = e.category_id WHERE e.vendor LIKE 'ADA OKORO%' ORDER BY e.amount`,
  );
  assert.deepEqual(
    rows.map((x: any) => x.name),
    ["Food & drink stock", setup.MOVED],
  );
});

await check("rules can be listed and replaced", async () => {
  await asOwner(() =>
    setRule.run({
      payee: "ada okoro",
      category: setup.CLIENT,
      minAmount: 200000,
    }),
  );
  const { rules } = await asOwner(() => listRules.run({}));
  assert.equal(rules.length, 1);
  assert.equal(rules[0].category, setup.CLIENT);
});

await check("a loan slip is recorded as a loan, not left pending", async () => {
  const r = await asOwner(() =>
    fromText.run({
      receipts: [
        {
          pendingReceiptId: ids[2],
          lines: slip("N10,000.00", "ZED ADE 0987654321", "A loan"),
        },
      ],
    }),
  );
  assert.equal(r.recorded, 1);
  assert.equal(r.notExpenses, 0);
  const [e] = await query(
    `SELECT c.name FROM expenses e JOIN expense_categories c ON c.id = e.category_id WHERE e.vendor LIKE 'ZED ADE%'`,
  );
  assert.equal(e.name, setup.LOANS);
});

await check(
  "profit payouts and commissions still wait for the owner",
  async () => {
    const r = await asOwner(() =>
      fromText.run({
        receipts: [
          {
            pendingReceiptId: ids[3],
            lines: slip("N80,000.00", "ZED ADE 0987654321", "Settlement"),
          },
        ],
      }),
    );
    assert.equal(r.notExpenses, 1);
  },
);

await check("the partner can't set rules", async () => {
  const { guardActions } = await import("../server/lib/action-policy.js");
  const g = guardActions({
    "set-payee-rule": setRule,
    "list-payee-rules": listRules,
  } as any);
  await assert.rejects(
    () =>
      asPartner(() =>
        g["set-payee-rule"].run({ payee: "x", category: setup.MOVED }),
      ),
    /Only the owner can change Books\./,
  );
  await asPartner(() => g["list-payee-rules"].run({}));
});

await finish();
