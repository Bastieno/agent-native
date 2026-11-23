/**
 * Reads the text recognised from a bank transfer slip (Moniepoint or Opay)
 * into an expense. Text recognition garbles letters ("Stalus", "Dale") and
 * often the day number, so labels are matched loosely and the date comes from
 * the day the slip was posted, confirmed by the weekday printed on it.
 */

export interface ReadReceipt {
  layout: "moniepoint" | "opay" | "providus";
  kind: string | null; // TRANSFER | AIRTIME …
  amount: number; // naira
  payee: string | null;
  note: string | null;
  account: string; // which of the owner's accounts paid
  /** YYYY-MM-DD */
  date: string;
  time: string | null;
  /** The date couldn't be read off the slip; this is the day it was posted. */
  dateGuessed?: boolean;
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
  "biller",
  "biller product",
  "beneficiary id",
  "provider reference",
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

/** The slip's day: posted that day or within the 5 days before, on the weekday printed. */
function dateFromWeekday(posted: string, weekday: string): string | null {
  for (let i = 0; i <= 5; i++) {
    const d = addDays(posted, -i);
    if (weekdayOf(d) === weekday) return d;
  }
  return null;
}

/** "DSTV Compact Plus" from biller DSTV, product DSTV Compact Plus. */
function billNote(biller: string | null, product: string | null) {
  if (!product) return biller;
  if (!biller || product.toLowerCase().includes(biller.toLowerCase()))
    return product;
  return `${biller} ${product}`;
}

function readMoniepoint(lines: string[], posted: string): ReadResult {
  const clean = lines;
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
  // A garbled label can steal a neighbour's value, so look for the date line itself.
  // With a time ("… | 9:48 PM"), or a weekday and a year (bill payments print no time).
  const isDate = (l: string) =>
    /[A-Za-z]{3,}.*\d{1,2}:\d\d\s*[AP]M/i.test(l) ||
    /^[A-Za-z]{5,9},?\s+[A-Za-z]{3,}.*\b20\d\d\b/.test(l);
  const dateText =
    fields.get("transaction date")?.find(isDate) ?? clean.find(isDate) ?? "";
  const weekday = closest(
    letters(dateText.split(/[^A-Za-z]+/)[0] ?? ""),
    WEEKDAYS,
    0.7,
  );
  // An unreadable date is taken from the day the slip was posted, and said so.
  const date = weekday ? dateFromWeekday(posted, weekday) : posted;
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
      payee: get("beneficiary") ?? get("biller") ?? get("phone number"),
      // Kept line by line, as written on the slip. A bill payment has no
      // narration: what was paid for is the biller's product.
      note:
        fields.get("narration")?.join("\n") ||
        billNote(get("biller"), get("biller product")),
      account: /tech|work|lounge|kunge|restau/i.test(names)
        ? "Moniepoint (lounge)"
        : "Moniepoint (main)",
      date,
      dateGuessed: weekday ? undefined : true,
      time: dateText.match(/(\d{1,2}:\d\d\s*[AP]M)/i)?.[1] ?? null,
    },
  };
}

const OPAY_DATE = /^(\d\d)\/(\d\d)\/(\d{2}|\d{4})\s+(\d\d:\d\d)/;
const MASKED_ACCOUNT = /\|?\d{4}\*{4}\d{2}$/;

/** The labels on an Opay slip. */
const OPAY_LABEL =
  /^(date\/time|sender( details| account)?|bank name|recipient( details| account)?|remark|paid with|session ?id|transaction (no|number)\.?|customer copy)\b/i;
/** The slip's footer: "SUPPORT" in capitals, not a remark that says Support. */
const OPAY_FOOTER = /^(SUPPORT|CUSTOMER COPY.*)$/;

/**
 * An Opay slip's recipient and remark, read by their labels. Text recognition
 * returns the label column and the value column in different orders from
 * slip to slip, sometimes runs a label and its value into one line, and
 * sometimes lists every label first; only the first two can be read this way.
 */
function opayByLabel(lines: string[]): {
  payee?: string;
  remark?: string;
  /** The slip shows a Remark label with nothing after it. */
  noRemark?: boolean;
} {
  const out: { payee?: string; remark?: string; noRemark?: boolean } = {};
  const isValue = (l: string | undefined) =>
    !!l &&
    !OPAY_LABEL.test(l) &&
    !OPAY_FOOTER.test(l) &&
    !MASKED_ACCOUNT.test(l);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const recipient = /^Recipient( Details)?$/i.test(l)
      ? null
      : l.match(/^Recipient(?: Details)?\s+(.+)$/i);
    if (recipient && !/^account\b/i.test(recipient[1])) {
      // "Recipient Details ADA OKORO", then any wrapped part of the name.
      const parts = [recipient[1]];
      for (let j = i + 1; isValue(lines[j]) && !/^\d+$/.test(lines[j]); j++)
        parts.push(lines[j]);
      out.payee = parts.join(" ");
    } else if (/^Recipient( Details)?$/i.test(l) && isValue(lines[i + 1])) {
      const parts: string[] = [];
      for (let j = i + 1; isValue(lines[j]); j++) parts.push(lines[j]);
      // A wrapped name ends at the account; a number alone is not a name.
      if (
        lines[i + 1 + parts.length] &&
        MASKED_ACCOUNT.test(lines[i + 1 + parts.length])
      )
        out.payee = parts.filter((x) => !/^\d+$/.test(x)).join(" ");
    }
    const remark = l.match(/^Remark\s+(.+)$/i);
    if (remark) out.remark = remark[1];
    else if (/^Remark$/i.test(l) && isValue(lines[i + 1]))
      out.remark = lines[i + 1];
    else if (/^Remark$/i.test(l) && out.remark === undefined) {
      // Labels in a run ("Remark", "SessionID", "Transaction No."), then
      // their values in the same order: the Remark takes its place in it.
      let from = i;
      while (from > 0 && OPAY_LABEL.test(lines[from - 1])) from--;
      let to = i;
      while (to + 1 < lines.length && OPAY_LABEL.test(lines[to + 1])) to++;
      const values = lines
        .slice(to + 1)
        .filter((v) => !OPAY_FOOTER.test(v) && !/opay-inc/i.test(v));
      const v = values[i - from];
      // A run that starts before the date is the older layout, read by order below.
      if (from === i && v && isValue(v) && !/^\d+$/.test(v)) out.remark = v;
    }
  }
  // Values interleaved with labels, but no Remark at all: there is no note.
  if (
    out.payee !== undefined &&
    out.remark === undefined &&
    !lines.some((l) => /^Remark\b/i.test(l))
  )
    out.noRemark = true;
  return out;
}

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
  const labelled = opayByLabel(lines);
  // Where text recognition kept a value with (or right after) its label, read
  // by label: the order of the lines then does not matter.
  let payee: string | undefined = labelled.payee;
  let remark: string | undefined = labelled.remark;
  // Otherwise all the labels came first and the values follow the date in
  // label order. Two layouts:
  //   "Sender Details / Recipient Details": sender, sender account, recipient
  //   (a name that can wrap onto two lines), recipient account, remark.
  //   "Sender / Sender Account / Bank name / Recipient / …": sender, account,
  //   bank, recipient, account, bank, remark.
  if (payee === undefined || remark === undefined) {
    const after = lines.slice(at + 1);
    let p: string | undefined;
    let r: string | undefined;
    if (lines.includes("Recipient Details")) {
      const rest = after.slice(2); // drop the sender and their account
      const end = rest.findIndex((l) => MASKED_ACCOUNT.test(l));
      if (end > 0) {
        p = rest.slice(0, end).join(" ");
        r = rest[end + 1];
      }
    } else {
      p = after[3];
      r = after[6];
    }
    payee ??= p;
    if (remark === undefined && !labelled.noRemark) remark = r;
  }
  if (remark && OPAY_LABEL.test(remark)) remark = undefined;
  if (payee && (OPAY_LABEL.test(payee) || MASKED_ACCOUNT.test(payee)))
    payee = undefined;
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

const labelled = (lines: string[], label: string) =>
  lines
    .find((l) => new RegExp(`^${label}\\s*:`, "i").test(l))
    ?.replace(/^[^:]*:\s*/, "")
    .trim() || null;

/** Providus slips print "Label: value" lines; a long narration wraps above its label. */
function readProvidus(lines: string[], posted: string): ReadResult {
  const amountText = labelled(lines, "Amount");
  const amount = amountText
    ? findAmount([amountText.replace(/^NGN\s*/i, "")])
    : null;
  if (!amount) return { ok: false, reason: "no amount" };
  const dateText = labelled(lines, "Transaction Date") ?? "";
  const d = dateText.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})\s+(\d\d:\d\d)/);
  const month = d ? MONTHS.indexOf(d[1].toLowerCase()) : -1;
  if (!d || month < 0) return { ok: false, reason: "no date on the slip" };
  const date = `${d[3]}-${String(month + 1).padStart(2, "0")}-${d[2].padStart(2, "0")}`;
  if (date > posted || date < addDays(posted, -3))
    return { ok: false, reason: "slip date doesn't match the day posted" };
  const sessionAt = lines.findIndex((l) => /^Session ID\s*:/i.test(l));
  const endAt = lines.findIndex((l) => /^DISCLAIMER/i.test(l));
  const wrapped = lines
    .slice(sessionAt + 1, endAt < 0 ? undefined : endAt)
    .map((l) => l.replace(/^Narration\s*:\s*/i, "").trim())
    .filter(Boolean);
  return {
    ok: true,
    receipt: {
      layout: "providus",
      kind: /TRANSFER/i.test(labelled(lines, "Type") ?? "") ? "TRANSFER" : null,
      amount,
      payee: labelled(lines, "Beneficiary Name"),
      note: wrapped.length ? wrapped.join("\n") : null,
      account: "Providus",
      date,
      time: d[4],
    },
  };
}

export function readReceiptText(lines: string[], postedOn: string): ReadResult {
  const clean = lines.map((l) => l.trim()).filter(Boolean);
  const text = clean.join(" ");
  if (/providus/i.test(clean[0] ?? "")) return readProvidus(clean, postedOn);
  if (clean[0] === "OPay" || /opay-inc/i.test(text))
    return readOpay(clean, postedOn);
  if (/Moni\w*point/i.test(text)) return readMoniepoint(clean, postedOn);
  return { ok: false, reason: "not a slip I know" };
}
