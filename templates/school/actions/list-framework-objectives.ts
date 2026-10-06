import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, isNull, or } from "drizzle-orm";
import { currentAccess } from "@agent-native/core/sharing";
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
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // A school sees the libraries shipped with the app and the ones it has
    // imported itself — and nobody else's. This read had no school filter at
    // all, so one school's imported syllabus would have been readable by every
    // other school on the same deployment.
    const visible = await db
      .select()
      .from(schema.curriculumFrameworks)
      .where(
        and(
          eq(schema.curriculumFrameworks.name, args.framework),
          or(
            isNull(schema.curriculumFrameworks.orgId),
            eq(schema.curriculumFrameworks.orgId, orgId),
          ),
        ),
      );

    // A school's own library wins over a shipped one of the same name: it is
    // their syllabus, and the shipped one is a sample.
    const ownRows = visible.filter((f: any) => f.orgId === orgId);
    const inFramework = ownRows.length ? ownRows : visible;

    if (inFramework.length === 0) {
      return {
        found: false,
        framework: args.framework,
        message: `No "${args.framework}" data found in the standards library. The syllabus pipeline (fetch → parse → seed) may not have been run for it yet. Refer to docs/design-decisions.md for instructions.`,
      };
    }

    // A school's name for a subject and the syllabus's name for it often
    // differ — the school teaches "Mathematics", the syllabus calls it "General
    // Mathematics". Matching exactly reported that the whole framework was
    // missing, which sent an agent off to re-seed a library that was already
    // full. So: exact first, then the same name in any case, then any subject
    // whose name contains the one asked for (or the reverse). One candidate is
    // used; several are handed back to choose from, never guessed between.
    let frameworks = inFramework;
    let matchNote: string | null = null;
    if (args.subject) {
      const wanted = args.subject.trim().toLowerCase();
      const nameOf = (fw: any) => String(fw.subject ?? "").toLowerCase();
      const exact = inFramework.filter(
        (fw: any) => fw.subject === args.subject,
      );
      const sameName = inFramework.filter((fw: any) => nameOf(fw) === wanted);
      const partial = inFramework.filter(
        (fw: any) =>
          nameOf(fw) &&
          (nameOf(fw).includes(wanted) || wanted.includes(nameOf(fw))),
      );
      frameworks = exact.length ? exact : sameName.length ? sameName : partial;

      if (frameworks.length === 0) {
        return {
          found: false,
          framework: args.framework,
          subjectsInFramework: inFramework
            .map((fw: any) => fw.subject)
            .filter(Boolean)
            .sort(),
          message: `${args.framework} has no subject called "${args.subject}". Its subjects are listed in subjectsInFramework — call again with the one this school's subject corresponds to.`,
        };
      }
      if (frameworks.length > 1 && !exact.length && !sameName.length) {
        return {
          found: false,
          framework: args.framework,
          candidates: frameworks.map((fw: any) => ({
            subject: fw.subject,
            gradeRange: fw.gradeRange,
          })),
          message: `"${args.subject}" matches more than one ${args.framework} subject: ${frameworks
            .map((fw: any) => `"${fw.subject}"`)
            .join(
              ", ",
            )}. Call again with the exact name of the one this school teaches — ask the user if it is not clear.`,
        };
      }
      if (!exact.length) {
        matchNote = `${args.framework} calls this subject "${frameworks[0].subject}"; used that for "${args.subject}".`;
      }
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

    // Say plainly when the objectives came from a sample. A couple of dozen
    // objectives for three years is not a syllabus, and an agent that plans a
    // year from one produces a term with four objectives in it.
    const sampleOnly =
      frameworks.length > 0 && frameworks.every((f: any) => f.isSample);

    return {
      found: true,
      framework: args.framework,
      isSample: sampleOnly,
      schoolOwned: frameworks.some((f: any) => f.orgId === orgId),
      ...(sampleOnly
        ? {
            sampleWarning: `This ${args.framework} library is sample data shipped with the app — ${grandTotal} objective(s) in total, which is far less than a published syllabus. Plan from it only as a demonstration; for real planning, ask the school for their own syllabus and import it.`,
          }
        : {}),
      totalObjectives: grandTotal,
      subjectsFound: results.map((r) => r.subject),
      ...(matchNote ? { note: matchNote } : {}),
      data: results.length === 1 ? results[0] : results,
    };
  },
});
