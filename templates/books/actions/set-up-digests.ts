import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg, requireEmail } from "../server/lib/access.js";
import { DIGEST_JOB_PATH, installDigestJob } from "../server/lib/schedule.js";

export default defineAction({
  description:
    "Turn on the daily, weekly and monthly digests: installs the owner's hourly job that sends whatever is due.",
  schema: z.object({}),
  run: async () => {
    const orgId = await ownerOrg();
    await installDigestJob(requireEmail(), orgId);
    return { installed: DIGEST_JOB_PATH };
  },
});
