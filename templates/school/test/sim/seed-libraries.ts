import { execFileSync } from "node:child_process";

/**
 * The NERDC and WAEC syllabus libraries and the WAEC assessment styles, put
 * into a fresh database before a school is built on it.
 *
 * All three are operator-only, run from the command line, so this runs them
 * against the database file the server is using. Each skips what is already
 * there, so running it again costs nothing.
 */
export function seedLibraries(databaseUrl: string): void {
  for (const action of ["seed-nerdc", "seed-waec", "seed-assessment-styles"]) {
    execFileSync("pnpm", ["exec", "agent-native", "action", action], {
      env: { ...process.env, DATABASE_URL: databaseUrl },
      stdio: "ignore",
    });
  }
}
