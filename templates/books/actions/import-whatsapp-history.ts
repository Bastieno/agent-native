import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { queueChatExport } from "../server/lib/history.js";

export default defineAction({
  description:
    "Load old receipts from a WhatsApp 'Export chat' zip (with media). Each receipt image or PDF is queued with its message date; read them from list-pending-receipts. Large exports are uploaded on the Expenses page instead.",
  schema: z.object({ zipBase64: z.string() }),
  run: async ({ zipBase64 }) =>
    queueChatExport(await ownerOrg(), Buffer.from(zipBase64, "base64")),
});
