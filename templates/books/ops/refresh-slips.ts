/**
 * Re-reads every expense that came from a transfer slip (Moniepoint, Opay,
 * Providus) with the current slip reader, and corrects what was misread:
 * the payee, the note, and the category of a slip that had none. Run it after
 * the reader improves, so the fix reaches the expenses already in.
 *
 * Safe by construction:
 * - a note the owner wrote is never touched;
 * - a note is replaced only when the old one was a misreading (a label, a
 *   number, nothing) or the new one differs by more than a few letters;
 * - a category is set only on an expense that has none.
 *
 * Writes `<out>.json` and `<out>.sql`. The SQL applies each change only where
 * the payee, note and category are still exactly what was read here, so it
 * can be run on the hosted copy without overwriting the owner's edits there.
 *
 * Usage: pnpm refresh-slips [--apply] [--out /tmp/slip-fixes]
 *   --apply  also apply the changes to this database (./data/app.db)
 * A Mac only: it uses macOS text recognition.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATABASE_URL ??= "file:./data/app.db";
const args = process.argv.slice(2);
const apply = args.includes("--apply");
const out = args.includes("--out")
  ? args[args.indexOf("--out") + 1]
  : join(tmpdir(), "slip-fixes");

const bin = join(tmpdir(), "books-ocr");
if (!existsSync(bin))
  execFileSync("swiftc", ["-O", "ops/ocr.swift", "-o", bin], {
    stdio: "inherit",
  });

const { rows, run } = await import("../server/lib/sql.js");
const { readReceiptText } = await import("../server/lib/receipt-text.js");
const { expenseNote, OWNER_MARK } =
  await import("../server/lib/expense-note.js");
const { guessExpense, fuelOnly } =
  await import("../server/lib/expense-guess.js");
const { loadPayeeRules, matchPayeeRule } =
  await import("../server/lib/payee-rules.js");
const { staffBusiness } = await import("../server/lib/staff.js");
const { OWNER_KINDS } = await import("../server/lib/setup.js");
const rulesByOrg = new Map<
  string,
  Awaited<ReturnType<typeof loadPayeeRules>>
>();
const { correctNote } = await import("../shared/note-words.js");

const letters = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return d[a.length][b.length];
}
/** A stored note that is really a label, a number or nothing. */
const misread = (note: string) =>
  !note.trim() ||
  /^(recipient|paid with|transaction|remark|session|sender|bank name|account)\b/i.test(
    note.trim(),
  ) ||
  /^[\d\s|*]+$/.test(note.trim());
/** A stored payee that is really a label, an account or a stray digit. */
const badPayee = (v: string) =>
  /^(\d{1,2}|account|bank name|recipient.*|OPay\|.*)$/i.test(v.trim()) ||
  /\*{4}/.test(v);

type Fix = {
  code: string;
  orgId: string;
  oldVendor: string;
  oldRaw: string;
  oldCategoryId: string | null;
  vendor: string;
  raw: string;
  category: string | null;
  business: string | null;
};

const slips = await rows<{
  code: string;
  org_id: string;
  vendor: string;
  raw_text: string | null;
  occurred_on: string;
  category_id: string | null;
  data_base64: string;
}>(
  `SELECT e.code, e.org_id, e.vendor, e.raw_text, e.occurred_on, e.category_id, f.data_base64
     FROM expenses e JOIN receipt_files f ON f.id = e.receipt_file_id
    WHERE e.source = 'history' AND e.raw_text LIKE '%Paid from%'`,
);
console.log(`${slips.length} slips to re-read`);

const fixes: Fix[] = [];
const dir = mkdtempSync(join(tmpdir(), "books-slips-"));
try {
  for (let i = 0; i < slips.length; i += 40) {
    const batch = slips.slice(i, i + 40);
    const files = batch.map((e) => {
      const f = join(dir, `${e.code}.jpg`);
      writeFileSync(f, Buffer.from(e.data_base64, "base64"));
      return f;
    });
    const read = new Map<string, string[]>();
    for (const line of execFileSync(bin, files, { maxBuffer: 1 << 28 })
      .toString()
      .split("\n")
      .filter(Boolean)) {
      const o = JSON.parse(line) as { file: string; lines: string[] };
      read.set(o.file.split("/").pop()!.replace(".jpg", ""), o.lines);
    }
    for (const e of batch) {
      const rawText = e.raw_text ?? "";
      if (rawText.includes(OWNER_MARK)) continue;
      const r = readReceiptText(read.get(e.code) ?? [], e.occurred_on);
      if (!r.ok) continue;
      const noNote = /^Paid from\b/.test(rawText);
      const oldNote = noNote ? "" : rawText.split(" · Paid from")[0];
      const tail = noNote ? ` · ${rawText}` : rawText.slice(oldNote.length);
      const newNote = r.receipt.note ?? "";
      let note = oldNote;
      if (
        misread(oldNote)
          ? !!newNote || !!oldNote
          : !!newNote && distance(letters(oldNote), letters(newNote)) > 2
      )
        note = newNote;
      const vendor =
        r.receipt.payee &&
        (badPayee(e.vendor) ||
          r.receipt.payee.startsWith(e.vendor.slice(0, 12)))
          ? r.receipt.payee
          : e.vendor;
      const raw = note ? `${note}${tail}` : tail.replace(/^ · /, "");
      // A slip that had no category gets one from its note, now it can be read.
      let category: string | null = null;
      let business: string | null = null;
      // The same rules as reading a new slip: payee rules, then the note,
      // with fuel paid to someone not on the staff list as the owner's car.
      if (!e.category_id && note) {
        if (!rulesByOrg.has(e.org_id))
          rulesByOrg.set(e.org_id, await loadPayeeRules(e.org_id));
        const g = guessExpense(correctNote(note));
        const rule = g.notAnExpense
          ? null
          : matchPayeeRule(rulesByOrg.get(e.org_id)!, vendor, 0);
        if (rule) {
          category = rule.category;
          business = rule.businessSlug;
        } else if (g.category && !g.notAnExpense) {
          category = g.category;
          business = g.business;
          if (fuelOnly(note) && !(await staffBusiness(e.org_id, vendor))) {
            category = OWNER_KINDS.fuel;
            business = null;
          }
        }
      }
      if (vendor !== e.vendor || raw !== rawText || category)
        fixes.push({
          code: e.code,
          orgId: e.org_id,
          oldVendor: e.vendor,
          oldRaw: rawText,
          oldCategoryId: e.category_id,
          vendor,
          raw,
          category,
          business,
        });
    }
    console.log(`  ${Math.min(i + 40, slips.length)} / ${slips.length}`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}

const q = (s: string | null) =>
  s === null ? "NULL" : `'${s.replace(/'/g, "''")}'`;
const sql = [
  "BEGIN;",
  "CREATE TEMP TABLE done (n int);",
  ...fixes.map((f) => {
    const sets = [`vendor = ${q(f.vendor)}`, `raw_text = ${q(f.raw)}`];
    if (f.category)
      sets.push(
        `category_id = (SELECT id FROM expense_categories c WHERE c.org_id = expenses.org_id AND c.name = ${q(f.category)} ORDER BY c.created_at, c.id LIMIT 1)`,
        `business_id = ${f.business ? `(SELECT id FROM businesses b WHERE b.org_id = expenses.org_id AND b.slug = ${q(f.business)} ORDER BY b.created_at, b.id LIMIT 1)` : "NULL"}`,
      );
    return `WITH u AS (UPDATE expenses SET ${sets.join(", ")} WHERE code = ${q(f.code)} AND vendor = ${q(f.oldVendor)} AND raw_text = ${q(f.oldRaw)}${f.category ? " AND category_id IS NULL" : ""} RETURNING 1) INSERT INTO done SELECT 1 FROM u;`;
  }),
  "SELECT count(*) AS updated FROM done;",
].join("\n");
writeFileSync(`${out}.json`, JSON.stringify(fixes, null, 1));
writeFileSync(`${out}.sql`, sql);

const named = fixes.filter((f) => f.vendor !== f.oldVendor).length;
const noted = fixes.filter((f) => f.raw !== f.oldRaw).length;
const filed = fixes.filter((f) => f.category).length;
console.log(
  `${fixes.length} expenses to correct: ${named} payees, ${noted} notes, ${filed} given a category`,
);
for (const f of fixes.slice(0, 60))
  console.log(
    `${f.code}: ${f.oldVendor.slice(0, 22)} / ${(f.oldRaw.split(" · ")[0] || "-").slice(0, 26)}  →  ${f.vendor.slice(0, 22)} / ${(f.raw.split(" · ")[0] || "-").slice(0, 30)}${f.category ? `  [${f.category}${f.business ? ` · ${f.business}` : ""}]` : ""}`,
  );
console.log(`Wrote ${out}.json and ${out}.sql`);

if (apply) {
  let n = 0;
  for (const f of fixes) {
    const cat = f.category
      ? ((
          await rows<{ id: string }>(
            `SELECT id FROM expense_categories WHERE org_id = ? AND name = ? ORDER BY created_at, id LIMIT 1`,
            [f.orgId, f.category],
          )
        )[0]?.id ?? null)
      : null;
    const biz = f.business
      ? ((
          await rows<{ id: string }>(
            `SELECT id FROM businesses WHERE org_id = ? AND slug = ? ORDER BY created_at, id LIMIT 1`,
            [f.orgId, f.business],
          )
        )[0]?.id ?? null)
      : null;
    const [now] = await rows<{
      vendor: string;
      raw_text: string;
      category_id: string | null;
    }>(
      `SELECT vendor, raw_text, category_id FROM expenses WHERE org_id = ? AND code = ?`,
      [f.orgId, f.code],
    );
    if (!now || now.vendor !== f.oldVendor || now.raw_text !== f.oldRaw)
      continue;
    if (f.category && now.category_id) continue;
    await run(
      f.category
        ? `UPDATE expenses SET vendor = ?, raw_text = ?, category_id = ?, business_id = ? WHERE org_id = ? AND code = ?`
        : `UPDATE expenses SET vendor = ?, raw_text = ? WHERE org_id = ? AND code = ?`,
      f.category
        ? [f.vendor, f.raw, cat, biz, f.orgId, f.code]
        : [f.vendor, f.raw, f.orgId, f.code],
    );
    n++;
  }
  console.log(`applied here: ${n} of ${fixes.length}`);
}
process.exit(0);
