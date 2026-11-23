import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useActionMutation, useActionQuery } from "@agent-native/core/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useSetHeaderActions,
  useSetPageTitle,
} from "@/components/layout/HeaderActions";
import { Pagination, usePagination } from "@/components/Pagination";
import { lagosToday, naira, shortDay } from "@/lib/books";
import { cn } from "@/lib/utils";

export function meta() {
  return [{ title: "Loans · Books" }];
}

type Status = "outstanding" | "part_paid" | "paid" | "not_a_loan";
type Filter = "owed" | "paid" | "not_a_loan" | "all";
type Repayment = {
  id: string;
  amount: number;
  paidOn: string;
  note: string | null;
};
type Loan = {
  code: string;
  borrower: string;
  givenOn: string;
  note: string;
  amount: number;
  repaid: number;
  balance: number;
  status: Status;
  repayments: Repayment[];
};
type LoansData = {
  loans: Loan[];
  totals: { lent: number; repaid: number; owed: number; owedCount: number };
  canEdit: boolean;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: "owed", label: "Still owed" },
  { value: "paid", label: "Paid" },
  { value: "not_a_loan", label: "Not loans" },
  { value: "all", label: "All loans" },
];

const STATUS: Record<Status, { label: string; className: string }> = {
  outstanding: {
    label: "Outstanding",
    className: "text-amber-700 dark:text-amber-400",
  },
  part_paid: {
    label: "Part paid",
    className: "text-sky-700 dark:text-sky-400",
  },
  paid: { label: "Paid", className: "text-emerald-700 dark:text-emerald-400" },
  not_a_loan: { label: "Not a loan", className: "text-muted-foreground" },
};

/** The loan with these repayments: repaid, balance and status follow. */
function withRepayments(loan: Loan, repayments: Repayment[]): Loan {
  const repaid = repayments.reduce((a, r) => a + r.amount, 0);
  return {
    ...loan,
    repayments,
    repaid,
    balance: Math.max(0, loan.amount - repaid),
    status:
      loan.status === "not_a_loan"
        ? "not_a_loan"
        : repaid >= loan.amount
          ? "paid"
          : repaid > 0
            ? "part_paid"
            : "outstanding",
  };
}

/** The payee as a name: the account number a slip adds ("NAME | 0123456789") left off. */
const borrowerName = (payee: string) => payee.split(" | ")[0].trim() || payee;

function StatusText({ status }: { status: Status }) {
  return (
    <span className={cn("text-xs font-medium", STATUS[status].className)}>
      {STATUS[status].label}
    </span>
  );
}

function LoanDrawer({
  loan,
  canEdit,
  onClose,
  onRepay,
  onRemove,
  onNotALoan,
  onRename,
}: {
  loan: Loan;
  canEdit: boolean;
  onClose: () => void;
  onRepay: (amount: number | "full", paidOn: string) => void;
  onRemove: (id: string) => void;
  onNotALoan: (notALoan: boolean) => void;
  onRename: (name: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [paidOn, setPaidOn] = useState(lagosToday());
  const [removing, setRemoving] = useState<Repayment | null>(null);
  const naira_ = Number(amount);
  const tooMuch = naira_ * 100 > loan.balance;
  const open = loan.status === "outstanding" || loan.status === "part_paid";
  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md lg:max-w-lg">
        <SheetHeader className="pr-8 text-left">
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="line-clamp-2">
              {borrowerName(loan.borrower)}
            </SheetTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 shrink-0 p-0"
                  aria-label="More"
                >
                  <IconDotsVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/expenses?expense=${loan.code}`}>
                    Open in Money out
                  </Link>
                </DropdownMenuItem>
                {canEdit && (
                  <DropdownMenuItem
                    onSelect={() => onNotALoan(loan.status !== "not_a_loan")}
                  >
                    {loan.status === "not_a_loan"
                      ? "This is a loan I gave"
                      : "Not a loan I gave"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <SheetDescription>
            {[`Given ${shortDay(loan.givenOn)}`, loan.note || null, loan.code]
              .filter(Boolean)
              .join(" · ")}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {canEdit && (
            <div className="space-y-1.5">
              <Label htmlFor="borrower">Borrower</Label>
              <Input
                id="borrower"
                defaultValue={borrowerName(loan.borrower)}
                onBlur={(e) => {
                  const name = e.target.value.trim();
                  if (name && name !== borrowerName(loan.borrower))
                    onRename(name);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
            </div>
          )}
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Lent</dt>
              <dd className="tabular-nums">{naira(loan.amount)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Repaid</dt>
              <dd className="tabular-nums">{naira(loan.repaid)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Still owed</dt>
              <dd className="font-medium tabular-nums">
                {naira(loan.balance)}
              </dd>
            </div>
          </dl>
          <StatusText status={loan.status} />

          {canEdit && open && (
            <form
              className="space-y-3 rounded-lg border border-border p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!naira_ || tooMuch) return;
                onRepay(naira_, paidOn);
                setAmount("");
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="repaid-amount">Amount (₦)</Label>
                  <Input
                    id="repaid-amount"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value.replace(/[^\d.]/g, ""))
                    }
                    placeholder={String(loan.balance / 100)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="repaid-on">Date</Label>
                  <Input
                    id="repaid-on"
                    type="date"
                    value={paidOn}
                    max={lagosToday()}
                    onChange={(e) =>
                      e.target.value && setPaidOn(e.target.value)
                    }
                  />
                </div>
              </div>
              {tooMuch && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  That is more than is owed ({naira(loan.balance)}).
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button type="submit" size="sm" disabled={!naira_ || tooMuch}>
                  Record repayment
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onRepay("full", paidOn)}
                >
                  Paid in full
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Repayments</h3>
            {loan.repayments.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing paid back yet.
              </p>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {loan.repayments.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <span className="text-muted-foreground">
                      {shortDay(r.paidOn)}
                      {r.note ? ` · ${r.note}` : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="tabular-nums">{naira(r.amount)}</span>
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground"
                          aria-label="Remove this repayment"
                          onClick={() => setRemoving(r)}
                        >
                          <IconTrash className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <AlertDialog
          open={!!removing}
          onOpenChange={(o) => !o && setRemoving(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this repayment?</AlertDialogTitle>
              <AlertDialogDescription>
                {removing &&
                  `${naira(removing.amount)} on ${shortDay(removing.paidOn)} comes off what ${borrowerName(loan.borrower)} has repaid.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (removing) onRemove(removing.id);
                  setRemoving(null);
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetContent>
    </Sheet>
  );
}

export default function LoansPage() {
  useSetPageTitle("Loans");
  const [params, setParams] = useSearchParams();
  const filter = (params.get("status") as Filter | null) ?? "owed";
  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "loan") next.delete("page");
    setParams(next, { replace: true });
  };
  useSetHeaderActions(
    <Select
      value={filter}
      onValueChange={(v) => setParam("status", v === "owed" ? null : v)}
    >
      <SelectTrigger
        className="h-8 min-w-0 flex-1 sm:w-36 sm:flex-none"
        aria-label="Which loans"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {FILTERS.map((f) => (
          <SelectItem key={f.value} value={f.value}>
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
  );

  const qc = useQueryClient();
  const query = filter === "owed" ? {} : { status: filter };
  const key = ["action", "list-loans", query];
  const { data } = useActionQuery("list-loans", query) as {
    data: LoansData | undefined;
  };
  const repay = useActionMutation("record-loan-repayment");
  const unrepay = useActionMutation("delete-loan-repayment");
  const setStatus = useActionMutation("set-loan-status");
  const updateExpense = useActionMutation("update-expense");

  const loans = data?.loans ?? [];
  const paged = usePagination(loans);
  const selectedCode = params.get("loan");
  const inList = loans.find((l) => l.code === selectedCode);
  // A loan stays open after a repayment moves it out of this list (paid in
  // full under "Still owed"): the drawer keeps the last copy until closed.
  const [held, setHeld] = useState<Loan | null>(null);
  useEffect(() => {
    if (inList) setHeld(inList);
  }, [inList]);
  const selected =
    inList ?? (held && held.code === selectedCode ? held : undefined);

  /** Shows the change at once; the server's answer replaces it. */
  function change(code: string, next: (l: Loan) => Loan) {
    const previous = qc.getQueryData(key);
    setHeld((h) => (h && h.code === code ? next(h) : h));
    qc.setQueryData(key, (old: LoansData | undefined) =>
      old
        ? {
            ...old,
            loans: old.loans.map((l) => (l.code === code ? next(l) : l)),
          }
        : old,
    );
    return {
      onError: (err: Error) => {
        qc.setQueryData(key, previous);
        toast.error(err.message);
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ["action"] }),
    };
  }

  function onRepay(loan: Loan, amount: number | "full", paidOn: string) {
    const kobo = amount === "full" ? loan.balance : Math.round(amount * 100);
    const done = change(loan.code, (l) =>
      withRepayments(l, [
        ...l.repayments,
        { id: `new-${Date.now()}`, amount: kobo, paidOn, note: null },
      ]),
    );
    repay.mutate(
      amount === "full"
        ? { code: loan.code, full: true, paidOn }
        : { code: loan.code, amount, paidOn },
      done,
    );
  }
  function onRemove(loan: Loan, id: string) {
    const done = change(loan.code, (l) =>
      withRepayments(
        l,
        l.repayments.filter((r) => r.id !== id),
      ),
    );
    unrepay.mutate({ id }, done);
  }
  function onNotALoan(loan: Loan, notALoan: boolean) {
    const done = change(loan.code, (l) =>
      withRepayments(
        { ...l, status: notALoan ? "not_a_loan" : "outstanding" },
        l.repayments,
      ),
    );
    setStatus.mutate({ code: loan.code, notALoan }, done);
  }

  /** The borrower is the loan's Money out payee: renaming corrects both. */
  function onRename(loan: Loan, name: string) {
    // Keep the account number a slip gave ("NAME | 0123456789").
    const account = loan.borrower.split(" | ")[1];
    const vendor = account ? `${name} | ${account.trim()}` : name;
    const done = change(loan.code, (l) => ({ ...l, borrower: vendor }));
    updateExpense.mutate({ code: loan.code, vendor }, done);
  }

  const t = data?.totals;
  return (
    <div className="@container flex min-h-full flex-1 flex-col gap-4 p-4 sm:p-6">
      {t && (
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <div className="text-xs text-muted-foreground">Owed to you</div>
            <div className="text-2xl font-semibold tabular-nums">
              {naira(t.owed)}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {t.owedCount} {t.owedCount === 1 ? "loan" : "loans"} still owed ·
            lent {naira(t.lent)} · repaid {naira(t.repaid)}
          </div>
        </div>
      )}

      {!data ? null : loans.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          {filter === "owed"
            ? "Nobody owes you. A payment filed under Loans & repayments in Money out shows here."
            : "No loans here."}
        </div>
      ) : (
        <>
          <div className="divide-y divide-border @3xl:hidden">
            {paged.items.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setParam("loan", l.code)}
                className="flex w-full flex-col gap-0.5 py-3 text-left"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm">
                    {borrowerName(l.borrower)}
                  </span>
                  <span className="shrink-0 text-sm tabular-nums">
                    {naira(l.status === "paid" ? l.amount : l.balance)}
                  </span>
                </span>
                <span className="flex items-center justify-between gap-3">
                  <span className="truncate text-xs text-muted-foreground">
                    {[shortDay(l.givenOn), l.note || null]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  <StatusText status={l.status} />
                </span>
              </button>
            ))}
          </div>
          <Table className="hidden @3xl:table">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Given</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Lent</TableHead>
                <TableHead className="text-right">Repaid</TableHead>
                <TableHead className="text-right">Still owed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.items.map((l) => (
                <TableRow
                  key={l.code}
                  className="cursor-pointer"
                  onClick={() => setParam("loan", l.code)}
                >
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {shortDay(l.givenOn)}
                  </TableCell>
                  <TableCell className="max-w-[20rem]">
                    <div className="truncate">{borrowerName(l.borrower)}</div>
                    {l.note && (
                      <div className="truncate text-xs text-muted-foreground">
                        {l.note}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusText status={l.status} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {naira(l.amount)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {naira(l.repaid)}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {naira(l.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination {...paged} noun="loans" />
        </>
      )}

      {selected && (
        <LoanDrawer
          key={selected.code}
          loan={selected}
          canEdit={!!data?.canEdit}
          onClose={() => setParam("loan", null)}
          onRepay={(amount, paidOn) => onRepay(selected, amount, paidOn)}
          onRemove={(id) => onRemove(selected, id)}
          onNotALoan={(v) => onNotALoan(selected, v)}
          onRename={(name) => onRename(selected, name)}
        />
      )}
    </div>
  );
}
