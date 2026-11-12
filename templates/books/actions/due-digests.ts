import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { dueDigests } from "../server/lib/schedule.js";

export default defineAction({
  description:
    "Digests due now (Lagos time, from 08:00) that have not been sent: daily for yesterday, weekly on Mondays, monthly on the 1st. waitingForExport means the sales file hasn't arrived.",
  schema: z.object({}),
  run: async () => ({ due: await dueDigests(await ownerOrg(), new Date()) }),
});
