import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "List learning objectives from the built-in curriculum standards library (WAEC, Common Core, etc.). Call this at the start of curriculum co-authoring to get the canonical list of objectives for a subject, then distribute them across terms in the draft. Returns objectives grouped by strand → sub-strand for easy planning.",
  schema: z.object({
    framework: z
      .string()
      .describe(
        'Framework name, e.g. "WAEC", "Common Core", "Cambridge IGCSE"',
      ),
    subject: z
      .string()
      .optional()
      .describe(
        'Subject name, e.g. "Mathematics", "Biology". Omit to list all subjects for this framework.',
      ),
    strand: z
      .string()
      .optional()
      .describe(
        'Filter by strand name, e.g. "Algebra". Omit to return all strands.',
      ),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();

    // Find matching framework records
    const frameworks = await db
      .select()
      .from(schema.curriculumFrameworks)
      .where(
        args.subject
          ? and(
              eq(schema.curriculumFrameworks.name, args.framework),
              eq(schema.curriculumFrameworks.subject, args.subject),
            )
          : eq(schema.curriculumFrameworks.name, args.framework),
      );

    if (frameworks.length === 0) {
      return {
        found: false,
        framework: args.framework,
        message: `No "${args.framework}" data found in the standards library. The WAEC syllabus pipeline (fetch → parse → seed) may not have been run yet. Refer to docs/design-decisions.md for instructions.`,
      };
    }

    // Fetch and group objectives per framework record
    const results: Array<{
      subject: string;
      gradeRange: string | null;
      totalObjectives: number;
      strands: Array<{
        name: string;
        subStrands: Array<{
          name: string;
          objectives: Array<{ code: string; description: string }>;
        }>;
      }>;
    }> = [];

    let grandTotal = 0;

    for (const fw of frameworks) {
      const rows = await db
        .select()
        .from(schema.frameworkObjectives)
        .where(
          args.strand
            ? and(
                eq(schema.frameworkObjectives.frameworkId, fw.id),
                eq(schema.frameworkObjectives.strand, args.strand),
              )
            : eq(schema.frameworkObjectives.frameworkId, fw.id),
        )
        .orderBy(schema.frameworkObjectives.sequence);

      // Group by strand → subStrand
      const strandMap = new Map<
        string,
        Map<string, Array<{ code: string; description: string }>>
      >();

      for (const row of rows) {
        const s = row.strand ?? "General";
        const ss = row.subStrand ?? "General";
        if (!strandMap.has(s)) strandMap.set(s, new Map());
        if (!strandMap.get(s)!.has(ss)) strandMap.get(s)!.set(ss, []);
        strandMap
          .get(s)!
          .get(ss)!
          .push({ code: row.code, description: row.description });
      }

      const strands = Array.from(strandMap.entries()).map(
        ([strandName, subMap]) => ({
          name: strandName,
          subStrands: Array.from(subMap.entries()).map(([ssName, objs]) => ({
            name: ssName,
            objectives: objs,
          })),
        }),
      );

      grandTotal += rows.length;

      results.push({
        subject: fw.subject ?? fw.name,
        gradeRange: fw.gradeRange,
        totalObjectives: rows.length,
        strands,
      });
    }

    return {
      found: true,
      framework: args.framework,
      totalObjectives: grandTotal,
      subjectsFound: results.map((r) => r.subject),
      data: results.length === 1 ? results[0] : results,
    };
  },
});
