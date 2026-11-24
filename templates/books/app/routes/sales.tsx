import { useRef } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IconHistory, IconUpload } from "@tabler/icons-react";
import { useActionMutation, useActionQuery } from "@agent-native/core/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  useSetHeaderActions,
  useSetPageTitle,
} from "@/components/layout/HeaderActions";
import { FiguresTable } from "@/components/FiguresTable";
import { PeriodPicker, usePeriod } from "@/components/PeriodPicker";
import {
  BUSINESS_NAMES,
  daysBetween,
  naira,
  nairaShort,
  shortDay,
} from "@/lib/books";

export function meta() {
  return [{ title: "Money in · Books" }];
}

const KIND_NAMES: Record<string, string> = {
  "sales-summary": "Sales summary",
  "payment-method": "Payment methods",
  "item-sales": "Sales by item",
};

function RecentFiles() {
  const { data } = useActionQuery("list-imports", { limit: 10 });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Recent files">
          <IconHistory className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Recent files</DropdownMenuLabel>
        {(data?.imports ?? []).length === 0 && (
          <DropdownMenuItem disabled>None yet</DropdownMenuItem>
        )}
        {(data?.imports ?? []).map((i, n) => (
          <DropdownMenuItem
            key={n}
            className="flex flex-col items-start gap-0.5"
          >
            <span>
              {KIND_NAMES[i.kind] ?? i.kind}
              {i.rangeStart
                ? ` · ${shortDay(i.rangeStart)}${i.rangeEnd && i.rangeEnd !== i.rangeStart ? `–${shortDay(i.rangeEnd)}` : ""}`
                : ""}
            </span>
            <span
              className={
                i.check && !i.check.agrees
                  ? "text-xs text-destructive"
                  : "text-xs text-muted-foreground"
              }
            >
              {i.check && !i.check.agrees
                ? `Doesn't match sales: ${naira(i.check.reportTotal)} vs ${naira(i.check.salesTotal)}`
                : `${i.receivedVia === "whatsapp" ? "WhatsApp" : "Uploaded"}`}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UploadButton() {
  const input = useRef<HTMLInputElement>(null);
  const importFile = useActionMutation("import-moniebook-file");
  const qc = useQueryClient();
  async function upload(file: File) {
    const id = toast.loading(`Reading ${file.name}…`);
    importFile.mutate(
      { csv: await file.text(), fileName: file.name },
      {
        onSuccess: (r: any) => {
          const what = KIND_NAMES[r.kind] ?? "File";
          if (r.check && !r.check.agrees) {
            toast.warning(
              `${what} loaded, but it doesn't match the sales for those days (${naira(r.check.reportTotal)} vs ${naira(r.check.salesTotal)}). Was the end date the day after?`,
              { id },
            );
          } else if (r.kind === "sales-summary") {
            toast.success(
              `${r.added + r.updated + r.unchanged} orders read (${r.added} new).`,
              { id },
            );
          } else toast.success(`${what} loaded.`, { id });
          qc.invalidateQueries({ queryKey: ["action"] });
        },
        onError: (err) => toast.error(err.message, { id }),
      },
    );
  }
  return (
    <>
      <input
        ref={input}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
      <Button size="sm" onClick={() => input.current?.click()}>
        <IconUpload className="mr-2 h-4 w-4" /> Upload export
      </Button>
    </>
  );
}

/** Sales set against the stock bought for each Lounge menu group. */
function MenuGroups({ start, end }: { start: string; end: string }) {
  const { data } = useActionQuery("get-stock-groups", { start, end });
  if (!data) return null;
  const shown = data.groups.filter((g) => g.sales > 0 || g.bought > 0);
  if (!shown.length && !data.unsorted.bought) return null;
  const stock = (key: string) =>
    `/expenses?stockGroup=${key}&start=${start}&end=${end}`;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Lounge menu groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FiguresTable
          columns={["Sales", "Stock bought", "Left after stock"]}
          rows={[
            ...shown.map((g) => ({
              name: g.name,
              cells: [
                { value: naira(g.sales) },
                {
                  value: naira(g.bought),
                  className: "text-muted-foreground",
                  ...(g.count ? { href: stock(g.group) } : {}),
                },
                {
                  value: naira(g.difference),
                  className: g.difference < 0 ? "text-destructive" : "",
                },
              ],
            })),
            ...(data.shared.bought
              ? [
                  {
                    name: "Shared (nylon, serviette, transport)",
                    cells: [
                      { value: "" },
                      {
                        value: naira(data.shared.bought),
                        className: "text-muted-foreground",
                        href: stock("shared"),
                      },
                      { value: "" },
                    ],
                  },
                ]
              : []),
          ]}
        />
        {data.unsorted.bought > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            <Link
              to={stock("unsorted")}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {naira(data.unsorted.bought)} of stock is not sorted
            </Link>{" "}
            ({data.unsorted.count.toLocaleString("en-NG")}{" "}
            {data.unsorted.count === 1 ? "purchase" : "purchases"}, floats
            included). File them under a group to make these figures complete.
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Stock is counted on the day it was bought, so a week or a day can look
          high or low; compare over a month.
        </p>
      </CardContent>
    </Card>
  );
}

const chartConfig = {
  moneyIn: { label: "Money in", color: "var(--money-in)" },
} satisfies ChartConfig;

export default function SalesPage() {
  useSetPageTitle("Money in");
  useSetHeaderActions(
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-1">
      <PeriodPicker />
      <RecentFiles />
      <UploadButton />
    </div>,
  );
  const { start, end } = usePeriod();
  const { data } = useActionQuery("list-sales", { start, end });
  const businesses = Object.keys(data?.byBusiness ?? {}).sort();
  const given = data?.notIncome ?? {};
  const chartData = data
    ? daysBetween(start, end).map((day) => ({
        label: shortDay(day),
        moneyIn: (data.byDay?.[day] ?? 0) / 100,
      }))
    : [];

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
      {!data ? null : data.orders === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          No sales in this period. Pick another period, or upload a Moniebook
          export.
        </div>
      ) : (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {naira(data.income)} from {data.orders.toLocaleString("en-NG")}{" "}
                orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-56 w-full">
                <BarChart data={chartData} margin={{ left: 4, right: 4 }}>
                  <CartesianGrid vertical={false} strokeOpacity={0.4} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    minTickGap={16}
                    fontSize={11}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={56}
                    fontSize={11}
                    tickFormatter={(v: number) => nairaShort(v * 100)}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => (
                          <span className="tabular-nums">
                            {naira(Number(value) * 100)}
                          </span>
                        )}
                      />
                    }
                  />
                  <Bar
                    dataKey="moneyIn"
                    fill="var(--color-moneyIn)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">By business</CardTitle>
            </CardHeader>
            <CardContent>
              <FiguresTable
                columns={[
                  "Money in",
                  "Cost of goods",
                  "Given away",
                  "Gross profit",
                ]}
                rows={businesses.map((b) => ({
                  name: BUSINESS_NAMES[b] ?? b,
                  cells: [
                    { value: naira(data.byBusiness[b]) },
                    {
                      value: naira(data.costOfGoods[b] ?? 0),
                      className: "text-muted-foreground",
                    },
                    {
                      value: naira(data.givenAwayAtCost[b] ?? 0),
                      className: "text-muted-foreground",
                    },
                    { value: naira(data.grossProfit[b] ?? 0) },
                  ],
                }))}
              />
              {data.uncostedRevenue > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {naira(data.uncostedRevenue)} of sales have no cost yet, so
                  gross profit is overstated. Upload a Sales by item report.
                </p>
              )}
            </CardContent>
          </Card>

          <MenuGroups start={start} end={end} />

          <div className="grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Best sellers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-sm">
                {(data.topItems ?? []).map((i) => (
                  <div key={i.item} className="flex justify-between gap-3">
                    <span className="min-w-0 truncate">
                      {i.item}
                      <span className="text-muted-foreground">
                        {" "}
                        · {i.units.toLocaleString("en-NG")} sold
                      </span>
                    </span>
                    <span className="shrink-0 tabular-nums">
                      {naira(i.revenue)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  How it was paid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-sm">
                {Object.entries(data.byMethod)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([m, v]) => (
                    <div key={m} className="flex justify-between">
                      <span>{m}</span>
                      <span className="tabular-nums">{naira(v as number)}</span>
                    </div>
                  ))}
                {Object.keys(given).length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-muted-foreground">
                    {Object.entries(given).map(([m, v]) => (
                      <div key={m} className="flex justify-between">
                        <span>{m} (not income)</span>
                        <span className="tabular-nums">
                          {naira(v as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
