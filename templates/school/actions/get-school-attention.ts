import { defineAction } from "@agent-native/core";
import { z } from "zod";
import getLessonNoteCoverage from "./get-lesson-note-coverage.js";
import checkStudentRecords from "./check-student-records.js";
import getSchoolStats from "./get-school-stats.js";

/**
 * What this school needs doing, in the order it matters.
 *
 * The overview page and the assistant both answer "what needs my attention?",
 * and they used to answer it separately: the page put the list together in the
 * browser, so the assistant had to rebuild it from the same two reads and
 * could rank it differently. This is the one place the list is made. Nothing
 * here is counted afresh; each line comes from an action that already owns the
 * figure.
 *
 * `blocks` marks what stops teaching or publishing (a class with no teacher
 * cannot be given work, a class with no curriculum has nothing to write notes
 * from). Those come first.
 */
export default defineAction({
  description:
    "What the school needs doing, most important first: classes with no teacher or curriculum, lesson notes behind or not marked ready, learners with missing records. Each item names the page that fixes it, and lesson-note items list the classes involved (class and teacher), so 'which classes?' needs no second lookup. Use it to answer 'what needs attention?' or to open an overview.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const [coverage, records, stats] = await Promise.all([
      getLessonNoteCoverage.run({ onlyGaps: false } as any) as Promise<any>,
      checkStudentRecords.run({} as any) as Promise<any>,
      getSchoolStats.run({} as any) as Promise<any>,
    ]);

    // A school with no subjects, classes or learners has nothing to be behind
    // on, which is not the same as being in good order. Say so, and point at
    // the setup sheet, instead of returning an empty list that reads as "all
    // clear".
    if (stats?.needsSetup) {
      return {
        term: null,
        needsSetup: true,
        counts: { classesWithoutTeacher: 0, learnersWithoutYearGroup: 0 },
        items: [
          {
            text: "The school isn't set up yet: it has no subjects, classes or learners. Start with the setup sheet: ask the assistant to set up the school.",
            page: "setup",
            blocks: true,
          },
        ],
        message:
          "The school isn't set up yet, so there is nothing to report on. Start with the setup sheet (identity, year groups, terms, grading), then subjects and classes.",
      };
    }

    const totals = coverage?.totals;
    const term: string | undefined = coverage?.term?.name;
    const plural = (n: number, one: string, many: string) =>
      `${n} ${n === 1 ? one : many}`;

    // Which classes a lesson-note line is about, so neither the page nor the
    // assistant has to hunt for them. A handful is shown; `more` says how many
    // are left.
    const rows: any[] = coverage?.classes ?? [];
    const named = (matching: any[]) => ({
      classes: matching
        .slice(0, 12)
        .map((c) => `${c.className} (${c.teacher})`),
      ...(matching.length > 12 ? { more: matching.length - 12 } : {}),
    });

    const items: {
      text: string;
      page: string;
      blocks: boolean;
      /** The lesson-notes view that lists exactly these classes. */
      show?: "behind" | "notready";
      classes?: string[];
      more?: number;
    }[] = [];
    if (totals?.withoutTeacher) {
      items.push({
        text: `${plural(totals.withoutTeacher, "class has", "classes have")} no teacher, so no work can be published to ${totals.withoutTeacher === 1 ? "it" : "them"}`,
        page: "classes",
        blocks: true,
      });
    }
    if (totals?.noCurriculum) {
      items.push({
        text: `${plural(totals.noCurriculum, "class has", "classes have")} no curriculum for ${term ?? "this term"}`,
        page: "curriculum",
        blocks: true,
      });
    }
    // Classes with nothing written are among the classes with gaps, so adding
    // the two counted each of them twice.
    const behind = totals?.withGaps ?? 0;
    if (behind > 0) {
      items.push({
        text: `${plural(behind, "class is", "classes are")} behind on lesson notes`,
        page: "lesson notes",
        blocks: true,
        show: "behind",
        ...named(rows.filter((c) => c.missing > 0)),
      });
    }
    // Written but not declared ready is its own state: the notes exist, but
    // nobody has said they are ready to teach.
    const written = (totals?.classes ?? 0) - (totals?.noCurriculum ?? 0);
    const notReady = Math.max(0, written - behind - (totals?.ready ?? 0));
    if (notReady > 0) {
      items.push({
        text: `${plural(notReady, "class has", "classes have")} lesson notes written but not yet marked ready`,
        page: "lesson notes",
        blocks: false,
        show: "notready",
        ...named(
          rows.filter(
            (c) => c.expectedNotes > 0 && c.missing === 0 && c.drafts > 0,
          ),
        ),
      });
    }
    const noYear = records?.withoutYearGroup?.length ?? 0;
    if (noYear) {
      items.push({
        text: `${plural(noYear, "learner has", "learners have")} no year group`,
        page: "students",
        blocks: false,
      });
    }
    for (const field of records?.byField ?? []) {
      if (field.missingCount > 0) {
        items.push({
          text: `${plural(field.missingCount, "learner has", "learners have")} no ${field.label}`,
          page: "students",
          blocks: false,
        });
      }
    }

    return {
      term: term ?? null,
      needsSetup: false,
      counts: {
        classesWithoutTeacher: totals?.withoutTeacher ?? 0,
        learnersWithoutYearGroup: noYear,
      },
      items,
      message: items.length
        ? items.length === 1
          ? "1 thing needs attention."
          : `${items.length} things need attention, most important first.`
        : "Nothing outstanding: every class has a teacher and a curriculum, the lesson notes are written, and every learner's record is complete.",
    };
  },
});
