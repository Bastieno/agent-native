/**
 * The school's own words for the things this app names in fixed text.
 *
 * Help, and anything else written once for every school, says "arm", "form
 * teacher", "term" and "learner". A school that calls these a homeroom, a
 * homeroom teacher, a quarter and a student sets the word once
 * (`customLabels`), and the fixed text is read back in it. Pure, so the
 * client, the server and the actions can all use it.
 */
import { naivePlural } from "./terminology.js";

export interface SchoolWords {
  /** What the school calls an arm ("homeroom", "class", "form"). */
  arm?: string;
  /** What it calls the teacher in charge of one ("homeroom teacher"). */
  formTeacher?: string;
  /** What it calls a term ("quarter", "semester"). */
  term?: string;
  /** What it calls a learner ("student"). */
  student?: string;
}

interface ConfigShape {
  customLabels?: Record<string, string> | null;
  termStructure?: string | null;
}

const clean = (v: string | null | undefined) => (v ?? "").trim().toLowerCase();

/** The school's words, with the term word taken from the term structure when it has not named one. */
export function schoolWords(
  config: ConfigShape | null | undefined,
): SchoolWords {
  const labels = config?.customLabels ?? {};
  const structure = config?.termStructure;
  const derivedTerm =
    structure === "semesters"
      ? "semester"
      : structure === "quarters"
        ? "quarter"
        : "";
  return {
    arm: clean(labels.arm),
    formTeacher: clean(labels.formTeacher),
    term: clean(labels.term) || derivedTerm,
    student: clean(labels.student),
  };
}

/** "Term" in the school's word, capitalised for a heading or label. */
export function termWord(config: ConfigShape | null | undefined): {
  term: string;
  Term: string;
  terms: string;
  Terms: string;
} {
  const term = schoolWords(config).term || "term";
  const Term = term.charAt(0).toUpperCase() + term.slice(1);
  return { term, Term, terms: naivePlural(term), Terms: naivePlural(Term) };
}

const matchCase = (original: string, word: string) =>
  original.charAt(0) === original.charAt(0).toUpperCase() &&
  original.charAt(0) !== original.charAt(0).toLowerCase()
    ? word.charAt(0).toUpperCase() + word.slice(1)
    : word;

const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

/** One canonical word (singular and plural) replaced by the school's. */
function swap(text: string, singular: string, to: string | undefined): string {
  if (!to || to === singular) return text;
  const plural = singular.endsWith("y")
    ? `${singular.slice(0, -1)}ies`
    : `${singular}s`;
  // "a arm" / "an arm": recompute the article for the new word.
  const withArticle = new RegExp(`\\b(a|an) (${singular})\\b`, "gi");
  let out = text.replace(withArticle, (_m, a: string, w: string) => {
    const word = matchCase(w, to);
    return `${matchCase(a, article(to))} ${word}`;
  });
  out = out.replace(new RegExp(`\\b${plural}\\b`, "gi"), (m) =>
    matchCase(m, naivePlural(to)),
  );
  out = out.replace(new RegExp(`\\b${singular}\\b`, "gi"), (m) =>
    matchCase(m, to),
  );
  return out;
}

/** Fixed text read back in the school's own words. */
export function inSchoolWords(
  text: string,
  words: SchoolWords | null | undefined,
): string {
  if (!words) return text;
  // Longest first, so "form teacher" is not read as "form" and "teacher".
  let out = swap(text, "form teacher", words.formTeacher);
  out = swap(out, "arm", words.arm);
  out = swap(out, "term", words.term);
  out = swap(out, "learner", words.student);
  return out;
}
