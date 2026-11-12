import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import {
  parsePaymentMethodReport,
  rangeFromFileName,
} from "../server/lib/moniebook-reports.js";
import { importPaymentMethodReport } from "../server/lib/import-reports.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";

export const rangeSchema = z.object({
  start: z.string().describe("First day, YYYY-MM-DD"),
  endExclusive: z
    .string()
    .describe("The day after the last day, YYYY-MM-DD (Moniebook's end date)"),
});

export default defineAction({
  description:
    "Import a Moniebook payment method report. Its dates come from the file name (the end date is exclusive) unless given. Returns a check comparing it with the sales summary for the same days.",
  schema: z.object({
    csv: z.string(),
    fileName: z.string(),
    range: rangeSchema.optional(),
    receivedVia: z.enum(["whatsapp", "upload"]).default("upload"),
  }),
  run: async ({ csv, fileName, range, receivedVia }) => {
    const orgId = await ownerOrg();
    const dates = range ?? rangeFromFileName(fileName);
    if (!dates) throw new Error("Which dates does this file cover?");
    const { rows, missingColumns } = parsePaymentMethodReport(csv);
    if (missingColumns.length)
      throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
    const result = await importPaymentMethodReport(orgId, rows, dates, {
      fileName,
      receivedVia,
    });
    await reconcileDays(orgId, result.days);
    return { ...result, range: dates };
  },
});
