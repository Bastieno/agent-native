import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { importMoniebookFile } from "../server/lib/import-file.js";
import { rangeSchema } from "../server/lib/action-fields.js";

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
    return importMoniebookFile(orgId, csv, {
      fileName,
      range,
      receivedVia,
      kind: "item-sales",
    });
  },
});
