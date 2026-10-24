import { defineAction } from "@agent-native/core";
import { z } from "zod";
import getLessonNoteCoverage from "./get-lesson-note-coverage.js";
import checkStudentRecords from "./check-student-records.js";

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
    "What the school needs doing, most important first: classes with no teacher or curriculum, lesson notes behind or not marked ready, learners with missing records. Each item names the page that fixes it. Use it to answer 'what needs attention?' or to open an overview.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const [coverage, records] = await Promise.all([
      getLessonNoteCoverage.run({ onlyGaps: false } as any) as Promise<any>,
      checkStudentRecords.run({} as any) as Promise<any>,
    ]);

    const totals = coverage?.totals;
    const term: string | undefined = coverage?.term?.name;
    const plural = (n: number, one: string, many: string) =>
      `${n} ${n === 1 ? one : many}`;

    const items: { text: string; page: string; blocks: boolean }[] = [];
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
    const behind = (totals?.withGaps ?? 0) + (totals?.withNothing ?? 0);
    if (behind > 0) {
      items.push({
        text: `${plural(behind, "class is", "classes are")} behind on lesson notes`,
        page: "lesson notes",
        blocks: true,
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
