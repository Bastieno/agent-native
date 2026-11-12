import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { importMoniebookFile } from "../server/lib/import-file.js";
import { rangeSchema } from "../server/lib/action-fields.js";

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
    return importMoniebookFile(orgId, csv, {
      fileName,
      range,
      receivedVia,
      kind: "payment-method",
    });
  },
});
