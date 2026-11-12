import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture, ORG, OWNER } from "./helpers.js";

const { query, asOwner: ownerRun } = await bootBooks("check-schedule");
const { readFileSync: fixtureFileRead } = await import("node:fs");
const fixtureFile = (p: string) => fixtureFileRead(p, "utf8");
const { importMoniebookFile } = await import("../server/lib/import-file.js");
const { dueDigests, digestTick, cronAuthorised, digestJobContent } =
  await import("../server/lib/schedule.js");

const sent: string[] = [];
const reminders: string[] = [];
const deps = {
  send: async (_org: string, id: string) => {
    sent.push(id);
    return { status: "sent" as const };
  },
  remind: async (_org: string, day: string) => {
    reminders.push(day);
  },
};
const lagos = (local: string) => new Date(`${local}+01:00`);

await check("nothing due before 08:00", async () => {
  assert.deepEqual(await dueDigests(ORG, lagos("2026-11-11T07:59:00")), []);
});
await check("missing export reminds", async () => {
  const r = await digestTick(ORG, lagos("2026-11-11T08:35:00"), deps);
  assert.deepEqual(reminders, ["2026-11-10"]);
  assert.deepEqual(r.sent, []);
  assert.equal((await query(`SELECT id FROM digests`)).length, 0);
  await digestTick(ORG, lagos("2026-11-11T09:35:00"), deps);
  assert.deepEqual(reminders, ["2026-11-10"], "reminded once a day");
});
await importMoniebookFile(ORG, fixture("sales-sample.csv"), {
  fileName: "sales-summary2026-11-10-2026-11-01.csv",
  receivedVia: "upload",
});
await check("export arrives later sends digest", async () => {
  const r = await digestTick(ORG, lagos("2026-11-11T10:00:00"), deps);
  const built = await query(`SELECT period, start_day FROM digests`);
  assert.ok(r.sent.length >= 1);
  assert.ok(
    built.some((d) => d.period === "daily" && d.start_day === "2026-11-10"),
    "yesterday's daily",
  );
});
await check("already sent is not resent", async () => {
  await query(`UPDATE digests SET status = 'sent'`);
  const before = sent.length;
  await digestTick(ORG, lagos("2026-11-11T11:00:00"), deps);
  assert.equal(sent.length, before);
});
await check("monday sends weekly too", async () => {
  await query(`DELETE FROM digests WHERE org_id = ?`, [ORG]);
  const due = await dueDigests(ORG, lagos("2026-11-09T08:30:00"));
  const keys = due.map((d) => `${d.period} ${d.start} ${d.end}`);
  assert.ok(keys.includes("daily 2026-11-08 2026-11-08"), keys.join("; "));
  assert.ok(keys.includes("weekly 2026-11-02 2026-11-08"), keys.join("; "));
});
await check("first of the month sends monthly", async () => {
  const due = await dueDigests(ORG, lagos("2026-12-01T08:30:00"));
  assert.ok(
    due.some(
      (d) =>
        d.period === "monthly" &&
        d.start === "2026-11-01" &&
        d.end === "2026-11-30",
    ),
  );
});
await check("cron secret", () => {
  process.env.CRON_SECRET = "s3cret";
  assert.equal(cronAuthorised("Bearer s3cret"), true);
  assert.equal(cronAuthorised("Bearer nope"), false);
  assert.equal(cronAuthorised(undefined), false);
  delete process.env.CRON_SECRET;
  assert.equal(
    cronAuthorised("Bearer s3cret"),
    false,
    "no secret set means no access",
  );
});
await check("job file", () => {
  const c = digestJobContent(OWNER, ORG);
  assert.match(c, /^---\nschedule: "0 \* \* \* \*"\nenabled: true\n/);
  assert.match(c, /due-digests/);
  assert.match(c, /figures\.trends/);
});
await check("a late file still gets its weekly and daily", async () => {
  // Tuesday 10 Nov: last week's weekly (2–8 Nov) and Sunday's daily were never sent.
  await query(`DELETE FROM digests WHERE org_id = ?`, [ORG]);
  const due = (await dueDigests(ORG, lagos("2026-11-10T09:00:00"))).map(
    (d) => `${d.period} ${d.start}`,
  );
  assert.ok(due.includes("weekly 2026-11-02"), `weekly missing from ${due}`);
  assert.ok(
    due.includes("daily 2026-11-08"),
    `Sunday's daily missing from ${due}`,
  );
});
await check("send-reminder reminds once a day", async () => {
  const action = (await import("../actions/send-reminder.js")).default;
  const a = await ownerRun(() => action.run({ day: "2026-11-11" }));
  const b = await ownerRun(() => action.run({ day: "2026-11-11" }));
  assert.equal(a.sent, true);
  assert.equal(b.sent, false);
});
await check("a digest is only sent once", async () => {
  const { buildDigest, sendDigest } = await import("../server/lib/digests.js");
  process.env.WHATSAPP_ACCESS_TOKEN = "t";
  process.env.WHATSAPP_PHONE_NUMBER_ID = "p";
  await query(`UPDATE books_settings SET recipients = ? WHERE org_id = ?`, [
    JSON.stringify([{ name: "Owner", whatsapp: "2348030000000" }]),
    ORG,
  ]);
  let calls = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    calls++;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    await query(`DELETE FROM digests WHERE org_id = ?`, [ORG]);
    const { digestId } = await buildDigest(
      ORG,
      "daily",
      "2026-11-09",
      "2026-11-09",
    );
    const first = await sendDigest(ORG, digestId);
    const second = await sendDigest(ORG, digestId);
    assert.equal(first.status, "sent");
    assert.equal(second.skipped, true);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = realFetch;
  }
});
await check("the safety-net cron runs hourly", () => {
  assert.match(fixtureFile("vercel.json"), /"schedule": "0 \* \* \* \*"/);
});
await finish();
