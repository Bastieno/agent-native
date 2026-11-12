import { csvRecords, missingFrom, parseCsv } from "./csv.js";
import { toKobo } from "./money.js";
import { SALES_SUMMARY_COLUMNS } from "./sales-export.js";

/** Moniebook's payment method and sales-by-item reports, and telling the three exports apart. */

export type ReportKind = "sales-summary" | "payment-method" | "item-sales";

export const PAYMENT_METHOD_COLUMNS = [
  "Payment Method",
  "Number of Payments",
  "Refunded Count",
  "Amount Collected",
  "Amount Refunded",
  "Net Amount",
] as const;

export const ITEM_REPORT_COLUMNS = [
  "Item",
  "Category",
  "Total sold",
  "Gross sale amount",
  "Cost of items",
] as const;

export function detectReport(csv: string): ReportKind | null {
  const header = (parseCsv(csv)[0] ?? []).map((h) => h.trim());
  if (missingFrom(header, SALES_SUMMARY_COLUMNS).length === 0)
    return "sales-summary";
  if (missingFrom(header, PAYMENT_METHOD_COLUMNS).length === 0)
    return "payment-method";
  if (missingFrom(header, ITEM_REPORT_COLUMNS).length === 0)
    return "item-sales";
  return null;
}

/** Two dates in a Moniebook file name, in either order. The later one is exclusive. */
export function rangeFromFileName(
  name: string,
): { start: string; endExclusive: string } | null {
  const dates = name.match(/\d{4}-\d{2}-\d{2}/g);
  if (!dates || dates.length < 2) return null;
  const [a, b] = [dates[0], dates[1]].sort();
  return { start: a, endExclusive: b };
}

export interface PaymentMethodRow {
  method: string;
  payments: number;
  refundedCount: number;
  collected: number;
  refunded: number;
  net: number;
}

export function parsePaymentMethodReport(csv: string): {
  rows: PaymentMethodRow[];
  missingColumns: string[];
} {
  const { header, records } = csvRecords(csv);
  const missingColumns = missingFrom(header, PAYMENT_METHOD_COLUMNS);
  if (missingColumns.length) return { rows: [], missingColumns };
  return {
    missingColumns,
    rows: records
      .filter((r) => r["Payment Method"].trim())
      .map((r) => ({
        method: r["Payment Method"].trim(),
        payments: Number(r["Number of Payments"]) || 0,
        refundedCount: Number(r["Refunded Count"]) || 0,
        collected: toKobo(r["Amount Collected"] || 0),
        refunded: toKobo(r["Amount Refunded"] || 0),
        net: toKobo(r["Net Amount"] || 0),
      })),
  };
}

export interface ItemRow {
  name: string;
  category: string | null;
  totalSold: number;
  gross: number;
  costOfItems: number;
  unitCost: number | null;
}

export function parseItemReport(csv: string): {
  rows: ItemRow[];
  missingColumns: string[];
} {
  const { header, records } = csvRecords(csv);
  const missingColumns = missingFrom(header, ITEM_REPORT_COLUMNS);
  if (missingColumns.length) return { rows: [], missingColumns };
  return {
    missingColumns,
    rows: records
      .filter((r) => r["Item"].trim())
      .map((r) => {
        const totalSold = Number(r["Total sold"]) || 0;
        const costOfItems = toKobo(r["Cost of items"] || 0);
        return {
          name: r["Item"].trim(),
          category: r["Category"].trim() || null,
          totalSold,
          gross: toKobo(r["Gross sale amount"] || 0),
          costOfItems,
          unitCost: totalSold > 0 ? Math.round(costOfItems / totalSold) : null,
        };
      }),
  };
}
