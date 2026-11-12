import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { run } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Save your write-up of a digest: 3–6 sentences on what changed, then 'Going well' and 'To watch' from figures.trends only. Quote only figures from build-digest; never name customers, senders or staff.",
  schema: z.object({ digestId: z.string(), commentary: z.string().max(1500) }),
  run: async ({ digestId, commentary }) => {
    const orgId = await ownerOrg();
    await run(`UPDATE digests SET commentary = ? WHERE org_id = ? AND id = ?`, [
      commentary,
      orgId,
      digestId,
    ]);
    return { digestId, saved: true };
  },
});
