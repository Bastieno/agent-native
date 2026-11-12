import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { toKobo } from "../server/lib/money.js";
import { DEFAULT_THRESHOLDS } from "../server/lib/setup.js";
import { rows, run } from "../server/lib/sql.js";
import { normaliseNumber } from "../server/lib/whatsapp-books.js";

const person = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  whatsapp: z.string().optional().describe("Phone number, e.g. 0803 000 0000"),
  role: z.enum(["owner", "partner"]).default("owner"),
});

export default defineAction({
  description:
    "Change Books settings. Thresholds are in naira. people replaces the digest recipients; each person's WhatsApp number is also the number Books listens to for them (allowed numbers), mapped to their email.",
  schema: z.object({
    thresholds: z
      .object({
        houseLeakagesPerDay: z
          .number()
          .nonnegative()
          .optional()
          .describe("Naira, at cost"),
        largeExpense: z.number().nonnegative().optional().describe("Naira"),
        spikePct: z.number().nonnegative().optional(),
        manualWindowMinutes: z.number().int().positive().optional(),
      })
      .optional(),
    people: z.array(person).optional(),
  }),
  run: async ({ thresholds, people }) => {
    const orgId = await ownerOrg();
    const [s] = await rows(
      `SELECT thresholds FROM books_settings WHERE org_id = ?`,
      [orgId],
    );
    if (thresholds) {
      const cur = {
        ...DEFAULT_THRESHOLDS,
        ...JSON.parse(s?.thresholds || "{}"),
      };
      if (thresholds.houseLeakagesPerDay != null)
        cur.houseLeakagesPerDay = toKobo(thresholds.houseLeakagesPerDay);
      if (thresholds.largeExpense != null)
        cur.largeExpense = toKobo(thresholds.largeExpense);
      if (thresholds.spikePct != null) cur.spikePct = thresholds.spikePct;
      if (thresholds.manualWindowMinutes != null)
        cur.manualWindowMinutes = thresholds.manualWindowMinutes;
      await run(`UPDATE books_settings SET thresholds = ? WHERE org_id = ?`, [
        JSON.stringify(cur),
        orgId,
      ]);
    }
    if (people) {
      const recipients = people.map((p) => ({
        ...p,
        whatsapp: p.whatsapp ? normaliseNumber(p.whatsapp) : undefined,
      }));
      const allowed: Record<string, string> = {};
      for (const p of recipients)
        if (p.whatsapp && p.email) allowed[p.whatsapp] = p.email;
      await run(
        `UPDATE books_settings SET recipients = ?, allowed_numbers = ? WHERE org_id = ?`,
        [JSON.stringify(recipients), JSON.stringify(allowed), orgId],
      );
    }
    return { saved: true };
  },
});
