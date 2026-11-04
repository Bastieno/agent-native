import { httpError } from "@/lib/http-error";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import { Badge } from "@/components/ui/badge";
import { useOrigin } from "@/lib/origin";

type Draft = {
  id: string;
  title: string;
  className: string | null;
  kind: string;
  forLearners: number;
};

/**
 * Work that has been written but not shared, on the dashboard where someone
 * starts their day. A draft saved by the assistant or by a teacher's own AI
 * app appears here at once, so it is never lost for want of a link; opening
 * one and pressing Back returns to this page.
 */
export function DraftsWaiting({ role }: { role: "admin" | "teacher" }) {
  const origin = useOrigin();
  const { data } = useQuery<{ drafts: Draft[]; total: number }>({
    queryKey: ["my-drafts"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-my-drafts"),
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
    staleTime: 15_000,
  });
  const drafts = data?.drafts ?? [];
  const total = data?.total ?? drafts.length;
  if (drafts.length === 0) return null;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium">
        Waiting for you to read and share{" "}
        <span className="font-normal text-muted-foreground">({total})</span>
      </h2>
      <div className="divide-y rounded-lg border">
        {drafts.map((d) => (
          <Link
            key={d.id}
            to={`/${role}/assessments/${d.id}`}
            state={origin("Dashboard")}
            className="group flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-muted/30"
          >
            <span className="min-w-0">
              <span className="block truncate font-medium group-hover:text-primary">
                {d.title}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {[
                  d.className,
                  d.forLearners > 0
                    ? `for ${d.forLearners} learner${d.forLearners === 1 ? "" : "s"} only`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </span>
            <Badge variant="secondary" className="shrink-0 text-xs capitalize">
              {d.kind}
            </Badge>
          </Link>
        ))}
      </div>
      {total > drafts.length ? (
        <p className="text-xs text-muted-foreground">
          Showing the latest {drafts.length} of {total}. The rest are in each
          class&rsquo;s activities.
        </p>
      ) : null}
    </section>
  );
}
