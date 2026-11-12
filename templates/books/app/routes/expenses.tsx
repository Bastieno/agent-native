import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IconDotsVertical, IconFileZip } from "@tabler/icons-react";
import { useActionMutation, useActionQuery } from "@agent-native/core/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  BUSINESS_NAMES,
  lagosToday,
  monthStart,
  naira,
  receiptUrl,
  shortDay,
} from "@/lib/books";
import { readChatExport } from "@shared/chat-export";

export function meta() {
  return [{ title: "Expenses · Books" }];
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
};

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
        `${queued} old receipts ready to read${already ? ` (${already} already in)` : ""}. Read them from Today.`,
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
  canEdit,
  onClose,
  onSave,
}: {
  expense: Expense;
  categories: string[];
  canEdit: boolean;
  onClose: () => void;
  onSave: (patch: Partial<Expense> & { amountNaira?: number }) => void;
}) {
  const [amount, setAmount] = useState(String(expense.amount / 100));
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {expense.code} · {expense.vendor}
          </SheetTitle>
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Business</Label>
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
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                disabled={!canEdit}
                value={expense.category ?? undefined}
                onValueChange={(v) => onSave({ category: v })}
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
          {canEdit && expense.status === "needs_review" && (
            <Button
              className="w-full"
              onClick={() => onSave({ status: "confirmed" })}
            >
              Confirm
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function ExpensesPage() {
  useSetPageTitle("Expenses");
  useSetHeaderActions(<HistoryUpload />);
  const [params, setParams] = useSearchParams();
  const today = lagosToday();
  const start = params.get("start") ?? monthStart(today);
  const end = params.get("end") ?? today;
  const query = { start, end };
  const qc = useQueryClient();
  const { data } = useActionQuery("list-expenses", query);
  const { data: settings } = useActionQuery("get-settings", {});
  const update = useActionMutation("update-expense");
  const selectedCode = params.get("expense");
  const expenses = (data?.expenses ?? []) as Expense[];
  const selected = useMemo(
    () => expenses.find((e) => e.code === selectedCode),
    [expenses, selectedCode],
  );
  const total = expenses.reduce((a, e) => a + e.amount, 0);

  function select(code: string | null) {
    const next = new URLSearchParams(params);
    if (code) next.set("expense", code);
    else next.delete("expense");
    setParams(next, { replace: true });
  }

  function save(
    code: string,
    patch: Partial<Expense> & { amountNaira?: number },
  ) {
    const key = ["action", "list-expenses", query];
    const previous = qc.getQueryData(key);
    qc.setQueryData(key, (old: { expenses: Expense[] } | undefined) =>
      old
        ? {
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
      },
      {
        onError: (err) => {
          qc.setQueryData(key, previous);
          toast.error(err.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-end gap-2">
          <div className="space-y-1">
            <Label htmlFor="from" className="text-xs text-muted-foreground">
              From
            </Label>
            <Input
              id="from"
              type="date"
              className="h-8 w-40"
              value={start}
              onChange={(e) => setParams({ start: e.target.value, end })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="to" className="text-xs text-muted-foreground">
              To
            </Label>
            <Input
              id="to"
              type="date"
              className="h-8 w-40"
              value={end}
              onChange={(e) => setParams({ start, end: e.target.value })}
            />
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {expenses.length} expenses ·{" "}
          <span className="font-medium text-foreground tabular-nums">
            {naira(total)}
          </span>
        </div>
      </div>
      {expenses.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          No expenses in these dates. Send a receipt to the WhatsApp number and
          it appears here.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((e) => (
              <TableRow
                key={e.code}
                className="cursor-pointer"
                onClick={() => select(e.code)}
              >
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {shortDay(e.occurredOn)}
                </TableCell>
                <TableCell>
                  {e.vendor}
                  {e.status === "needs_review" && (
                    <Badge variant="secondary" className="ml-2">
                      Review
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {e.business ? BUSINESS_NAMES[e.business] : "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {e.category ?? "—"}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {naira(e.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {selected && (
        <ExpenseSheet
          key={selected.code}
          expense={selected}
          categories={settings?.expenseCategories ?? []}
          canEdit={!!settings?.canEdit}
          onClose={() => select(null)}
          onSave={(patch) => save(selected.code, patch)}
        />
      )}
    </div>
  );
}
