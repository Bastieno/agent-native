import { expenseNote } from "./expense-note.js";
import { newId, nowIso } from "./ids.js";
import { formatNaira } from "./money.js";
import { LOANS } from "./setup.js";
import { num, rows, run } from "./sql.js";

/**
 * Loans the owner gives out (the owner's answers, 2026-11-23). A loan is a
 * Money out entry filed under Loans & repayments: its payee is the borrower,
 * its amount and date the loan's. Repayments are recorded against it and its
 * status follows. Refiling the entry under another category ends the loan;
 * one the owner marks as not a loan given (the business paying back a lender)
 * leaves the list. Repayments are not sales, so never in Money in.
 */
export type LoanStatus = "outstanding" | "part_paid" | "paid" | "not_a_loan";
/** "owed": outstanding and part paid, the default. */
export type LoanFilter = "owed" | "paid" | "not_a_loan" | "all";

export interface Loan {
  code: string;
  borrower: string;
  givenOn: string;
  note: string;
  amount: number;
  repaid: number;
  balance: number;
  status: LoanStatus;
  repayments: {
    id: string;
    amount: number;
    paidOn: string;
    note: string | null;
  }[];
}

async function allLoans(
  orgId: string,
): Promise<(Loan & { expenseId: string })[]> {
  const found = await rows(
    `SELECT e.id, e.code, e.vendor, e.raw_text, e.amount, e.occurred_on,
            MAX(COALESCE(l.not_a_loan, 0)) AS not_a_loan
       FROM expenses e
       JOIN expense_categories c ON c.id = e.category_id
       LEFT JOIN loans l ON l.expense_id = e.id AND l.org_id = e.org_id
      WHERE e.org_id = ? AND c.name = ?
      GROUP BY e.id, e.code, e.vendor, e.raw_text, e.amount, e.occurred_on
      ORDER BY e.occurred_on DESC, e.code DESC`,
    [orgId, LOANS],
  );
  const paid = await rows(
    `SELECT id, expense_id, amount, paid_on, note FROM loan_repayments
      WHERE org_id = ? ORDER BY paid_on, created_at`,
    [orgId],
  );
  const byLoan = new Map<string, Loan["repayments"]>();
  for (const p of paid)
    byLoan.set(p.expense_id as string, [
      ...(byLoan.get(p.expense_id as string) ?? []),
      {
        id: p.id as string,
        amount: num(p.amount),
        paidOn: p.paid_on as string,
        note: (p.note as string | null) ?? null,
      },
    ]);
  return found.map((e) => {
    const repayments = byLoan.get(e.id as string) ?? [];
    const amount = num(e.amount);
    const repaid = repayments.reduce((a, r) => a + r.amount, 0);
    const status: LoanStatus = num(e.not_a_loan)
      ? "not_a_loan"
      : repaid >= amount
        ? "paid"
        : repaid > 0
          ? "part_paid"
          : "outstanding";
    return {
      expenseId: e.id as string,
      code: e.code as string,
      borrower: e.vendor as string,
      givenOn: e.occurred_on as string,
      note: expenseNote(e.raw_text as string),
      amount,
      repaid,
      balance: Math.max(0, amount - repaid),
      status,
      repayments,
    };
  });
}

export async function listLoans(orgId: string, filter: LoanFilter = "owed") {
  const all = await allLoans(orgId);
  const real = all.filter((l) => l.status !== "not_a_loan");
  const keep = (l: Loan) =>
    filter === "all" ||
    (filter === "owed"
      ? l.status === "outstanding" || l.status === "part_paid"
      : l.status === filter);
  return {
    loans: all.filter(keep).map(({ expenseId: _, ...l }) => l),
    /** Over every loan given (not the ones marked as not a loan). */
    totals: {
      lent: real.reduce((a, l) => a + l.amount, 0),
      repaid: real.reduce((a, l) => a + l.repaid, 0),
      owed: real.reduce((a, l) => a + l.balance, 0),
      owedCount: real.filter((l) => l.balance > 0).length,
    },
  };
}

async function findLoan(orgId: string, code: string) {
  const loan = (await allLoans(orgId)).find(
    (l) => l.code.toUpperCase() === code.trim().toUpperCase(),
  );
  if (!loan)
    throw new Error(
      `${code} is not a loan: only Money out entries filed under ${LOANS} are.`,
    );
  return loan;
}

/** Records money paid back; `full` pays what is still owed. Amount in naira. */
export async function recordRepayment(
  orgId: string,
  input: {
    code: string;
    amount?: number;
    full?: boolean;
    paidOn: string;
    note?: string;
  },
) {
  const loan = await findLoan(orgId, input.code);
  if (loan.status === "not_a_loan")
    throw new Error(`${loan.code} is marked as not a loan given.`);
  const kobo = input.full
    ? loan.balance
    : Math.round((input.amount ?? 0) * 100);
  if (kobo <= 0)
    throw new Error(
      input.full
        ? `${loan.code} is already paid in full.`
        : "How much was paid back?",
    );
  if (kobo > loan.balance)
    throw new Error(
      `That is more than is owed on ${loan.code} (${formatNaira(loan.balance)}).`,
    );
  const id = newId();
  await run(
    `INSERT INTO loan_repayments (id, expense_id, amount, paid_on, note, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, 'org')`,
    [
      id,
      loan.expenseId,
      kobo,
      input.paidOn,
      input.note?.trim() || null,
      nowIso(),
      orgId,
    ],
  );
  return { id, code: loan.code, amount: kobo };
}

export async function deleteRepayment(orgId: string, id: string) {
  const [found] = await rows(
    `SELECT id FROM loan_repayments WHERE org_id = ? AND id = ?`,
    [orgId, id],
  );
  if (!found) throw new Error("No such repayment.");
  await run(`DELETE FROM loan_repayments WHERE org_id = ? AND id = ?`, [
    orgId,
    id,
  ]);
  return { removed: id };
}

/** Marks a Money out loan as not a loan given (or a loan again). */
export async function setNotALoan(
  orgId: string,
  code: string,
  notALoan: boolean,
) {
  const loan = await findLoan(orgId, code);
  await run(`DELETE FROM loans WHERE org_id = ? AND expense_id = ?`, [
    orgId,
    loan.expenseId,
  ]);
  if (notALoan)
    await run(
      `INSERT INTO loans (id, expense_id, not_a_loan, created_at, org_id, visibility) VALUES (?, ?, 1, ?, ?, 'org')`,
      [newId(), loan.expenseId, nowIso(), orgId],
    );
  return { code: loan.code, notALoan };
}
