import { defineAction } from "@agent-native/core";
import { z } from "zod";
import {
  GUIDANCE_TOPICS,
  guidanceFor,
  type GuidanceTopic,
} from "../server/lib/agents-guide.js";

const TOPICS = Object.keys(GUIDANCE_TOPICS) as [
  GuidanceTopic,
  ...GuidanceTopic[],
];

/**
 * How this school's work is done, for an assistant working from outside the
 * app (a head's own Claude or ChatGPT). Returns the matching section of the
 * app's own guide, so the rules it follows are the ones the in-app assistant
 * follows — not a copy that drifts.
 */
export default defineAction({
  description:
    "How this school's work is done, for a task you are about to start: the rules and the order of steps the school's own assistant follows. Call it once before a task of that kind, then follow it. Topics: talking-to-people (how to speak to school staff — read this first), setup (setting a school up: the setup sheet), curriculum, lesson-notes, activities (worksheets, readings, practicals), marking, timetable, staff.",
  schema: z.object({
    topic: z.enum(TOPICS).describe("Which kind of work"),
  }),
  http: { method: "GET" },
  readOnly: true,
  run: async ({ topic }) => {
    const guidance = await guidanceFor(topic);
    return {
      topic,
      preface:
        "You are working through this school's tools from outside the app. Where the guidance says `pnpm action x`, call the tool `x`. Never name tools, ids or field names to the person you are helping: say what will happen in the school's own words, and confirm before anything that cannot be undone.",
      guidance: guidance || "No guidance is written for this topic yet.",
    };
  },
});
