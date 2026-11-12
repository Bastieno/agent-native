import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { parseSalesExport } from "../server/lib/sales-export.js";
import { importParsedOrders } from "../server/lib/import-sales.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";

export default defineAction({
  description:
    "Import a Moniebook sales summary CSV (one row per order). Safe to send twice: orders are matched by order number, and a later file updates cancellations and refunds.",
  schema: z.object({
    csv: z.string().describe("The CSV file's text"),
    fileName: z.string().describe("The file's name, as exported"),
    receivedVia: z.enum(["whatsapp", "upload"]).default("upload"),
  }),
  run: async ({ csv, fileName, receivedVia }) => {
    const orgId = await ownerOrg();
    const { orders, missingColumns } = parseSalesExport(csv);
    if (missingColumns.length)
      throw new Error(`This file is missing: ${missingColumns.join(", ")}`);
    const result = await importParsedOrders(orgId, orders, {
      fileName,
      receivedVia,
    });
    await reconcileDays(orgId, result.days);
    return { ...result, missingColumns };
  },
});
