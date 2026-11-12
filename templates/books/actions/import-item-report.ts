import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import {
  parseItemReport,
  rangeFromFileName,
} from "../server/lib/moniebook-reports.js";
import { importItemReport } from "../server/lib/import-reports.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";
import { rangeSchema } from "./import-payment-method-report.js";

export default defineAction({
  description:
    "Import a Moniebook sales-by-item report: sets each item's category and unit cost. Items with no category are returned in needingCategory — guess one from the name with set-item-category (confirmed: false).",
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
    const { rows, missingColumns } = parseItemReport(csv);
    if (missingColumns.length)
      throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
    const result = await importItemReport(orgId, rows, dates, {
      fileName,
      receivedVia,
    });
    await reconcileDays(orgId, result.days);
    return { ...result, range: dates };
  },
});
