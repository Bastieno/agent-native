// guard:allow-unscoped — the operator's own sign-in codes; not school data.
import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import {
  emailStrong,
  isEmailConfigured,
  renderEmail,
  sendEmail,
} from "@agent-native/core/server";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { operatorEmails } from "../credits.js";
import { rowOf, rowsOf, runSql } from "../raw-sql.js";
import { signingKey } from "./session.js";

/**
 * Emailed one-time codes for the operator console.
 *
 * A code is six digits, lives ten minutes, allows five tries and works once.
 * Only a hash is stored. Asking for one never reveals whether an address is an
 * operator's: the answer is the same either way, and the email goes only to an
 * address on the list.
 */

const CODE_MINUTES = 10;
const MAX_TRIES = 5;
/** Codes one address may ask for in a quarter of an hour. */
const PER_ADDRESS = 3;
/** Codes asked for in an hour from anyone: the ceiling on email sent. */
const PER_HOUR = 20;

const hashOf = (email: string, code: string) =>
  createHash("sha256")
    .update(`${signingKey() ?? ""}:${email}:${code}`)
    .digest("hex");

async function countSince(ms: number, email?: string): Promise<number> {
  const since = new Date(Date.now() - ms).toISOString();
  const row = email
    ? await rowOf<{ n: number | string }>(
        sql`SELECT COUNT(*) AS n FROM operator_login_codes WHERE email = ${email} AND created_at >= ${since}`,
      )
    : await rowOf<{ n: number | string }>(
        sql`SELECT COUNT(*) AS n FROM operator_login_codes WHERE created_at >= ${since}`,
      );
  return Number(row?.n ?? 0);
}

/** Send a code if the address is an operator's. Never says which. */
export async function requestCode(rawEmail: string): Promise<void> {
  const email = rawEmail.trim().toLowerCase();
  if (!email || !operatorEmails().includes(email)) return;
  if (!signingKey()) return;
  if ((await countSince(15 * 60_000, email)) >= PER_ADDRESS) return;
  if ((await countSince(60 * 60_000)) >= PER_HOUR) return;

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await runSql(
    sql`INSERT INTO operator_login_codes (id, email, code_hash, attempts, expires_at, created_at)
        VALUES (${nanoid()}, ${email}, ${hashOf(email, code)}, 0,
                ${new Date(Date.now() + CODE_MINUTES * 60_000).toISOString()}, ${new Date().toISOString()})`,
  );

  let sent = false;
  if (isEmailConfigured()) {
    try {
      const { html, text } = renderEmail({
        heading: "Your Ellai operator code",
        paragraphs: [
          `Your sign-in code is ${emailStrong(code)}.`,
          `It works once and expires in ${CODE_MINUTES} minutes. If you did not ask for it, ignore this email.`,
        ],
      });
      await sendEmail({
        to: email,
        subject: `Your Ellai operator code: ${code}`,
        html,
        text,
      });
      sent = true;
    } catch (err) {
      console.error(
        `[operator] sign-in email failed: ${err instanceof Error ? err.message : err}`,
      );
    }
  }
  // Local development has no working mailbox; say the code where the developer is looking.
  if (!sent && process.env.NODE_ENV !== "production") {
    console.log(`[operator] sign-in code for ${email}: ${code}`);
  }
}

/** Whether this is a live code for the address. A right answer uses it up. */
export async function checkCode(
  rawEmail: string,
  rawCode: string,
): Promise<boolean> {
  const email = rawEmail.trim().toLowerCase();
  const code = rawCode.replace(/\s+/g, "");
  if (!operatorEmails().includes(email) || !/^\d{6}$/.test(code)) return false;
  const now = new Date().toISOString();
  const rows = await rowsOf<{
    id: string;
    code_hash: string;
    attempts: number | string;
  }>(
    sql`SELECT id, code_hash, attempts FROM operator_login_codes
        WHERE email = ${email} AND used_at IS NULL AND expires_at > ${now}
        ORDER BY created_at DESC LIMIT 1`,
  );
  const row = rows[0];
  if (!row || Number(row.attempts) >= MAX_TRIES) return false;
  // Count the try before comparing, so a failed run of guesses cannot outrun it.
  await runSql(
    sql`UPDATE operator_login_codes SET attempts = attempts + 1 WHERE id = ${row.id}`,
  );
  const want = Buffer.from(row.code_hash);
  const got = Buffer.from(hashOf(email, code));
  if (want.length !== got.length || !timingSafeEqual(want, got)) return false;
  await runSql(
    sql`UPDATE operator_login_codes SET used_at = ${now} WHERE email = ${email} AND used_at IS NULL`,
  );
  return true;
}
