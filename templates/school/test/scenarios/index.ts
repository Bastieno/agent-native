import type { Showcase } from "./showcase-types.js";
import crestfield from "./showcase-crestfield.js";
import yellowview from "./showcase-yellowview.js";

/**
 * The showcase schools, and the one this run builds: `SHOWCASE=yellowview`,
 * or Crestfield when none is named. Everything the harness does to a school
 * it reads from the school's own file.
 */
export const SCHOOLS: Record<string, Showcase> = { crestfield, yellowview };

const choice = process.env.SHOWCASE ?? "crestfield";
if (!SCHOOLS[choice]) {
  throw new Error(
    `SHOWCASE=${choice} is not a school here. Choose one of: ${Object.keys(SCHOOLS).join(", ")}.`,
  );
}
export const scenario: Showcase = SCHOOLS[choice];

/** Where a school's written content and library files live, under test/fixtures. */
export const fixtureName = (s: Showcase) =>
  s.key === "showcase" ? "showcase" : `showcase-${s.key}`;
