import { useState } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IconCheck, IconCircleCheck, IconMessage } from "@tabler/icons-react";
import {
  sendToAgentChat,
  useActionMutation,
  useActionQuery,
} from "@agent-native/core/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { BUSINESS_NAMES, naira, rangeLabel, receiptUrl } from "@/lib/books";

export function meta() {
  return [{ title: "Review · Books" }];
}

const KEY = ["action", "list-review", {}];

async function asDataUrl(url: string): Promise<string> {
  const blob = await (await fetch(url)).blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function ReviewPage() {
  useSetPageTitle("Review");
  const qc = useQueryClient();
  const { data, isLoading } = useActionQuery("list-review", {});
  const { data: settings } = useActionQuery("get-settings", {});
  const confirmExpenses = useActionMutation("confirm-expenses");
  const setCategory = useActionMutation("set-item-category");
  const [reading, setReading] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="space-y-3 p-6">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }
  type Data = typeof data;
  const patch = (fn: (old: Data) => Data) =>
    qc.setQueryData(KEY, (old: Data | undefined) => (old ? fn(old) : old));

  function confirmGroup(g: Data["expenseGroups"][number]) {
    patch((old) => ({
      ...old,
      expensesWaiting: old.expensesWaiting - g.count,
      expenseGroups: old.expenseGroups.filter((x) => x !== g),
    }));
    confirmExpenses.mutate(
      {
        group: {
          category: g.category,
          business: g.business as "lounge" | "hub" | null,
        },
      },
      {
        onSuccess: (r: any) =>
          toast.success(`${r.confirmed} expenses confirmed.`),
        onError: (err) => {
          toast.error(err.message);
          qc.invalidateQueries({ queryKey: KEY });
        },
      },
    );
  }
  function placeItem(item: string, category: string) {
    patch((old) => ({
      ...old,
      uncategorisedItems: old.uncategorisedItems.filter((u) => u !== item),
      categoryGuesses: old.categoryGuesses.filter((g) => g.item !== item),
    }));
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
        toast("The old receipts left are PDFs; open them from Money out.");
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

  const itemsWaiting =
    data.uncategorisedItems.length + data.categoryGuesses.length;
  const nothing =
    data.expensesWaiting === 0 &&
    itemsWaiting === 0 &&
    data.unmappedCategories.length === 0 &&
    data.pendingReceipts === 0;
  const itemCategories = settings?.itemCategories ?? [];

  if (nothing) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-10 text-center">
        <IconCircleCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-lg font-semibold">All reviewed</h2>
        <p className="text-sm text-muted-foreground">
          New receipts and items appear here as they come in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {data.expensesWaiting > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Expenses to confirm ·{" "}
              {data.expensesWaiting.toLocaleString("en-NG")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Books read these from payment slips and guessed what each was for.
              Check a group, then confirm it in one go.
            </p>
          </CardHeader>
          <CardContent className="divide-y divide-border p-0">
            {data.expenseGroups.map((g) => {
              const name = g.category ?? "No category yet";
              const look = `/expenses?status=needs_review&category=${encodeURIComponent(g.category ?? "Uncategorised")}${g.business ? `&business=${g.business}` : ""}&start=${g.first}&end=${g.last}&custom=1`;
              return (
                <div
                  key={`${g.category}|${g.business}`}
                  className="flex flex-col gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-sm">
                      <span className="font-medium">{name}</span>
                      {g.business && (
                        <span className="text-muted-foreground">
                          {" "}
                          · {BUSINESS_NAMES[g.business] ?? g.business}
                        </span>
                      )}
                      {!g.isCost && (
                        <span className="text-muted-foreground">
                          {" "}
                          · not a cost
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {g.count} {g.count === 1 ? "expense" : "expenses"} ·{" "}
                      {naira(g.total)} · {rangeLabel(g.first, g.last)}
                    </div>
                    {g.examples.length > 0 && (
                      <div className="truncate text-xs text-muted-foreground">
                        e.g. {g.examples.map((x) => `“${x}”`).join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button asChild size="sm" variant="ghost">
                      <Link to={look}>Look through</Link>
                    </Button>
                    {data.canEdit && g.category && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <IconCheck className="mr-1 h-3.5 w-3.5" /> Confirm{" "}
                            {g.count}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm {g.count} {name} expenses?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {naira(g.total)}
                              {g.business
                                ? ` for the ${BUSINESS_NAMES[g.business]}`
                                : ""}
                              , {rangeLabel(g.first, g.last)}. They stop showing
                              as to review. You can still change any of them
                              later from Money out.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => confirmGroup(g)}>
                              Confirm {g.count}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {itemsWaiting > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Menu items without a category · {itemsWaiting}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              These came in from sales. Their category decides which business
              the sale counts for and how its profit is grouped.
            </p>
          </CardHeader>
          <CardContent className="divide-y divide-border p-0">
            {[
              ...data.categoryGuesses.map((g) => ({
                item: g.item,
                guess: g.category as string | null,
              })),
              ...data.uncategorisedItems.map((item) => ({
                item,
                guess: null as string | null,
              })),
            ].map(({ item, guess }) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 px-6 py-2.5"
              >
                <span className="min-w-0 truncate text-sm">{item}</span>
                {data.canEdit && (
                  <div className="flex shrink-0 items-center gap-2">
                    <Select
                      defaultValue={guess ?? undefined}
                      onValueChange={(c) => placeItem(item, c)}
                    >
                      <SelectTrigger className="h-8 w-44">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {itemCategories.map((c: { name: string }) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {guess && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => placeItem(item, guess)}
                      >
                        <IconCheck className="mr-1 h-3.5 w-3.5" /> Confirm
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.unmappedCategories.length > 0 && (
        <Link
          to="/settings?tab=categories"
          className="rounded-lg border border-border px-4 py-3 text-sm hover:bg-accent"
        >
          <span className="font-medium">Choose a business</span>
          <span className="text-muted-foreground">
            {" "}
            for {data.unmappedCategories.join(", ")}
          </span>
        </Link>
      )}

      {data.pendingReceipts > 0 && (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border px-4 py-3 text-sm">
          <span>
            <span className="font-medium">
              {data.pendingReceipts.toLocaleString("en-NG")} old receipts
            </span>
            <span className="text-muted-foreground"> not read yet</span>
          </span>
          {data.canEdit && (
            <Button
              size="sm"
              variant="outline"
              disabled={reading}
              onClick={readOldReceipts}
            >
              <IconMessage className="mr-1 h-3.5 w-3.5" /> Read with assistant
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
