/**
 * List the accounts that belong to no school.
 *
 *   pnpm report:accountless-users
 *
 * Operators only. Before sign-up was invitation-only, anyone could create an
 * account; those accounts have no school, and since then no assistant either.
 * This lists them so someone can decide what to do with them. It reads only:
 * nothing is changed or deleted.
 *
 * An account belongs to no school when its address is not a member of any
 * organisation, has no school profile, and has no pending invitation (an
 * invited account joins on its next visit, so it is not listed). Addresses
 * that only ever signed in through the generic Google route have a session
 * but no `user` row; they are listed too, marked as such.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec } from "@agent-native/core/db";

interface Row {
  email: string;
  created: string;
  googleOnly: boolean;
}

function when(value: unknown): string {
  if (value == null || value === "") return "unknown";
  const n = Number(value);
  const d = Number.isFinite(n) && n > 0 ? new Date(n) : new Date(String(value));
  return Number.isNaN(d.getTime())
    ? String(value)
    : d.toISOString().slice(0, 10);
}

async function main() {
  loadEnv();
  const exec = getDbExec();
  const read = async (sql: string): Promise<any[]> => {
    try {
      return (await exec.execute({ sql, args: [] })).rows as any[];
    } catch {
      // A table this deployment has not created yet holds nobody.
      return [];
    }
  };

  const users = await read(
    `SELECT id, LOWER(email) AS email, created_at FROM "user"`,
  );
  const sessionEmails = await read(
    `SELECT LOWER(email) AS email, MIN(created_at) AS created_at FROM sessions WHERE email IS NOT NULL GROUP BY LOWER(email)`,
  );
  const members = new Set(
    (await read(`SELECT DISTINCT LOWER(email) AS email FROM org_members`)).map(
      (r) => String(r.email),
    ),
  );
  const invited = new Set(
    (
      await read(
        `SELECT DISTINCT LOWER(email) AS email FROM org_invitations WHERE status = 'pending'`,
      )
    ).map((r) => String(r.email)),
  );
  const withProfile = new Set(
    (await read(`SELECT DISTINCT user_id FROM school_profiles`)).map((r) =>
      String(r.user_id),
    ),
  );

  const known = new Set<string>();
  const rows: Row[] = [];
  const consider = (email: string, created: unknown, googleOnly: boolean) => {
    if (!email || known.has(email)) return;
    known.add(email);
    if (members.has(email) || invited.has(email)) return;
    rows.push({ email, created: when(created), googleOnly });
  };

  for (const u of users) {
    const email = String(u.email ?? "");
    if (withProfile.has(String(u.id))) {
      known.add(email);
      continue;
    }
    consider(email, u.created_at, false);
  }
  for (const s of sessionEmails) {
    consider(String(s.email ?? ""), s.created_at, true);
  }

  rows.sort((a, b) => a.created.localeCompare(b.created));
  if (rows.length === 0) {
    console.log(
      "Every account belongs to a school, or has an invitation waiting.",
    );
  } else {
    console.log(`${rows.length} account(s) belong to no school:\n`);
    for (const r of rows) {
      console.log(
        `  ${r.created}  ${r.email}${r.googleOnly ? "  (Google sign-in only, no account row)" : ""}`,
      );
    }
    console.log(
      "\nNothing was changed. They cannot use the assistant; deciding whether to remove them is a separate step.",
    );
  }
  await closeDbExec();
}

main().catch(async (err) => {
  console.error(err instanceof Error ? err.message : err);
  await closeDbExec().catch(() => {});
  process.exit(1);
});
