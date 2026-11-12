/** RFC 4180 CSV: quoted fields may hold commas, newlines and doubled quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);
  return rows;
}

/** Rows as objects keyed by the header row. */
export function csvRecords(text: string): {
  header: string[];
  records: Record<string, string>[];
} {
  const [header = [], ...rows] = parseCsv(text);
  const names = header.map((h) => h.trim());
  return {
    header: names,
    records: rows.map((r) =>
      Object.fromEntries(names.map((h, i) => [h, r[i] ?? ""])),
    ),
  };
}

export function missingFrom(
  header: string[],
  required: readonly string[],
): string[] {
  return required.filter((c) => !header.includes(c));
}
