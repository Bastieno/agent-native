import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { sendDigest } from "../server/lib/digests.js";

export default defineAction({
  description:
    "Send a saved digest to the owner and partner by WhatsApp and email. It stays on the Reports page either way.",
  schema: z.object({ digestId: z.string() }),
  run: async ({ digestId }) => sendDigest(await ownerOrg(), digestId),
});
