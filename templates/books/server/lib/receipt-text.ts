/**
 * Reads the text recognised from a bank transfer slip (Moniepoint or Opay)
 * into an expense. Text recognition garbles letters ("Stalus", "Dale") and
 * often the day number, so labels are matched loosely and the date comes from
 * the day the slip was posted, confirmed by the weekday printed on it.
 */

export interface ReadReceipt {
  layout: "moniepoint" | "opay";
  kind: string | null; // TRANSFER | AIRTIME …
  amount: number; // naira
  payee: string | null;
  note: string | null;
  account: string; // which of the owner's accounts paid
  /** YYYY-MM-DD */
  date: string;
  time: string | null;
}

export type ReadResult =
  | { ok: true; receipt: ReadReceipt }
  | { ok: false; reason: string };

const LABELS = [
  "transaction type",
  "transaction status",
  "beneficiary",
  "beneficiary institution",
  "business name",
  "sender name",
  "transaction date",
  "narration",
  "session id",
  "transaction reference",
  "phone number",
  "account name",
  "network",
];
const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const letters = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .trim();

/** Similarity 0..1 by edit distance. */
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return 1 - d[a.length][b.length] / Math.max(a.length, b.length);
}

function closest(text: string, options: string[], min: number) {
  let best: string | null = null;
  let score = 0;
  for (const o of options) {
    const s = similarity(text, o);
    if (s > score) {
      score = s;
      best = o;
    }
  }
  return score >= min ? best : null;
}

const labelOf = (line: string) => {
  const t = letters(line);
  return t.length > 26 || !t ? null : closest(t, LABELS, 0.78);
};

const AMOUNT = /^[N₦#]?\s?(\d{1,3}(?:,\d{3})+|\d+)\.\d{2}$/;
function findAmount(lines: string[]): number | null {
  for (const l of lines) {
    const m = l.replace(/\s/g, "").match(AMOUNT);
    if (m) return Number(m[1].replace(/,/g, ""));
  }
  return null;
}

const addDays = (day: string, n: number) => {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const weekdayOf = (day: string) =>
  WEEKDAYS[(new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7];

/** The slip's day: posted that day or within the 3 days before, on the weekday printed. */
function dateFromWeekday(posted: string, weekday: string): string | null {
  for (let i = 0; i <= 3; i++) {
    const d = addDays(posted, -i);
    if (weekdayOf(d) === weekday) return d;
  }
  return null;
}

function readMoniepoint(lines: string[], posted: string): ReadResult {
  const fields = new Map<string, string[]>();
  let current: string | null = null;
  for (const l of lines) {
    const label = labelOf(l);
    if (label) {
      current = label;
      continue;
    }
    if (current) fields.set(current, [...(fields.get(current) ?? []), l]);
  }
  const get = (k: string) => fields.get(k)?.join(" ") || null;
  const amount = findAmount(lines);
  if (!amount) return { ok: false, reason: "no amount" };
  const dateText = get("transaction date") ?? "";
  const weekday = closest(
    letters(dateText.split(/[^A-Za-z]+/)[0] ?? ""),
    WEEKDAYS,
    0.7,
  );
  if (!weekday) return { ok: false, reason: "no date on the slip" };
  const date = dateFromWeekday(posted, weekday);
  if (!date)
    return { ok: false, reason: "slip date doesn't match the day posted" };
  const names = `${get("business name") ?? ""} ${get("sender name") ?? ""}`;
  return {
    ok: true,
    receipt: {
      layout: "moniepoint",
      kind:
        (fields.get("transaction type")?.[0] ?? null)?.toUpperCase() ?? null,
      amount,
      payee: get("beneficiary") ?? get("phone number"),
      note: get("narration"),
      account: /tech|work|lounge|kunge|restau/i.test(names)
        ? "Moniepoint (lounge)"
        : "Moniepoint (main)",
      date,
      time: dateText.match(/(\d{1,2}:\d\d\s*[AP]M)/i)?.[1] ?? null,
    },
  };
}

const OPAY_DATE = /^(\d\d)\/(\d\d)\/(\d{2}|\d{4})\s+(\d\d:\d\d)/;
const MASKED_ACCOUNT = /\|?\d{4}\*{4}\d{2}$/;

function readOpay(lines: string[], posted: string): ReadResult {
  const amount = findAmount(lines);
  if (!amount) return { ok: false, reason: "no amount" };
  const at = lines.findIndex((l) => OPAY_DATE.test(l));
  if (at < 0) return { ok: false, reason: "no date on the slip" };
  const m = lines[at].match(OPAY_DATE)!;
  const year = m[3].length === 2 ? `20${m[3]}` : m[3];
  const date = `${year}-${m[2]}-${m[1]}`;
  if (date > posted || date < addDays(posted, -3))
    return { ok: false, reason: "slip date doesn't match the day posted" };
  // After the date the values follow in label order. Two layouts:
  //   "Sender Details / Recipient Details": sender, sender account, recipient
  //   (a name that can wrap onto two lines), recipient account, remark.
  //   "Sender / Sender Account / Bank name / Recipient / …": sender, account,
  //   bank, recipient, account, bank, remark.
  const after = lines.slice(at + 1);
  let payee: string | undefined;
  let remark: string | undefined;
  if (lines.includes("Recipient Details")) {
    const rest = after.slice(2); // drop the sender and their account
    const end = rest.findIndex((l) => MASKED_ACCOUNT.test(l));
    if (end > 0) {
      payee = rest.slice(0, end).join(" ");
      remark = rest[end + 1];
    }
  } else {
    payee = after[3];
    remark = after[6];
  }
  const note = remark && !/^\d+$/.test(remark) ? remark : null;
  return {
    ok: true,
    receipt: {
      layout: "opay",
      kind: /TRANSFER/i.test(lines.join(" ")) ? "TRANSFER" : null,
      amount,
      payee: payee ?? null,
      note,
      account: "Opay",
      date,
      time: m[4],
    },
  };
}

export function readReceiptText(lines: string[], postedOn: string): ReadResult {
  const clean = lines.map((l) => l.trim()).filter(Boolean);
  const text = clean.join(" ");
  if (/providus/i.test(text)) return { ok: false, reason: "Providus slip" };
  if (clean[0] === "OPay" || /opay-inc/i.test(text))
    return readOpay(clean, postedOn);
  if (/Moni\w*point/i.test(text)) return readMoniepoint(clean, postedOn);
  return { ok: false, reason: "not a slip I know" };
}
