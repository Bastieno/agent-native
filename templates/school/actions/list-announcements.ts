import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDbExec } from "@agent-native/core/db";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, or, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { rowsOf } from "../server/lib/raw-sql.js";
import { realNameOrNull } from "../shared/person-name.js";

export default defineAction({
  description:
    "List announcements for the school, newest first, a page at a time. Each says who posted it and which classes it is for; one posted to several classes comes back once, with every class named. The reply gives the real total, not just this page.",
  schema: z.object({
    classId: z
      .string()
      .optional()
      .describe("Only announcements for this class"),
    scope: z
      .enum(["school", "class", "all"])
      .optional()
      .default("all")
      .describe("Whole school, classes, or both"),
    search: z
      .string()
      .max(200)
      .optional()
      .describe("Words to find in the title or text"),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0),
  }),
  http: { method: "POST" },
  // Reads only: without this every call tells open pages to refetch.
  readOnly: true,
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const exec = getDbExec();

    // One announcement posted to several classes is several rows sharing a
    // group id; counting and paging go by that, so a card is one item.
    const where: string[] = ["school_id = ?"];
    const params: unknown[] = [orgId];
    if (args.classId) {
      where.push("class_id = ?");
      params.push(args.classId);
    }
    if (args.scope && args.scope !== "all") {
      where.push("scope = ?");
      params.push(args.scope);
    }
    const needle = args.search?.trim().toLowerCase();
    if (needle) {
      where.push("(lower(title) LIKE ? OR lower(content) LIKE ?)");
      params.push(`%${needle}%`, `%${needle}%`);
    }
    const filter = where.join(" AND ");

    const totalRes = await exec.execute({
      sql: `SELECT COUNT(*) AS n FROM (SELECT 1 FROM announcements WHERE ${filter} GROUP BY COALESCE(group_id, id)) t`,
      args: params,
    });
    const total = Number((totalRes.rows[0] as any)?.n ?? 0);

    const keyRes = await exec.execute({
      sql: `SELECT COALESCE(group_id, id) AS gk, MAX(created_at) AS at FROM announcements WHERE ${filter} GROUP BY COALESCE(group_id, id) ORDER BY at DESC, gk LIMIT ? OFFSET ?`,
      args: [...params, args.limit, args.offset],
    });
    const keys = (keyRes.rows as any[]).map((r) => String(r.gk));
    if (keys.length === 0) {
      return { items: [], total, limit: args.limit, offset: args.offset };
    }

    const db = getDb();
    const rows = await db
      .select()
      .from(schema.announcements)
      .where(
        and(
          eq(schema.announcements.schoolId, orgId),
          or(
            inArray(schema.announcements.id, keys),
            inArray(schema.announcements.groupId, keys),
          ),
        ),
      );

    const classIds = [
      ...new Set(rows.map((r) => r.classId).filter((c): c is string => !!c)),
    ];
    const classNames = new Map<string, string>();
    if (classIds.length > 0) {
      const cls = await db
        .select({ id: schema.classes.id, name: schema.classes.name })
        .from(schema.classes)
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            inArray(schema.classes.id, classIds),
          ),
        );
      for (const c of cls) classNames.set(c.id, c.name);
    }

    // The author is stored by email; show the person's name.
    const emails = [
      ...new Set(
        rows.map((r) => r.authorUserId).filter((e) => e.includes("@")),
      ),
    ];
    const names = new Map<string, string | null>();
    if (emails.length > 0) {
      const people = (await rowsOf(
        sql`SELECT email, name FROM "user" WHERE email IN (${sql.join(
          emails.map((e) => sql`${e}`),
          sql`, `,
        )})`,
      )) as Array<{ email: string; name: string | null }>;
      for (const p of people)
        names.set(p.email, realNameOrNull(p.name, p.email));
    }

    // Fold the rows of each group into one item, in the order paged.
    const byKey = new Map<string, any>();
    for (const r of rows) {
      const key = r.groupId ?? r.id;
      const cls = r.classId
        ? { id: r.classId, name: classNames.get(r.classId) ?? "A class" }
        : null;
      const edited = r.updatedAt !== r.createdAt;
      const item = byKey.get(key);
      if (item) {
        if (cls) item.classes.push(cls);
        item.ids.push(r.id);
        item.edited = item.edited || edited;
        if (r.createdAt < item.createdAt) item.createdAt = r.createdAt;
        continue;
      }
      byKey.set(key, {
        ...r,
        ids: [r.id],
        classes: cls ? [cls] : [],
        edited,
        authorName:
          names.get(r.authorUserId) ??
          (r.authorUserId.includes("@") ? r.authorUserId : null),
      });
    }
    const items = keys
      .map((k) => byKey.get(k))
      .filter(Boolean)
      .map((item) => ({
        ...item,
        classes: item.classes.sort((a: any, b: any) =>
          a.name.localeCompare(b.name),
        ),
      }));
    return { items, total, limit: args.limit, offset: args.offset };
  },
});
