import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { rangeSchema } from "../server/lib/action-fields.js";
import { importMoniebookFile } from "../server/lib/import-file.js";

export default defineAction({
  description:
    "Import any Moniebook export (sales summary, payment method or sales by item); which one it is is read from its columns.",
  schema: z.object({
    csv: z.string(),
    fileName: z.string(),
    range: rangeSchema.optional(),
  }),
  run: async ({ csv, fileName, range }) =>
    importMoniebookFile(await ownerOrg(), csv, {
      fileName,
      range,
      receivedVia: "upload",
    }),
});
