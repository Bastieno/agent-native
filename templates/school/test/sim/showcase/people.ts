import { rng, type StudentProfile, type Trajectory } from "../population.js";

/**
 * The learners of the showcase school: the names a school of its place would
 * have on its roll (the scenario brings the pool), each unique so the owner
 * can find a person by name.
 *
 * Each carries the same hidden profile as the rest of the simulation — an
 * ability, a trajectory and a diligence — and none of it is told to the app.
 * Seeded, so the same command builds the same school.
 */

export type ShowcaseLearner = StudentProfile & {
  yearGroup: string;
  arm: string;
  stream?: string;
};

/** A one-word profile for the roster, from the hidden ability. */
export function profileWord(
  ability: number,
): "strong" | "middling" | "struggling" {
  if (ability >= 0.72) return "strong";
  if (ability >= 0.45) return "middling";
  return "struggling";
}

/**
 * Every learner in the school, arm by arm.
 *
 * The spread is deliberate: most middling, a few strong, a few struggling,
 * and a handful who rarely hand anything in — so "who is struggling?" and
 * grouping have something real to find in every class.
 */
export function makeLearners(
  arms: {
    yearGroup: string;
    name: string;
    stream?: string;
    abilityBias?: number;
  }[],
  perArm: number,
  domain: string,
  names: { first: string[]; last: string[] },
  seed: number,
): ShowcaseLearner[] {
  const FIRST = names.first;
  const LAST = names.last;
  const random = rng(seed);
  const used = new Set<string>();
  const learners: ShowcaseLearner[] = [];
  let index = 0;
  for (const arm of arms) {
    for (let i = 0; i < perArm; i++) {
      let name = "";
      // Draw until the name is new; the pools hold over two thousand pairs,
      // so this ends quickly and the same seed always gives the same roll.
      for (;;) {
        const first = FIRST[Math.floor(random() * FIRST.length)];
        const last = LAST[Math.floor(random() * LAST.length)];
        name = `${first} ${last}`;
        if (!used.has(name)) break;
      }
      used.add(name);

      const ability = Math.min(
        0.96,
        Math.max(
          0.1,
          (random() + random()) / 2 +
            (random() - 0.5) * 0.2 +
            (arm.abilityBias ?? 0),
        ),
      );
      const roll = random();
      const trajectory: Trajectory =
        roll < 0.3
          ? "improving"
          : roll < 0.72
            ? "steady"
            : roll < 0.88
              ? "erratic"
              : "slipping";
      // One learner in about twelve hands in barely half of what is set.
      const diligence =
        random() < 0.08
          ? 0.35 + random() * 0.2
          : Math.min(1, 0.72 + random() * 0.3);
      const [first, last] = name.split(" ");
      learners.push({
        index: index++,
        name,
        email: `${first}.${last}`.toLowerCase() + `@${domain}`,
        ability,
        trajectory,
        diligence,
        yearGroup: arm.yearGroup,
        arm: arm.name,
        ...(arm.stream ? { stream: arm.stream } : {}),
      });
    }
  }
  return learners;
}

/** A staff member's sign-in address, from their name. */
export function staffEmail(name: string, domain: string): string {
  const [first, ...rest] = name.toLowerCase().split(" ");
  return `${first}.${rest.join("")}@${domain}`;
}
