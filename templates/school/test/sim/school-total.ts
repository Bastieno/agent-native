/**
 * The school's daily total for the assistant, asked of the real gate with no
 * model run.
 *
 *   DATABASE_URL=file:./data/journeys.db tsx test/sim/school-total.ts \
 *     <schoolA> <emailA> <schoolB> <emailB> [timezone]
 *
 * For journey:mcp-setup only. Reaching a total of 500 by chatting would run
 * the school's model 500 times, so the day's counts are written here and the
 * gate is asked directly, as a chat message asks it. Prints what the gate
 * decided at each step, as JSON.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
import { getOrgSetting } from "@agent-native/core/settings";
import { sql } from "drizzle-orm";
import { getDb } from "../../server/db/index.js";
import { gateAgentMessage } from "../../server/lib/agent-gate.js";
import { schoolDay } from "../../shared/agent-settings.js";

async function userIdOf(email: string): Promise<string> {
  const row = (await getDb().get(
    sql`SELECT id FROM "user" WHERE email = ${email} LIMIT 1`,
  )) as { id: string } | undefined;
  if (!row?.id) throw new Error(`no user ${email}`);
  return row.id;
}

/** A person's count for a day, as the gate keeps it. */
async function setCount(
  schoolId: string,
  userId: string,
  day: string,
  count: number,
) {
  const now = new Date().toISOString();
  await getDb().run(
    sql`INSERT INTO agent_message_usage (id, school_id, user_id, day, count, updated_at)
        VALUES (${`${userId}:${day}`}, ${schoolId}, ${userId}, ${day}, ${count}, ${now})
        ON CONFLICT (id) DO UPDATE SET count = ${count}, updated_at = ${now}`,
  );
}

const decided = (r: { reply?: string } | object) =>
  "reply" in r && r.reply ? { reply: r.reply } : "ran";

async function main() {
  loadEnv();
  const [schoolA, emailA, schoolB, emailB, timeZone = "Africa/Lagos"] =
    process.argv.slice(2);
  if (!schoolA || !emailA || !schoolB || !emailB) {
    throw new Error(
      "usage: school-total.ts <schoolA> <emailA> <schoolB> <emailB> [timezone]",
    );
  }
  const config = (await getOrgSetting(schoolA, "school-config")) as any;
  const limit = Number(config?.agent?.dailySchoolLimit);
  if (!Number.isFinite(limit) || limit < 2) {
    throw new Error(
      `school A's daily total is ${config?.agent?.dailySchoolLimit}`,
    );
  }
  const today = schoolDay(timeZone);
  const yesterday = schoolDay(timeZone, new Date(Date.now() - 86_400_000));
  const personA = await userIdOf(emailA);
  const ask = (email: string, orgId: string) =>
    gateAgentMessage({ ownerEmail: email, orgId });

  // Two people's counts make the school's total: someone else's 10 and the
  // rest on this person, one short of the limit.
  await setCount(schoolA, `sim-colleague-${schoolA.slice(0, 6)}`, today, 10);
  await setCount(schoolA, personA, today, limit - 11);
  const last = decided(await ask(emailA, schoolA));
  const over = decided(await ask(emailA, schoolA));
  const otherSchool = decided(await ask(emailB, schoolB));

  // A new school day starts from nothing.
  await setCount(schoolA, personA, yesterday, limit);
  await setCount(schoolA, personA, today, 0);
  await setCount(schoolA, `sim-colleague-${schoolA.slice(0, 6)}`, today, 0);
  const nextDay = decided(await ask(emailA, schoolA));

  console.log(JSON.stringify({ limit, last, over, otherSchool, nextDay }));
  await closeDbExec();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
