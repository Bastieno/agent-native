import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { currentRole, memberOrg } from "../server/lib/access.js";
import { DEFAULT_THRESHOLDS } from "../server/lib/setup.js";
import { rows } from "../server/lib/sql.js";

export default defineAction({
  description:
    "Books settings: thresholds (kobo), digest recipients, the WhatsApp numbers Books listens to, Moniebook categories and their business, expense categories, and which connections are set up.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const orgId = await memberOrg();
    const [s] = await rows(
      `SELECT thresholds, recipients, allowed_numbers FROM books_settings WHERE org_id = ?`,
      [orgId],
    );
    const categories = await rows(
      `SELECT c.name, b.slug AS business FROM item_categories c LEFT JOIN businesses b ON b.id = c.business_id WHERE c.org_id = ? ORDER BY c.name`,
      [orgId],
    );
    const expenseCategories = await rows(
      `SELECT name FROM expense_categories WHERE org_id = ? ORDER BY sort`,
      [orgId],
    );
    const [job] = await rows(
      `SELECT id FROM resources WHERE path = 'jobs/books-digests.md' LIMIT 1`,
    ).catch(() => []);
    const role = await currentRole();
    return {
      orgId,
      canEdit: role === "owner" || role === "admin",
      thresholds: {
        ...DEFAULT_THRESHOLDS,
        ...JSON.parse(s?.thresholds || "{}"),
      },
      recipients: JSON.parse(s?.recipients || "[]"),
      allowedNumbers: JSON.parse(s?.allowed_numbers || "{}"),
      itemCategories: categories.map((c) => ({
        name: c.name as string,
        business: (c.business as string) ?? null,
      })),
      expenseCategories: expenseCategories.map((c) => c.name as string),
      connections: {
        whatsapp: !!(
          process.env.WHATSAPP_ACCESS_TOKEN &&
          process.env.WHATSAPP_PHONE_NUMBER_ID
        ),
        moniepoint: !!process.env.MONIEPOINT_WEBHOOK_SECRET,
        cron: !!process.env.CRON_SECRET,
        digestJob: !!job,
      },
    };
  },
});
