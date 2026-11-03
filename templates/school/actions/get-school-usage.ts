import { defineAction } from "@agent-native/core";
import { getUsageSummary } from "@agent-native/core/usage";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { rowsOf } from "../server/lib/raw-sql.js";

const ROLE_WORDS: Record<string, string> = {
  school_admin: "Admins",
  subject_coordinator: "Subject coordinators",
  teacher: "Teachers",
  student: "Learners",
};

/**
 * What the assistant cost this school, and who it was spent on.
 *
 * Every model run is recorded with the person who asked and the school it ran
 * in (`token_usage`), so this is the school's own spend only: the same person's
 * use at another school is not counted here. Runs from before schools were
 * recorded (early November 2026) belong to no school and are left out. Cost is
 * the app's estimate from published prices, not the provider's invoice.
 */
export default defineAction({
  description:
    "What the assistant has cost this school over the last N days (default 30): the estimated total, split by role (admins, teachers, learners), the people who used it most, and which models ran. Use it for 'who uses the assistant most?', 'what is the assistant costing us?' or 'how much do learners use it?'. Costs are estimates in US dollars. Admin only.",
  schema: z.object({
    days: z.coerce.number().int().min(1).max(365).default(30),
    top: z.coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(10)
      .describe("How many of the heaviest users to list"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const summary = await getUsageSummary({
      orgId,
      sinceMs: Date.now() - args.days * 86_400_000,
    });

    // Name and role for each person who used it, from this school's records.
    const emails = summary.byOwner.map((b) => b.key.toLowerCase());
    const people = new Map<string, { name: string; role: string }>();
    if (emails.length) {
      const users = await rowsOf<{ id: string; email: string; name: string }>(
        sql`SELECT id, email, name FROM "user" WHERE LOWER(email) IN (${sql.join(
          emails.map((e) => sql`${e}`),
          sql`, `,
        )})`,
      );
      const profiles = users.length
        ? await getDb()
            .select({
              userId: schema.schoolProfiles.userId,
              role: schema.schoolProfiles.schoolRole,
            })
            .from(schema.schoolProfiles)
            .where(
              and(
                eq(schema.schoolProfiles.schoolId, orgId),
                inArray(
                  schema.schoolProfiles.userId,
                  users.map((u) => u.id),
                ),
              ),
            )
        : [];
      const roleOf = new Map(profiles.map((p) => [p.userId, p.role]));
      for (const u of users) {
        people.set(u.email.toLowerCase(), {
          name: u.name || u.email,
          role: roleOf.get(u.id) ?? "",
        });
      }
    }

    // To a hundredth of a cent: a learner's question costs less than a cent.
    const dollars = (cents: number) => Math.round(cents * 100) / 10_000;
    const byRole = new Map<
      string,
      { cost: number; requests: number; people: number }
    >();
    const ranked = summary.byOwner.map((b) => {
      const who = people.get(b.key.toLowerCase());
      const role = who?.role ?? "";
      const r = byRole.get(role) ?? { cost: 0, requests: 0, people: 0 };
      r.cost += b.cents;
      r.requests += b.calls;
      r.people += 1;
      byRole.set(role, r);
      return {
        name: who?.name ?? b.key,
        role: ROLE_WORDS[role] ?? "No longer at the school",
        requests: b.calls,
        costUsd: dollars(b.cents),
        averageCostUsd: b.calls ? dollars(b.cents / b.calls) : 0,
      };
    });

    return {
      days: args.days,
      totalCostUsd: dollars(summary.totalCents),
      requests: summary.totalCalls,
      people: summary.byOwner.length,
      byRole: [...byRole.entries()]
        .map(([role, r]) => ({
          role: ROLE_WORDS[role] ?? "No longer at the school",
          people: r.people,
          requests: r.requests,
          costUsd: dollars(r.cost),
        }))
        .sort((a, b) => b.costUsd - a.costUsd),
      topUsers: ranked.slice(0, args.top),
      byModel: summary.byModel.map((b) => ({
        model: b.key,
        requests: b.calls,
        costUsd: dollars(b.cents),
      })),
      byDay: summary.byDay.map((d) => ({
        date: d.date,
        requests: d.calls,
        costUsd: dollars(d.cents),
      })),
      note: "Estimated from published model prices; the provider's invoice is the final figure. Use from before early November 2026 was not recorded per school.",
    };
  },
});
