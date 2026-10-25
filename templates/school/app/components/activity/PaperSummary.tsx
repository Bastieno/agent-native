import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import { IconChevronDown } from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useOrigin } from "@/lib/origin";
import { cn } from "@/lib/utils";

type PaperProfile = {
  passMark: number;
  enrolled: number;
  handedIn: number;
  notHandedIn: Array<{ studentId: string; name: string }>;
  marked: number;
  waitingForMarks: number;
  average: number | null;
  spread: Array<{ label: string; count: number }>;
  questions: Array<{
    number: number;
    prompt: string;
    version: string | null;
    answered: number;
    earnedPercent: number;
  }>;
  counting: string[];
};

/**
 * How the class did on this paper, for someone asking why a figure is low.
 *
 * It states figures and stops. Who has not handed in, where the marks sit and
 * which questions were most often missed are things the data knows; why is
 * not, so nothing here guesses at it. The same figures, counted the same way,
 * come back to the assistant from `get-paper-profile`.
 */
export function PaperSummary({
  assessmentId,
  role,
}: {
  assessmentId: string;
  role: "teacher" | "admin";
}) {
  const origin = useOrigin();
  const { data } = useQuery<PaperProfile | null>({
    queryKey: ["paper-profile", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-paper-profile?assessmentId=${assessmentId}`,
        ),
      );
      return res.ok ? res.json() : null;
    },
  });
  if (!data || data.handedIn + data.notHandedIn.length === 0) return null;

  const below = data.spread[0]?.count ?? 0;
  const weak = data.average != null && data.average < data.passMark;
  return (
    <section className="space-y-3 rounded-lg border p-4">
      <h2 className="text-sm font-medium">How the class did</h2>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xl font-semibold">
            {data.handedIn}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              of {data.enrolled}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">handed in</p>
        </div>
        <div>
          <p
            className={cn("text-xl font-semibold", weak && "text-destructive")}
          >
            {data.average != null ? `${data.average}%` : "—"}
          </p>
          <p className="text-xs text-muted-foreground">average</p>
        </div>
        <div>
          <p
            className={cn(
              "text-xl font-semibold",
              below > 0 && "text-destructive",
            )}
          >
            {below}
          </p>
          <p className="text-xs text-muted-foreground">
            below {data.passMark}%
          </p>
        </div>
      </div>
      {data.waitingForMarks > 0 ? (
        <p className="text-xs text-muted-foreground">
          {data.waitingForMarks} handed in and still waiting for a published
          mark.
        </p>
      ) : null}

      {data.notHandedIn.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger className="group flex w-full items-center justify-between text-sm">
            <span>{data.notHandedIn.length} not handed in</span>
            <IconChevronDown
              size={14}
              className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-2 divide-y rounded-md border">
              {data.notHandedIn.map((l) => (
                <li key={l.studentId}>
                  <Link
                    to={`/${role}/students/${l.studentId}`}
                    state={origin("Back to the paper")}
                    className="block px-3 py-2 text-sm hover:bg-accent/50"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : null}

      {data.questions.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger className="group flex w-full items-center justify-between text-sm">
            <span>Questions most often missed</span>
            <IconChevronDown
              size={14}
              className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-2 divide-y rounded-md border">
              {data.questions.map((q) => (
                <li
                  key={`${q.version}-${q.number}`}
                  className="flex items-start justify-between gap-3 px-3 py-2 text-sm"
                >
                  <span className="min-w-0">
                    <span className="text-muted-foreground">{q.number}. </span>
                    {q.prompt}
                    {q.version ? (
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        ({q.version})
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-xs tabular-nums",
                      q.earnedPercent < data.passMark
                        ? "font-medium text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {q.earnedPercent}% of marks
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Of the marks the class could earn on each question, among{" "}
              {data.questions[0]?.answered} marked answers. This shows what
              happened, not why.
            </p>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </section>
  );
}
