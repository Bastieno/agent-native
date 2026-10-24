/**
 * Give every pending school invitation the framework invitation it should have.
 *
 *   pnpm backfill:org-invitations [--dry-run]
 *
 * Operators only, once, before deploying the sign-in that finds invitations
 * from the person's own schools rather than by reading every school's
 * settings. That sign-in looks a person up by membership and by pending
 * `org_invitations` rows, so an invitation recorded only in a school's own
 * pending list would no longer be found. Two kinds exist: student invitations
 * sent before `invite-student` wrote a framework row, and any whose
 * best-effort insert failed silently.
 *
 * Additive only: it inserts pending rows and changes nothing else. An
 * invitation whose address is already a member of that school, or already has
 * a pending or accepted framework invitation there, is left alone. Safe to run
 * again; a second run that finds anything points at a bug in the invite
 * actions.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec } from "@agent-native/core/db";
import { getAllSettings } from "@agent-native/core/settings";
import { nanoid } from "nanoid";

const KEY_RE = /^o:([^:]+):pending-(staff|student)-invites$/;

async function main() {
  loadEnv();
  const dryRun = process.argv.includes("--dry-run");
  const exec = getDbExec();

  // A one-off pass, so reading every setting is fine here; it is not on any
  // request's path.
  const all = await getAllSettings();
  let checked = 0;
  let added = 0;

  for (const [key, value] of Object.entries(all)) {
    const m = KEY_RE.exec(key);
    if (!m || !Array.isArray(value)) continue;
    const orgId = m[1];
    for (const inv of value as Array<{ email?: string }>) {
      const email = inv?.email?.trim().toLowerCase();
      if (!email) continue;
      checked++;

      const member = await exec.execute({
        sql: `SELECT 1 FROM org_members WHERE org_id = ? AND LOWER(email) = ? LIMIT 1`,
        args: [orgId, email],
      });
      if (member.rows.length > 0) continue;
      const invited = await exec.execute({
        sql: `SELECT 1 FROM org_invitations WHERE org_id = ? AND LOWER(email) = ? AND status IN ('pending', 'accepted') LIMIT 1`,
        args: [orgId, email],
      });
      if (invited.rows.length > 0) continue;

      console.log(
        `${dryRun ? "Would add" : "Adding"} ${email} (${m[2]}) to ${orgId}`,
      );
      if (!dryRun) {
        await exec.execute({
          sql: `INSERT INTO org_invitations (id, org_id, email, invited_by, created_at, status, role) VALUES (?, ?, ?, ?, ?, 'pending', 'member')`,
          args: [nanoid(), orgId, email, "backfill", Date.now()],
        });
      }
      added++;
    }
  }

  console.log(
    `${checked} pending invitation(s) checked; ${added} ${dryRun ? "would be given" : "given"} a framework invitation.`,
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
