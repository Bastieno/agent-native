import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { queueReceipts } from "../server/lib/history.js";

export default defineAction({
  description:
    "Queue up to 10 old receipts from a WhatsApp chat export, each dated by the message it came in. The Expenses page unzips the export in the browser and sends its receipts here in small batches.",
  schema: z.object({
    receipts: z
      .array(
        z.object({
          sentAt: z.string(),
          note: z.string().nullable(),
          fileName: z.string(),
          mimeType: z.string(),
          dataBase64: z.string(),
        }),
      )
      .min(1)
      .max(10),
  }),
  run: async ({ receipts }) =>
    queueReceipts(
      await ownerOrg(),
      receipts.map((r) => ({ ...r, note: r.note ?? null })),
    ),
});
