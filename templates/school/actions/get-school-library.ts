import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray, isNull, or } from "drizzle-orm";
import { z } from "zod";
import { boolish } from "../shared/zod-json.js";

/**
 * Everything this school can plan from: the syllabuses it imported, and the
 * samples that ship with the app.
 *
 * A school that imports three subjects over a term had nowhere to see them —
 * the only view was the import each one came in through, and nothing said
 * "this is our syllabus". Provenance travels with each objective, so the page
 * can answer "where does this come from?" without anyone opening a database.
 */
export default defineAction({
  description:
    "The curriculum libraries available to this school: its own imported syllabuses and the samples that ship with the app, with their subjects, strands and objectives. Use it to show what a school plans from, or to find an objective to correct.",
  schema: z.object({
    name: z
      .string()
      .optional()
      .describe("One syllabus by name. Omit for all of them."),
    subject: z.string().optional().describe("One subject within it"),
    includeSamples: boolish()
      .optional()
      .default(false)
      .describe(
        "Include the libraries that ship with the app. Off by default — a school's own syllabus is the interesting one.",
      ),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const conditions = [
      args.includeSamples
        ? or(
            isNull(schema.curriculumFrameworks.orgId),
            eq(schema.curriculumFrameworks.orgId, orgId),
          )!
        : eq(schema.curriculumFrameworks.orgId, orgId),
    ];
    if (args.name)
      conditions.push(eq(schema.curriculumFrameworks.name, args.name));
    if (args.subject)
      conditions.push(eq(schema.curriculumFrameworks.subject, args.subject));

    const frameworks = await db
      .select()
      .from(schema.curriculumFrameworks)
      .where(and(...conditions));

    const objectives = frameworks.length
      ? await db
          .select()
          .from(schema.frameworkObjectives)
          .where(
            inArray(
              schema.frameworkObjectives.frameworkId,
              frameworks.map((f: any) => f.id),
            ),
          )
          .orderBy(asc(schema.frameworkObjectives.sequence))
      : [];

    // Grouped the way a syllabus reads: name → subject → strand.
    const byName = new Map<string, any>();
    for (const framework of frameworks) {
      const entry = byName.get(framework.name) ?? {
        name: framework.name,
        isSample: !!framework.isSample,
        schoolOwned: framework.orgId === orgId,
        version: framework.version ?? null,
        source: framework.sourceUrl ?? null,
        importId: framework.importId ?? null,
        subjects: [] as any[],
      };
      const mine = objectives.filter(
        (o: any) => o.frameworkId === framework.id,
      );
      const strands = new Map<string, any>();
      for (const o of mine) {
        const key = `${o.strand ?? ""}|${o.subStrand ?? ""}`;
        const strand = strands.get(key) ?? {
          strand: o.strand ?? null,
          subStrand: o.subStrand ?? null,
          objectives: [] as any[],
        };
        strand.objectives.push({
          id: o.id,
          code: o.code,
          codeGenerated: !!o.codeGenerated,
          description: o.description,
          gradeLevel: o.gradeLevel ?? null,
          source: o.sourceNote ?? null,
        });
        strands.set(key, strand);
      }
      entry.subjects.push({
        frameworkId: framework.id,
        subject: framework.subject ?? null,
        gradeRange: framework.gradeRange ?? null,
        objectives: mine.length,
        strands: [...strands.values()],
      });
      byName.set(framework.name, entry);
    }

    const libraries = [...byName.values()].sort((a, b) =>
      a.schoolOwned === b.schoolOwned
        ? a.name.localeCompare(b.name)
        : a.schoolOwned
          ? -1
          : 1,
    );
    const total = libraries.reduce(
      (n, l) =>
        n + l.subjects.reduce((m: number, s: any) => m + s.objectives, 0),
      0,
    );

    return {
      libraries,
      totalObjectives: total,
      message: libraries.length
        ? `${libraries.length} librar(ies), ${total} objective(s).`
        : args.includeSamples
          ? "No libraries found."
          : "This school has imported no syllabus of its own yet; the samples that ship with the app are still available.",
    };
  },
});
