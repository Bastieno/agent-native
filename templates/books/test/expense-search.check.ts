import assert from "node:assert/strict";
import { bootBooks, check, finish } from "./helpers.js";

// Money out search (the owner's ask, 2026-11-24): an entry's code finds it
// whatever period is showing; words find entries in the period by who was
// paid or what it was for.
const { asOwner } = await bootBooks("check-expense-search");
const record = (await import("../actions/record-expense.js")).default;
const listExpenses = (await import("../actions/list-expenses.js")).default;

const base = { paidWith: "transfer" as const, business: "lounge" as const };
const goats = (await asOwner(() =>
  record.run({
    ...base,
    occurredOn: "2026-01-04",
    vendor: "HALIMA ABENI SULE",
    amount: 145000,
    note: "Payment for 2 goats",
    category: "Food & drink stock",
  }),
)) as { code: string };
await asOwner(() =>
  record.run({
    ...base,
    occurredOn: "2026-11-05",
    vendor: "ACORN TRADING",
    amount: 92300,
    note: "1 origin, 1 Heineken",
    category: "Food & drink stock",
  }),
);
await asOwner(() =>
  record.run({
    ...base,
    occurredOn: "2026-11-06",
    vendor: "JUST RITE LIMITED",
    amount: 5000,
    note: "For goat meat",
    category: "Food & drink stock",
  }),
);

const november = { start: "2026-11-01", end: "2026-11-30" };
const codes = async (q: string) =>
  (await asOwner(() => listExpenses.run({ ...november, q }))).expenses.map(
    (e) => e.code,
  );

await check("a code finds its entry outside the period showing", async () => {
  assert.deepEqual(await codes(goats.code), [goats.code]);
  assert.deepEqual(await codes(goats.code.toLowerCase()), [goats.code]);
  const n = goats.code.replace("E-", "");
  assert.deepEqual(await codes(n), [goats.code]);
  assert.deepEqual(await codes(`E ${n}`), [goats.code]);
  assert.deepEqual(await codes("E-99999"), []);
});

await check("words find entries in the period by payee or note", async () => {
  assert.equal((await codes("acorn")).length, 1);
  assert.equal((await codes("heineken")).length, 1);
  // The goats entry is in January, outside November.
  assert.equal((await codes("goat")).length, 1);
  assert.equal((await codes("nothing like this")).length, 0);
});

await finish();
