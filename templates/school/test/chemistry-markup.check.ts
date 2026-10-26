import assert from "node:assert/strict";
import { markChemistry as m } from "../ops/lib/chemistry-markup";

assert.equal(m("MgCl2 and Al2O3"), "$\\ce{MgCl2}$ and $\\ce{Al2O3}$");
assert.equal(m("Ca(NO3)2"), "$\\ce{Ca(NO3)2}$");
assert.equal(m("3CO2 + 4H2O"), "$\\ce{3CO2}$ + $\\ce{4H2O}$");
assert.equal(
  m("Mg2+ and Cl- gives MgCl2"),
  "$\\ce{Mg^2+}$ and $\\ce{Cl^-}$ gives $\\ce{MgCl2}$",
);
assert.equal(m("SO42- and PO43-"), "$\\ce{SO4^2-}$ and $\\ce{PO4^3-}$");
assert.equal(m("Ba2+ + SO4 2-"), "$\\ce{Ba^2+}$ + $\\ce{SO4^2-}$");
assert.equal(m("but-2-ene CH3CH=CHCH3"), "but-2-ene $\\ce{CH3CH=CHCH3}$");
assert.equal(
  m("water (H2O) and (CO2)"),
  "water ($\\ce{H2O}$) and ($\\ce{CO2}$)",
);
assert.equal(m("contains CH3CH(OH)-, as"), "contains $\\ce{CH3CH(OH)}$-, as");
assert.equal(m("Na+/K+ pump"), "$\\ce{Na^+}$/$\\ce{K^+}$ pump");

// Already marked is left alone.
assert.equal(m("$\\ce{MgCl2}$ and MgCl2"), "$\\ce{MgCl2}$ and $\\ce{MgCl2}$");

for (const text of [
  "N300 for B2 and Q1",
  "SS3B, JSS1 and PS2 in week 4",
  "a grade of C+ or B-",
  "Na-K pump and H-bonds",
  "the C3 Framework",
  "C1V1 = C2V2",
  "NaCl and HCl",
  "paid (N100) and (F2) offspring",
  "(a) B2C2. (b) D2D3.",
  "VO2 max",
]) {
  assert.equal(m(text), text, text);
}
console.log("chemistry-markup: ok");
