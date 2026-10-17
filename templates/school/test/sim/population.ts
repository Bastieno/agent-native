/**
 * The people in a simulated school, and what they are like.
 *
 * Every student carries a hidden profile — how able they are, whether they
 * are getting better, whether they hand work in. None of it is ever told to
 * the app: it decides what the simulated student *does*, and the app has to
 * work out the rest from the work itself, exactly as a real school does.
 *
 * That is the whole point of simulating rather than seeding. Seeding a
 * student as "foundational" and then checking the app calls them
 * foundational proves nothing. Letting a weak student answer badly for three
 * weeks and then asking whether the app noticed is a real test.
 *
 * Seeded and deterministic, so a run can be repeated exactly and a finding
 * can be reproduced.
 */

/** A small, fast, seedable generator — Mulberry32. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Trajectory = "improving" | "steady" | "slipping" | "erratic";

export type StudentProfile = {
  index: number;
  name: string;
  email: string;
  /** 0–1. Drives how likely they are to get a question right. */
  ability: number;
  trajectory: Trajectory;
  /** 0–1. How reliably work is handed in at all. */
  diligence: number;
};

const FIRST = [
  "Adaeze",
  "Chinedu",
  "Ngozi",
  "Emeka",
  "Folake",
  "Tunde",
  "Amaka",
  "Yusuf",
  "Ifeoma",
  "Segun",
  "Hauwa",
  "Obinna",
  "Zainab",
  "Kelechi",
  "Bisi",
  "Musa",
  "Chiamaka",
  "Idris",
  "Temitope",
  "Uche",
  "Halima",
  "Chukwuma",
  "Funmi",
  "Sani",
  "Oluchi",
  "Bashir",
  "Nneka",
  "Gbenga",
  "Aisha",
  "Ikenna",
];
const LAST = [
  "Okafor",
  "Bello",
  "Adeyemi",
  "Okonkwo",
  "Balogun",
  "Eze",
  "Lawal",
  "Nwosu",
  "Abubakar",
  "Oyelaran",
  "Umeh",
  "Danjuma",
  "Afolabi",
  "Chukwu",
  "Mohammed",
];

/**
 * A class of learners with a believable spread.
 *
 * Not a neat third/third/third: most are middling, a few are strong, a few
 * struggle, which is the shape that makes grouping and differentiation worth
 * testing at all.
 */
export function makeStudents(
  count: number,
  seed: number,
  domain: string,
): StudentProfile[] {
  const random = rng(seed);
  const students: StudentProfile[] = [];
  for (let i = 0; i < count; i++) {
    // Two draws averaged: a hump in the middle rather than a flat spread.
    const ability = Math.min(
      0.97,
      Math.max(0.08, (random() + random()) / 2 + (random() - 0.5) * 0.15),
    );
    const roll = random();
    const trajectory: Trajectory =
      roll < 0.3
        ? "improving"
        : roll < 0.75
          ? "steady"
          : roll < 0.9
            ? "erratic"
            : "slipping";
    const first = FIRST[Math.floor(random() * FIRST.length)];
    const last = LAST[Math.floor(random() * LAST.length)];
    const name = `${first} ${last}`;
    students.push({
      index: i,
      name,
      email: `${first}.${last}.${i}`.toLowerCase() + `@${domain}`,
      ability,
      trajectory,
      // Nearly everyone hands work in; a few rarely do, which is what late
      // and missing-work handling needs in order to be exercised at all.
      diligence: Math.min(1, 0.55 + random() * 0.5),
    });
  }
  return students;
}

/**
 * How able a student is in a given week.
 *
 * Teaching is supposed to move this. A run that never changed it could not
 * tell whether the app notices improvement, which is most of what a term's
 * worth of marks is for.
 */
export function abilityInWeek(student: StudentProfile, week: number): number {
  const weeks = Math.max(0, week - 1);
  const drift =
    student.trajectory === "improving"
      ? 0.022 * weeks
      : student.trajectory === "slipping"
        ? -0.015 * weeks
        : 0;
  const noise =
    student.trajectory === "erratic"
      ? (rng(student.index * 1000 + week)() - 0.5) * 0.3
      : (rng(student.index * 7919 + week)() - 0.5) * 0.08;
  return Math.min(0.99, Math.max(0.05, student.ability + drift + noise));
}

/** Which band the hidden profile really belongs to, for comparison later. */
export function trueBand(
  ability: number,
): "foundational" | "developing" | "advanced" {
  if (ability >= 0.75) return "advanced";
  if (ability >= 0.5) return "developing";
  return "foundational";
}
