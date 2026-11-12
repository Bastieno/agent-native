import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { rangeSchema } from "../server/lib/action-fields.js";
import { importMoniebookFile } from "../server/lib/import-file.js";
import { fetchWhatsAppFile } from "../server/lib/whatsapp-files.js";

export default defineAction({
  description:
    "Import a Moniebook CSV that was sent to the WhatsApp number — pass the mediaId and file name from the '[Attached file: …, mediaId …]' line. Works out whether it is a sales summary, payment method report or item report.",
  schema: z.object({
    mediaId: z.string(),
    fileName: z.string(),
    range: rangeSchema.optional(),
  }),
  run: async ({ mediaId, fileName, range }) => {
    const orgId = await ownerOrg();
    const file = await fetchWhatsAppFile(mediaId);
    const csv = Buffer.from(file.dataBase64, "base64").toString("utf8");
    return importMoniebookFile(orgId, csv, {
      fileName,
      range,
      receivedVia: "whatsapp",
    });
  },
});
