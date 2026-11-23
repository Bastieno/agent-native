/**
 * Applies the owner's answers of 2026-11-23 to the expenses already in Books:
 * who on the payroll works for which business, diesel/power and repairs to the
 * Hub, personal spending to Owner's pay, refunds to customers, and a few single
 * expenses the owner placed by hand. Notes the owner wrote are left alone.
 * Safe to run more than once.
 *
 * Usage: pnpm tsx ops/apply-category-answers.ts [--dry]
 * Uses DATABASE_URL, or ./data/app.db when unset.
 */
process.env.DATABASE_URL ??= "file:./data/app.db";
const dry = process.argv.includes("--dry");
// --no-reconcile: change the expenses only; recalculate on the server after
// (POST /api/books/cron/reconcile), which is much faster than over a tunnel.
const skipReconcile = process.argv.includes("--no-reconcile");

const { migrateForChecks } = await import("../server/db/migrate.js");
const { rows, run } = await import("../server/lib/sql.js");
const { ensureExpenseCategories, OWNERS_PAY, REFUNDS, CLIENT } =
  await import("../server/lib/setup.js");
const { expenseNote, OWNER_MARK } =
  await import("../server/lib/expense-note.js");
const { guessExpense, fuelOnly } =
  await import("../server/lib/expense-guess.js");
const { savePayeeRule } = await import("../server/lib/payee-rules.js");
const { saveStaff, SALARIES } = await import("../server/lib/staff.js");
const { payeeKey } = await import("../server/lib/payee-rules.js");
const { reconcileDays } = await import("../server/lib/reconcile-days.js");

await migrateForChecks();

/** The owner's answer: who works where. Two spellings of one name are listed. */
const STAFF: [string, "lounge" | "hub"][] = [
  ["PEACE UDO", "hub"],
  ["RUTH ADEBAYO", "hub"],
  ["SAMUEL KOLA", "hub"],
  ["ESTHER OJO", "hub"],
  ["LOIS AKANDE", "hub"],
  ["JOY OKAKE", "hub"],
  ["JOY OKEKE", "hub"],
  ["TUNDE BELLO", "hub"],
  ["BISI JAMES", "lounge"],
  ["GRACE ALABI", "lounge"],
  ["KEMI ADUNNI", "lounge"],
];

/** Single expenses the owner placed by hand. */
const BY_CODE: Record<string, { category: string; business: string | null }> = {
  "E-929": { category: SALARIES, business: "lounge" }, // Kemi, August salary
  "E-1026": { category: "Supplies", business: "lounge" }, // Kemi, no note
  "E-1040": { category: "Supplies", business: "lounge" }, // Kemi, no note
  "E-371": { category: "Repairs", business: "hub" }, // Paul, painting at the Hub
  "E-973": { category: "Internet", business: "hub" }, // Canal+, an internet provider
  "E-185": { category: OWNERS_PAY, business: null }, // home wifi
  "E-626": { category: OWNERS_PAY, business: null }, // phone data
  // Transport for this year's construction work at the Hub.
  "E-447": { category: "Repairs", business: "hub" },
  "E-375": { category: "Repairs", business: "hub" },
  "E-1217": { category: "Repairs", business: "hub" },
  "E-837": { category: "Repairs", business: "hub" },
  "E-946": { category: "Repairs", business: "hub" },
  "E-966": { category: "Repairs", business: "hub" },
  "E-401": { category: "Repairs", business: "hub" },
  "E-866": { category: "Equipment & furniture", business: "hub" }, // furniture delivery
};

const orgs = await rows<{ org_id: string }>(
  `SELECT DISTINCT org_id FROM expenses`,
);
for (const { org_id: orgId } of orgs) {
  await ensureExpenseCategories(orgId);
  if (!dry) {
    for (const [name, biz] of STAFF) await saveStaff(orgId, name, biz);
    // Paul Daniel is the painter: his payments are Hub repairs.
    await savePayeeRule(orgId, {
      payee: "PAUL DANIEL",
      category: "Repairs",
      business: "hub",
    });
    // Weeldrop is a filling station: fuel there is the owner's car.
    for (const payee of ["WEELDROP LOGISTICS", "WEELDRCP LOGISTICS"])
      await savePayeeRule(orgId, { payee, category: OWNERS_PAY });
  }
  const staff = new Map(STAFF);
  const ids = new Map(
    (
      await rows<{ name: string; id: string }>(
        `SELECT name, id FROM expense_categories WHERE org_id = ?`,
        [orgId],
      )
    ).map((c) => [c.name, c.id]),
  );
  const biz = new Map(
    (
      await rows<{ slug: string; id: string }>(
        `SELECT slug, id FROM businesses WHERE org_id = ?`,
        [orgId],
      )
    ).map((b) => [b.slug, b.id]),
  );
  const all = await rows<{
    id: string;
    code: string;
    vendor: string;
    raw_text: string | null;
    amount: number;
    status: string;
    occurred_on: string;
    category: string | null;
    business: string | null;
  }>(
    `SELECT e.id, e.code, e.vendor, e.raw_text, e.amount, e.status, e.occurred_on, c.name AS category, b.slug AS business
       FROM expenses e LEFT JOIN expense_categories c ON c.id = e.category_id
       LEFT JOIN businesses b ON b.id = e.business_id WHERE e.org_id = ?`,
    [orgId],
  );

  const changes: {
    e: (typeof all)[number];
    category: string | null;
    business: string | null;
    why: string;
  }[] = [];
  for (const e of all) {
    const note = expenseNote(e.raw_text) ?? "";
    const ownerWrote = (e.raw_text ?? "").includes(OWNER_MARK);
    let category = e.category;
    let business = e.business;
    let why = "";
    const set = (c: string | null, b: string | null, w: string) => {
      category = c;
      business = b;
      why = w;
    };
    if (BY_CODE[e.code])
      set(BY_CODE[e.code].category, BY_CODE[e.code].business, "placed by hand");
    else if (!ownerWrote && e.status === "needs_review") {
      const g = guessExpense(note || null);
      // "Data" already filed as Internet is the Hub's, not personal.
      if (
        ((g.category === OWNERS_PAY && g.because === "owner's own") ||
          /help with phone|power bank/i.test(note)) &&
        !(e.category === "Internet" && /\bdata\b/i.test(note))
      )
        set(OWNERS_PAY, null, "personal");
      else if (g.category === REFUNDS) set(REFUNDS, g.business, "refund");
      else if (/\b(refuse|teluse|waste)\b/i.test(note) && !/fuel/i.test(note))
        set("Taxes & levies", e.business, "waste collection");
      else if (/iftar|iflar/i.test(note)) set(CLIENT, null, "client job");
      else if (/purchase order/i.test(note) && /SAMUEL/i.test(e.vendor))
        set("Supplies", "lounge", "purchase order");
      // Weeldrop is a filling station: what is paid there is the owner's car fuel.
      else if (/^WEELDR/i.test(e.vendor.trim()))
        set(OWNERS_PAY, null, "car fuel (Weeldrop)");
      // "For fuel" paid to someone not on the staff list is the owner's car.
      else if (
        fuelOnly(note) &&
        e.category === "Diesel / power" &&
        !staff.has(payeeKey(e.vendor) as string)
      )
        set(OWNERS_PAY, null, "car fuel");
    }
    // Every salary goes to its person's business; diesel/power and repairs to the Hub.
    if (category === SALARIES) {
      const b = staff.get(payeeKey(e.vendor) as string);
      if (b) {
        business = b;
        why ||= "salary";
      }
    } else if (category === "Diesel / power" || category === "Repairs") {
      business = "hub";
      why ||= "hub cost";
    }
    if (category !== e.category || business !== e.business)
      changes.push({ e, category, business, why });
  }

  const tally = new Map<string, [number, number]>();
  for (const c of changes) {
    const k = `${c.why}: ${c.e.category ?? "-"}/${c.e.business ?? "-"} → ${c.category ?? "-"}/${c.business ?? "-"}`;
    const v = tally.get(k) ?? [0, 0];
    v[0]++;
    v[1] += Number(c.e.amount) / 100;
    tally.set(k, v);
  }
  for (const [k, [n, s]] of [...tally].sort((a, b) => b[1][1] - a[1][1]))
    console.log(`${n}\t₦${Math.round(s).toLocaleString()}\t${k}`);
  console.log(`${changes.length} expenses to change`);

  if (!dry) {
    for (const c of changes)
      await run(
        `UPDATE expenses SET category_id = ?, business_id = ? WHERE org_id = ? AND id = ?`,
        [
          c.category ? (ids.get(c.category) ?? null) : null,
          c.business ? (biz.get(c.business) ?? null) : null,
          orgId,
          c.e.id,
        ],
      );
    const days = [...new Set(changes.map((c) => c.e.occurred_on))];
    if (!skipReconcile) await reconcileDays(orgId, days);
    console.log(`done; ${days.length} days recalculated`);
  }
}
process.exit(0);
