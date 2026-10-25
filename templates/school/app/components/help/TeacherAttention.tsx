import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import {
  IconAlertTriangle,
  IconChevronRight,
  IconClipboardCheck,
  IconFileText,
  IconNotebook,
  IconSend,
} from "@tabler/icons-react";
import { useOrigin } from "@/lib/origin";

type Item = {
  id: string;
  kind: "mark" | "publish" | "note" | "draft" | "struggling";
  text: string;
  detail: string | null;
  href: string;
};

const ICON = {
  mark: IconClipboardCheck,
  publish: IconSend,
  note: IconNotebook,
  draft: IconFileText,
  struggling: IconAlertTriangle,
} as const;

/**
 * What the teacher needs to know or do, each line a link to where it is done.
 * It reads the same list the teacher's own AI app gets from
 * `get-my-attention`, so the two never disagree. Hidden when there is nothing:
 * a dashboard should not make a point of an empty to-do list.
 */
export function TeacherAttention() {
  const origin = useOrigin();
  const { data } = useQuery<{ items: Item[] }>({
    queryKey: ["my-attention"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-attention"),
      );
      return res.ok ? res.json() : { items: [] };
    },
    staleTime: 15_000,
  });
  const items = data?.items ?? [];
  if (items.length === 0) return null;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium">Needs your attention</h2>
      <div className="divide-y rounded-lg border">
        {items.map((it) => {
          const Icon = ICON[it.kind];
          return (
            <Link
              key={it.id}
              to={it.href}
              state={origin("Dashboard")}
              className="group flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/30"
            >
              <Icon size={16} className="shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium group-hover:text-primary">
                  {it.text}
                </span>
                {it.detail ? (
                  <span className="block truncate text-xs text-muted-foreground">
                    {it.detail}
                  </span>
                ) : null}
              </span>
              <IconChevronRight
                size={14}
                className="shrink-0 text-muted-foreground"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
