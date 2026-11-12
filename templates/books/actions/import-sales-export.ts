import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { importMoniebookFile } from "../server/lib/import-file.js";

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
    return importMoniebookFile(orgId, csv, {
      fileName,
      receivedVia,
      kind: "sales-summary",
    });
  },
});
