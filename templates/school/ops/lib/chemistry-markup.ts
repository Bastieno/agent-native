/**
 * One-off: mark chemical formulas and ions in already-written text so they are
 * set as notation, `$\\ce{MgCl2}$`, instead of shown as typed.
 *
 * Used by `ops/convert-notation.ts` to bring stored content up to the rule in
 * AGENTS.md. It is not part of the app: nothing reads text through it at
 * display time. It guesses from the text, so its output is reviewed before it
 * is applied, and anything already inside `$...$` is left alone.
 *
 * Plain text is full of things that look like formulas: "B2" is a bay, "N300"
 * a price in naira, "SS3B" a class. A token is only a formula when every
 * symbol in it is a real element AND it is clearly chemistry: two or more
 * different elements ("CO2", "NH4Cl"), a known diatomic or allotrope ("O2"),
 * or a charge ("Mg2+"). Anything else is left as it was typed.
 */

const ELEMENTS = new Set(
  (
    "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn " +
    "Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La " +
    "Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po " +
    "At Rn Fr Ra Ac Th Pa U Np Pu"
  ).split(" "),
);

/** Molecules and allotropes written as one element with a count. */
const ELEMENTAL = new Set([
  "H2",
  "N2",
  "O2",
  "O3",
  "F2",
  "Cl2",
  "Br2",
  "I2",
  "P4",
  "S8",
]);

/** Ions that are written with a bare sign and nothing else: Na+, Cl-. */
const BARE_ION_ELEMENTS = new Set([
  "H",
  "Li",
  "Na",
  "K",
  "Rb",
  "Cs",
  "Ag",
  "Cl",
  "Br",
]);

/** Class and problem-set labels that happen to be made of element symbols. */
const LABELS = /^(?:J?SS|PS|NS)\d/;

/** "C1V1 = C2V2" and "P1V1": a dilution or gas law, not vanadium. */
const LAWS = /^(?:[CP]\d?V\d?|VO2)$/;

/** An answer key such as "B2C2": option B for question 2, option C for question 2. */
const ANSWER_KEY = /^(?:[A-F]\d)+$/;

/** A formula body: element symbols with counts, and (groups)n. */
const FORMULA = String.raw`(?:\((?:[A-Z][a-z]?\d*)+\)\d*|[A-Z][a-z]?\d*)+`;

const TOKEN = new RegExp(
  String.raw`(?<![A-Za-z0-9])(\d*)(${FORMULA})` +
    // a charge, directly attached, after a caret, or after one space ("SO4 2-")
    String.raw`(?:(\^?)(\d*)([+-])|( )(\d)([+-]))?(?![A-Za-z0-9])`,
  "g",
);

/** The element symbols of a formula, or null when any is not a real one. */
function elementsOf(formula: string): string[] | null {
  const symbols = formula.match(/[A-Z][a-z]?/g) ?? [];
  return symbols.every((s) => ELEMENTS.has(s)) ? symbols : null;
}

const MARKED = /\$[^$\n]*\$/;

const mark = (value: string): string =>
  value.replace(
    TOKEN,
    (
      whole: string,
      coefficient: string,
      formula: string,
      caret: string | undefined,
      chargeDigits: string | undefined,
      sign: string | undefined,
      space: string | undefined,
      spacedDigit: string | undefined,
      spacedSign: string | undefined,
      offset: number,
      source: string,
    ) => {
      if (
        LABELS.test(formula) ||
        LAWS.test(formula) ||
        ANSWER_KEY.test(formula)
      ) {
        return whole;
      }
      // "(H2O)" and "(CO2)" are a formula in brackets: mark the formula, keep
      // the brackets. "(N100)" and "(F2)" go on to be judged, and left alone.
      const wrapped = /^\(([^()]+)\)$/.exec(formula);
      if (wrapped) {
        const inner = mark(wrapped[1]);
        return inner === wrapped[1] ? whole : `(${inner})`;
      }
      const symbols = elementsOf(formula);
      if (!symbols) return whole;
      const distinct = new Set(symbols);
      const trailing = /\d+$/.exec(formula)?.[0] ?? "";
      const single = distinct.size === 1 && !formula.includes("(");

      // "-CH2-CH2-)n" is a chain, not an anion: a sign after a hyphen is not a charge.
      if (sign && !caret && source[offset + coefficient.length - 1] === "-") {
        const rest = whole.slice(coefficient.length + formula.length);
        return `$\\ce{${coefficient}${formula}}$${rest}`;
      }

      // "CH3CH(OH)-" is a fragment of a chain: a sign after a bracket is a bond.
      if (sign && !caret && !chargeDigits && formula.endsWith(")")) {
        return `$\\ce{${coefficient}${formula}}$${sign}`;
      }

      let body = formula;
      let charge = "";
      if (spacedSign && spacedDigit) {
        // "SO4 2-": only a polyatomic ion is written with a space.
        if (distinct.size < 2) return whole;
        charge = `^${spacedDigit}${spacedSign}`;
      } else if (sign) {
        let digits = chargeDigits ?? "";
        if (!digits && !caret) {
          // The digits fused to the formula may be the charge: Mg2+, SO42-.
          if (
            single &&
            trailing.length === 1 &&
            formula.length > trailing.length
          ) {
            digits = trailing;
            body = formula.slice(0, -1);
          } else if (!single && trailing.length >= 2) {
            digits = trailing.slice(-1);
            body = formula.slice(0, -1);
          } else if (single && !trailing && !BARE_ION_ELEMENTS.has(formula)) {
            return whole; // "C+" and "B-" are grades, not ions
          }
        }
        if (single && !digits && !BARE_ION_ELEMENTS.has(body)) return whole;
        charge = `^${digits}${sign}`;
      } else {
        // No charge: only clearly chemical, and only if there is a count.
        if (!/\d/.test(formula)) return whole;
        if (single && !ELEMENTAL.has(formula)) return whole;
      }

      return `$\\ce{${coefficient}${body}${charge}}$`;
    },
  );

/** Text with its chemistry marked, leaving anything already in `$...$` as it is. */
export function markChemistry(value: string): string {
  return value
    .split(/(\$[^$\n]*\$)/)
    .map((part) => (MARKED.test(part) ? part : mark(part)))
    .join("")
    .replace(/\}\$([=-])\$\\ce\{/g, "$1");
}
