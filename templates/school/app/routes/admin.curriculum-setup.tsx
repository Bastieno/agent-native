import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { IconWand, IconCheck, IconTrash } from "@tabler/icons-react";
import { BackLink } from "@/components/layout/BackLink";
import { useCurriculumDraft } from "@/hooks/use-curriculum-draft";

export default function AdminCurriculumSetup() {
  const { sync } = useNavigationState();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [discardOpen, setDiscardOpen] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draftId") ?? undefined;

  useEffect(() => {
    sync({
      role: "admin",
      view: "curriculum-setup",
      curriculumDraftId: draftId,
    });
  }, [sync, draftId]);

  const { draftState: liveDraft } = useCurriculumDraft(draftId ?? null);

  const { data: activeDraft } = useQuery({
    queryKey: ["curriculum-draft-record", draftId],
    queryFn: async () => {
      if (!draftId) return null;
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-curriculum-draft?id=${draftId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!draftId,
  });

  // The record holds the title and status; the live poll holds the tree as it
  // is written. Take both — replacing one with the other loses whichever
  // fields the other does not have.
  const draft: any = { ...(activeDraft ?? {}), ...(liveDraft ?? {}) };

  if (!draftId) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <BackLink to="/admin/curriculum">Curriculum</BackLink>
          <h1 className="text-xl font-semibold">Curriculum Setup</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Co-author your curriculum with the agent.
          </p>
        </div>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <IconWand size={28} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">Start a curriculum session</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Ask the agent to start setting up your curriculum. It will guide you
            through subjects, units, and learning objectives in a live session.
          </p>
        </div>
      </div>
    );
  }

  const subjects: any[] = (draft?.stateJson as any)?.subjects ?? [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <BackLink to="/admin/curriculum">Curriculum</BackLink>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Curriculum session
          </p>
          <h1 className="text-xl font-semibold break-words">
            {draft?.sessionTitle ?? "Untitled session"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Units and objectives appear here as the agent writes them. Nothing
            reaches the curriculum until the session is committed.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {(draft as any)?.status === "committed" ? (
            <Badge className="gap-1 text-xs">
              <IconCheck size={12} />
              Committed
            </Badge>
          ) : (
            <>
              <Badge variant="secondary" className="text-xs">
                In Progress
              </Badge>
              {/* Only an uncommitted session can be set aside — once it is in
                  the curriculum, discarding the draft would change nothing. */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDiscardOpen(true)}
              >
                <IconTrash size={14} className="mr-1.5" />
                Discard
              </Button>
            </>
          )}
        </div>
      </div>

      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set this session aside?</AlertDialogTitle>
            <AlertDialogDescription>
              Nothing has been added to the curriculum yet, so nothing is lost
              from it. The draft itself is kept rather than deleted, in case it
              is wanted back.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={discarding}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={discarding}
              onClick={async (e) => {
                e.preventDefault();
                setDiscarding(true);
                try {
                  const res = await fetch(
                    agentNativePath(
                      "/_agent-native/actions/discard-curriculum-draft",
                    ),
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: draftId }),
                    },
                  );
                  const body = await res.json().catch(() => ({}));
                  if (!res.ok) {
                    throw new Error((body as any).error ?? "Failed");
                  }
                  qc.invalidateQueries({ queryKey: ["curriculum-drafts"] });
                  toast.success((body as any).message ?? "Set aside");
                  navigate("/admin/curriculum");
                } catch (err: any) {
                  toast.error(err.message ?? "Could not discard the session");
                } finally {
                  setDiscarding(false);
                  setDiscardOpen(false);
                }
              }}
            >
              {discarding ? "Setting aside…" : "Set aside"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm font-medium">Nothing drafted yet</p>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
            Ask the agent to build a subject's units and objectives — name the
            subject and the year group. They will appear here as it works.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject: any, si: number) => (
            <div key={si} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{subject.name}</h3>
                {subject.code && (
                  <span className="text-xs text-muted-foreground">
                    {subject.code}
                  </span>
                )}
              </div>
              {subject.units && subject.units.length > 0 && (
                <div className="space-y-2 pl-2 border-l-2 border-muted">
                  {subject.units.map((unit: any, ui: number) => (
                    <div key={ui} className="space-y-1">
                      <p className="text-sm font-medium">{unit.title}</p>
                      {unit.learningObjectives &&
                        unit.learningObjectives.length > 0 && (
                          <ul className="space-y-0.5 pl-3">
                            {unit.learningObjectives.map(
                              (obj: string, oi: number) => (
                                <li
                                  key={oi}
                                  className="text-xs text-muted-foreground flex gap-1.5"
                                >
                                  <span>•</span>
                                  <span>{obj}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
