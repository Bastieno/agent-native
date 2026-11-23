import { Link } from "react-router";
import {
  IconAlertTriangle,
  IconArrowDownRight,
  IconArrowUpRight,
  IconChevronDown,
  IconChevronRight,
  IconClockExclamation,
  IconTrendingUp,
  IconUpload,
} from "@tabler/icons-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useActionQuery } from "@agent-native/core/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  useSetHeaderActions,
  useSetPageTitle,
} from "@/components/layout/HeaderActions";
import { FiguresTable } from "@/components/FiguresTable";
import { PeriodPicker, usePeriod, withPeriod } from "@/components/PeriodPicker";
import {
  BUSINESS_NAMES,
  dayLabel,
  naira,
  nairaShort,
  rangeLabel,
  shortDay,
  signalLine,
} from "@/lib/books";
import { cn } from "@/lib/utils";

export function meta() {
  return [{ title: "Overview · Books" }];
}

/** Change from the period before; for costs, going up is the bad direction. */
function Change({
  pct,
  upIsGood = true,
  before,
}: {
  pct: number | null;
  upIsGood?: boolean;
  /** The earlier figure, shown in place of a percentage that would mislead. */
  before?: number;
}) {
  if (before != null && (pct == null || Math.abs(pct) >= 100))
    return (
      <span className="text-xs text-muted-foreground">
        was {naira(before)} in the period before
      </span>
    );
  if (pct == null)
    return (
      <span className="text-xs text-muted-foreground">No earlier figures</span>
    );
  const up = pct > 0;
  const good = pct === 0 ? null : up === upIsGood;
  const Icon = up ? IconArrowUpRight : IconArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs",
        good == null
          ? "text-muted-foreground"
          : good
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400",
      )}
    >
      {pct !== 0 && <Icon className="h-3.5 w-3.5" aria-hidden />}
      {Math.abs(pct)}% vs period before
    </span>
  );
}

function Stat({
  label,
  value,
  sub,
  change,
  negative,
}: {
  label: string;
  value: string;
  sub?: string;
  change: React.ReactNode;
  negative?: boolean;
}) {
  return (
    <Card>
      <CardContent className="space-y-1 p-4">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div
          className={cn(
            "text-xl font-semibold tabular-nums tracking-tight sm:text-2xl",
            negative && "text-red-600 dark:text-red-400",
          )}
        >
          {value}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
          {change}
        </div>
      </CardContent>
    </Card>
  );
}

const chartConfig = {
  moneyIn: { label: "Money in", color: "var(--money-in)" },
  moneyOut: { label: "Money out", color: "var(--money-out)" },
} satisfies ChartConfig;

export default function OverviewPage() {
  useSetPageTitle("Overview");
  useSetHeaderActions(
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-1">
      <PeriodPicker />
    </div>,
  );
  const { start, end } = usePeriod();
  const { data, isLoading } = useActionQuery("get-overview", { start, end });

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 p-6 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
        <Skeleton className="h-64 md:col-span-4" />
      </div>
    );
  }
  if (!data.latestDay) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
        <h2 className="text-lg font-semibold">No sales yet</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Send a Moniebook sales summary to the WhatsApp number, or upload one,
          and your figures appear here.
        </p>
        <Button asChild>
          <Link to="/sales">
            <IconUpload className="mr-2 h-4 w-4" /> Upload an export
          </Link>
        </Button>
      </div>
    );
  }

  const c = data.combined;
  const prevLabel = rangeLabel(data.previous.start, data.previous.end);
  const comparedLabel = rangeLabel(data.compared.start, data.compared.end);
  const chartData = data.daily.map((d) => ({
    ...d,
    label: shortDay(d.day),
    moneyIn: d.moneyIn / 100,
    moneyOut: d.moneyOut / 100,
  }));
  const maxSpend = data.spendByCategory[0]?.amount ?? 0;
  const notes: {
    icon: typeof IconTrendingUp;
    text: string;
    watch?: boolean;
  }[] = [
    ...data.watch.map((s) => ({
      icon: IconAlertTriangle,
      text: signalLine(s),
      watch: true,
    })),
    ...data.good.map((s) => ({ icon: IconTrendingUp, text: signalLine(s) })),
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
      {data.staleDays != null && data.staleDays > 1 && (
        // One line with the button at its end; a phone gets the short
        // version of the sentence.
        <div className="flex items-center gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 py-1.5 pl-3 pr-1.5 text-sm">
          <IconClockExclamation className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="min-w-0 flex-1">
            <span className="sm:hidden">
              No sales for {data.staleDays} days
            </span>
            <span className="hidden sm:inline">
              Latest sales are from {dayLabel(data.latestDay)}, {data.staleDays}{" "}
              days ago. Figures after that are missing.
            </span>
          </span>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-8 shrink-0 gap-1"
          >
            <Link to="/sales">
              Upload<span className="hidden sm:inline">sales</span>
            </Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Stat
          label="Money in"
          value={naira(c.income)}
          change={<Change pct={c.incomeChange} />}
        />
        <Stat
          label="Gross profit"
          value={naira(c.grossProfit)}
          sub={c.margin != null ? `${Math.round(c.margin)}% margin` : undefined}
          change={null}
        />
        <Stat label="Expenses" value={naira(c.expenses)} change={null} />
        <Stat
          label="Net"
          value={naira(c.net)}
          negative={c.net < 0}
          change={<Change pct={c.netChange} before={data.previous.net} />}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">By business</CardTitle>
        </CardHeader>
        <CardContent>
          <FiguresTable
            columns={[
              "Money in",
              "Cost of goods",
              "Gross profit",
              "Expenses",
              "Net",
            ]}
            rows={[
              ...data.businesses.map((b) => ({
                name: BUSINESS_NAMES[b.slug] ?? b.slug,
                cells: [
                  { value: naira(b.income) },
                  {
                    value: naira(b.costOfGoods),
                    className: "text-muted-foreground",
                  },
                  { value: naira(b.grossProfit) },
                  {
                    value: naira(b.expenses),
                    className: "text-muted-foreground",
                  },
                  {
                    value: naira(b.net),
                    className: cn(
                      "font-medium",
                      b.net < 0 && "text-red-600 dark:text-red-400",
                    ),
                  },
                ],
              })),
              {
                name: "Both",
                strong: true,
                cells: [
                  { value: naira(c.income) },
                  { value: naira(c.costOfGoods) },
                  { value: naira(c.grossProfit) },
                  { value: naira(c.expenses) },
                  {
                    value: naira(c.net),
                    className: cn(
                      c.net < 0 && "text-red-600 dark:text-red-400",
                    ),
                  },
                ],
              },
            ]}
          />
          {data.profitShared > 0 && (
            // Profit shared is not a cost, so it sits under Net: what is left
            // shows whether more was paid out than the businesses made.
            <dl className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Profit shared</dt>
                <dd className="tabular-nums text-muted-foreground">
                  {naira(data.profitShared)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-medium">Kept in the business</dt>
                <dd
                  className={cn(
                    "font-medium tabular-nums",
                    data.keptInBusiness < 0 && "text-red-600 dark:text-red-400",
                  )}
                >
                  {naira(data.keptInBusiness)}
                </dd>
              </div>
              {data.keptInBusiness < 0 && (
                <p className="text-xs text-muted-foreground">
                  More was shared than the businesses made in this period.
                </p>
              )}
            </dl>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Changes compare {comparedLabel} with {prevLabel}. Expenses include
            owner's pay of {naira(data.ownersPay)}
            {data.notCosts > 0
              ? `; ${naira(data.notCosts)} of money moved (loans, transfers) is left out`
              : ""}
            .
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Money in and out, by day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart
              data={chartData}
              barGap={2}
              margin={{ left: 4, right: 4 }}
            >
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
                    formatter={(value, name) => (
                      <div className="flex w-full justify-between gap-4">
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]?.label}
                        </span>
                        <span className="tabular-nums">
                          {naira(Number(value) * 100)}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="moneyIn"
                fill="var(--color-moneyIn)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="moneyOut"
                fill="var(--color-moneyOut)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Where the money went
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {data.spendByCategory.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No expenses in this period.
              </p>
            )}
            {data.spendByCategory.map((s) =>
              s.category === "Owner's pay" &&
              data.ownersPayByKind.some((k) => k.kind !== "Other") ? (
                // Owner's pay is one line; open it to see what it went on.
                <Collapsible key={s.category}>
                  <CollapsibleTrigger className="group block w-full rounded-md px-2 py-1.5 text-left hover:bg-accent">
                    <div className="flex justify-between gap-2 text-sm">
                      <span className="flex items-center gap-1">
                        {s.category}
                        <IconChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </span>
                      <span className="tabular-nums">{naira(s.amount)}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${maxSpend ? Math.max(2, (s.amount / maxSpend) * 100) : 0}%`,
                          background: "var(--money-out)",
                        }}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-0.5 pb-1 pl-4">
                    {data.ownersPayByKind.map((k) => (
                      <Link
                        key={k.kind}
                        to={withPeriod(
                          `/expenses?category=${encodeURIComponent(k.category)}`,
                          start,
                          end,
                        )}
                        className="flex justify-between gap-2 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <span>{k.kind}</span>
                        <span className="tabular-nums">{naira(k.amount)}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={s.category}
                  to={withPeriod(
                    `/expenses?category=${encodeURIComponent(s.category)}`,
                    start,
                    end,
                  )}
                  className="group block rounded-md px-2 py-1.5 hover:bg-accent"
                >
                  <div className="flex justify-between gap-2 text-sm">
                    <span>{s.category}</span>
                    <span className="tabular-nums">{naira(s.amount)}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${maxSpend ? Math.max(2, (s.amount / maxSpend) * 100) : 0}%`,
                        background: "var(--money-out)",
                      }}
                    />
                  </div>
                </Link>
              ),
            )}
            <Link
              to={withPeriod("/expenses", start, end)}
              className="flex items-center gap-1 px-2 pt-2 text-xs text-muted-foreground hover:text-foreground"
            >
              All expenses <IconChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Worth knowing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-sm">
            {notes.length === 0 && data.uncostedRevenue === 0 && (
              <p className="text-muted-foreground">
                Nothing unusual in this period.
              </p>
            )}
            {notes.map((n, i) => (
              <div key={i} className="flex gap-2">
                <n.icon
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    n.watch
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400",
                  )}
                />
                <span>{n.text}</span>
              </div>
            ))}
            {data.uncostedRevenue > 0 && (
              <div className="flex gap-2 text-muted-foreground">
                <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {naira(data.uncostedRevenue)} of sales have no cost yet, so
                  gross profit is overstated. Upload a Sales by item report.
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {data.reviewCount > 0 && (
        <Link
          to="/review"
          className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm hover:bg-accent"
        >
          <span>
            <span className="font-medium">
              {data.reviewCount.toLocaleString("en-NG")} things to review
            </span>
            <span className="text-muted-foreground">
              {" "}
              · expenses to confirm and items without a category
            </span>
          </span>
          <IconChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      )}
    </div>
  );
}
