import { actorForEmail } from "./class-access.js";
import type { SchoolRole } from "./action-policy.js";
import { GUIDANCE_TOPICS } from "./agents-guide.js";

/**
 * Which parts of AGENTS.md the school's own assistant is given.
 *
 * The file is long (admin, teacher and learner sections, and a table of every
 * action) and the assistant is sent all of it on every step, whoever is
 * asking. Most of it is a different role's: a learner was carrying about
 * 30,000 tokens of admin and teacher procedure they could never use. So each
 * person gets the shared basics and their own section, and the table of
 * actions is left out for everyone, because every tool already carries its own
 * description and arguments.
 *
 * A staff member's own section is cut further. Its long procedures (setting a
 * school up, the curriculum, timetables, marking...) are what
 * `get-school-guidance` serves by topic, so they are replaced by a short index
 * of topics, and the assistant reads the one a task needs when it needs it.
 * Everything with no topic stays. A learner's section has none and is kept
 * whole. Two sections written for people developing the app (running actions
 * from a terminal, UI components) go to nobody whose role is known.
 *
 * Outside AI apps are unaffected: `get-school-guidance` reads the file itself.
 */

/** Sections of Section A (admin) a teacher also needs: subject work. */
const TEACHER_FROM_ADMIN = [
  "### A2. Curriculum Co-Authoring",
  "### A2b. Lesson notes, and an admin's part in them",
];

/**
 * Whole sections sent to nobody: the tools describe themselves, and the last
 * two are for people developing the app.
 */
const LEFT_OUT = [
  "## Complete Actions Reference",
  "## Key Workflows",
  "## Running Actions",
  "## UI Components",
];

/** Subsections served on demand by `get-school-guidance`, by heading. */
const ON_DEMAND: Map<string, string> = new Map(
  Object.entries(GUIDANCE_TOPICS).flatMap(([topic, headings]) =>
    (headings as readonly string[])
      .filter((h) => h.startsWith("### "))
      .map((h) => [h, topic] as [string, string]),
  ),
);

/**
 * A role's section with the subsections served on demand replaced by an
 * index of their topics.
 */
function withGuidanceIndex(
  section: string,
  alsoTopics: Iterable<string> = [],
): string {
  const pieces = splitOn(section, "### ");
  const topics = new Set<string>(alsoTopics);
  const kept = pieces.filter((p, i) => {
    if (i === 0) return true; // the section's own heading and intro
    const topic = ON_DEMAND.get(headingOf(p));
    if (topic) topics.add(topic);
    return !topic;
  });
  if (topics.size === 0) return section;
  const index = [
    "### Guidance by topic",
    "",
    `Before these kinds of work, read \`get-school-guidance\` with the topic and follow it; it holds the full procedure and the school's rules for it: ${[...topics].join(", ")}.`,
    "",
  ].join("\n");
  return [kept[0], index, ...kept.slice(1)].join("\n");
}

function headingOf(part: string): string {
  return part.split("\n", 1)[0].trim();
}

/** Split on lines starting with `marker` (`## ` or `### `), keeping them. */
function splitOn(text: string, marker: string): string[] {
  return text.split(new RegExp(`\\n(?=${marker})`));
}

export function guideForRole(
  agentsMd: string,
  role: SchoolRole | null,
): string {
  // Who they are is unknown: send everything rather than a guess.
  if (!role) return agentsMd;
  const sectionKey =
    role === "school_admin" ? "A" : role === "student" ? "C" : "B";

  const kept: string[] = [];
  // Topics of the admin's subject-work parts, for the teacher's own index.
  const borrowedTopics = new Set<string>();
  for (const part of splitOn(agentsMd, "## ")) {
    const heading = headingOf(part);
    if (LEFT_OUT.some((h) => heading.startsWith(h))) continue;

    const section = heading.match(/^## Section ([ABC])\b/)?.[1];
    if (!section) {
      kept.push(part);
      continue;
    }
    if (section === sectionKey) {
      kept.push(
        sectionKey === "C" ? part : withGuidanceIndex(part, borrowedTopics),
      );
      continue;
    }
    // A teacher still needs the parts of the admin's section about subject
    // work; nothing else of another role's. What of it is served on demand
    // is already in the teacher's own index.
    if (sectionKey === "B" && section === "A") {
      const pieces = splitOn(part, "### ");
      const subjectWork = pieces.filter((p) =>
        TEACHER_FROM_ADMIN.some((h) => headingOf(p).startsWith(h)),
      );
      for (const p of subjectWork) {
        const topic = ON_DEMAND.get(headingOf(p));
        if (topic) borrowedTopics.add(topic);
      }
      const wanted = subjectWork.filter((p) => !ON_DEMAND.has(headingOf(p)));
      if (wanted.length) {
        kept.push(
          [
            "## Section A: Admin Role (the parts for subject work)",
            ...wanted,
          ].join("\n\n"),
        );
      }
    }
  }
  return kept.join("\n");
}

/** For `transformAgentsMd`: the guide for the person the assistant is serving. */
export async function promptGuide(
  agentsMd: string,
  ownerEmail: string,
): Promise<string> {
  const actor = await actorForEmail(ownerEmail).catch(() => null);
  return guideForRole(agentsMd, (actor?.schoolRole as SchoolRole) ?? null);
}
