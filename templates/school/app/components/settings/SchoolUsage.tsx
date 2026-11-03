import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Skeleton } from "@/components/ui/skeleton";
import { modelLabel } from "@shared/agent-settings";

interface SchoolUsage {
  days: number;
  totalCostUsd: number;
  requests: number;
  people: number;
  byRole: Array<{
    role: string;
    people: number;
    requests: number;
    costUsd: number;
  }>;
  topUsers: Array<{
    name: string;
    role: string;
    requests: number;
    costUsd: number;
  }>;
  byModel: Array<{ model: string; requests: number; costUsd: number }>;
}

const RANGES = [7, 30, 90];

/** Dollars, with fractions of a cent kept for the small figures. */
function usd(n: number): string {
  if (n === 0) return "$0";
  if (n < 0.01) return "<$0.01";
  return `$${n.toFixed(2)}`;
}

/**
 * What the assistant has cost the school, by role and by person.
 *
 * Read from `get-school-usage`, the same figures the assistant gives when a
 * head asks "who uses it most?". Shown only once opened, under the assistant's
 * settings, since it is looked at now and then rather than every visit.
 */
export function SchoolUsage() {
  const [days, setDays] = useState(30);
  const { data, isPending, isError } = useQuery<SchoolUsage>({
    queryKey: ["school-usage", days],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-school-usage?days=${days}&top=10`,
        ),
      );
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      return res.json();
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Estimated from published model prices. The provider's bill is the
          final figure.
        </p>
        <div className="flex shrink-0 gap-1 rounded-md border p-0.5">
          {RANGES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDays(d)}
              className={`rounded px-2 py-0.5 text-xs ${
                days === d
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d} days
            </button>
          ))}
        </div>
      </div>

      {isPending ? (
        <Skeleton className="h-32 w-full" />
      ) : isError || !data ? (
        <p className="text-sm text-muted-foreground">
          Usage could not be loaded.
        </p>
      ) : data.requests === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nobody has used the assistant in the last {days} days.
        </p>
      ) : (
        <>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-semibold tabular-nums">
              {usd(data.totalCostUsd)}
            </div>
            <div className="text-xs text-muted-foreground">
              {data.requests} requests from {data.people}{" "}
              {data.people === 1 ? "person" : "people"}
            </div>
          </div>

          <UsageTable
            title="By role"
            head={["", "People", "Requests", "Cost"]}
            rows={data.byRole.map((r) => [
              r.role,
              r.people,
              r.requests,
              usd(r.costUsd),
            ])}
          />
          <UsageTable
            title="Who uses it most"
            head={["", "Role", "Requests", "Cost"]}
            rows={data.topUsers.map((u) => [
              u.name,
              u.role,
              u.requests,
              usd(u.costUsd),
            ])}
          />
          <UsageTable
            title="By model"
            head={["", "Requests", "Cost"]}
            rows={data.byModel.map((m) => [
              modelLabel(m.model),
              m.requests,
              usd(m.costUsd),
            ])}
          />
        </>
      )}
    </div>
  );
}

function UsageTable({
  title,
  head,
  rows,
}: {
  title: string;
  head: string[];
  rows: Array<Array<string | number>>;
}) {
  if (!rows.length) return null;
  return (
    <section className="space-y-1.5">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs text-muted-foreground">
            <tr>
              {head.map((h, i) => (
                <th
                  key={i}
                  className={`px-3 py-1.5 font-medium ${i === 0 ? "text-left" : "text-right"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-t">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-3 py-1.5 ${i === 0 ? "text-left" : "text-right tabular-nums text-muted-foreground"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
