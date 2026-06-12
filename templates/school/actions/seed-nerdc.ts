/**
 * Seed parsed NERDC syllabus JSON into curriculum_frameworks + framework_objectives.
 *
 * Run: pnpm action seed-nerdc
 *      pnpm action seed-nerdc --dry-run true
 *
 * Reads scripts/nerdc/parsed/*.json (produced by the Co-work parsing workflow).
 * Idempotent — skips subjects already seeded.
 * To re-seed a subject, delete its row from curriculum_frameworks first.
 */

import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PARSED_DIR = resolve(__dirname, "../scripts/nerdc/parsed");

interface ParsedObjective {
  code: string;
  description: string;
}
interface ParsedSubStrand {
  name: string;
  objectives: ParsedObjective[];
}
interface ParsedStrand {
  name: string;
  subStrands: ParsedSubStrand[];
}
interface ParsedSyllabus {
  found: boolean;
  subject: string;
  subjectCode: string;
  framework: string;
  gradeRange: string;
  strands: ParsedStrand[];
}

export default defineAction({
  description:
    "Seed NERDC JSS syllabus objectives from scripts/nerdc/parsed/ into the curriculum_frameworks and framework_objectives tables. Run once after generating the parsed JSON files. Idempotent — skips subjects already in the database.",
  schema: z.object({
    dryRun: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Preview what would be inserted without writing to the database",
      ),
    subject: z
      .string()
      .optional()
      .describe(
        'Seed only this subject, e.g. "Mathematics". Omit to seed all.',
      ),
  }),
  http: false,
  run: async (args) => {
    const { dryRun, subject } = args;

    if (!existsSync(PARSED_DIR)) {
      return {
        success: false,
        error: `Parsed directory not found: ${PARSED_DIR}. Complete the Co-work parsing step first.`,
      };
    }

    let jsonFiles = readdirSync(PARSED_DIR)
      .filter((f) => f.endsWith(".json") && !f.endsWith(".meta.json"))
      .sort();

    if (jsonFiles.length === 0) {
      return {
        success: false,
        error:
          "No .json files found in parsed directory. Complete the Co-work parsing step first.",
      };
    }

    if (subject) {
      const slug = subject.toLowerCase().replace(/\s+/g, "-");
      jsonFiles = jsonFiles.filter((f) => f.includes(slug));
      if (jsonFiles.length === 0) {
        return {
          success: false,
          error: `No parsed file found matching "${subject}". Check the filename in scripts/nerdc/parsed/.`,
        };
      }
    }

    const db = getDb();
    const results: Array<{
      subject: string;
      status: string;
      objectives?: number;
    }> = [];
    let totalInserted = 0;
    let totalSkipped = 0;

    for (const file of jsonFiles) {
      let data: ParsedSyllabus;
      try {
        data = JSON.parse(readFileSync(join(PARSED_DIR, file), "utf-8"));
      } catch {
        results.push({ subject: file, status: "error: could not parse JSON" });
        continue;
      }

      if (!data.found || !data.strands?.length) {
        results.push({
          subject: data.subject ?? file,
          status: "skipped: no syllabus content",
        });
        continue;
      }

      let objCount = 0;
      for (const strand of data.strands) {
        for (const sub of strand.subStrands ?? []) {
          objCount += sub.objectives?.length ?? 0;
        }
      }

      const existing = await db
        .select({ id: schema.curriculumFrameworks.id })
        .from(schema.curriculumFrameworks)
        .where(
          and(
            eq(schema.curriculumFrameworks.name, data.framework),
            eq(schema.curriculumFrameworks.subject, data.subject),
          ),
        )
        .limit(1);

      if (existing.length > 0) {
        results.push({
          subject: data.subject,
          status: "skipped: already seeded",
        });
        totalSkipped++;
        continue;
      }

      if (dryRun) {
        results.push({
          subject: data.subject,
          status: "would insert",
          objectives: objCount,
        });
        totalInserted++;
        continue;
      }

      const frameworkId = nanoid();
      const currentYear = new Date().getFullYear();

      await db.insert(schema.curriculumFrameworks).values({
        id: frameworkId,
        name: data.framework,
        subject: data.subject,
        gradeRange: data.gradeRange ?? "JSS1-JSS3",
        version: `${currentYear}-${currentYear + 1} syllabus`,
        sourceUrl: null,
        orgId: null,
        createdAt: new Date().toISOString(),
      });

      let sequence = 0;
      for (const strand of data.strands) {
        for (const subStrand of strand.subStrands ?? []) {
          for (const obj of subStrand.objectives ?? []) {
            await db.insert(schema.frameworkObjectives).values({
              id: nanoid(),
              frameworkId,
              code: obj.code,
              strand: strand.name,
              subStrand: subStrand.name,
              subject: data.subject,
              description: obj.description,
              gradeLevel: data.gradeRange ?? "JSS1-JSS3",
              sequence: ++sequence,
              createdAt: new Date().toISOString(),
            });
          }
        }
      }

      results.push({
        subject: data.subject,
        status: "inserted",
        objectives: objCount,
      });
      totalInserted++;
    }

    const summary = dryRun
      ? `Dry run: ${totalInserted} would be inserted, ${totalSkipped} already seeded`
      : `Done: ${totalInserted} inserted, ${totalSkipped} already seeded`;

    return { success: true, dryRun, summary, results };
  },
});
