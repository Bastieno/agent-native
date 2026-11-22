import assert from "node:assert/strict";
import {
  NARRATION_TAGS,
  narrationGuide,
  parseNarration,
} from "../shared/narration.js";
import { guessExpense } from "../server/lib/expense-guess.js";
import { EXPENSE_CATEGORIES } from "../server/lib/setup.js";
import { check, finish } from "./helpers.js";

const p = (s: string) => {
  const r = parseNarration(s);
  return r ? [r.category, r.business, r.details] : null;
};

await check("business, then tag, then what it was for", () => {
  assert.deepEqual(p("LOUNGE STOCK 5 packs chicken"), [
    "Food & drink stock",
    "lounge",
    "5 packs chicken",
  ]);
  assert.deepEqual(p("HUB REPAIR door lock"), ["Repairs", "hub", "door lock"]);
});

await check("the business can be left out or come second", () => {
  assert.deepEqual(p("STOCK 2 crates eggs"), [
    "Food & drink stock",
    "lounge",
    "2 crates eggs",
  ]);
  assert.deepEqual(p("INTERNET Starlink November"), [
    "Internet",
    "hub",
    "Starlink November",
  ]);
  assert.deepEqual(p("STOCK hub coffee"), [
    "Food & drink stock",
    "hub",
    "coffee",
  ]);
});

await check("money that isn't a running cost belongs to no business", () => {
  assert.deepEqual(p("LOAN repayment to Ada"), [
    "Loans & repayments",
    null,
    "repayment to Ada",
  ]);
  assert.deepEqual(p("LOUNGE OWNER November pay"), [
    "Owner's pay",
    null,
    "November pay",
  ]);
});

await check("a slightly misread tag still counts", () => {
  assert.deepEqual(p("LOUNGE DlESEL 20 litres")?.[0], "Diesel / power");
  assert.deepEqual(p("L0UNGE SALARY gateman")?.slice(0, 2), [
    "Salaries",
    "lounge",
  ]);
});

await check("ordinary notes are not mistaken for the format", () => {
  assert.equal(p("5 packs of chicken"), null);
  assert.equal(p("For stock"), null);
  assert.equal(p("Lounge"), null);
  // Tags are written in capitals, so everyday words don't trigger them.
  assert.equal(p("Move generator to the hub"), null);
  assert.equal(p("Rent for the shop"), null);
  assert.equal(p(""), null);
});

await check(
  "every tag names a real category, and the guide lists them all",
  () => {
    const guide = narrationGuide();
    for (const t of NARRATION_TAGS) {
      assert.ok(EXPENSE_CATEGORIES.includes(t.category), t.category);
      assert.ok(guide.includes(t.tag), t.tag);
    }
  },
);

await check("a tagged note is taken as said, not guessed", () => {
  const g = guessExpense("HUB REPAIR door hinge");
  assert.deepEqual(
    [g.category, g.business, g.tagged],
    ["Repairs", "hub", true],
  );
  const untagged = guessExpense("5 packs of chicken");
  assert.equal(untagged.tagged, false);
});

await finish();
