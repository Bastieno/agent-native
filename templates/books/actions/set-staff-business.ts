import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { saveStaff } from "../server/lib/staff.js";

export default defineAction({
  description:
    "Remember which business a person on the payroll works for (the Lounge or the Hub). Their salaries are then filed under that business. Matches the payee's first two names. Owner only.",
  schema: z.object({
    payee: z.string().describe("The person's name as it appears on transfers"),
    business: z.enum(["lounge", "hub"]),
  }),
  run: async ({ payee, business }) =>
    saveStaff(await ownerOrg(), payee, business),
});
