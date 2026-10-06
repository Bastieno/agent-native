import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { IconBook, IconCheck, IconDots, IconTrash } from "@tabler/icons-react";
import { BackLink } from "@/components/layout/BackLink";

async function callAction(name: string, body: object) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any).error ?? `${name} failed`);
  return json;
}

/**
 * A school's own syllabus, as it is read out of their documents.
 *
 * Extraction from a scan is never certain, so this is where someone at the
 * school reads it back before it becomes the library everything else plans
 * from: what was understood, what still needs fixing, and — the part no
 * summary can replace — which pages could not be read at all.
 */
export default function AdminSyllabusImport() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [searchParams] = useSearchParams();
  const importId = searchParams.get("importId") ?? undefined;
  const [confirmCommit, setConfirmCommit] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "curriculum" });
  }, [sync]);

  const { data } = useQuery<any>({
    queryKey: ["syllabus-import", importId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-syllabus-import?id=${importId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!importId,
    // The agent writes as it reads; the page should show it arriving.
    refetchInterval: 3000,
  });

  const { data: list } = useQuery<any>({
    queryKey: ["syllabus-imports"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-syllabus-imports"),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !importId,
  });

  if (!importId) {
    const imports = list?.imports ?? [];
    return (
      <div className="h-full space-y-6 overflow-auto p-6 pb-24">
        <div>
          <BackLink to="/admin/curriculum" className="mb-4">
            Curriculum
          </BackLink>
          <h1 className="text-xl font-semibold leading-tight">
            Import a syllabus
          </h1>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            The curriculum libraries that come with the app are samples. Give
            the agent your own syllabus — a document, or photographs of paper —
            and it reads it into a library of your own, which you check here
            before anything is kept.
          </p>
        </div>
        {imports.length === 0 ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <IconBook
              size={28}
              className="mx-auto mb-3 text-muted-foreground"
            />
            <p className="text-sm font-medium">No imports yet</p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
              Ask the agent to start one and send it your syllabus.
            </p>
          </div>
        ) : (
          <div className="divide-y rounded-lg border">
            {imports.map((row: any) => (
              <a
                key={row.id}
                href={row.path}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{row.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {row.objectives} objective
                    {row.objectives === 1 ? "" : "s"} · {row.subjects} subject
                    {row.subjects === 1 ? "" : "s"}
                    {row.source ? ` · from ${row.source}` : ""}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-primary">Open</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  const summary = data?.summary;
  const state = data?.stateJson ?? {};
  const committed = data?.status === "committed";

  async function commit() {
    setBusy(true);
    try {
      const res = await callAction("commit-syllabus-import", {
        id: importId,
        confirm: true,
      });
      toast.success(res.message ?? "Added to the school's library");
      qc.invalidateQueries({ queryKey: ["syllabus-import", importId] });
      setConfirmCommit(false);
    } catch (e: any) {
      toast.error(e.message ?? "Could not commit the import");
    } finally {
      setBusy(false);
    }
  }

  async function removeFromLibrary() {
    const name = state?.framework?.name;
    if (!name) return;
    setBusy(true);
    try {
      const res = await callAction("remove-framework", {
        name,
        confirm: true,
      });
      toast.success(res.message ?? "Removed from the library");
      qc.invalidateQueries({ queryKey: ["syllabus-import", importId] });
      setConfirmRemove(false);
    } catch (e: any) {
      toast.error(e.message ?? "Could not remove it");
    } finally {
      setBusy(false);
    }
  }

  async function discard() {
    setBusy(true);
    try {
      await callAction("discard-syllabus-import", { id: importId });
      toast.success("Import set aside");
      qc.invalidateQueries({ queryKey: ["syllabus-import", importId] });
      setConfirmDiscard(false);
    } catch (e: any) {
      toast.error(e.message ?? "Could not set the import aside");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <BackLink to="/admin/curriculum" className="mb-4">
          Curriculum
        </BackLink>
        <p className="mb-1.5 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Syllabus import ·{" "}
          {committed ? (
            <span className="inline-flex items-center gap-0.5 text-primary">
              <IconCheck size={12} />
              In the library
            </span>
          ) : data?.status === "discarded" ? (
            <span>Set aside</span>
          ) : (
            <span>Being read</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <h1 className="min-w-0 flex-1 break-words text-xl font-semibold leading-tight">
            {data?.title ?? "Import"}
          </h1>
          {committed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="-mr-2 shrink-0"
                  aria-label="Library options"
                >
                  <IconDots size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={() => setConfirmRemove(true)}
                >
                  <IconTrash size={14} className="mr-2" />
                  Remove from the library
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {!committed && data?.status !== "discarded" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="-mr-2 shrink-0"
                  aria-label="Import options"
                >
                  <IconDots size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={() => setConfirmDiscard(true)}
                >
                  <IconTrash size={14} className="mr-2" />
                  Set this import aside
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          {committed
            ? "These objectives are in the school's library. Curriculum drafting uses them ahead of the samples that come with the app."
            : "Read this back before keeping it — an extraction from a scan is never certain. Nothing reaches the library until it is kept."}
          {data?.source ? ` Read from ${data.source}.` : ""}
        </p>
      </div>

      {summary?.problems?.length ? (
        <div className="space-y-1 rounded-lg border border-destructive/40 bg-destructive/5 p-4">
          <p className="text-sm font-medium">Needs fixing before keeping</p>
          {summary.problems.map((p: string, i: number) => (
            <p key={i} className="text-xs text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      ) : null}

      {summary?.unread?.length ? (
        <div className="space-y-1 rounded-lg border p-4">
          <p className="text-sm font-medium">Could not be read</p>
          {summary.unread.map((u: string, i: number) => (
            <p key={i} className="text-xs text-muted-foreground">
              {u}
            </p>
          ))}
          <p className="pt-1 text-xs text-muted-foreground">
            These are left out rather than guessed at. Send clearer copies and
            the agent can add them.
          </p>
        </div>
      ) : null}

      <div className="space-y-4">
        {(state.subjects ?? []).length === 0 ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <IconBook
              size={28}
              className="mx-auto mb-3 text-muted-foreground"
            />
            <p className="text-sm font-medium">Nothing read yet</p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
              Send the agent the syllabus — a file, or photographs of the pages
              — and it appears here as it is read.
            </p>
          </div>
        ) : (
          (state.subjects ?? []).map((subject: any, si: number) => (
            <div key={si} className="space-y-4 rounded-lg border p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold">{subject.subject}</h2>
                <p className="text-xs text-muted-foreground">
                  {subject.gradeRange ? `${subject.gradeRange} · ` : ""}
                  {(subject.strands ?? []).reduce(
                    (n: number, s: any) => n + (s.objectives?.length ?? 0),
                    0,
                  )}{" "}
                  objectives
                </p>
              </div>
              {(subject.strands ?? []).map((strand: any, sti: number) => (
                <div key={sti} className="space-y-2">
                  {strand.strand ? (
                    <p className="text-xs font-medium text-muted-foreground">
                      {strand.strand}
                      {strand.subStrand ? ` · ${strand.subStrand}` : ""}
                    </p>
                  ) : null}
                  <div className="space-y-1.5 border-l-2 border-muted pl-4">
                    {(strand.objectives ?? []).map((o: any, oi: number) => (
                      <div key={oi} className="space-y-0.5">
                        <p className="text-sm">
                          {o.description || (
                            <span className="text-destructive">
                              No wording read
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {o.code ? (
                            <span>{o.code}</span>
                          ) : (
                            <span className="italic">
                              no code in the syllabus — one will be generated
                            </span>
                          )}
                          {o.source ? ` · ${o.source}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {!committed && data?.status !== "discarded" && summary ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {summary.totalObjectives} objective
              {summary.totalObjectives === 1 ? "" : "s"} ready to keep
            </p>
            {summary.observations?.length ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {summary.observations.join(" ")}
              </p>
            ) : null}
          </div>
          <Button
            size="sm"
            disabled={busy || summary.problems?.length > 0}
            onClick={() => setConfirmCommit(true)}
          >
            Keep in our library
          </Button>
        </div>
      ) : null}

      {committed ? (
        <Badge variant="secondary" className="text-xs">
          {summary?.totalObjectives ?? 0} objectives in the school's library
        </Badge>
      ) : null}

      <AlertDialog open={confirmCommit} onOpenChange={setConfirmCommit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Keep this syllabus in the school's library?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-left">
                <p>
                  {summary?.totalObjectives} objective
                  {summary?.totalObjectives === 1 ? "" : "s"} across{" "}
                  {summary?.subjects?.length ?? 0} subject
                  {(summary?.subjects?.length ?? 0) === 1 ? "" : "s"} become
                  this school's own library, used ahead of the samples that come
                  with the app.
                </p>
                {summary?.unread?.length ? (
                  <p>
                    {summary.unread.length} part
                    {summary.unread.length === 1 ? "" : "s"} of the document
                    could not be read and stay out of it.
                  </p>
                ) : null}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Not yet</AlertDialogCancel>
            <AlertDialogAction onClick={commit} disabled={busy}>
              Keep it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmRemove} onOpenChange={setConfirmRemove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {state?.framework?.name ?? "this syllabus"} from the
              library?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-left">
                <p>
                  New planning will no longer find these objectives. Units
                  already written keep the standards codes they carry, so
                  nothing already taught changes.
                </p>
                <p>
                  This import opens again, so it can be corrected and kept once
                  more without reading the document a second time.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={removeFromLibrary} disabled={busy}>
              Remove it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set this import aside?</AlertDialogTitle>
            <AlertDialogDescription>
              Nothing reaches the library, and the import is kept in case it is
              wanted back.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep working on it</AlertDialogCancel>
            <AlertDialogAction onClick={discard} disabled={busy}>
              Set aside
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
