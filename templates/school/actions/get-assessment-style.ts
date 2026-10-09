import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import {
  styleForClass,
  styleForSubject,
} from "../server/lib/assessment-style.js";

/**
 * How to word questions for a class, before writing any.
 *
 * `create-activity` returns this with its preview, which covers the usual
 * path. This exists for the other one: drafting a set of questions, or a mock
 * paper, before there is an activity to preview — and for answering a
 * teacher who simply asks what their school's papers look like.
 */
export default defineAction({
  description:
    "How a subject words its questions here — name a class, or the subject itself when planning before a class exists — stem length, option count, negation rate, the verbs it uses. Read it before drafting questions. Pass forMockPaper=true to also get the shape of a full paper; otherwise only the wording guidance is returned, which is what applies to ordinary exercises and tests.",
  schema: z.object({
    classId: z.string().optional().describe("The class the work is for"),
    subjectId: z
      .string()
      .optional()
      .describe(
        "The subject, when planning before a class exists — a coordinator writing a question bank has no class to name",
      ),
    forMockPaper: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "true only when asked for a full mock exam — adds question counts and timings",
      ),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    if (!args.classId && !args.subjectId) {
      throw new Error("Name either a class or a subject.");
    }
    const { style, subjectName } = args.classId
      ? await styleForClass(args.classId, orgId)
      : await styleForSubject(args.subjectId!, orgId);

    if (!style) {
      return {
        subject: subjectName,
        style: null,
        message: `${subjectName ?? "This subject"} has no assessment style set, so write the questions plainly and clearly. An admin can set one — it makes questions read like the exam the class actually sits.`,
      };
    }

    return {
      subject: subjectName,
      style: style.name,
      isSample: style.isSample,
      derivedFrom: style.derivedFrom,
      followWhenWritingQuestions: style.guidance,
      ...(args.forMockPaper ? { paperShape: style.paperShape } : {}),
      message: `${subjectName} questions are worded like ${style.name} here.${
        args.forMockPaper
          ? ""
          : " This is wording guidance; it does not change how many questions to write."
      }`,
    };
  },
});
