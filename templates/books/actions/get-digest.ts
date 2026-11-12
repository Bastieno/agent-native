import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { loadDigest } from "../server/lib/digests.js";

export default defineAction({
  description:
    "One saved digest: its figures, commentary and delivery results.",
  schema: z.object({ digestId: z.string() }),
  http: { method: "GET" },
  run: async ({ digestId }) => loadDigest(await memberOrg(), digestId),
});
