import {
  detectReport,
  parseItemReport,
  parsePaymentMethodReport,
  rangeFromFileName,
  type ReportKind,
} from "./moniebook-reports.js";
import {
  completedTotals,
  importItemReport,
  importPaymentMethodReport,
  type Range,
} from "./import-reports.js";
import { addDays } from "./lagos-time.js";
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
  const named = opts.range ? null : rangeFromFileName(opts.fileName);
  let range = opts.range ?? named;
  if (!range) throw new Error("Which dates does this file cover?");
  if (kind === "payment-method") {
    const { rows, missingColumns } = parsePaymentMethodReport(csv);
    if (missingColumns.length)
      throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
    const reportTotal = rows.reduce((a, r) => a + r.collected, 0);
    let endDateIncluded = false;
    if (named)
      ({ range, endDateIncluded } = await readEndDate(
        orgId,
        range,
        reportTotal,
        "collected",
      ));
    const result = await importPaymentMethodReport(orgId, rows, range, meta);
    await reconcileDays(orgId, result.days);
    return { kind, ...result, range, endDateIncluded };
  }
  const { rows, missingColumns } = parseItemReport(csv);
  if (missingColumns.length)
    throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
  let endDateIncluded = false;
  if (named)
    ({ range, endDateIncluded } = await readEndDate(
      orgId,
      range,
      rows.reduce((a, r) => a + r.gross, 0),
      "total",
    ));
  const result = await importItemReport(orgId, rows, range, meta);
  await reconcileDays(orgId, result.days);
  return { kind, ...result, range, endDateIncluded };
}

/**
 * Moniebook file names sometimes end on the day after the range and
 * sometimes on its last day. Read the end as the day after, unless the
 * totals only agree when the named day is included.
 */
async function readEndDate(
  orgId: string,
  range: Range,
  reportTotal: number,
  field: "collected" | "total",
) {
  const exclusive = (await completedTotals(orgId, range))[field];
  if (exclusive === reportTotal) return { range, endDateIncluded: false };
  const wider = {
    start: range.start,
    endExclusive: addDays(range.endExclusive, 1),
  };
  if ((await completedTotals(orgId, wider))[field] === reportTotal)
    return { range: wider, endDateIncluded: true };
  return { range, endDateIncluded: false };
}
