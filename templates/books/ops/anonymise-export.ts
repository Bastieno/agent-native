/**
 * Makes a sales summary safe to commit: customer and sender names become
 * "Customer N" / "Sender N" / "Staff N" (stable per original), account digits become
 * ******0000. Usage: pnpm anonymise <in.csv> <out.csv>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parseCsv } from "../server/lib/csv.js";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: pnpm anonymise <in.csv> <out.csv>");
  process.exit(1);
}

const rows = parseCsv(readFileSync(input, "utf8"));
const header = rows[0];
const col = (n: string) => header.indexOf(n);
const customers = new Map<string, string>();
const senders = new Map<string, string>();
const staff = new Map<string, string>();
const stable = (map: Map<string, string>, label: string, key: string) => {
  if (!map.has(key)) map.set(key, `${label} ${map.size + 1}`);
  return map.get(key)!;
};

for (const row of rows.slice(1)) {
  const c = col("customerName");
  if (row[c]?.trim()) row[c] = stable(customers, "Customer", row[c].trim());
  const st = col("staffName");
  if (row[st]?.trim())
    row[st] = stable(staff, "Staff", row[st].trim().replace(/\s+/g, " "));
  for (const name of ["cancelledBy"]) {
    const i = col(name);
    if (i >= 0 && row[i]?.trim())
      row[i] = stable(staff, "Staff", row[i].trim().replace(/\s+/g, " "));
  }
  const d = col("paymentDetails");
  row[d] = (row[d] ?? "")
    .replace(
      /Sender: ([^|]*?)(\s*\|)/g,
      (_m, name: string, end: string) =>
        `Sender: ${name.trim() ? stable(senders, "Sender", name.trim()) : ""}${end}`,
    )
    .replace(/Business: [^|]*/g, "Business: Test Business Ltd ")
    .replace(/Sender Account: \*+\d+/g, "Sender Account: ******0000")
    .replace(/PAN: (\d{6})[*\d]+(\d{4})/g, "PAN: $1******0000");
}

const quote = (f: string) =>
  /[",\n\r]/.test(f) ? `"${f.replace(/"/g, '""')}"` : f;
writeFileSync(
  output,
  rows.map((r) => r.map(quote).join(",")).join("\n") + "\n",
);
console.log(`Wrote ${rows.length - 1} rows to ${output}`);
