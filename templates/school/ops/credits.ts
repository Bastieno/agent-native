/**
 * Assistant credit, for operators.
 *
 *   pnpm credits:grant --school <id or name> --credits 10000 --ref "GTB-20261103" [--note "..."]
 *   pnpm credits:report [--school <id or name>] [--month 2026-11 [--invoice 123.45]]
 *   pnpm credits:set-mode --school <id or name> --mode managed|byo [--remove-key]
 *
 * Run it on the server, against the deployment's own `DATABASE_URL`. Like
 * `provision:school` it is a script on purpose: every action is a tool the
 * agent can call, and giving credit must not be one. Each grant is written to
 * the school's ledger with who gave it and the payment it answers.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
import { deleteAppSecret, readAppSecretMeta } from "@agent-native/core/secrets";
import { sql } from "drizzle-orm";
import {
  creditStatus,
  getBilling,
  grantCredit,
  ledgerFor,
  schoolName,
  setBillingMode,
  settleAllSchools,
} from "../server/lib/credits.js";
import { rowOf, rowsOf } from "../server/lib/raw-sql.js";
import { ccToCredits, creditsToCc, retailCc } from "../shared/credits.js";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  return value && !value.startsWith("--") ? value.trim() : undefined;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const operator = () =>
  (process.env.ELLAI_OPERATOR_EMAILS ?? "").split(",")[0]?.trim() ||
  process.env.USER ||
  "operator";

async function findSchool(ref: string): Promise<{ id: string; name: string }> {
  const rows = await rowsOf<{ id: string; name: string }>(
    sql`SELECT id, name FROM organizations WHERE id = ${ref} OR LOWER(name) = ${ref.toLowerCase()}`,
  );
  if (rows.length === 0) fail(`No school matches "${ref}".`);
  if (rows.length > 1) {
    fail(
      `More than one school matches "${ref}": ${rows.map((r) => `${r.name} (${r.id})`).join(", ")}. Use the id.`,
    );
  }
  return rows[0];
}

async function usage30Cents(schoolId: string): Promise<number> {
  try {
    const since = Date.now() - 30 * 86_400_000;
    const row = await rowOf<{ total: number | string | null }>(
      sql`SELECT COALESCE(SUM(cost_cents_x100), 0) AS total FROM token_usage WHERE org_id = ${schoolId} AND created_at >= ${since}`,
    );
    return Number(row?.total ?? 0) / 100; // centicents -> cents
  } catch {
    return 0;
  }
}

async function main() {
  loadEnv();
  const command = process.argv[2];

  if (command === "grant") {
    const ref = arg("school");
    const credits = Number(arg("credits"));
    if (!ref || !Number.isFinite(credits) || credits === 0) {
      fail(
        'Usage: pnpm credits:grant --school <id or name> --credits 10000 --ref "payment reference" [--note "..."]',
      );
    }
    const school = await findSchool(ref);
    const ref2 = arg("ref");
    if (credits > 0 && !ref2 && !arg("note")) {
      fail(
        "Give the payment reference (--ref) or a note (--note) saying why: it goes in the school's ledger.",
      );
    }
    const balance = await grantCredit({
      schoolId: school.id,
      amountCc: creditsToCc(credits),
      paymentRef: ref2,
      note: arg("note"),
      by: operator(),
      kind: credits > 0 ? "grant" : "adjustment",
    });
    console.log(
      `${credits > 0 ? "Granted" : "Adjusted by"} ${credits.toLocaleString("en")} credits for ${school.name}. Balance now ${ccToCredits(balance).toLocaleString("en")}.`,
    );
    const b = await getBilling(school.id);
    if (!b || b.mode !== "managed") {
      console.log(
        "It is not on Ellai's credit yet, so nothing draws on this. pnpm credits:set-mode --school ... --mode managed",
      );
    }
    return;
  }

  if (command === "set-mode") {
    const ref = arg("school");
    const mode = arg("mode");
    if (!ref || (mode !== "managed" && mode !== "byo")) {
      fail(
        "Usage: pnpm credits:set-mode --school <id or name> --mode managed|byo [--remove-key]",
      );
    }
    const school = await findSchool(ref);
    await setBillingMode(school.id, mode, operator());
    console.log(
      `${school.name} now uses ${mode === "managed" ? "Ellai's credit" : "its own key"}.`,
    );
    if (mode === "managed") {
      // A saved key wins over the credit, so the school would keep paying for
      // the assistant itself while its credit sat unused. Deleting it cannot
      // be undone, so it is only done when asked for.
      const ref = {
        key: "ANTHROPIC_API_KEY",
        scope: "org" as const,
        scopeId: school.id,
      };
      const saved = await readAppSecretMeta(ref);
      if (saved && process.argv.includes("--remove-key")) {
        await deleteAppSecret(ref);
        console.log("Its saved key was removed.");
      } else if (saved) {
        console.warn(
          `WARNING: ${school.name} has its own key saved, and that key wins: the assistant keeps running on it and none of the credit is used. Remove it with --remove-key (cannot be undone), or the admin can switch in Settings, Assistant.`,
        );
      }
    }
    return;
  }

  if (command === "report" && arg("month")) {
    // Reconciliation: what the app thinks the managed schools cost for a month,
    // to set beside Anthropic's invoice for the managed workspace.
    const month = arg("month")!;
    if (!/^\d{4}-\d{2}$/.test(month)) fail("--month looks like 2026-11.");
    const [y, m] = month.split("-").map(Number);
    const from = Date.UTC(y, m - 1, 1);
    const to = Date.UTC(y, m, 1);
    const rows = await rowsOf<{ org_id: string; total: number | string }>(
      sql`SELECT t.org_id AS org_id, COALESCE(SUM(t.cost_cents_x100), 0) AS total
          FROM token_usage t INNER JOIN school_billing b ON b.school_id = t.org_id
          WHERE t.created_at >= ${from} AND t.created_at < ${to}
          GROUP BY t.org_id`,
    );
    let totalCc = 0;
    for (const r of rows) {
      const cc = Number(r.total);
      totalCc += cc;
      console.log(
        `${(await schoolName(r.org_id)).padEnd(31).slice(0, 31)} $${(cc / 10_000).toFixed(2)}`,
      );
    }
    const estimate = totalCc / 10_000; // centicents -> dollars
    console.log(
      `\nEstimated provider cost for ${month}: $${estimate.toFixed(2)}`,
    );
    const invoice = Number(arg("invoice"));
    if (Number.isFinite(invoice) && invoice > 0) {
      const gap = ((invoice - estimate) / invoice) * 100;
      console.log(
        `Anthropic invoice: $${invoice.toFixed(2)}. The invoice is ${gap >= 0 ? gap.toFixed(1) + "% above" : (-gap).toFixed(1) + "% below"} the estimate.`,
      );
      console.log(
        Math.abs(gap) > 5
          ? "More than 5% apart: check the price table in packages/core/src/usage/store.ts, runs recorded without a school or an owner, and the margin."
          : "Within 5%: the margin covers the difference.",
      );
    } else {
      console.log("Add --invoice <dollars> to compare with the invoice.");
    }
    return;
  }

  if (command === "report") {
    await settleAllSchools().catch(() => undefined);
    const ref = arg("school");
    const schools = ref
      ? [await findSchool(ref)]
      : await rowsOf<{ id: string; name: string }>(
          sql`SELECT s.school_id AS id FROM school_billing s`,
        ).then(async (rows) =>
          Promise.all(
            rows.map(async (r) => ({ id: r.id, name: await schoolName(r.id) })),
          ),
        );
    if (!schools.length)
      return console.log("No school is on Ellai's credit yet.");
    console.log(
      "School                          Mode     Credits   30-day cost   Days left",
    );
    for (const s of schools) {
      const status = await creditStatus(s.id);
      const cents = await usage30Cents(s.id);
      // Provider cost over 30 days (cents) at the school's margin, as credits a day.
      const retailPerDay =
        ccToCredits(retailCc(cents * 100, (await getBilling(s.id))?.marginBp)) /
        30;
      const days =
        status.mode === "managed" && retailPerDay > 0
          ? Math.floor(status.credits / retailPerDay)
          : null;
      console.log(
        `${s.name.padEnd(31).slice(0, 31)} ${status.mode.padEnd(8)} ${String(status.credits).padStart(8)}   $${(cents / 100).toFixed(2).padStart(9)}   ${days === null ? "-" : days}`,
      );
      if (ref) {
        for (const e of await ledgerFor(s.id, 15)) {
          console.log(
            `  ${e.createdAt.slice(0, 10)}  ${e.kind.padEnd(10)} ${String(ccToCredits(Math.abs(e.amountCc)) * (e.amountCc < 0 ? -1 : 1)).padStart(8)}  ${e.paymentRef ?? ""} ${e.note ?? ""} (${e.createdBy})`,
          );
        }
      }
    }
    console.log(
      "\nCost is the app's estimate from published prices. Compare it with Anthropic's invoice for the managed workspace each month.",
    );
    return;
  }

  fail("Usage: pnpm credits:grant | credits:report | credits:set-mode");
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
