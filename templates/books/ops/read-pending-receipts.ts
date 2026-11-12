/**
 * Reads the pending receipts (old WhatsApp transfer slips) with this Mac's
 * built-in text recognition, and records the ones it can read as expenses
 * waiting for review. Free, and nothing leaves the machine.
 *
 * Usage: pnpm read-receipts [--limit N] [--dry]
 *   --limit N  only the first N pending receipts
 *   --dry      read and report, record nothing
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATABASE_URL ??= "file:./data/app.db";
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const limit = Number(args[args.indexOf("--limit") + 1]) || Infinity;

const bin = join(tmpdir(), "books-ocr");
if (!existsSync(bin))
  execFileSync("swiftc", ["-O", "ops/ocr.swift", "-o", bin], {
    stdio: "inherit",
  });

const { runWithRequestContext } = await import("@agent-native/core/server");
const { rows } = await import("../server/lib/sql.js");
const { recordReceiptsFromText } =
  await import("../server/lib/read-receipts.js");
const { readReceiptText } = await import("../server/lib/receipt-text.js");

const [owner] = await rows<{ org_id: string; email: string }>(
  `SELECT org_id, email FROM org_members WHERE role = 'owner' AND org_id IN (SELECT org_id FROM pending_receipts WHERE status = 'pending') LIMIT 1`,
);
if (!owner) throw new Error("No pending receipts in this database.");
const pending = await rows<{
  id: string;
  receipt_file_id: string;
  occurred_on: string;
}>(
  `SELECT id, receipt_file_id, occurred_on FROM pending_receipts WHERE org_id = ? AND status = 'pending' ORDER BY occurred_on, sent_at`,
  [owner.org_id],
);
const todo = pending.slice(0, limit);
console.log(`${todo.length} pending receipts to read`);

const tally = { recorded: 0, duplicate: 0, "not-an-expense": 0, unreadable: 0 };
const unreadable: string[] = [];
const notExpenses: string[] = [];
const dir = mkdtempSync(join(tmpdir(), "books-receipts-"));
try {
  for (let i = 0; i < todo.length; i += 40) {
    const batch = todo.slice(i, i + 40);
    const files: string[] = [];
    for (const p of batch) {
      const [f] = await rows<{ data_base64: string }>(
        `SELECT data_base64 FROM receipt_files WHERE id = ?`,
        [p.receipt_file_id],
      );
      const file = join(dir, `${p.id}.jpg`);
      writeFileSync(file, Buffer.from(f.data_base64, "base64"));
      files.push(file);
    }
    const text = execFileSync(bin, files, { maxBuffer: 1 << 28 }).toString();
    const read = new Map<string, string[]>();
    for (const line of text.split("\n").filter(Boolean)) {
      const o = JSON.parse(line) as { file: string; lines: string[] };
      read.set(o.file.split("/").pop()!.replace(".jpg", ""), o.lines);
    }
    const items = batch.map((p) => ({
      pendingReceiptId: p.id,
      lines: read.get(p.id) ?? [],
    }));
    if (dry) {
      for (const [n, it] of items.entries()) {
        const r = readReceiptText(it.lines, batch[n].occurred_on);
        tally[r.ok ? "recorded" : "unreadable"]++;
        if ("reason" in r)
          unreadable.push(`${batch[n].occurred_on} ${r.reason}`);
      }
    } else {
      const out = await runWithRequestContext(
        { userEmail: owner.email, orgId: owner.org_id },
        () => recordReceiptsFromText(owner.org_id, items),
      );
      for (const o of out) {
        tally[o.result]++;
        const day = batch.find((p) => p.id === o.pendingReceiptId)!.occurred_on;
        if (o.result === "unreadable") unreadable.push(`${day} ${o.reason}`);
        if (o.result === "not-an-expense")
          notExpenses.push(
            `${day} ₦${o.amount.toLocaleString()} ${o.note ?? ""}`,
          );
      }
    }
    console.log(`  ${Math.min(i + 40, todo.length)} / ${todo.length}`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(dry ? "(dry run: nothing recorded)" : "", tally);
const reasons = new Map<string, number>();
for (const u of unreadable) {
  const why = u.slice(11);
  reasons.set(why, (reasons.get(why) ?? 0) + 1);
}
console.log("Not read:", Object.fromEntries(reasons));
if (notExpenses.length)
  console.log(
    "Left pending, not running costs:\n  " + notExpenses.join("\n  "),
  );
process.exit(0);
