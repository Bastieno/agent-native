import assert from "node:assert/strict";
import { formatChemistry as f } from "../shared/chemistry";

// Formulas get subscripts.
assert.equal(f("MgCl2 and Al2O3"), "MgCl₂ and Al₂O₃");
assert.equal(f("Ca(NO3)2"), "Ca(NO₃)₂");
assert.equal(f("C6H12O6 + 6O2"), "C₆H₁₂O₆ + 6O₂");
assert.equal(f("3CO2 + 4H2O"), "3CO₂ + 4H₂O");
assert.equal(f("BaCl2(aq) + Na2SO4(aq)"), "BaCl₂(aq) + Na₂SO₄(aq)");

// Ions get superscript charges.
assert.equal(
  f("Mg2+ and Cl- gives MgCl2, Al3+ and O2- gives Al2O3"),
  "Mg²⁺ and Cl⁻ gives MgCl₂, Al³⁺ and O²⁻ gives Al₂O₃",
);
assert.equal(f("NH4+ and H3O+ and OH-"), "NH₄⁺ and H₃O⁺ and OH⁻");
assert.equal(f("SO42- and PO43-"), "SO₄²⁻ and PO₄³⁻");
assert.equal(f("Ba2+ + SO4 2- → BaSO4(s)"), "Ba²⁺ + SO₄²⁻ → BaSO₄(s)");
assert.equal(f("SO4^2-"), "SO₄²⁻");
assert.equal(f("Na+/K+ pump"), "Na⁺/K⁺ pump");

// A chain's hyphen is not an anion's charge.
assert.equal(f("-CH2-CH2-)n and CH2Br-CH2Br"), "-CH₂-CH₂-)n and CH₂Br-CH₂Br");

// Already typeset, or not chemistry, is left alone.
assert.equal(f("H₂O and Mg²⁺"), "H₂O and Mg²⁺");
assert.equal(f("NaCl and HCl"), "NaCl and HCl");
for (const text of [
  "N300 for B2 and Q1",
  "SS3B, JSS1 and PS2 in week 4",
  "a grade of C+ or B-",
  "Na-K pump and H-bonds",
  "the C3 Framework",
  "(IV) and P(A)",
  "C1V1 = C2V2",
]) {
  assert.equal(f(text), text, text);
}

console.log("chemistry: ok");
