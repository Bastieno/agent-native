import assert from "node:assert/strict";
import { bootBooks, check, finish, ORG } from "./helpers.js";

const { query } = await bootBooks("check-duplicates");
const { ensureBooksSetup } = await import("../server/lib/setup.js");
const { businessIdBySlug } = await import("../server/lib/catalog.js");

await check(
  "set-up run twice at once makes one Lounge and one Hub",
  async () => {
    const other = "org-race";
    await Promise.all([ensureBooksSetup(other), ensureBooksSetup(other)]);
    const rows = await query(
      `SELECT slug, COUNT(*) AS n FROM businesses WHERE org_id = ? GROUP BY slug ORDER BY slug`,
      [other],
    );
    assert.deepEqual(
      rows.map((r: any) => [r.slug, Number(r.n)]),
      [
        ["both", 1],
        ["hub", 1],
        ["lounge", 1],
      ],
    );
  },
);

await check(
  "with two rows for one business, the earliest is always used",
  async () => {
    // A duplicate an old race left behind, dated before the row seeded now.
    await query(
      `INSERT INTO businesses (id, name, slug, created_at, org_id, visibility) VALUES ('aaa-earliest', 'Hub', 'hub', '2000-01-01T00:00:00.000Z', ?, 'org')`,
      [ORG],
    );
    for (let i = 0; i < 3; i++)
      assert.equal(await businessIdBySlug(ORG, "hub"), "aaa-earliest");
  },
);

await finish();
