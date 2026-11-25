import assert from "node:assert/strict";
import { check, finish } from "./helpers.js";
import { stripAccount, tidyPayee } from "../server/lib/payee-name.js";

// Made-up payees: the fork is public.
const known = [
  { name: "Acorn Kitchen Bodija", uses: 22 },
  { name: "ACORN KITCHEN BODIJA", uses: 1 },
  { name: "Bright Mart Limited | 9000000001", uses: 3 },
  { name: "Tunde Bello", uses: 4 },
];

check("the account number after the name is dropped", () => {
  assert.equal(
    stripAccount("Acorn Kitchen Bodija 1 | 9000000001"),
    "Acorn Kitchen Bodija 1",
  );
  assert.equal(
    stripAccount("TUNDE BELLO ADEYEMI 1234567A8B"),
    "TUNDE BELLO ADEYEMI",
  );
  assert.equal(
    stripAccount("Bright Mart - Ashi 1 9000000002"),
    "Bright Mart - Ashi 1",
  );
  assert.equal(stripAccount("Grace Alabi | 9000*****01"), "Grace Alabi");
  assert.equal(
    stripAccount("Acme Ventures Ltd |] 900000004"),
    "Acme Ventures Ltd",
  );
  assert.equal(stripAccount("Acorn Trading - | 9000000001"), "Acorn Trading");
  // A name that is only digits, or ends in a short number, is left alone.
  assert.equal(stripAccount("7 Up Depot"), "7 Up Depot");
  assert.equal(stripAccount("Shop 12"), "Shop 12");
});

check("a misread name takes the spelling the owner confirmed most", () => {
  assert.equal(
    tidyPayee("Acorn Kilchen Bodija 1 | 9000000001", known),
    "Acorn Kitchen Bodija",
  );
  assert.equal(
    tidyPayee("acorn kitchen bodija", known),
    "Acorn Kitchen Bodija",
  );
  // The confirmed spelling is used without its own account number.
  assert.equal(tidyPayee("Bright Mart Limiled", known), "Bright Mart Limited");
});

check("a new payee keeps its own name, without the account", () => {
  assert.equal(tidyPayee("Zenith Foods | 9000000003", known), "Zenith Foods");
  // Close but different people stay apart.
  assert.equal(tidyPayee("Tunde Bakare", known), "Tunde Bakare");
  assert.equal(tidyPayee(null, known), null);
});

await finish();
