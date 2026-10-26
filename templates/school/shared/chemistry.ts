/**
 * Write chemical formulas and ions the way a chemistry book does.
 *
 * Notes, questions and answers are typed as plain text: "Mg2+ and Cl- gives
 * MgCl2", "Al2O3", "Ca(NO3)2". A teacher reads that as wrong, and so does a
 * learner copying it into an exam. The text is stored exactly as typed, by
 * people and by the agent, so the fix is at display time: subscripts for atom
 * counts, superscripts for charge — Mg²⁺, Cl⁻, MgCl₂, Al₂O₃, Ca(NO₃)₂.
 *
 * Unicode sub- and superscripts rather than LaTeX, because the print renderer
 * writes prompts and options as plain strings, and this works in both places.
 *
 * Plain text is full of things that look like formulas: "B2" is a bay, "N300"
 * is a price in naira, "SS3B" is a class. So a token is only a formula when
 * every symbol in it is a real element AND it is clearly chemistry: two or more
 * different elements ("CO2", "NH4Cl"), a known diatomic or allotrope ("O2"), or
 * a charge ("Mg2+"). Anything else is left as it was typed.
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
const LAWS = /^[CP]\d?V\d?$/;

const SUB = "₀₁₂₃₄₅₆₇₈₉";
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

const sub = (digits: string) =>
  digits.replace(/\d/g, (d) => SUB[Number(d)] ?? d);
const sup = (digits: string) =>
  digits.replace(/\d/g, (d) => SUP[Number(d)] ?? d);
const signChar = (s: string) => (s === "+" ? "⁺" : "⁻");

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

/** Subscripts for counts: every digit run in the formula body. */
function subscripted(formula: string): string {
  return formula.replace(/\d+/g, sub);
}

export function formatChemistry(value: string): string {
  return value.replace(
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
      if (LABELS.test(formula) || LAWS.test(formula)) return whole;
      const symbols = elementsOf(formula);
      if (!symbols) return whole;
      const distinct = new Set(symbols);
      const trailing = /\d+$/.exec(formula)?.[0] ?? "";
      const single = distinct.size === 1 && !formula.includes("(");

      // "-CH2-CH2-)n" is a chain, not an anion: a sign after a hyphen is not a charge.
      if (sign && !caret && source[offset + coefficient.length - 1] === "-") {
        const rest = whole.slice(coefficient.length + formula.length);
        return coefficient + subscripted(formula) + rest;
      }

      // Charge, resolved to the body of the formula and its superscript.
      let body = formula;
      let charge = "";
      if (spacedSign && spacedDigit) {
        // "SO4 2-": only a polyatomic ion is written with a space.
        if (distinct.size < 2) return whole;
        charge = sup(spacedDigit) + signChar(spacedSign);
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
        charge = sup(digits) + signChar(sign);
      } else {
        // No charge: only clearly chemical, and only if there is a count.
        const countless = !/\d/.test(formula);
        if (countless) return whole;
        if (single && !ELEMENTAL.has(formula)) return whole;
      }

      return coefficient + subscripted(body) + charge;
    },
  );
}
