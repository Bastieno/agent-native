/**
 * What a learner is doing well and what needs attention, said plainly.
 *
 * A table of marks makes the person reading it do the interpreting, and an
 * admin or teacher who asks "how is Tolu doing?" wants the answer and what to
 * do about it. But a bare claim is not enough to act on: "marks are rising"
 * means nothing until someone can see what it was counted from. So every
 * finding carries three things — what it says, how it was counted (`basis`),
 * and the papers behind it (`evidence`) — and the reader never has to take it
 * on trust. Pure: no database, no clock.
 *
 * What it will not do is label the child. It reads marks, hand-ins and
 * trend; it does not read how long answers took, it does not guess at causes,
 * and it says nothing about what kind of learner someone is.
 */

export interface FindingPiece {
  title: string;
  topic: string;
  state: "marked" | "waiting" | "open" | "missed";
  percentage: number | null;
  dueDate?: string | null;
  score?: number | null;
  maxScore?: number | null;
}

export interface FindingSubject {
  classId: string;
  subject: string;
  teacher: string | null;
  percentage: number | null;
  belowPassMark: boolean;
  marked: number;
  missed: number;
  pieces: FindingPiece[];
  /** The class's average for this subject, when there is one. */
  classAverage: number | null;
}

export interface TrendHalfInput {
  count: number;
  missed: number;
  from: string | null;
  to: string | null;
  average: number;
  averageOfMarked: number | null;
  pieces?: Array<{
    subject: string;
    title: string;
    dueDate: string | null;
    percentage: number | null;
    missed: boolean;
  }>;
}

export interface FindingSummary {
  percentage: number | null;
  passMark: number;
  handedIn: number;
  set: number;
  missed: number;
  /** Earlier and later halves of the term's marks, when there are enough. */
  earlier: number | null;
  later: number | null;
  /** What each half is made of, so a rise or fall can be checked. */
  trend?: { earlier: TrendHalfInput; later: TrendHalfInput } | null;
  /** Whether work not handed in counts as zero in the averages. */
  missedCountsAsZero?: boolean;
}

export interface Finding {
  /** What kind of thing this is, for anything that wants to group or filter. */
  kind:
    | "subject-strong"
    | "subject-above-class"
    | "trend-up"
    | "all-handed-in"
    | "below-pass-mark"
    | "behind-class"
    | "missed-work"
    | "trend-down"
    | "nothing-marked";
  subject: string | null;
  /** One sentence, in plain words. */
  text: string;
  /** How the figures in it were counted, in one or two plain sentences. */
  basis: string;
  /** The papers and figures behind it, one per line. */
  evidence: string[];
}

export interface Findings {
  strengths: Finding[];
  concerns: Finding[];
  /** Suggested next steps for the person asking: who to talk to, about what. */
  next: string[];
}

/** A subject this far above the pass mark counts as going well. */
const STRONG_MARGIN = 15;
/** Points above or below the class that is worth saying. */
const CLASS_GAP = 10;
/** Points between the earlier and later half of the term that is a trend. */
const TREND_GAP = 8;
/** Lines of evidence listed before "and N more". */
const EVIDENCE_LINES = 8;

const points = (n: number) => `${n} point${n === 1 ? "" : "s"}`;
const list = (xs: string[]) =>
  xs.length <= 1
    ? (xs[0] ?? "")
    : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
/** "2026-10-16" as "16 Oct", with no clock or time zone involved. */
const day = (iso: string | null | undefined) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? "");
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]}` : "";
};
const range = (from: string | null, to: string | null) =>
  from && to
    ? day(from) === day(to)
      ? day(from)
      : `${day(from)} to ${day(to)}`
    : "";

/** One line for a piece of work, with its mark or the fact it was missed. */
const pieceLine = (p: FindingPiece, subject?: string) => {
  const lead = [subject, p.title].filter(Boolean).join(" · ");
  const due = p.dueDate ? ` · due ${day(p.dueDate)}` : "";
  const mark =
    p.state === "marked"
      ? p.score != null && p.maxScore != null
        ? ` · ${p.score}/${p.maxScore} (${p.percentage}%)`
        : ` · ${p.percentage}%`
      : p.state === "missed"
        ? " · not handed in"
        : p.state === "waiting"
          ? " · handed in, waiting for marks"
          : " · still open";
  return `${lead}${due}${mark}`;
};

/** A capped list of evidence lines. */
const capped = (lines: string[]) =>
  lines.length > EVIDENCE_LINES
    ? [
        ...lines.slice(0, EVIDENCE_LINES),
        `and ${lines.length - EVIDENCE_LINES} more`,
      ]
    : lines;

export function findingsFor(input: {
  subjects: FindingSubject[];
  summary: FindingSummary | null;
}): Findings {
  const { subjects, summary } = input;
  const strengths: Finding[] = [];
  const concerns: Array<Finding & { order: number }> = [];
  const next: string[] = [];
  if (!summary) return { strengths, concerns: [], next };

  const pass = summary.passMark;
  const zero = summary.missedCountsAsZero ?? false;

  /** How a subject's figure was reached, in the school's own counting. */
  const subjectBasis = (s: FindingSubject) =>
    `Average of ${s.marked} marked piece${s.marked === 1 ? "" : "s"} in ${s.subject}, published marks only` +
    (s.missed > 0
      ? zero
        ? `, plus ${s.missed} not handed in counted as zero.`
        : `, with ${s.missed} not handed in left out of the average (shown separately).`
      : ".");
  const classBasis =
    " The class figure is the mean of each enrolled learner's average in the subject, counted the same way.";

  /** The marks behind a subject: anything missed first, then lowest marks. */
  const subjectEvidence = (s: FindingSubject) =>
    capped(
      [...s.pieces]
        .filter((p) => p.state === "marked" || p.state === "missed")
        .sort(
          (a, b) =>
            (a.state === "missed" ? -1 : (a.percentage ?? 0)) -
            (b.state === "missed" ? -1 : (b.percentage ?? 0)),
        )
        .map((p) => pieceLine(p)),
    );

  for (const s of subjects) {
    const pct = s.percentage;
    const missedPieces = s.pieces.filter((p) => p.state === "missed");
    const gap =
      pct !== null && s.classAverage !== null ? s.classAverage - pct : null;

    if (pct === null) {
      // Nothing marked is not the same as doing badly, and not the same as
      // doing fine: say what is true.
      if (s.marked === 0 && s.pieces.length > 0) {
        concerns.push({
          kind: missedPieces.length ? "missed-work" : "nothing-marked",
          subject: s.subject,
          text: missedPieces.length
            ? `${s.subject}: nothing has come back marked, and ${list(missedPieces.map((p) => p.topic)).slice(0, 80)} was not handed in.`
            : `${s.subject}: nothing has been marked yet.`,
          basis: `${s.pieces.length} piece${s.pieces.length === 1 ? "" : "s"} published for ${s.subject}; none has a published mark.`,
          evidence: capped(s.pieces.map((p) => pieceLine(p))),
          order: 101,
        });
      }
      continue;
    }

    if (s.belowPassMark) {
      concerns.push({
        kind: "below-pass-mark",
        subject: s.subject,
        text:
          gap !== null && gap >= CLASS_GAP
            ? `${s.subject}: ${pct}%, below the ${pass}% pass mark and ${points(gap)} under the class average.`
            : `${s.subject}: ${pct}%, below the ${pass}% pass mark.`,
        basis: subjectBasis(s) + (s.classAverage !== null ? classBasis : ""),
        evidence: [
          ...(s.classAverage !== null
            ? [`Class average ${s.classAverage}%`]
            : []),
          ...subjectEvidence(s),
        ],
        order: pct,
      });
    } else if (gap !== null && gap >= CLASS_GAP) {
      concerns.push({
        kind: "behind-class",
        subject: s.subject,
        text: `${s.subject}: ${pct}%, ${points(gap)} below the class average of ${s.classAverage}%.`,
        basis: subjectBasis(s) + classBasis,
        evidence: [`Class average ${s.classAverage}%`, ...subjectEvidence(s)],
        order: pct + 50,
      });
    }

    if (missedPieces.length > 0) {
      const short = (t: string) => (t.length > 48 ? `${t.slice(0, 45)}...` : t);
      concerns.push({
        kind: "missed-work",
        subject: s.subject,
        text: `${s.subject}: ${missedPieces.length} piece${missedPieces.length === 1 ? "" : "s"} of work not handed in (${list(missedPieces.slice(0, 2).map((p) => short(p.title)))}${missedPieces.length > 2 ? ` and ${missedPieces.length - 2} more` : ""}).`,
        basis:
          "Work published to the class, now closed, with no submission from this learner.",
        evidence: capped(missedPieces.map((p) => pieceLine(p))),
        order: 60,
      });
    }

    if (!s.belowPassMark && pct >= pass + STRONG_MARGIN) {
      strengths.push({
        kind: "subject-strong",
        subject: s.subject,
        text:
          gap !== null && gap <= -CLASS_GAP
            ? `${s.subject}: ${pct}%, ${points(-gap)} above the class average of ${s.classAverage}%.`
            : `${s.subject}: ${pct}%, well clear of the ${pass}% pass mark.`,
        basis: subjectBasis(s) + (s.classAverage !== null ? classBasis : ""),
        evidence: [
          ...(s.classAverage !== null
            ? [`Class average ${s.classAverage}%`]
            : []),
          ...subjectEvidence(s),
        ],
      });
    } else if (!s.belowPassMark && gap !== null && gap <= -CLASS_GAP) {
      strengths.push({
        kind: "subject-above-class",
        subject: s.subject,
        text: `${s.subject}: ${pct}%, ${points(-gap)} above the class average of ${s.classAverage}%.`,
        basis: subjectBasis(s) + classBasis,
        evidence: [`Class average ${s.classAverage}%`, ...subjectEvidence(s)],
      });
    }
  }

  // The trend, with what each half is made of. "Marks are rising" is only a
  // claim until the reader can see which work was counted, how much of it was
  // not handed in, and what the marks earned came to on their own.
  if (summary.earlier !== null && summary.later !== null) {
    const change = summary.later - summary.earlier;
    const t = summary.trend ?? null;
    if (Math.abs(change) >= TREND_GAP) {
      const up = change > 0;
      const periodE = t ? range(t.earlier.from, t.earlier.to) : "";
      const periodL = t ? range(t.later.from, t.later.to) : "";
      const earnedE = t?.earlier.averageOfMarked ?? null;
      const earnedL = t?.later.averageOfMarked ?? null;
      const showEarned =
        zero &&
        !!t &&
        t.earlier.missed + t.later.missed > 0 &&
        earnedE !== null &&
        earnedL !== null;
      const word = up ? "rising" : "falling";
      const text =
        t && periodE && periodL
          ? `Marks are ${word}: work due ${periodE} averaged ${summary.earlier}%, and work due ${periodL} averaged ${summary.later}%.` +
            (showEarned
              ? ` On the marks actually earned, leaving out work not handed in, that is ${earnedE}% ${up ? "rising" : "falling"} to ${earnedL}%.`
              : "")
          : `Marks are ${word}: ${summary.earlier}% earlier in the term, ${summary.later}% since.`;
      const half = (label: string, h: TrendHalfInput) =>
        `${label}: ${h.count} pieces due ${range(h.from, h.to)}; ${h.missed} not handed in${zero && h.missed ? " (counted as zero)" : ""}. Average ${h.average}%` +
        (h.averageOfMarked !== null && h.missed > 0
          ? `; on the marks earned alone, ${h.averageOfMarked}%.`
          : ".");
      const notHanded = (h: TrendHalfInput | undefined) =>
        capped(
          (h?.pieces ?? [])
            .filter((p) => p.missed)
            .map(
              (p) =>
                `${p.subject} · ${p.title} · due ${day(p.dueDate)} · not handed in`,
            ),
        );
      const finding: Finding = {
        kind: up ? "trend-up" : "trend-down",
        subject: null,
        text,
        basis:
          "Every piece of marked work counted in the term, in order of due date, split into two halves of equal size. Each half is averaged the way the term average is" +
          (zero
            ? ": work not handed in counts as zero."
            : ": work not handed in is left out."),
        evidence: t
          ? [
              half("Earlier half", t.earlier),
              half("Later half", t.later),
              ...(notHanded(t.earlier).length
                ? ["Not handed in, earlier half:", ...notHanded(t.earlier)]
                : []),
              ...(notHanded(t.later).length
                ? ["Not handed in, later half:", ...notHanded(t.later)]
                : []),
            ]
          : [
              `Earlier half ${summary.earlier}%`,
              `Later half ${summary.later}%`,
            ],
      };
      if (up) strengths.push(finding);
      else concerns.push({ ...finding, order: 40 });
    }
  }

  if (
    summary.set > 0 &&
    summary.missed === 0 &&
    summary.handedIn >= summary.set
  ) {
    strengths.push({
      kind: "all-handed-in",
      subject: null,
      text: `Has handed in everything set so far (${summary.handedIn} pieces of work).`,
      basis:
        "Every piece of marked work published to the class so far, handed in or waiting for marks.",
      evidence: [`${summary.handedIn} of ${summary.set} handed in`],
    });
  }

  concerns.sort((a, b) => a.order - b.order);
  // The per-subject lines, before any are rolled up, for the next steps.
  const detailed = [...concerns];

  // A learner who is struggling everywhere would otherwise get a line per
  // subject, twice. Past three, say the picture in one line and keep the rest
  // as evidence, so the reader sees the shape first and can still drill in.
  const rolled: Array<Finding & { order: number }> = [];
  const below = concerns.filter((c) => c.kind === "below-pass-mark");
  const missed = concerns.filter((c) => c.kind === "missed-work");
  const marked = subjects.filter((s) => s.percentage !== null).length;
  const missedIn = (name: string | null) =>
    subjects.find((s) => s.subject === name)?.missed ?? 0;
  for (const c of concerns) {
    if (c.kind === "below-pass-mark" && below.length > 3) {
      if (c === below[0]) {
        const lowest = below
          .slice(0, 3)
          .map((x) => `${x.subject} (${/: (\d+)%/.exec(x.text)?.[1] ?? "?"}%)`);
        rolled.push({
          kind: "below-pass-mark",
          subject: null,
          text: `Below the ${pass}% pass mark in ${below.length} of ${marked} subjects; the lowest are ${list(lowest)}.`,
          basis:
            "Each subject is the learner's average on published marks" +
            (zero
              ? ", with work not handed in counted as zero."
              : ", with work not handed in left out."),
          evidence: below.map((x) => x.text),
          order: below[0].order,
        });
      }
      continue;
    }
    if (c.kind === "missed-work" && missed.length > 3) {
      if (c === missed[0]) {
        const total = missed.reduce((n, x) => n + missedIn(x.subject), 0);
        const most = [...missed]
          .sort((x, y) => missedIn(y.subject) - missedIn(x.subject))
          .slice(0, 3)
          .map((x) => `${x.subject} (${missedIn(x.subject)})`);
        rolled.push({
          kind: "missed-work",
          subject: null,
          text: `${total} pieces of work not handed in across ${missed.length} subjects; most in ${list(most)}.`,
          basis:
            "Work published to the class, now closed, with no submission from this learner.",
          evidence: missed.flatMap((x) =>
            x.evidence.map((e) =>
              e.startsWith("and ")
                ? `${x.subject}: ${e}`
                : `${x.subject} · ${e}`,
            ),
          ),
          order: missed[0].order,
        });
      }
      continue;
    }
    rolled.push(c);
  }
  concerns.length = 0;
  concerns.push(...rolled);

  // A learner who is ahead of the class in every subject would otherwise get a
  // dozen near-identical lines. Keep the three clearest and say how many more.
  const bySubject = strengths.filter(
    (f) => f.kind === "subject-strong" || f.kind === "subject-above-class",
  );
  if (bySubject.length > 3) {
    const gapOf = (f: Finding) => {
      const m = f.text.match(/(\d+) points? above/);
      return m ? Number(m[1]) : 0;
    };
    const ranked = [...bySubject].sort((x, y) => gapOf(y) - gapOf(x));
    const kept = new Set(ranked.slice(0, 3));
    const rest = ranked.slice(3);
    const merged: Finding = {
      kind: "subject-above-class",
      subject: null,
      text: `${rest.length} more subject${rest.length === 1 ? " is" : "s are"} also above the pass mark or the class average.`,
      basis:
        "Each subject is the learner's average on published marks, against the class's average counted the same way.",
      evidence: rest.map((f) => f.text),
    };
    const others = strengths.filter((f) => !bySubject.includes(f));
    strengths.length = 0;
    strengths.push(...ranked.filter((f) => kept.has(f)), merged, ...others);
  }

  // Next steps: who to speak to, about which subject, naming the work. Written
  // as suggestions for the person asking, never as something done for them.
  const spoken = new Set<string>();
  for (const c of detailed) {
    if (!c.subject || spoken.has(c.subject)) continue;
    const s = subjects.find((x) => x.subject === c.subject);
    if (!s) continue;
    spoken.add(c.subject);
    const missedHere = s.pieces.filter((p) => p.state === "missed");
    const who = s.teacher ? `${s.teacher}` : `the ${s.subject} teacher`;
    if (missedHere.length > 0 && s.belowPassMark) {
      next.push(
        `Speak to ${who} about ${s.subject}: below the pass mark with ${missedHere.length} piece${missedHere.length === 1 ? "" : "s"} not handed in.`,
      );
    } else if (missedHere.length > 0) {
      next.push(
        `Ask ${who} about ${s.subject}: whether ${list(missedHere.slice(0, 2).map((p) => p.topic))} can still be handed in.`,
      );
    } else if (s.belowPassMark || c.kind === "behind-class") {
      next.push(
        `Ask ${who} about ${s.subject}: what is behind the marks, and what support would help.`,
      );
    }
  }

  return {
    strengths,
    concerns: concerns.map(({ order: _order, ...rest }) => rest),
    next: next.slice(0, 4),
  };
}
