import assert from "node:assert/strict";
import { bootBooks, check, finish, ORG } from "./helpers.js";

const { query } = await bootBooks("check-expense-categories");
const { ensureExpenseCategories, OWNERS_PAY, MANAGER_FLOAT } =
  await import("../server/lib/setup.js");

const names = async () =>
  (
    await query(`SELECT name FROM expense_categories WHERE org_id = ?`, [ORG])
  ).map((r: any) => r.name);

await check("new setups get owner's pay and the manager float", async () => {
  const have = await names();
  assert.ok(have.includes(OWNERS_PAY));
  assert.ok(have.includes(MANAGER_FLOAT));
});
await check(
  "an existing org gains them without losing or doubling any",
  async () => {
    await query(
      `DELETE FROM expense_categories WHERE org_id = ? AND name IN (?, ?)`,
      [ORG, OWNERS_PAY, MANAGER_FLOAT],
    );
    const before = (await names()).length;
    await ensureExpenseCategories(ORG);
    await ensureExpenseCategories(ORG);
    const have = await names();
    assert.equal(have.length, before + 2);
    assert.equal(new Set(have).size, have.length);
  },
);

await check("equipment and taxes have their own categories", async () => {
  const have = await names();
  assert.ok(have.includes("Equipment & furniture"));
  assert.ok(have.includes("Taxes & levies"));
});

await finish();
