import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  IconCircleCheck,
  IconDotsVertical,
  IconFileZip,
} from "@tabler/icons-react";
import { useActionMutation, useActionQuery } from "@agent-native/core/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { PeriodPicker, usePeriod } from "@/components/PeriodPicker";
import { BUSINESS_NAMES, naira, receiptUrl, shortDay } from "@/lib/books";
import { readChatExport } from "@shared/chat-export";

export function meta() {
  return [{ title: "Money out · Books" }];
}

type Expense = {
  code: string;
  occurredOn: string;
  vendor: string;
  amount: number;
  business: string | null;
  category: string | null;
  paidWith: string;
  status: string;
  source: string;
  receiptFileId: string | null;
  isCost?: boolean;
  note?: string | null;
};

/** What the expense was for: the slip's note, else who was paid (app entries name the vendor). */
const whatFor = (e: Expense) =>
  e.note ?? (e.source === "history" ? (e.category ?? "Transfer") : e.vendor);
/** On one line, for a list row or a title: the note's lines joined. */
const whatForLine = (e: Expense) => whatFor(e).split("\n").join(" · ");

function HistoryUpload() {
  const input = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();
  async function upload(file: File) {
    const id = toast.loading("Reading the chat export…");
    try {
      // Unzip here and send the receipts a few at a time: hosted servers cap
      // request size well below a chat export with media.
      const messages = readChatExport(new Uint8Array(await file.arrayBuffer()));
      const receipts = messages
        .filter(
          (m) =>
            m.attachment &&
            /^(image\/|application\/pdf)/.test(m.attachment.mimeType),
        )
        .map((m) => ({ sentAt: m.at, note: m.text || null, ...m.attachment! }));
      let queued = 0;
      let already = 0;
      for (let i = 0; i < receipts.length; i += 5) {
        toast.loading(
          `Loading receipts ${i + 1}–${Math.min(i + 5, receipts.length)} of ${receipts.length}…`,
          { id },
        );
        const res = await fetch(
          "/_agent-native/actions/queue-history-receipts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Agent-Native-CSRF": "1",
            },
            body: JSON.stringify({ receipts: receipts.slice(i, i + 5) }),
          },
        );
        if (!res.ok)
          throw new Error(
            (await res.json().catch(() => ({})))?.error ?? `HTTP ${res.status}`,
          );
        const r = (await res.json()) as {
          queued: number;
          alreadyQueued: number;
        };
        queued += r.queued;
        already += r.alreadyQueued;
      }
      toast.success(
        `${queued} old receipts ready to read${already ? ` (${already} already in)` : ""}. Read them from Review.`,
        { id },
      );
      qc.invalidateQueries({ queryKey: ["action"] });
    } catch (err) {
      toast.error(`Couldn't read it: ${(err as Error).message}`, { id });
    }
  }
  return (
    <>
      <input
        ref={input}
        type="file"
        accept=".zip,application/zip"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="More">
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => input.current?.click()}>
            <IconFileZip className="mr-2 h-4 w-4" /> Load old receipts (WhatsApp
            export)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ExpenseSheet({
  expense,
  categories,
  noBusiness,
  canEdit,
  onClose,
  onSave,
}: {
  expense: Expense;
  categories: string[];
  noBusiness: string[];
  canEdit: boolean;
  onClose: () => void;
  onSave: (patch: Partial<Expense> & { amountNaira?: number }) => void;
}) {
  const [amount, setAmount] = useState(String(expense.amount / 100));
  // An expense is confirmed only once it is filed.
  const missing = !expense.category
    ? "Choose a category first."
    : !expense.business && !noBusiness.includes(expense.category)
      ? "Choose the Lounge or the Hub first."
      : null;
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <SheetHeader>
          <SheetTitle className="line-clamp-2">
            {whatForLine(expense)}
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {expense.code} · {naira(expense.amount)}
          </p>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-6">
          {expense.receiptFileId && (
            <a
              href={receiptUrl(expense.receiptFileId)}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-muted-foreground hover:text-foreground"
            >
              {imageFailed ? (
                "Open the receipt"
              ) : (
                <img
                  src={receiptUrl(expense.receiptFileId)}
                  alt="Receipt"
                  onError={() => setImageFailed(true)}
                  className="max-h-80 w-full rounded-md border border-border object-contain"
                />
              )}
            </a>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="note">What for</Label>
            <Textarea
              id="note"
              disabled={!canEdit}
              defaultValue={expense.note ?? ""}
              placeholder="e.g. 5 packs sausages"
              rows={Math.min(
                8,
                Math.max(2, (expense.note ?? "").split("\n").length),
              )}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== (expense.note ?? "")) onSave({ note: v });
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vendor">Paid to</Label>
            <Input
              id="vendor"
              disabled={!canEdit}
              defaultValue={expense.vendor}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== expense.vendor) onSave({ vendor: v });
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                disabled={!canEdit}
                value={expense.category ?? undefined}
                onValueChange={(v) =>
                  // Owner's pay and money moved belong to no business.
                  onSave(
                    noBusiness.includes(v)
                      ? { category: v, business: null }
                      : { category: v },
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Business</Label>
              {expense.category && noBusiness.includes(expense.category) ? (
                <div className="flex h-9 items-center rounded-md border border-dashed border-border px-3 text-sm text-muted-foreground">
                  Not a business cost
                </div>
              ) : (
                <Select
                  disabled={!canEdit}
                  value={expense.business ?? undefined}
                  onValueChange={(v) => onSave({ business: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lounge">Lounge</SelectItem>
                    <SelectItem value="hub">Hub</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                inputMode="decimal"
                disabled={!canEdit}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={() => {
                  const n = Number(amount.replace(/,/g, ""));
                  if (n > 0 && Math.round(n * 100) !== expense.amount)
                    onSave({ amountNaira: n });
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                disabled={!canEdit}
                defaultValue={expense.occurredOn}
                onBlur={(e) =>
                  e.target.value &&
                  e.target.value !== expense.occurredOn &&
                  onSave({ occurredOn: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Paid with</Label>
            <Select
              disabled={!canEdit}
              value={expense.paidWith}
              onValueChange={(v) => onSave({ paidWith: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["cash", "transfer", "card", "unknown"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m[0].toUpperCase() + m.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {expense.status === "confirmed" ? (
            <div className="flex items-center justify-center gap-2 rounded-md border border-border py-2.5 text-sm text-muted-foreground">
              <IconCircleCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Confirmed. Changes still save as you make them.
            </div>
          ) : (
            canEdit && (
              <div className="space-y-1.5">
                <Button
                  className="w-full"
                  disabled={!!missing}
                  onClick={() => onSave({ status: "confirmed" })}
                >
                  Confirm
                </Button>
                {missing && (
                  <p className="text-center text-xs text-muted-foreground">
                    {missing}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function ExpensesPage() {
  useSetPageTitle("Money out");
  useSetHeaderActions(
    <div className="flex items-center gap-1">
      <PeriodPicker />
      <HistoryUpload />
    </div>,
  );
  const [params, setParams] = useSearchParams();
  const { start, end } = usePeriod();
  const category = params.get("category") ?? undefined;
  const business = (params.get("business") ?? undefined) as
    | "lounge"
    | "hub"
    | undefined;
  const status = (params.get("status") ?? undefined) as
    | "confirmed"
    | "needs_review"
    | undefined;
  const query = {
    start,
    end,
    ...(category ? { category } : {}),
    ...(business ? { business } : {}),
    ...(status ? { status } : {}),
  };
  const qc = useQueryClient();
  const { data } = useActionQuery("list-expenses", query);
  const { data: settings } = useActionQuery("get-settings", {});
  const update = useActionMutation("update-expense");
  const selectedCode = params.get("expense");
  const expenses = (data?.expenses ?? []) as Expense[];
  const inList = useMemo(
    () => expenses.find((e) => e.code === selectedCode),
    [expenses, selectedCode],
  );
  // The open expense stays open after a change moves it out of the list (a
  // new category under a category filter, or confirmed under "To review"):
  // the drawer keeps the last copy until it is closed.
  const [held, setHeld] = useState<Expense | null>(null);
  useEffect(() => {
    if (inList) setHeld(inList);
  }, [inList]);
  const selected =
    inList ?? (held && held.code === selectedCode ? held : undefined);
  // One page at a time; the page is in the address, so a row opened and
  // closed, or a reload, keeps the place.
  const paged = usePagination(expenses);
  const categories: string[] = settings?.expenseCategories ?? [];

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    // A new filter starts from the first page; opening a row keeps the page.
    if (key !== "expense") next.delete("page");
    setParams(next, { replace: true });
  }
  const select = (code: string | null) => setParam("expense", code);

  function save(
    code: string,
    patch: Partial<Expense> & { amountNaira?: number },
  ) {
    setHeld((h) =>
      h && h.code === code
        ? {
            ...h,
            ...patch,
            ...(patch.amountNaira
              ? { amount: Math.round(patch.amountNaira * 100) }
              : {}),
          }
        : h,
    );
    const key = ["action", "list-expenses", query];
    const previous = qc.getQueryData(key);
    qc.setQueryData(key, (old: { expenses: Expense[] } | undefined) =>
      old
        ? {
            ...old,
            expenses: old.expenses.map((e) =>
              e.code === code
                ? {
                    ...e,
                    ...patch,
                    ...(patch.amountNaira
                      ? { amount: Math.round(patch.amountNaira * 100) }
                      : {}),
                  }
                : e,
            ),
          }
        : old,
    );
    update.mutate(
      {
        code,
        ...(patch.business
          ? { business: patch.business as "lounge" | "hub" }
          : {}),
        ...(patch.category ? { category: patch.category } : {}),
        ...(patch.amountNaira ? { amount: patch.amountNaira } : {}),
        ...(patch.occurredOn ? { occurredOn: patch.occurredOn } : {}),
        ...(patch.paidWith ? { paidWith: patch.paidWith as "cash" } : {}),
        ...(patch.status ? { status: patch.status as "confirmed" } : {}),
        ...(patch.note ? { note: patch.note } : {}),
        ...(patch.vendor ? { vendor: patch.vendor } : {}),
      },
      {
        onError: (err) => {
          qc.setQueryData(key, previous);
          toast.error(err.message);
        },
        // The drawer itself shows where the expense stands; only a failure
        // gets a message.
        onSuccess: () => qc.invalidateQueries({ queryKey: ["action"] }),
      },
    );
  }

  const filtered = !!(category || business || status);
  return (
    <div className="@container flex min-h-full flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={category ?? "all"}
            onValueChange={(v) => setParam("category", v === "all" ? null : v)}
          >
            <SelectTrigger className="h-8 w-48" aria-label="Category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="Uncategorised">No category</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={business ?? "all"}
            onValueChange={(v) => setParam("business", v === "all" ? null : v)}
          >
            <SelectTrigger className="h-8 w-32" aria-label="Business">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Both</SelectItem>
              <SelectItem value="lounge">Lounge</SelectItem>
              <SelectItem value="hub">Hub</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={status ?? "all"}
            onValueChange={(v) => setParam("status", v === "all" ? null : v)}
          >
            <SelectTrigger className="h-8 w-36" aria-label="Status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any status</SelectItem>
              <SelectItem value="needs_review">To review</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
            </SelectContent>
          </Select>
          {filtered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const next = new URLSearchParams(params);
                for (const k of ["category", "business", "status", "page"])
                  next.delete(k);
                setParams(next, { replace: true });
              }}
            >
              Clear
            </Button>
          )}
        </div>
        {data && (
          <div className="text-sm text-muted-foreground">
            {expenses.length.toLocaleString("en-NG")} expenses ·{" "}
            <span className="font-medium text-foreground tabular-nums">
              {naira(data.total)}
            </span>
            {data.moved > 0 && (
              <span className="ml-1">
                (+ {naira(data.moved)} moved, not a cost)
              </span>
            )}
          </div>
        )}
      </div>
      {!data ? null : expenses.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          {filtered
            ? "Nothing matches these filters in this period."
            : "No expenses in this period. Send a receipt to the WhatsApp number and it appears here."}
        </div>
      ) : (
        <>
          <div className="divide-y divide-border @3xl:hidden">
            {paged.items.map((e) => (
              <button
                key={e.code}
                type="button"
                onClick={() => select(e.code)}
                className="flex w-full flex-col gap-0.5 py-3 text-left"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    {e.status === "needs_review" && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                        aria-label="To review"
                      />
                    )}
                    <span className="truncate text-sm">{whatForLine(e)}</span>
                  </span>
                  <span
                    className={`shrink-0 text-sm tabular-nums ${e.isCost === false ? "text-muted-foreground italic" : ""}`}
                  >
                    {naira(e.amount)}
                  </span>
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {[
                    shortDay(e.occurredOn),
                    e.category ?? "No category",
                    e.business ? BUSINESS_NAMES[e.business] : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </button>
            ))}
          </div>
          <Table className="hidden @3xl:table">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Date</TableHead>
                <TableHead>What for</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Business</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.items.map((e) => (
                <TableRow
                  key={e.code}
                  className="cursor-pointer"
                  onClick={() => select(e.code)}
                >
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {shortDay(e.occurredOn)}
                  </TableCell>
                  <TableCell className="max-w-[22rem]">
                    <div className="flex items-center gap-2">
                      {e.status === "needs_review" && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                          title="To review"
                          aria-label="To review"
                        />
                      )}
                      <span className="truncate">{whatForLine(e)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {e.category ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {e.business ? BUSINESS_NAMES[e.business] : "—"}
                  </TableCell>
                  <TableCell
                    className={`text-right tabular-nums ${e.isCost === false ? "text-muted-foreground italic" : ""}`}
                  >
                    {naira(e.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {data && <Pagination {...paged} noun="expenses" />}
      {selected && (
        <ExpenseSheet
          key={selected.code}
          expense={selected}
          categories={categories}
          noBusiness={settings?.noBusinessCategories ?? []}
          canEdit={!!settings?.canEdit}
          onClose={() => select(null)}
          onSave={(patch) => save(selected.code, patch)}
        />
      )}
    </div>
  );
}
