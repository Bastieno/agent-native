/**
 * A school's own syllabus on its way into the standards library.
 *
 * Schools arrive with what they have: a printed scheme of work, a PDF from a
 * ministry, photographs of a folder that has been photocopied since 2009. That
 * is still a curriculum, and until now the only syllabuses the app knew were
 * the samples shipped with it — so every school planned against someone else's
 * structure or none at all.
 *
 * Reading a scan is never certain, so an import is proposed, reviewed and only
 * then committed. Three rules hold throughout:
 *
 * - **Nothing is invented.** A page that could not be read is listed as
 *   unread, never filled in with something plausible.
 * - **A generated code is marked as one.** Where a syllabus carries its own
 *   codes they are kept; where it does not, the app makes codes to order the
 *   library and says so, because a made-up code must never be quoted to a
 *   parent as an official reference.
 * - **Everything keeps its provenance** — the document and page it came from —
 *   so "where does this come from?" has an answer.
 */

export type ImportObjective = {
  /** The syllabus's own code, when it has one. */
  code?: string | null;
  description: string;
  /**
   * Which year group(s), in the school's own words. A list names each end of
   * a span — ["JSS1", "JSS3"] — and needs no language to read.
   */
  gradeLevel?: string | string[] | null;
  /** Document and page, for the record. */
  source?: string | null;
};

export type ImportStrand = {
  strand?: string | null;
  subStrand?: string | null;
  objectives: ImportObjective[];
};

export type ImportSubject = {
  subject: string;
  gradeRange?: string | string[] | null;
  strands: ImportStrand[];
};

export type SyllabusImportState = {
  /** What the school calls this syllabus — "Lagos Diocesan Scheme 2025". */
  framework?: {
    name?: string | null;
    version?: string | null;
    source?: string | null;
  };
  subjects?: ImportSubject[];
  /** Pages, sections or photographs that could not be read. */
  unread?: string[];
};

/**
 * Match a year group written in a syllabus to one of the school's own.
 *
 * The names come from the school; the matching must not quietly assume a
 * language. Comparison ignores case and spacing through Unicode collation
 * rather than `toLowerCase`, which is wrong in several scripts.
 *
 * A span of years is best given as data — `["JSS1", "JSS3"]`, each end matched
 * separately — because parsing "JSS1 to JSS3" only works in English, and a
 * school writing "6ème à 3ème" or "JSS1 / JSS3" would be told its own year
 * groups do not exist. The string form is still read as a convenience for
 * hyphenated input, and the caller is told when that is what happened.
 */

const collator = new Intl.Collator(undefined, {
  sensitivity: "base",
  ignorePunctuation: false,
});

function sameName(a: string, b: string): boolean {
  // Spacing is not meaning: a document writes "JSS 2" where the school wrote
  // "JSS2". Case and accents are left to the collator, which knows more about
  // them than lowercasing does.
  const tidy = (t: string) => t.replace(/\s+/gu, "");
  return collator.compare(tidy(a), tidy(b)) === 0;
}

export type YearGroupMatch = {
  canonical: string | null;
  matched: boolean;
  /** True when a range was read out of a string rather than given as a list. */
  parsedFromText?: boolean;
};

export function resolveYearGroup(
  value: string | string[] | null | undefined,
  known: string[],
): YearGroupMatch {
  const find = (text: string) => known.find((k) => sameName(k, text)) ?? null;

  // The shape that needs no language: each end named in the school's terms.
  if (Array.isArray(value)) {
    const names = value.map((v) => (typeof v === "string" ? v.trim() : ""));
    const resolved = names.map(find);
    if (resolved.some((r) => !r)) {
      const bad = names.filter((_, i) => !resolved[i]);
      return { canonical: bad.join(", "), matched: false };
    }
    if (resolved.length === 0) return { canonical: null, matched: true };
    if (resolved.length === 1) {
      return { canonical: resolved[0]!, matched: true };
    }
    // Written in the school's own order, whatever order they were given in.
    const ordered = [...new Set(resolved as string[])].sort(
      (a, b) => known.indexOf(a) - known.indexOf(b),
    );
    return {
      canonical: `${ordered[0]}-${ordered[ordered.length - 1]}`,
      matched: true,
    };
  }

  const raw = value?.trim();
  if (!raw) return { canonical: null, matched: true };

  const direct = find(raw);
  if (direct) return { canonical: direct, matched: true };

  // Convenience only, and reported: two names either side of a hyphen or dash.
  const parts = raw.split(/\s*[-–—]\s*/).filter(Boolean);
  if (parts.length === 2) {
    const from = find(parts[0]);
    const to = find(parts[1]);
    if (from && to) {
      return {
        canonical: `${from}-${to}`,
        matched: true,
        parsedFromText: true,
      };
    }
  }
  return { canonical: raw, matched: false };
}

export type ImportSummary = {
  frameworkName: string | null;
  subjects: Array<{
    subject: string;
    strands: number;
    objectives: number;
    withOwnCode: number;
  }>;
  totalObjectives: number;
  unread: string[];
  problems: string[];
  observations: string[];
};

/** A code the app made up, stable for a given strand and position. */
export function generateCode(
  subject: string,
  strand: string | null | undefined,
  index: number,
): string {
  const initials = (text: string) =>
    text
      .split(/[^A-Za-z0-9]+/)
      .filter(Boolean)
      .map((w) => w[0]!.toUpperCase())
      .join("")
      .slice(0, 4);
  const parts = [initials(subject) || "SUB"];
  if (strand?.trim()) parts.push(initials(strand));
  parts.push(String(index));
  return parts.join("-");
}

export function summariseImport(
  state: SyllabusImportState | null | undefined,
  /** The school's own year groups, so a syllabus's wording can be matched. */
  knownYearGroups: string[] = [],
): ImportSummary {
  const problems: string[] = [];
  const observations: string[] = [];
  const subjects = Array.isArray(state?.subjects) ? state!.subjects : [];
  const name = state?.framework?.name?.trim() || null;
  if (!name) {
    problems.push(
      "The syllabus has no name yet — what does the school call it?",
    );
  }
  if (subjects.length === 0) {
    problems.push("No subjects have been read yet.");
  }

  const seenCodes = new Map<string, number>();
  const unmatchedYearGroups = new Set<string>();
  const parsedRanges = new Set<string>();
  const rows = subjects.map((subject) => {
    const strands = Array.isArray(subject?.strands) ? subject.strands : [];
    let objectives = 0;
    let withOwnCode = 0;
    for (const strand of strands) {
      const list = Array.isArray(strand?.objectives) ? strand.objectives : [];
      for (const objective of list) {
        if (!objective?.description?.trim()) {
          problems.push(
            `An objective in ${subject?.subject ?? "a subject"}${
              strand?.strand ? ` · ${strand.strand}` : ""
            } has no wording.`,
          );
          continue;
        }
        objectives++;
        // A year group the school does not have is a mismatch nothing else
        // would notice: the objective would simply never be found.
        if (knownYearGroups.length) {
          const resolved = resolveYearGroup(
            objective.gradeLevel ?? subject.gradeRange,
            knownYearGroups,
          );
          if (!resolved.matched) {
            unmatchedYearGroups.add(resolved.canonical!);
          } else if (resolved.parsedFromText) {
            parsedRanges.add(resolved.canonical!);
          }
        }
        const code = objective.code?.trim();
        if (code) {
          withOwnCode++;
          const key = `${subject.subject}|${code}`;
          seenCodes.set(key, (seenCodes.get(key) ?? 0) + 1);
        }
      }
    }
    if (objectives === 0) {
      problems.push(`${subject?.subject ?? "A subject"} has no objectives.`);
    }
    return {
      subject: subject?.subject ?? "untitled subject",
      strands: strands.length,
      objectives,
      withOwnCode,
    };
  });

  for (const [key, count] of seenCodes) {
    if (count > 1) {
      const [subject, code] = key.split("|");
      problems.push(
        `${subject} has ${count} objectives with the code ${code}; a code must name one objective.`,
      );
    }
  }

  if (unmatchedYearGroups.size) {
    problems.push(
      `${[...unmatchedYearGroups]
        .map((y) => `"${y}"`)
        .join(
          ", ",
        )} ${unmatchedYearGroups.size === 1 ? "is not a year group" : "are not year groups"} this school has. Its year groups are ${knownYearGroups.join(", ")} — use those names, or a range of two of them.`,
    );
  }

  if (parsedRanges.size) {
    observations.push(
      `${[...parsedRanges].map((r) => `"${r}"`).join(", ")} ${
        parsedRanges.size === 1 ? "was" : "were"
      } read as a span of years from the text. Give a span as a list of the school's year groups — ["${knownYearGroups[0] ?? "JSS1"}", "${knownYearGroups[knownYearGroups.length - 1] ?? "JSS3"}"] — and no wording has to be guessed at.`,
    );
  }

  const total = rows.reduce((n, r) => n + r.objectives, 0);
  const withoutCodes = rows.reduce(
    (n, r) => n + (r.objectives - r.withOwnCode),
    0,
  );
  if (withoutCodes > 0) {
    observations.push(
      `${withoutCodes} objective(s) carry no code from the syllabus; codes will be generated for them and marked as the app's own.`,
    );
  }
  const unread = Array.isArray(state?.unread)
    ? state!.unread.filter((u) => typeof u === "string" && u.trim())
    : [];
  if (unread.length) {
    observations.push(
      `${unread.length} part(s) of the document could not be read and are left out: ${unread.join("; ")}`,
    );
  }

  return {
    frameworkName: name,
    subjects: rows,
    totalObjectives: total,
    unread,
    problems,
    observations,
  };
}
