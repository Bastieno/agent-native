import {
  detectReport,
  parseItemReport,
  parsePaymentMethodReport,
  rangeFromFileName,
  type ReportKind,
} from "./moniebook-reports.js";
import {
  importItemReport,
  importPaymentMethodReport,
  type Range,
} from "./import-reports.js";
import { importParsedOrders } from "./import-sales.js";
import { parseSalesExport } from "./sales-export.js";
import { reconcileDays } from "./reconcile-days.js";

export const NOT_A_REPORT =
  "This doesn't look like a Moniebook sales summary, payment method or item report.";

/** Import any of the three Moniebook exports, then re-reconcile the days it touched. */
export async function importMoniebookFile(
  orgId: string,
  csv: string,
  opts: {
    fileName: string;
    range?: Range;
    receivedVia: "whatsapp" | "upload";
    kind?: ReportKind;
  },
) {
  const kind = opts.kind ?? detectReport(csv);
  if (!kind) throw new Error(NOT_A_REPORT);
  const meta = { fileName: opts.fileName, receivedVia: opts.receivedVia };
  if (kind === "sales-summary") {
    const { orders, missingColumns } = parseSalesExport(csv);
    if (missingColumns.length)
      throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
    const result = await importParsedOrders(orgId, orders, meta);
    await reconcileDays(orgId, result.days);
    return { kind, ...result, missingColumns };
  }
  const range = opts.range ?? rangeFromFileName(opts.fileName);
  if (!range) throw new Error("Which dates does this file cover?");
  if (kind === "payment-method") {
    const { rows, missingColumns } = parsePaymentMethodReport(csv);
    if (missingColumns.length)
      throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
    const result = await importPaymentMethodReport(orgId, rows, range, meta);
    await reconcileDays(orgId, result.days);
    return { kind, ...result, range };
  }
  const { rows, missingColumns } = parseItemReport(csv);
  if (missingColumns.length)
    throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
  const result = await importItemReport(orgId, rows, range, meta);
  await reconcileDays(orgId, result.days);
  return { kind, ...result, range };
}
