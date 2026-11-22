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
  if (!digests.length) {
    return (
      <div className="flex flex-1 items-center justify-center p-10 text-sm text-muted-foreground">
        Digests appear here from 8am, once sales have come in.
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead />
            <TableHead className="text-right">Money in</TableHead>
            <TableHead className="text-right">Net</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {digests.map((d) => (
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
    </div>
  );
}
