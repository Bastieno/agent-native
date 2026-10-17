import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import {
  CONTENT_DIR,
  allContent,
  type SubjectContent,
  type Tier,
} from "./content.js";

/**
 * Checks the showcase's written content against the plan it was written to
 * (test/fixtures/showcase/plan.json) and the standard in the README there:
 * every week present, mark schemes that add up, model answers, learners'
 * answers at every ability whose marks follow from what they wrote, and no
 * placeholder text.
 *
 *   pnpm showcase:check-content               every file
 *   pnpm showcase:check-content physics-ss1   one file
 *
 * Exits 1 when anything is wrong, naming the file, week and question.
 */

type PlanFile = {
  file: string;
  subject: string;
  yearGroup: string;
  practicalWeeks: number[];
  weeks: Record<string, { pieces: string[] }>;
};

const plan: { teachingWeeks: number[]; files: PlanFile[] } = JSON.parse(
  readFileSync(join(CONTENT_DIR, "plan.json"), "utf8"),
);

const PLACEHOLDER =
  /\b(TODO|TBD|lorem|ipsum|placeholder|xxx)\b|\[(insert|add)|\.\.\.$|^Explain [A-Z]\.?$/i;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const TIERS: Tier[] = ["full", "partial", "weak"];

export function checkFile(content: SubjectContent, entry: PlanFile): string[] {
  const problems: string[] = [];
  const say = (where: string, what: string) =>
    problems.push(`${entry.file} ${where}: ${what}`);
  if (
    content.subject !== entry.subject ||
    content.yearGroup !== entry.yearGroup
  )
    say(
      "",
      `says ${content.subject} ${content.yearGroup}, plan wants ${entry.subject} ${entry.yearGroup}`,
    );

  const texts = new Set<string>();
  const unique = (where: string, text: string) => {
    const key = text.trim().toLowerCase();
    if (texts.has(key))
      say(
        where,
        `repeats text written elsewhere in the file: "${text.slice(0, 60)}"`,
      );
    texts.add(key);
  };
  const clean = (where: string, text: unknown, min = 1) => {
    if (typeof text !== "string" || !text.trim()) return say(where, "is empty");
    if (PLACEHOLDER.test(text.trim()))
      say(where, `looks like a placeholder: "${text.slice(0, 60)}"`);
    if (words(text) < min)
      say(where, `is ${words(text)} words; at least ${min} wanted`);
  };

  for (const weekNo of plan.teachingWeeks) {
    const w = content.weeks[String(weekNo)];
    const at = `week ${weekNo}`;
    if (!w) {
      say(at, "is missing");
      continue;
    }
    clean(`${at} topic`, w.topic);
    clean(`${at} lesson note`, w.lessonNote, 150);
    clean(`${at} reading title`, w.reading?.title);
    clean(`${at} reading`, w.reading?.content, 200);
    if (!Array.isArray(w.cards) || w.cards.length < 6 || w.cards.length > 10)
      say(at, `has ${w.cards?.length ?? 0} cards; 6 to 10 wanted`);
    for (const [i, c] of (w.cards ?? []).entries()) {
      clean(`${at} card ${i + 1} front`, c.front);
      clean(`${at} card ${i + 1} back`, c.back);
    }

    if (!Array.isArray(w.closed) || w.closed.length < 5)
      say(at, `has ${w.closed?.length ?? 0} closed questions; 5 wanted`);
    for (const [i, q] of (w.closed ?? []).entries()) {
      const where = `${at} closed ${i + 1}`;
      clean(`${where} prompt`, q.prompt);
      unique(where, q.prompt);
      if (!Array.isArray(q.options) || q.options.length !== 4)
        say(where, `has ${q.options?.length ?? 0} options; 4 wanted`);
      else if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== 4)
        say(where, "has two options the same");
      if (!/^[A-D]$/.test(String(q.answer)))
        say(where, `answer "${q.answer}" is not a letter A to D`);
    }

    if (!Array.isArray(w.open) || w.open.length < 2)
      say(at, `has ${w.open?.length ?? 0} open questions; 2 wanted`);
    for (const [i, q] of (w.open ?? []).entries()) {
      const where = `${at} open ${i + 1}`;
      clean(`${where} prompt`, q.prompt);
      unique(where, q.prompt);
      const points = q.markScheme?.length ?? 0;
      if (points < 2 || points > 6)
        say(where, `mark scheme has ${points} points; 2 to 6 wanted`);
      for (const [j, p] of (q.markScheme ?? []).entries())
        clean(`${where} scheme point ${j + 1}`, p);
      clean(`${where} model answer`, q.modelAnswer, 15);
      for (const tier of TIERS) {
        const n = (q.answers ?? []).filter((a) => a.tier === tier).length;
        if (n < 2) say(where, `has ${n} ${tier} answers; 2 wanted`);
      }
      for (const [j, a] of (q.answers ?? []).entries()) {
        const aw = `${where} answer ${j + 1} (${a.tier})`;
        clean(`${aw} text`, a.text);
        clean(`${aw} feedback`, a.feedback, 6);
        unique(aw, a.text);
        if (a.text.trim() === q.modelAnswer.trim())
          say(aw, "is the model answer word for word");
        const seen = new Set<number>();
        for (const m of a.meets ?? []) {
          if (!Number.isInteger(m.point) || m.point < 0 || m.point >= points)
            say(aw, `meets point ${m.point}, which the scheme does not have`);
          if (seen.has(m.point)) say(aw, `meets point ${m.point} twice`);
          seen.add(m.point);
          if (!m.quote || !a.text.includes(m.quote))
            say(aw, `quote "${m.quote}" is not in the answer`);
        }
        const got = seen.size;
        if (a.tier === "full" && got !== points)
          say(aw, `is full but meets ${got} of ${points}`);
        if (a.tier === "partial" && (got === 0 || got >= points))
          say(aw, `is partial but meets ${got} of ${points}`);
        if (a.tier === "weak" && got > 1)
          say(aw, `is weak but meets ${got} of ${points}`);
      }
    }

    const wantsPractical = entry.practicalWeeks.includes(weekNo);
    if (wantsPractical && !w.practical) say(at, "needs a practical");
    if (w.practical) {
      const p = w.practical;
      const where = `${at} practical`;
      clean(`${where} title`, p.title);
      clean(`${where} instructions`, p.instructions);
      if ((p.steps?.length ?? 0) < 4) say(where, "has fewer than 4 steps");
      if ((p.rubric?.length ?? 0) < 2)
        say(where, "has fewer than 2 rubric criteria");
      for (const tier of TIERS) {
        const n = (p.writeUps ?? []).filter((u) => u.tier === tier).length;
        if (n < 2) say(where, `has ${n} ${tier} write-ups; 2 wanted`);
      }
      for (const [j, u] of (p.writeUps ?? []).entries()) {
        const uw = `${where} write-up ${j + 1} (${u.tier})`;
        clean(`${uw} text`, u.text, 40);
        clean(`${uw} feedback`, u.feedback, 6);
        unique(uw, u.text);
        if (u.scores?.length !== p.rubric?.length)
          say(uw, "needs one score per rubric criterion");
        else
          u.scores.forEach((sc, k) => {
            if (sc < 0 || sc > p.rubric[k].maxPoints)
              say(
                uw,
                `scores ${sc} on a criterion out of ${p.rubric[k].maxPoints}`,
              );
          });
      }
    }
  }
  return problems;
}

const wanted = process.argv.slice(2).map((a) => basename(a, ".json"));
const files = allContent().filter(
  (f) => !wanted.length || wanted.includes(basename(f.file, ".json")),
);
let problems: string[] = [];
for (const { file, content } of files) {
  const entry = plan.files.find((p) => p.file === basename(file));
  if (!entry) {
    problems.push(`${basename(file)}: not in plan.json`);
    continue;
  }
  problems = problems.concat(checkFile(content, entry));
}
const missing = wanted.length
  ? []
  : plan.files.filter((p) => !existsSync(join(CONTENT_DIR, p.file)));
for (const p of problems) console.log(p);
console.log(
  `\n${files.length} file(s) checked, ${problems.length} problem(s)` +
    (missing.length
      ? `; ${missing.length} of ${plan.files.length} files not written yet`
      : ""),
);
process.exit(problems.length ? 1 : 0);
