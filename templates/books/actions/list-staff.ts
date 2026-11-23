import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { memberOrg } from "../server/lib/access.js";
import { loadStaff } from "../server/lib/staff.js";

export default defineAction({
  description:
    "The people on the payroll and the business each works for (their salaries go there).",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => ({ staff: await loadStaff(await memberOrg()) }),
});
