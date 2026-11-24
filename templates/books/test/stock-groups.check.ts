import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture } from "./helpers.js";

// Stock bought set against sales for each lounge menu group over a period
// (the owner's answers, 2026-11-24).
const { asOwner, asPartner } = await bootBooks("check-stock-groups");
const importFile = (await import("../server/lib/import-file.js"))
  .importMoniebookFile;
const record = (await import("../actions/record-expense.js")).default;
const getGroups = (await import("../actions/get-stock-groups.js")).default;
const setSplit = (await import("../actions/set-stock-split.js")).default;
const listExpenses = (await import("../actions/list-expenses.js")).default;
const listSales = (await import("../actions/list-sales.js")).default;

const period = { start: "2026-11-01", end: "2026-11-10" };
const day = {
  occurredOn: "2026-11-05",
  paidWith: "transfer" as const,
  business: "lounge" as const,
};
let mixed = "";
let float = "";
await asOwner(async () => {
  await importFile("org1", fixture("sales-sample.csv"), {
    fileName: "sales-summary2026-11-10-2026-11-01.csv",
    receivedVia: "upload",
  });
  await importFile("org1", fixture("item-sample.csv"), {
    fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
    receivedVia: "upload",
  });
  await record.run({
    ...day,
    vendor: "Market",
    amount: 55600,
    category: "Food & drink stock",
    note: "SHAWARMA\nBama: 12.6k\nKetchup: 15k\nChicken fillet: 15k\nCabbage: 4k\nCarrot: 2k\nShawarma bread: 3k\nNylon: 3k\nTf: 1k",
  });
  mixed = (
    (await record.run({
      ...day,
      vendor: "Market 2",
      amount: 64700,
      category: "Food & drink stock",
      note: "48k chicken, 13.7k chips, 3k shawarma bread",
    })) as { code: string }
  ).code;
  float = (
    (await record.run({
      ...day,
      vendor: "Buyer",
      amount: 20000,
      category: "Manager float (not itemised)",
    })) as { code: string }
  ).code;
  await record.run({
    ...day,
    vendor: "Total",
    amount: 40000,
    category: "Diesel / power",
    business: "hub",
  });
});

const group = (r: Awaited<ReturnType<typeof getGroups.run>>, id: string) =>
  r.groups.find((g) => g.group === id)!;

await check("stock bought is counted for each group", async () => {
  const r = await asOwner(() => getGroups.run(period));
  assert.equal(group(r, "shawarma").bought, 5160000 + 300000);
  assert.equal(group(r, "meals").bought, 6170000);
  assert.equal(r.shared.bought, 400000);
  assert.equal(r.unsorted.bought, 2000000);
  assert.equal(r.unsorted.count, 1);
  // Diesel is not stock.
  const all =
    r.groups.reduce((a, g) => a + g.bought, 0) +
    r.shared.bought +
    r.unsorted.bought;
  assert.equal(all, 5560000 + 6470000 + 2000000);
});

await check("lounge sales are shared out among the groups", async () => {
  const r = await asOwner(() => getGroups.run(period));
  const sales = await asOwner(() => listSales.run(period));
  assert.equal(
    r.groups.reduce((a, g) => a + g.sales, 0),
    sales.byBusiness.lounge,
  );
  const s = group(r, "shawarma");
  assert.ok(s.sales > 0);
  assert.equal(s.difference, s.sales - s.bought);
  assert.ok(group(r, "beer").sales > 0);
  assert.ok(group(r, "water").sales > 0);
});

await check(
  "Money out lists one group's purchases, with their split",
  async () => {
    const r = await asOwner(() =>
      listExpenses.run({ ...period, stockGroup: "unsorted" }),
    );
    assert.deepEqual(
      r.expenses.map((e) => e.code),
      [float],
    );
    const m = await asOwner(() =>
      listExpenses.run({ ...period, stockGroup: "shawarma" }),
    );
    // The total is what of these purchases went to Shawarma.
    assert.equal(m.stockTotal, 5160000 + 300000);
    const e = m.expenses.find((x) => x.code === mixed)!;
    assert.deepEqual(e.stockSplit?.parts, [
      { group: "meals", amount: 6170000 },
      { group: "shawarma", amount: 300000 },
    ]);
  },
);

await check("the owner can file a purchase under a group", async () => {
  await asOwner(() => setSplit.run({ code: float, group: "beer" }));
  let r = await asOwner(() => getGroups.run(period));
  assert.equal(r.unsorted.bought, 0);
  assert.equal(group(r, "beer").bought, 2000000);
  await asOwner(() =>
    setSplit.run({
      code: float,
      parts: [
        { group: "beer", amount: 15000 },
        { group: "soft", amount: 5000 },
      ],
    }),
  );
  r = await asOwner(() => getGroups.run(period));
  assert.equal(group(r, "beer").bought, 1500000);
  assert.equal(group(r, "soft").bought, 500000);
  await assert.rejects(
    asOwner(() =>
      setSplit.run({ code: float, parts: [{ group: "beer", amount: 1000 }] }),
    ),
    /add up/i,
  );
  // Back to what the note says.
  await asOwner(() => setSplit.run({ code: float, parts: [] }));
  r = await asOwner(() => getGroups.run(period));
  assert.equal(r.unsorted.bought, 2000000);
});

await check(
  "a mixed drinks list is split by Moniebook cost prices",
  async () => {
    const { code } = (await asOwner(() =>
      record.run({
        ...day,
        occurredOn: "2026-11-07",
        vendor: "Drinks depot",
        amount: 50000,
        category: "Food & drink stock",
        note: "2 crates origin beer, 2 packs coke",
      }),
    )) as { code: string };
    const r = await asOwner(() =>
      listExpenses.run({ start: "2026-11-07", end: "2026-11-07" }),
    );
    const e = r.expenses.find((x) => x.code === code)!;
    assert.equal(e.stockSplit?.estimated, true);
    assert.deepEqual(
      e.stockSplit?.parts.map((p) => p.group),
      ["soft", "beer"],
    );
    assert.equal(
      e.stockSplit!.parts.reduce((a, p) => a + p.amount, 0),
      5000000,
    );
  },
);

await check("only stock purchases have a group", async () => {
  const hub = (
    await asOwner(() =>
      listExpenses.run({ ...period, category: "Diesel / power" }),
    )
  ).expenses[0];
  assert.equal(hub.stockSplit, null);
  await assert.rejects(
    asOwner(() => setSplit.run({ code: hub.code, group: "beer" })),
    /not a stock purchase/i,
  );
});

await check("the partner sees the groups but cannot change them", async () => {
  const r = await asPartner(() => getGroups.run(period));
  assert.ok(r.groups.length === 8);
  await assert.rejects(
    asPartner(() => setSplit.run({ code: float, group: "beer" })),
  );
});

await finish();
