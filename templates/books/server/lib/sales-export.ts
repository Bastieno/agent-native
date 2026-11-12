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
  unitPrice: number; // kobo
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

function parseLines(itemNames: string, unitPrice: string): ParsedLine[] {
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
    });
  }
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
      lines: parseLines(r.itemNames, r.unitPrice),
    };
  });
  return { orders, missingColumns };
}
