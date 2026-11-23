import { Link, useNavigate } from "react-router";
import { useActionQuery } from "@agent-native/core/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSetPageTitle } from "@/components/layout/HeaderActions";
import { Pagination, usePagination } from "@/components/Pagination";
import { naira, rangeLabel } from "@/lib/books";

export function meta() {
  return [{ title: "Reports · Books" }];
}

const PERIOD = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  range: "Report",
} as Record<string, string>;

export default function ReportsPage() {
  useSetPageTitle("Reports");
  const navigate = useNavigate();
  const { data } = useActionQuery("list-digests", { limit: 90 });
  const digests = data?.digests ?? [];
  const paged = usePagination<(typeof digests)[number]>(digests);
  if (!digests.length) {
    return (
      <div className="flex flex-1 items-center justify-center p-10 text-sm text-muted-foreground">
        Digests appear here from 8am, once sales have come in.
      </div>
    );
  }
  return (
    <div className="@container flex min-h-full flex-1 flex-col p-4 sm:p-6">
      <div className="divide-y divide-border @xl:hidden">
        {paged.items.map((d) => (
          <Link
            key={d.digestId}
            to={`/reports/${d.digestId}`}
            className="flex items-center justify-between gap-3 py-3"
          >
            <span className="min-w-0">
              <span className="block text-sm">
                {rangeLabel(d.start, d.end)}
              </span>
              <span className="block text-xs text-muted-foreground">
                {PERIOD[d.period] ?? d.period}
                {d.status !== "sent"
                  ? ` · ${d.status === "failed" ? "Not delivered" : "Not sent"}`
                  : ""}
              </span>
            </span>
            <span className="shrink-0 text-right text-sm tabular-nums">
              <span className="block">{naira(d.income)}</span>
              <span
                className={`block text-xs ${d.net < 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}
              >
                net {naira(d.net)}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <Table className="hidden @xl:table">
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead />
            <TableHead className="text-right">Money in</TableHead>
            <TableHead className="text-right">Net</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.items.map((d) => (
            <TableRow
              key={d.digestId}
              className="cursor-pointer"
              onClick={() => navigate(`/reports/${d.digestId}`)}
            >
              <TableCell>
                <Link to={`/reports/${d.digestId}`} className="hover:underline">
                  {rangeLabel(d.start, d.end)}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{PERIOD[d.period] ?? d.period}</Badge>
                {d.status !== "sent" && (
                  <Badge variant="secondary" className="ml-2">
                    {d.status === "failed" ? "Not delivered" : "Not sent"}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {naira(d.income)}
              </TableCell>
              <TableCell
                className={`text-right tabular-nums ${d.net < 0 ? "text-red-600 dark:text-red-400" : ""}`}
              >
                {naira(d.net)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination {...paged} noun="reports" />
    </div>
  );
}
