import assert from "node:assert/strict";
import { bootBooks, check, finish, fixture, ORG, OWNER } from "./helpers.js";

const { query } = await bootBooks("check-schedule");
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
  assert.equal(r.sent.length, 1);
  const [d] = await query(`SELECT period, start_day FROM digests`);
  assert.equal(d.period, "daily");
  assert.equal(d.start_day, "2026-11-10");
});
await check("already sent is not resent", async () => {
  await query(`UPDATE digests SET status = 'sent'`);
  const before = sent.length;
  await digestTick(ORG, lagos("2026-11-11T11:00:00"), deps);
  assert.equal(sent.length, before);
});
await check("monday sends weekly too", async () => {
  const due = await dueDigests(ORG, lagos("2026-11-09T08:30:00"));
  assert.deepEqual(
    due.map((d) => `${d.period} ${d.start} ${d.end}`),
    ["daily 2026-11-08 2026-11-08", "weekly 2026-11-02 2026-11-08"],
  );
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
await finish();
