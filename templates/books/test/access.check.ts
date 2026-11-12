import assert from "node:assert/strict";
import { check, freshDatabase } from "./helpers.js";

freshDatabase("check-access");
const { runWithRequestContext } = await import("@agent-native/core/server");
const { getDbExec } = await import("@agent-native/core/db");
const { migrateForChecks } = await import("../server/db/migrate.js");
const { assertOwner, OWNER_ONLY } = await import("../server/lib/access.js");
const { ensureBooksSetup } = await import("../server/lib/setup.js");

await migrateForChecks();
const exec = getDbExec();
await exec.execute({
  sql: `CREATE TABLE IF NOT EXISTS org_members (id TEXT PRIMARY KEY, org_id TEXT NOT NULL, email TEXT NOT NULL, role TEXT NOT NULL, joined_at INTEGER)`,
  args: [],
});
await exec.execute({
  sql: `INSERT INTO org_members (id, org_id, email, role, joined_at) VALUES ('m1','org1','owner@x.test','owner',0), ('m2','org1','partner@x.test','member',0)`,
  args: [],
});

await check("member refused", async () => {
  await assert.rejects(
    () =>
      runWithRequestContext(
        { userEmail: "partner@x.test", orgId: "org1" },
        () => assertOwner(),
      ) as Promise<void>,
    { message: OWNER_ONLY },
  );
  assert.equal(OWNER_ONLY, "Only the owner can change Books.");
});
await check("owner allowed", async () => {
  await runWithRequestContext(
    { userEmail: "owner@x.test", orgId: "org1" },
    () => assertOwner(),
  );
});
await check("setup seeds once", async () => {
  await ensureBooksSetup("org1");
  await ensureBooksSetup("org1");
  const b = await exec.execute({
    sql: `SELECT slug FROM businesses WHERE org_id='org1' ORDER BY slug`,
    args: [],
  });
  assert.deepEqual(
    b.rows.map((r: any) => r.slug),
    ["hub", "lounge"],
  );
  const c = await exec.execute({
    sql: `SELECT name, business_id FROM item_categories WHERE org_id='org1' ORDER BY name`,
    args: [],
  });
  assert.deepEqual(
    c.rows.map((r: any) => r.name),
    ["Drinks", "Meals", "Shawarma", "Subscription", "Water"],
  );
  const e = await exec.execute({
    sql: `SELECT COUNT(*) AS n FROM expense_categories WHERE org_id='org1'`,
    args: [],
  });
  assert.equal(Number((e.rows[0] as any).n), 8);
});
