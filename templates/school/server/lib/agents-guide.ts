import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Sections of this app's own AGENTS.md, for an assistant that never loaded it.
 *
 * The in-app assistant reads all of AGENTS.md on every turn. A head working
 * from their own Claude or ChatGPT calls the school's actions directly and
 * never sees it, so the rules that make the work right — the setup sheet,
 * plain language, how marks are given — would be lost. Rather than copy them
 * into tool descriptions, where they would drift, the assistant asks for the
 * section a task needs (`get-school-guidance`), read from the same file.
 */

export const GUIDANCE_TOPICS = {
  "talking-to-people": [
    "## Shaping an answer",
    "## Destructive Actions",
    "## Talking to people",
  ],
  setup: [
    "### A0. Where a new school comes from",
    "### A1. School Onboarding (first run)",
  ],
  curriculum: ["### A2. Curriculum Co-Authoring"],
  "lesson-notes": [
    "### A2b. Lesson notes, and an admin's part in them",
    "### B1. Lesson Note Creation (Iterative)",
  ],
  activities: [
    "### B1b. Creating Activities (worksheets, reading, practicals, problem sets)",
    "### B1b-2. Helping one learner",
    "### B1b-3. PDF learning resources (from a reference document)",
    "### B1c. Printing — documents instead of new screens",
  ],
  marking: [
    "### B3. Grading",
    "### B3b. Marking open answers",
    "### B3c. Reading a paper's patterns",
  ],
  timetable: ["### A2c. The school's week, arms and the timetable"],
  staff: ["### A3. Staff Management"],
  "report-cards": ["### A4a. Report cards"],
  analytics: ["### A4. School Analytics", "### B5. Class Analytics"],
  extensions: ["### A5b. Extensions: the school's own mini-apps"],
} as const;

export type GuidanceTopic = keyof typeof GUIDANCE_TOPICS;

let cached: string | null = null;

/**
 * The bundled AGENTS.md: inlined at build time by the framework's Vite plugin
 * on every deployment target, read from disk in development and from the CLI.
 */
async function agentsMd(): Promise<string> {
  if (cached !== null) return cached;
  try {
    // @ts-expect-error — resolved at build time by the framework's plugin.
    const mod = await import("virtual:agents-bundle");
    const text = mod?.default?.agentsMd;
    if (typeof text === "string" && text.trim()) {
      cached = text;
      return text;
    }
  } catch {
    // Not built: fall through to the file.
  }
  try {
    cached = await readFile(join(process.cwd(), "AGENTS.md"), "utf8");
  } catch {
    cached = "";
  }
  return cached;
}

/** One heading's section, up to the next heading of the same or higher level. */
function section(text: string, heading: string): string | null {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start < 0) return null;
  const level = heading.match(/^#+/)?.[0].length ?? 2;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#+)\s/);
    if (m && m[1].length <= level) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trim();
}

export async function guidanceFor(topic: GuidanceTopic): Promise<string> {
  const text = await agentsMd();
  return GUIDANCE_TOPICS[topic]
    .map((heading) => section(text, heading))
    .filter((s): s is string => !!s)
    .join("\n\n");
}
