import { csvRecords, missingFrom } from "./csv.js";
import { toKobo } from "./money.js";

/** Reads Moniebook's "Sales summary" export: one row per order. */

export type PaymentMethod =
  | "Bank Transfer"
  | "Card"
  | "Cash"
  | "Transfer to Opay"
  | "The House"
  | "Subscription Perk"
  | "Leakages"
  | "Accepted manually"
  | (string & {});

export interface ParsedLeg {
  method: PaymentMethod;
  reference: string | null;
  bank: string | null;
  senderName: string | null;
  senderAccountMasked: string | null;
}
export interface ParsedLine {
  name: string;
  quantity: number;
  /** The item's listed price in the export: today's price, not always the price paid. */
  unitPrice: number; // kobo
  /** This line's share of what the order actually cost; lines always add up to the total. */
  lineTotal: number; // kobo
}
export interface ParsedOrder {
  orderNumber: string;
  orderedAt: string; // 'YYYY-MM-DD HH:mm:ss', Lagos local
  day: string;
  branchName: string;
  status: "COMPLETED" | "CANCELLED";
  refundAmount: number;
  staffName: string;
  customerName: string | null;
  total: number;
  collectedAmount: number;
  change: number;
  paymentMode: "REGULAR" | "SPLIT";
  methods: PaymentMethod[];
  legs: ParsedLeg[];
  lines: ParsedLine[];
}

export const SALES_SUMMARY_COLUMNS = [
  "orderNumber",
  "orderDate",
  "branchName",
  "staffName",
  "customerName",
  "total",
  "collectedAmount",
  "change",
  "status",
  "refundAmount",
  "paymentMode",
  "paymentMethodNames",
  "paymentDetails",
  "itemNames",
  "unitPrice",
] as const;

const field = (segment: string, label: string): string | null => {
  const m = segment.match(new RegExp(`(?:^|\\|)\\s*${label}:\\s*([^|]*)`));
  const v = m?.[1]?.trim();
  return v ? v : null;
};

/** One payment segment of `paymentDetails` → a leg. */
export function parseLeg(segment: string): ParsedLeg {
  const s = segment.trim();
  const empty = {
    reference: null,
    bank: null,
    senderName: null,
    senderAccountMasked: null,
  };
  if (/^Cash Payment/i.test(s)) return { method: "Cash", ...empty };
  const transfer = s.match(/^Ref:\s*AP_TRSF\|[^|]*\|(\d+)/);
  if (transfer) {
    return {
      method: "Bank Transfer",
      reference: transfer[1],
      bank: field(s, "Bank"),
      senderName: field(s, "Sender"),
      senderAccountMasked: field(s, "Sender Account"),
    };
  }
  if (/^Card:/.test(s))
    return { method: "Card", ...empty, reference: field(s, "RRN") };
  const named = s.match(/^(.+?) Reference:\s*(.*)$/);
  if (named) {
    const ref = named[2].trim();
    return {
      method: named[1].trim(),
      ...empty,
      reference: ref && ref !== "N/A" ? ref : null,
    };
  }
  return { method: s, ...empty };
}

/**
 * Share an order's real total across its lines in proportion to their listed
 * prices (by quantity when nothing has a price). The export lists today's
 * prices, so an order rung up before a price change would otherwise not add up.
 * Largest-remainder rounding keeps the shares summing to the total exactly.
 */
export function allocateTotal(total: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (!weights.length || sum <= 0) return weights.map(() => 0);
  const exact = weights.map((w) => (total * w) / sum);
  const out = exact.map(Math.floor);
  let left = total - out.reduce((a, b) => a + b, 0);
  const order = exact
    .map((e, i) => [e - Math.floor(e), i] as const)
    .sort((a, b) => b[0] - a[0]);
  for (const [, i] of order) {
    if (left <= 0) break;
    out[i]++;
    left--;
  }
  return out;
}

function parseLines(
  itemNames: string,
  unitPrice: string,
  total: number,
): ParsedLine[] {
  const prices = new Map<string, number>();
  for (const part of unitPrice.split(" | ")) {
    const at = part.lastIndexOf(" - ");
    if (at > 0)
      prices.set(part.slice(0, at).trim(), toKobo(part.slice(at + 3)));
  }
  const lines: ParsedLine[] = [];
  for (const part of itemNames.split(" | ")) {
    const m = part.trim().match(/^(\d+) x (.+)$/);
    if (!m) continue;
    const name = m[2].trim();
    lines.push({
      name,
      quantity: Number(m[1]),
      unitPrice: prices.get(name) ?? 0,
      lineTotal: 0,
    });
  }
  const listed = lines.map((l) => l.quantity * l.unitPrice);
  const weights = listed.some((w) => w > 0)
    ? listed
    : lines.map((l) => l.quantity);
  allocateTotal(total, weights).forEach((share, i) => {
    lines[i].lineTotal = share;
  });
  return lines;
}

const amount = (v: string) => (v.trim() ? toKobo(v) : 0);

export function parseSalesExport(csv: string): {
  orders: ParsedOrder[];
  missingColumns: string[];
} {
  const { header, records } = csvRecords(csv);
  const missingColumns = missingFrom(header, SALES_SUMMARY_COLUMNS);
  if (missingColumns.length) return { orders: [], missingColumns };
  const orders = records.map((r): ParsedOrder => {
    const orderedAt = r.orderDate.trim();
    return {
      orderNumber: r.orderNumber.trim(),
      orderedAt,
      day: orderedAt.slice(0, 10),
      branchName: r.branchName.trim(),
      status: r.status.trim() === "CANCELLED" ? "CANCELLED" : "COMPLETED",
      refundAmount: amount(r.refundAmount),
      staffName: r.staffName.trim().replace(/\s+/g, " "),
      customerName: r.customerName.trim() || null,
      total: amount(r.total),
      collectedAmount: amount(r.collectedAmount),
      change: amount(r.change),
      paymentMode: r.paymentMode.trim() === "SPLIT" ? "SPLIT" : "REGULAR",
      methods: r.paymentMethodNames
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      legs: r.paymentDetails.trim()
        ? r.paymentDetails.split(" || ").map(parseLeg)
        : [],
      lines: parseLines(r.itemNames, r.unitPrice, amount(r.total)),
    };
  });
  return { orders, missingColumns };
}
