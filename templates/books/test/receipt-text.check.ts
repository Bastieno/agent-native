import assert from "node:assert/strict";
import { guessExpense } from "../server/lib/expense-guess.js";
import { readReceiptText } from "../server/lib/receipt-text.js";
import { check, finish } from "./helpers.js";

// Slips as text recognition returns them, with invented names and numbers.
const moniepoint = (opts: {
  date: string;
  narration: string[];
  type?: string;
  business?: string;
}) => [
  "Moniepoint",
  "MICROFINANCE BANK",
  "DEBIT",
  "N45,000.00",
  "Transaction Type",
  opts.type ?? "TRANSFER",
  "Transaclion Stalus",
  "Successful",
  "Beneliciary",
  "ADA OKORO 0123456789",
  "Beneficiary Institution",
  "OPay",
  "Business Name",
  opts.business ?? "ACME LTD - Tech workslation, restaurant, lounge",
  "Sender Name",
  "ACME LTD",
  "Transaction Dale",
  opts.date,
  "Narration",
  ...opts.narration,
  "Session ID",
  "090405260101101010",
];

await check("reads a Moniepoint slip despite garbled labels", () => {
  const r = readReceiptText(
    moniepoint({
      date: "Wednesday, July 15l, 2026 | 11:27 AM",
      narration: ["Generalor fix"],
    }),
    "2026-07-01",
  );
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.receipt.amount, 45000);
  assert.equal(r.receipt.payee, "ADA OKORO 0123456789");
  assert.equal(r.receipt.note, "Generalor fix");
  assert.equal(r.receipt.account, "Moniepoint (lounge)");
  assert.equal(r.receipt.time, "11:27 AM");
});

await check("the date is the posted day, confirmed by the weekday", () => {
  // The day number is misread (25rd), but Thursday points at the 23rd.
  const r = readReceiptText(
    moniepoint({
      date: "Thursday, July 25rd, 2026 | 12:52 PM",
      narration: ["For supoort"],
    }),
    "2026-07-23",
  );
  assert.ok(r.ok && r.receipt.date === "2026-07-23");
  // A day later, the weekday no longer fits: refuse rather than guess.
  const off = readReceiptText(
    moniepoint({
      date: "Friday, July 25rd, 2026 | 12:52 PM",
      narration: ["x"],
    }),
    "2026-07-23",
  );
  assert.ok(!off.ok);
});

await check("a full stop after the weekday doesn't hide the date", () => {
  const r = readReceiptText(
    moniepoint({
      date: "Tuescay. August 12th, 2025 | 1:47 PM",
      narration: ["For business"],
    }),
    "2025-08-12",
  );
  assert.ok(r.ok && r.receipt.date === "2025-08-12");
});

await check("a narration can wrap over several lines", () => {
  const r = readReceiptText(
    moniepoint({
      date: "Sunday, July 26th, 2026 | 3:23 PM",
      narration: ["28k ketchup, 25k Bama, 6k foil,", "1k delivery"],
    }),
    "2026-07-26",
  );
  assert.ok(r.ok);
  if (r.ok)
    assert.equal(r.receipt.note, "28k ketchup, 25k Bama, 6k foil, 1k delivery");
});

await check("reads an airtime slip", () => {
  const r = readReceiptText(
    [
      "Moniepoint",
      "DEBIT",
      "N3,000.00",
      "Transaction Type",
      "AIRTIME",
      "Transaction Status",
      "SUCCESSFUL",
      "Network",
      "MTN",
      "Phone Number",
      "08012345678",
      "Transaction Date",
      "Friday, July 10th | 6:52 AM",
    ],
    "2026-07-10",
  );
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.receipt.kind, "AIRTIME");
    assert.equal(r.receipt.amount, 3000);
    assert.equal(r.receipt.payee, "08012345678");
  }
});

const opayOld = [
  "OPay",
  "Transaction Receipt",
  "TRANSFER TO BANK",
  "N50,000.00",
  "Date/Time",
  "Sender",
  "Sender Account",
  "Bank name",
  "Recipient",
  "Recipient Account",
  "Paid with",
  "Remark",
  "SessionID",
  "Transaction No",
  "01/07/26 11:32",
  "ACME LTD",
  "1234567890",
  "OPay",
  "CHIKA OBI",
  "8023****70",
  "Owealth",
  "June Salary",
  "10000426070110",
  "pos-service@opay-inc.com",
];

await check("reads the older Opay layout", () => {
  const r = readReceiptText(opayOld, "2026-07-01");
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.receipt.payee, "CHIKA OBI");
    assert.equal(r.receipt.note, "June Salary");
    assert.equal(r.receipt.date, "2026-07-01");
    assert.equal(r.receipt.account, "Opay");
  }
});

await check(
  "reads the newer Opay layout: four-digit year, wrapped name",
  () => {
    const r = readReceiptText(
      [
        "OPay",
        "Transaction Receipt",
        "TRANSFER TO BANK",
        "N15,000.00",
        "Date/Time",
        "Sender Details",
        "Recipient Details",
        "Remark",
        "Transaction No.",
        "08/10/2026 13:22",
        "ACME LTD",
        "OPay|1234****90",
        "ZED LOGISTICS",
        "CONCEPT LIMITED",
        "Access Bank|1859****05",
        "For Fuel",
        "100004261008122209",
        "pos-service@opay-inc.com",
      ],
      "2026-10-08",
    );
    assert.ok(r.ok);
    if (r.ok) {
      assert.equal(r.receipt.payee, "ZED LOGISTICS CONCEPT LIMITED");
      assert.equal(r.receipt.note, "For Fuel");
      assert.equal(r.receipt.date, "2026-10-08");
    }
  },
);

await check("slips it can't read say why", () => {
  assert.deepEqual(
    readReceiptText(["Providus Bank", "N1,000.00"], "2026-07-01"),
    {
      ok: false,
      reason: "Providus slip",
    },
  );
  const noAmount = readReceiptText(
    ["Moniepoint", "Transaction Date"],
    "2026-07-01",
  );
  assert.ok(!noAmount.ok);
  const other = readReceiptText(["Hello"], "2026-07-01");
  assert.ok(!other.ok);
});

await check("guesses a category and business from the note", () => {
  const g = (n: string | null, k?: string) => guessExpense(n, k);
  assert.deepEqual(
    [g("5 packs of chicken").category, g("5 packs of chicken").business],
    ["Food & drink stock", "lounge"],
  );
  assert.equal(g("For slarlink subscriplion").category, "Internet");
  assert.equal(g("For slarlink subscriplion").business, "hub");
  assert.equal(g("June Salary").category, "Salaries");
  assert.equal(g("6k foil, 1k delivery").category, "Supplies"); // foil is not oil
  assert.equal(g("10k fuel, 5k oil").category, "Diesel / power");
  assert.equal(g("For welcing work").category, "Repairs");
  assert.equal(g(null, "AIRTIME").category, "Other");
  assert.equal(g("zzz").category, null);
  assert.equal(g(null).category, null);
});

await check("loans, profit and commission are not expenses", () => {
  for (const note of [
    "Part payment for loan",
    "Profil from 20 July",
    "For commission",
    "Selllement",
  ])
    assert.equal(guessExpense(note).notAnExpense, true, note);
  assert.equal(guessExpense("5k for cleaning").notAnExpense, false);
});

await finish();
