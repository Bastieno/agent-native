import { useRef } from "react";
import { useSearchParams } from "react-router";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  addDays,
  lagosToday,
  naira,
  shortDay,
} from "@/lib/books";

export function meta() {
  return [{ title: "Sales · Books" }];
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

export default function SalesPage() {
  useSetPageTitle("Sales");
  useSetHeaderActions(
    <div className="flex items-center gap-1">
      <RecentFiles />
      <UploadButton />
    </div>,
  );
  const [params, setParams] = useSearchParams();
  const today = lagosToday();
  const start = params.get("start") ?? addDays(today, -7);
  const end = params.get("end") ?? addDays(today, -1);
  const { data } = useActionQuery("list-sales", { start, end });
  const businesses = Object.keys(data?.byBusiness ?? {}).sort();
  const given = data?.notIncome ?? {};

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
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
      {!data || data.orders === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          No sales in these dates.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">By business</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead className="text-right">Income</TableHead>
                    <TableHead className="text-right">Cost of goods</TableHead>
                    <TableHead className="text-right">Given away</TableHead>
                    <TableHead className="text-right">Gross profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businesses.map((b) => (
                    <TableRow key={b}>
                      <TableCell>{BUSINESS_NAMES[b] ?? b}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {naira(data.byBusiness[b])}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {naira(data.costOfGoods[b] ?? 0)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {naira(data.givenAwayAtCost[b] ?? 0)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {naira(data.grossProfit[b] ?? 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium">Both</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {naira(data.income)}
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
              {data.uncostedRevenue > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {naira(data.uncostedRevenue)} of sales have no cost yet.
                  Upload a Sales by item report.
                </p>
              )}
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
                      <span className="tabular-nums">{naira(v as number)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
