import { useState } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  IconCheck,
  IconCircleCheck,
  IconMessage,
  IconUpload,
} from "@tabler/icons-react";
import {
  sendToAgentChat,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetPageTitle } from "@/components/layout/HeaderActions";
import { dayLabel, flagText, naira, rangeLabel, receiptUrl } from "@/lib/books";

export function meta() {
  return [{ title: "Today · Books" }];
}

function BusinessCard({
  title,
  income,
  profit,
  expenses,
}: {
  title: string;
  income: number;
  profit: number;
  expenses: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-semibold tabular-nums">
          {naira(income)}
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Gross profit</span>
            <span className="tabular-nums">{naira(profit)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Expenses</span>
            <span className="tabular-nums">{naira(expenses)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function asDataUrl(url: string): Promise<string> {
  const blob = await (await fetch(url)).blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function TodayPage() {
  useSetPageTitle("Today");
  const qc = useQueryClient();
  const { data, isLoading } = useActionQuery("get-today", {});
  const { data: categories } = useActionQuery("get-settings", {});
  const setCategory = useActionMutation("set-item-category");
  const [reading, setReading] = useState(false);

  if (isLoading) {
    return (
      <div className="grid gap-4 p-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }
  if (!data?.day || !data.figures) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
        <h2 className="text-lg font-semibold">No sales yet</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Send a Moniebook sales summary to the WhatsApp number, or upload one
          here, and today's figures appear.
        </p>
        <Button asChild>
          <Link to="/sales">
            <IconUpload className="mr-2 h-4 w-4" /> Upload an export
          </Link>
        </Button>
      </div>
    );
  }

  const f = data.figures;
  const review = data.review;
  const checks = f.flags.filter(
    (x) =>
      !["needs_review", "unconfirmed_category", "no_cost"].includes(x.kind),
  );
  const reviewCount =
    review.receipts.length +
    review.categoryGuesses.length +
    review.uncategorised.length +
    review.unmappedCategories.length +
    (review.pendingHistory ? 1 : 0);
  const biz = (slug: string) => ({
    income: f.incomeByBusiness[slug] ?? 0,
    profit: f.grossProfitByBusiness[slug] ?? 0,
    expenses: f.expensesByBusiness[slug] ?? 0,
  });
  const both = {
    income: f.income,
    profit: (Object.values(f.grossProfitByBusiness) as number[]).reduce(
      (a, b) => a + b,
      0,
    ),
    expenses: f.expenses,
  };

  function confirm(item: string, category: string) {
    qc.setQueryData(["action", "get-today", {}], (old: typeof data) =>
      old
        ? {
            ...old,
            review: {
              ...old.review,
              categoryGuesses: old.review.categoryGuesses.filter(
                (g) => g.item !== item,
              ),
            },
          }
        : old,
    );
    setCategory.mutate(
      { itemName: item, category, confirmed: true },
      { onError: () => toast.error(`Couldn't save ${item}`) },
    );
  }
  function place(item: string, category: string) {
    qc.setQueryData(["action", "get-today", {}], (old: typeof data) =>
      old
        ? {
            ...old,
            review: {
              ...old.review,
              uncategorised: old.review.uncategorised.filter((u) => u !== item),
            },
          }
        : old,
    );
    setCategory.mutate(
      { itemName: item, category, confirmed: true },
      { onError: () => toast.error(`Couldn't save ${item}`) },
    );
  }

  async function readOldReceipts() {
    setReading(true);
    try {
      const res = await fetch(
        `/_agent-native/actions/list-pending-receipts?limit=5`,
      );
      const { receipts } = (await res.json()) as {
        receipts: {
          id: string;
          occurredOn: string;
          mimeType: string;
          receiptFileId: string;
          note: string | null;
        }[];
      };
      const images = receipts.filter((r) => r.mimeType.startsWith("image/"));
      if (!images.length) {
        toast("The old receipts left are PDFs; open them from Expenses.");
        return;
      }
      const urls = await Promise.all(
        images.map((r) => asDataUrl(receiptUrl(r.receiptFileId))),
      );
      sendToAgentChat({
        message: `Read these ${images.length} old receipts and record them.`,
        context: `These are old receipts from the WhatsApp group, in this order: ${images
          .map(
            (r, i) =>
              `image ${i + 1} = pendingReceiptId ${r.id} (sent ${r.occurredOn}${r.note ? `, note "${r.note}"` : ""})`,
          )
          .join(
            "; ",
          )}. For each, call record-expense-from-receipt with its pendingReceiptId; use the date on the receipt if it shows one.`,
        images: urls,
        submit: true,
      });
    } finally {
      setReading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
      <div className="text-sm text-muted-foreground">{dayLabel(data.day)}</div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <BusinessCard title="Lounge" {...biz("lounge")} />
        <BusinessCard title="Hub" {...biz("hub")} />
        <BusinessCard title="Both" {...both} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {f.cashInTill != null && (
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Cash in the till</span>
                <span className="font-medium tabular-nums">
                  {naira(f.cashInTill)}
                </span>
              </div>
            )}
            {checks.length === 0 ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconCircleCheck className="h-4 w-4" /> Every check passed
              </div>
            ) : (
              <ul className="space-y-1.5">
                {checks.slice(0, 8).map((c, i) => (
                  <li key={i}>{flagText(c as never)}</li>
                ))}
                {checks.length > 8 && (
                  <li className="text-muted-foreground">
                    and {checks.length - 8} more
                  </li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              To review{reviewCount ? ` · ${reviewCount}` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {reviewCount === 0 && (
              <div className="text-muted-foreground">Nothing waiting.</div>
            )}
            {review.receipts.map((r) => (
              <Link
                key={r.code}
                to={`/expenses?expense=${r.code}`}
                className="flex justify-between rounded-md px-2 py-1 hover:bg-accent"
              >
                <span>
                  {r.code} · {r.vendor}
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {naira(r.amount)}
                </span>
              </Link>
            ))}
            {review.categoryGuesses.map((g) => (
              <div
                key={g.item}
                className="flex items-center justify-between gap-2 px-2"
              >
                <span>
                  {g.item} → {g.category}?
                </span>
                {data.canEdit && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => confirm(g.item, g.category)}
                  >
                    <IconCheck className="mr-1 h-3.5 w-3.5" /> Confirm
                  </Button>
                )}
              </div>
            ))}
            {review.uncategorised.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-2 px-2"
              >
                <span>{item}</span>
                {data.canEdit && (
                  <Select onValueChange={(c) => place(item, c)}>
                    <SelectTrigger className="h-8 w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categories?.itemCategories ?? []).map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
            {review.unmappedCategories.length > 0 && (
              <Link
                to="/settings?tab=categories"
                className="block px-2 text-muted-foreground hover:text-foreground"
              >
                Choose a business for: {review.unmappedCategories.join(", ")}
              </Link>
            )}
            {review.pendingHistory > 0 && (
              <div className="flex items-center justify-between gap-2 px-2">
                <span>{review.pendingHistory} old receipts from WhatsApp</span>
                {data.canEdit && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={reading}
                    onClick={readOldReceipts}
                  >
                    <IconMessage className="mr-1 h-3.5 w-3.5" /> Read with
                    assistant
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {data.digest && (
        <Link
          to={`/reports/${data.digest.digestId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Latest {data.digest.period} digest ·{" "}
          {rangeLabel(data.digest.start, data.digest.end)}
        </Link>
      )}
    </div>
  );
}
