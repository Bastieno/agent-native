/**
 * The school's daily allowance for requests from AI apps, asked of the real
 * gate with no model run.
 *
 *   DATABASE_URL=file:./data/journeys.db tsx test/sim/chat-app-cap.ts <schoolId> <email> <timezone>
 *
 * For journey:mcp-setup only. Reaching a limit of 20 through ask_app would
 * run the school's model twenty times, so the day's count is written here and
 * the gate is asked directly, exactly as an ask_app run asks it (source
 * "mcp"). Prints what the gate decided at each step, as JSON.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
import { sql } from "drizzle-orm";
import { getDb } from "../../server/db/index.js";
import { gateAgentMessage } from "../../server/lib/agent-gate.js";
import { schoolDay } from "../../shared/agent-settings.js";

async function setCount(schoolId: string, day: string, count: number) {
  const id = `chat-apps:${schoolId}:${day}`;
  const now = new Date().toISOString();
  await getDb().run(
    sql`INSERT INTO agent_message_usage (id, school_id, user_id, day, count, updated_at)
        VALUES (${id}, ${schoolId}, ${`school:${schoolId}`}, ${day}, ${count}, ${now})
        ON CONFLICT (id) DO UPDATE SET count = ${count}, updated_at = ${now}`,
  );
}

async function countOn(schoolId: string, day: string): Promise<number> {
  const row = (await getDb().get(
    sql`SELECT count FROM agent_message_usage WHERE id = ${`chat-apps:${schoolId}:${day}`} LIMIT 1`,
  )) as { count: number } | undefined;
  return Number(row?.count ?? 0);
}

async function main() {
  loadEnv();
  const [schoolId, email, timeZone = "Africa/Lagos"] = process.argv.slice(2);
  if (!schoolId || !email) {
    throw new Error("usage: chat-app-cap.ts <schoolId> <email> [timezone]");
  }
  const today = schoolDay(timeZone);
  const yesterday = schoolDay(timeZone, new Date(Date.now() - 86_400_000));
  const ask = () =>
    gateAgentMessage({ ownerEmail: email, orgId: schoolId, source: "mcp" });

  // The 20th request of the day still runs, and is counted.
  await setCount(schoolId, today, 19);
  const twentieth = await ask();
  const afterTwentieth = await countOn(schoolId, today);
  // The 21st gets the calm reply instead of a model run.
  const twentyFirst = await ask();
  // A new school day starts from nothing: yesterday's full count does not
  // carry over.
  await setCount(schoolId, yesterday, 20);
  await setCount(schoolId, today, 0);
  const nextDay = await ask();

  console.log(
    JSON.stringify({
      today,
      twentieth: "reply" in twentieth ? { reply: twentieth.reply } : "ran",
      afterTwentieth,
      twentyFirst:
        "reply" in twentyFirst ? { reply: twentyFirst.reply } : "ran",
      nextDay: "reply" in nextDay ? { reply: nextDay.reply } : "ran",
    }),
  );
  await closeDbExec();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
