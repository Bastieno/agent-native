/**
 * Puts the line breaks back into notes read from old transfer slips. Slips
 * read before line breaks were kept had their narration joined into one line.
 * This reads each slip picture again with this Mac's text recognition and, only
 * when the new reading has exactly the same letters as the stored note, stores
 * it with its line breaks. Notes the owner wrote are left alone.
 *
 * Usage: pnpm restore-note-lines [--dry]
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATABASE_URL ??= "file:./data/app.db";
const dry = process.argv.includes("--dry");

const bin = join(tmpdir(), "books-ocr");
if (!existsSync(bin))
  execFileSync("swiftc", ["-O", "ops/ocr.swift", "-o", bin], {
    stdio: "inherit",
  });

const { rows, run } = await import("../server/lib/sql.js");
const { readReceiptText } = await import("../server/lib/receipt-text.js");
const { OWNER_MARK } = await import("../server/lib/expense-note.js");

const letters = (s: string) => s.replace(/\s+/g, "").toLowerCase();

const found = await rows<{
  id: string;
  raw_text: string;
  occurred_on: string;
  data_base64: string;
}>(
  `SELECT e.id, e.raw_text, e.occurred_on, f.data_base64 FROM expenses e
     JOIN receipt_files f ON f.id = e.receipt_file_id
    WHERE e.source = 'history' AND e.raw_text LIKE '% · Paid from%'`,
);
const todo = found.filter((e) => !e.raw_text.includes(OWNER_MARK));
console.log(`${todo.length} slips to look at`);

const tally = { restored: 0, oneLine: 0, different: 0, unread: 0 };
const dir = mkdtempSync(join(tmpdir(), "books-lines-"));
try {
  for (let i = 0; i < todo.length; i += 40) {
    const batch = todo.slice(i, i + 40);
    const files = batch.map((e) => {
      const file = join(dir, `${e.id}.jpg`);
      writeFileSync(file, Buffer.from(e.data_base64, "base64"));
      return file;
    });
    const out = execFileSync(bin, files, { maxBuffer: 1 << 28 }).toString();
    const read = new Map<string, string[]>();
    for (const line of out.split("\n").filter(Boolean)) {
      const o = JSON.parse(line) as { file: string; lines: string[] };
      read.set(o.file.split("/").pop()!.replace(".jpg", ""), o.lines);
    }
    for (const e of batch) {
      const r = readReceiptText(read.get(e.id) ?? [], e.occurred_on);
      if (!r.ok || !r.receipt.note) {
        tally.unread++;
        continue;
      }
      const [stored, ...rest] = e.raw_text.split(" · Paid from");
      const note = r.receipt.note;
      if (!note.includes("\n")) {
        tally.oneLine++;
        continue;
      }
      if (letters(note) !== letters(stored)) {
        tally.different++;
        continue;
      }
      tally.restored++;
      if (!dry)
        await run(`UPDATE expenses SET raw_text = ? WHERE id = ?`, [
          [note, ...rest].join(" · Paid from"),
          e.id,
        ]);
    }
    console.log(`  ${Math.min(i + 40, todo.length)} / ${todo.length}`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(dry ? "(dry run: nothing changed)" : "", tally);
process.exit(0);
