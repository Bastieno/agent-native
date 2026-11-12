import { useParams } from "react-router";
import { useActionQuery } from "@agent-native/core/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetPageTitle } from "@/components/layout/HeaderActions";
import {
  BUSINESS_NAMES,
  flagText,
  naira,
  rangeLabel,
  signalText,
} from "@/lib/books";

export function meta() {
  return [{ title: "Report · Books" }];
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span
        className={
          strong
            ? "whitespace-nowrap font-medium"
            : "whitespace-nowrap text-muted-foreground"
        }
      >
        {label}
      </span>
      <span className={strong ? "font-semibold tabular-nums" : "tabular-nums"}>
        {naira(value)}
      </span>
    </div>
  );
}

export default function ReportPage() {
  const { id = "" } = useParams();
  const { data } = useActionQuery("get-digest", { digestId: id });
  useSetPageTitle(
    data ? `Report · ${rangeLabel(data.start, data.end)}` : "Report",
  );
  if (!data) return <Skeleton className="m-6 h-64" />;
  const f = data.figures;
  const good = f.trends.filter((s) => s.direction === "good");
  const watch = f.trends.filter((s) => s.direction === "watch");
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {data.commentary && (
        <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed">
          {data.commentary}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ...(
            Object.entries(f.businesses) as [string, typeof f.combined][]
          ).filter(([b, x]) => b !== "unassigned" || x.income > 0),
          ["both", f.combined] as const,
        ].map(([b, x]) => (
          <Card key={b}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {b === "both" ? "Both" : (BUSINESS_NAMES[b] ?? b)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              <Row label="Income" value={x.income} />
              <Row label="Cost of goods" value={x.costOfGoods} />
              <Row label="Gross profit" value={x.grossProfit} />
              <Row label="Expenses" value={x.expenses} />
              <Row label="Net" value={x.net} strong />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Going well</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {good.length ? (
              good.map((s, i) => <div key={i}>{signalText(s)}</div>)
            ) : (
              <div className="text-muted-foreground">Nothing stood out.</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">To watch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {watch.length ? (
              watch.map((s, i) => <div key={i}>{signalText(s)}</div>)
            ) : (
              <div className="text-muted-foreground">Nothing stood out.</div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Given away</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <Row label="The House (at cost)" value={f.notIncome.atCost.house} />
            <Row
              label="Subscriber meals (at cost)"
              value={f.notIncome.atCost.perk}
            />
            <Row
              label="Leakages and missing stock (at cost)"
              value={f.notIncome.atCost.leakages}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Largest expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {f.topExpenses.length === 0 && (
              <div className="text-muted-foreground">None recorded.</div>
            )}
            {f.topExpenses.map((e) => (
              <div key={e.code} className="flex justify-between">
                <span>
                  {e.vendor}
                  <span className="text-muted-foreground">
                    {" "}
                    · {e.category ?? "Uncategorised"}
                  </span>
                </span>
                <span className="tabular-nums">{naira(e.amount)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {f.flags.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {f.flags.slice(0, 20).map((x, i) => (
                <li key={i}>{flagText(x as never)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
