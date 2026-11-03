/**
 * Checks for the assistant's credit: the arithmetic, and the ledger against a
 * throwaway SQLite database. Run: npx tsx test/credits.check.ts
 */
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = mkdtempSync(join(tmpdir(), "credits-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.ELLAI_OPERATOR_EMAILS;

const {
  CENTICENTS_PER_CREDIT,
  ccToCredits,
  creditsToCc,
  isLowBalance,
  retailCc,
  staffRequestsLeft,
} = await import("../shared/credits.js");

// ── Arithmetic ──
assert.equal(CENTICENTS_PER_CREDIT, 10);
assert.equal(creditsToCc(1000), 10_000);
assert.equal(ccToCredits(10_000), 1000);
assert.equal(ccToCredits(-500), 0, "an overdrawn balance shows as zero");
// A staff request: $0.027 = 2.7 cents = 270 centicents; at 1.5x = 405 cc = 40 credits.
assert.equal(retailCc(270), 405);
assert.equal(ccToCredits(retailCc(270)), 40);
assert.equal(retailCc(0), 0);
assert.equal(retailCc(1), 2, "rounds up so a school is never undercharged");
assert.equal(staffRequestsLeft(creditsToCc(10_000)), 250);
assert.equal(isLowBalance(creditsToCc(900), creditsToCc(5000), 0), true);
assert.equal(isLowBalance(creditsToCc(4000), creditsToCc(5000), 0), false);
assert.equal(
  isLowBalance(creditsToCc(100), creditsToCc(5000), 60_000),
  true,
  "under 3 days at the recent rate",
);
assert.equal(isLowBalance(0, creditsToCc(5000), 0), false, "out is not low");

// ── Ledger ──
const { getDb } = await import("../server/db/index.js");
const { runSql, rowOf } = await import("../server/lib/raw-sql.js");
const { sql } = await import("drizzle-orm");
getDb();
const credits = await import("../server/lib/credits.js");

for (const stmt of [
  `CREATE TABLE school_billing (school_id TEXT PRIMARY KEY, mode TEXT NOT NULL, margin_bp BIGINT, charged_to TEXT, low_notified_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  `CREATE TABLE school_credit_ledger (id TEXT PRIMARY KEY, school_id TEXT NOT NULL, kind TEXT NOT NULL, amount_cc BIGINT NOT NULL, provider_cost_cc BIGINT, margin_bp BIGINT, usage_from TEXT, usage_to TEXT, payment_ref TEXT, note TEXT, created_by TEXT NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE TABLE credit_top_up_requests (id TEXT PRIMARY KEY, school_id TEXT NOT NULL, requested_by TEXT NOT NULL, credits BIGINT, reference TEXT, note TEXT, status TEXT NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE TABLE token_usage (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_email TEXT, cost_cents_x100 INTEGER, org_id TEXT, created_at INTEGER)`,
]) {
  await runSql(sql.raw(stmt));
}
const use = (org: string, cc: number, ageMs: number) =>
  runSql(
    sql`INSERT INTO token_usage (owner_email, cost_cents_x100, org_id, created_at) VALUES ('a@b.c', ${cc}, ${org}, ${Date.now() - ageMs})`,
  );
const MIN = 60_000;

// A school with no billing row is on its own key: never blocked, never charged.
assert.equal((await credits.creditStatus("none")).mode, "none");
assert.equal(await credits.creditsRunOut("none"), false);
assert.equal(await credits.usesManagedKey("none"), false);

// Managed with no credit is out.
await credits.setBillingMode("s1", "managed", "test");
assert.equal(await credits.usesManagedKey("s1"), true);
assert.equal(await credits.creditsRunOut("s1"), true);

// A grant brings it back, and use before the school was managed is not charged.
await use("s1", 99_999, 10 * MIN); // before the switch? no: after. See below.
// (setBillingMode started the count at "now"; the run above is older, so it is free.)
await credits.grantCredit({
  schoolId: "s1",
  amountCc: creditsToCc(5000),
  paymentRef: "REF-1",
  by: "test",
});
let status = await credits.creditStatus("s1");
assert.equal(
  status.credits,
  5000,
  "usage from before managed mode is not charged",
);
assert.equal(status.out, false);

// Runs now reduce the balance by cost x margin, before any settlement.
await use("s1", 270_000, 0); // $2.70 provider cost -> 405_000 cc = 40,500 credits
assert.equal(
  await credits.creditsRunOut("s1"),
  true,
  "one big run can exhaust it",
);
// Another school's runs never touch this one.
await use("s2", 1_000_000, 0);
await credits.setBillingMode("s2", "byo", "test");
assert.equal((await credits.creditStatus("s2")).out, false);

// Settlement is idempotent and moves cost into the ledger once.
const before = (await credits.creditStatus("s1")).balanceCc;
const now = Date.now() + 5 * MIN;
const first = await credits.settleSchool("s1", now);
const second = await credits.settleSchool("s1", now);
assert.ok(first.settledCc > 0);
assert.equal(
  second.settledCc,
  0,
  "a second settlement of the same window adds nothing",
);
const after = await credits.creditStatus("s1");
assert.equal(
  after.balanceCc,
  before - 0 + 0,
  "settling does not change the balance",
);
const debits = await credits.ledgerFor("s1");
assert.equal(debits.filter((e) => e.kind === "debit").length, 1);
assert.equal(
  debits.find((e) => e.kind === "grant")?.paymentRef,
  "REF-1",
  "the grant keeps its payment reference",
);

// A grant is positive; an adjustment may take credit off.
await assert.rejects(
  credits.grantCredit({ schoolId: "s1", amountCc: -10, by: "t" }),
  /positive/,
);
await credits.grantCredit({
  schoolId: "s1",
  amountCc: creditsToCc(100_000),
  by: "t",
  note: "test",
});
assert.equal((await credits.creditStatus("s1")).out, false);

// Leaving managed settles what was used and stops charging.
await credits.setBillingMode("s1", "byo", "test");
assert.equal(await credits.creditsRunOut("s1"), false);
await use("s1", 5_000_000, 0);
assert.equal((await credits.creditStatus("s1")).mode, "byo");
const kept = (await credits.creditStatus("s1")).credits;
assert.ok(kept > 0, "credit left is kept for if the school comes back");

// The ledger is only ever inserted into.
const { readFileSync } = await import("node:fs");
const src = readFileSync("server/lib/credits.ts", "utf8");
assert.ok(
  !/UPDATE school_credit_ledger|DELETE FROM school_credit_ledger/.test(src),
  "the ledger is append-only",
);
void rowOf;

console.log("credits: ok");
