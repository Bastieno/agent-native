/**
 * The demo schools. Each has its own port, database and snapshot, so a take in
 * one can never touch another, and none is the pilot (8130) or the owner's
 * showcases (8131, 8133).
 */
export type SchoolId =
  | "crestfield"
  | "crestfield-term"
  | "yellowview"
  | "empty";

export interface School {
  id: SchoolId;
  port: number;
  /** Database path relative to the template root, as DATABASE_URL wants it. */
  db: string;
  /** What `pnpm demo:snapshot <id>` builds. */
  about: string;
}

export const SCHOOLS: Record<SchoolId, School> = {
  crestfield: {
    id: "crestfield",
    port: 8134,
    db: "./data/demo.db",
    about: "Crestfield up to the moment before its timetable",
  },
  yellowview: {
    id: "yellowview",
    port: 8135,
    db: "./data/demo-yellowview.db",
    about: "Yellow View, the Ohio school, after a quarter",
  },
  empty: {
    id: "empty",
    port: 8136,
    db: "./data/demo-empty.db",
    about: "A new school with a head and nothing set up",
  },
  "crestfield-term": {
    id: "crestfield-term",
    port: 8137,
    db: "./data/demo-term.db",
    about: "Crestfield after a full term, with week 10 still unmarked",
  },
};

export const schoolIds = Object.keys(SCHOOLS) as SchoolId[];
