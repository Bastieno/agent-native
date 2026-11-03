import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getRequestUserEmail } from "@agent-native/core/server";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  creditStatus,
  emailOperators,
  schoolName,
} from "../server/lib/credits.js";
import { runSql } from "../server/lib/raw-sql.js";

/**
 * "We've paid": tells the people running Ellai that a top-up is on its way, so
 * they can check the payment and add the credit. It adds nothing by itself.
 */
export default defineAction({
  description:
    "Tell the people running Ellai that the school has paid for more assistant credit, so they can add it. Takes the pack the school paid for and its payment reference. It does not add credit itself. Admin only; used by the Top up form in Settings, Assistant.",
  schema: z.object({
    credits: z.coerce.number().int().min(1).max(10_000_000).optional(),
    reference: z.string().trim().max(120).optional(),
    note: z.string().trim().max(500).optional(),
  }),
  http: { method: "POST" },
  run: async ({ credits, reference, note }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const by = getRequestUserEmail() ?? "unknown";
    const status = await creditStatus(orgId);
    if (status.mode === "none") {
      throw new Error(
        "This school uses its own key, so it has no credit to top up.",
      );
    }
    await runSql(
      sql`INSERT INTO credit_top_up_requests (id, school_id, requested_by, credits, reference, note, status, created_at)
          VALUES (${nanoid()}, ${orgId}, ${by}, ${credits ?? null}, ${reference ?? null}, ${note ?? null}, 'pending', ${new Date().toISOString()})`,
    );
    const name = await schoolName(orgId);
    const told = await emailOperators(`Top-up paid: ${name}`, [
      `${name} says it has paid${credits ? ` for ${credits.toLocaleString("en")} credits` : ""}.`,
      `Reference: ${reference || "none given"}. Asked by ${by}.${note ? ` ${note}` : ""}`,
      `Add it with: pnpm credits:grant --school ${orgId} --credits ${credits ?? "N"} --ref "..."`,
    ]);
    return {
      requested: true,
      message: told
        ? "Thank you. We have been told and will add the credit once we see the payment."
        : "Thank you. This is recorded, and the credit will be added once the payment is seen.",
    };
  },
});
