/**
 * List the calls booked from the landing page.
 *
 *   pnpm report:pilot-bookings [--all]
 *
 * Operators only. Bookings are the operator's, not any school's, so this is a
 * script on the server rather than an action a school's assistant could run.
 * Upcoming calls by default; --all includes past, moved and cancelled ones.
 * It reads only.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec } from "@agent-native/core/db";

async function main() {
  loadEnv();
  const all = process.argv.includes("--all");
  let rows: any[] = [];
  try {
    rows = (
      await getDbExec().execute({
        sql: `SELECT * FROM pilot_bookings ORDER BY start_time`,
        args: [],
      })
    ).rows as any[];
  } catch {
    // No table yet: nothing has been booked on this deployment.
  }
  const now = new Date().toISOString();
  const shown = all
    ? rows
    : rows.filter((r) => r.status === "booked" && String(r.start_time) >= now);

  if (shown.length === 0) {
    console.log(all ? "No bookings yet." : "No upcoming calls.");
  }
  for (const r of shown) {
    let answers: Record<string, unknown> = {};
    try {
      answers = JSON.parse(r.responses_json ?? "{}");
    } catch {}
    const extra = Object.entries(answers)
      .filter(([k, v]) => !["name", "email"].includes(k) && v)
      .map(([k, v]) => `${k}: ${String(v)}`)
      .join("; ");
    console.log(
      [
        r.start_time ?? "no time",
        r.status,
        `${r.name ?? "?"} <${r.email ?? "?"}>`,
        r.edition ? `edition ${r.edition}` : "",
        extra,
      ]
        .filter(Boolean)
        .join(" | "),
    );
  }
  await closeDbExec();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
