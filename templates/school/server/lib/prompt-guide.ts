import { actorForEmail } from "./class-access.js";
import type { SchoolRole } from "./action-policy.js";

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
 * Outside AI apps are unaffected: `get-school-guidance` reads the file itself.
 */

/** Sections of Section A (admin) a teacher also needs: subject work. */
const TEACHER_FROM_ADMIN = [
  "### A2. Curriculum Co-Authoring",
  "### A2b. Lesson notes, and an admin's part in them",
];

/** Whole sections sent to nobody: the tools describe themselves. */
const LEFT_OUT = ["## Complete Actions Reference", "## Key Workflows"];

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
  for (const part of splitOn(agentsMd, "## ")) {
    const heading = headingOf(part);
    if (LEFT_OUT.some((h) => heading.startsWith(h))) continue;

    const section = heading.match(/^## Section ([ABC])\b/)?.[1];
    if (!section) {
      kept.push(part);
      continue;
    }
    if (section === sectionKey) {
      kept.push(part);
      continue;
    }
    // A teacher still needs the parts of the admin's section about subject
    // work; nothing else of another role's.
    if (sectionKey === "B" && section === "A") {
      const pieces = splitOn(part, "### ");
      const wanted = pieces.filter((p) =>
        TEACHER_FROM_ADMIN.some((h) => headingOf(p).startsWith(h)),
      );
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
