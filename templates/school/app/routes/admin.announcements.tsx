import { httpError } from "@/lib/http-error";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { SearchableMultiSelect } from "@/components/SearchableSelect";
import { SearchInput } from "@/components/SearchInput";
import { Markdown } from "@/components/Markdown";
import { ListState } from "@/components/ListState";
import { Pagination, useServerPagination } from "@/components/Pagination";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useUrlTab } from "@/hooks/use-url-tab";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IconBell, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useSchoolDates } from "@/hooks/use-school-dates";

async function callAction(name: string, params: Record<string, unknown>) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? "Request failed");
  }
  return res.json();
}

interface Announcement {
  id: string;
  ids: string[];
  groupId: string | null;
  scope: "school" | "class";
  title: string;
  content: string;
  createdAt: string;
  edited: boolean;
  authorName: string | null;
  classes: Array<{ id: string; name: string }>;
}

const keyOf = (a: Announcement) => a.groupId ?? a.id;

/** The classes an announcement is for, as one short phrase. */
function audienceOf(a: Announcement): string {
  if (a.scope !== "class") return "Everyone";
  const classes = a.classes;
  if (classes.length === 0) return "A class";
  if (classes.length <= 2) return classes.map((c) => c.name).join(" and ");
  return `${classes[0].name}, ${classes[1].name} and ${classes.length - 2} more`;
}

/**
 * The words of an announcement for a card: what it says, without the marks of
 * how it is set out. A table is left for the full view.
 */
function preview(markdown: string): string {
  const beforeTable = markdown.split(/\n\s*\|/)[0].split(/\s\|\s/)[0];
  const text = beforeTable
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~$]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return beforeTable.length < markdown.length ? `${text} …` : text;
}

const SHOW = ["all", "school", "class"] as const;
const SHOW_LABEL = {
  all: "All announcements",
  school: "Whole school",
  class: "Classes",
} as const;

export default function AdminAnnouncements() {
  const { formatDate } = useSchoolDates();
  const { sync } = useNavigationState();
  const qc = useQueryClient();

  // Search and the audience filter live in the address, so opening an
  // announcement and coming back keeps them; a new one starts at page one.
  const [q, setQ] = useUrlTab<string>("", { key: "q", clear: ["page"] });
  const [show, setShow] = useUrlTab<(typeof SHOW)[number]>("all", {
    key: "show",
    allowed: SHOW,
    clear: ["page"],
  });
  // The box answers at once; the list asks the server once typing pauses.
  const [typed, setTyped] = useState(q);
  useEffect(() => {
    if (typed === q) return;
    const t = window.setTimeout(() => setQ(typed), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed]);

  // One form for writing and for editing. `editing` is the card being
  // changed, or null when writing a new one.
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scope, setScope] = useState<"school" | "class">("school");
  const [classIds, setClassIds] = useState<string[]>([]);
  const [notifyAgain, setNotifyAgain] = useState(false);
  const [saving, setSaving] = useState(false);

  const [openKey, setOpenKey] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "announcements" } as any);
  }, [sync]);

  // Paged by the server: it knows the real total and sends one page. The
  // page is what the address says; the total is only shown, never used to
  // decide the page, so two answers that disagree cannot make it flip.
  const lastGood = useRef<{ items: Announcement[]; total: number } | null>(
    null,
  );
  const pager = useServerPagination(0, 10);
  const { page, pageSize } = pager;

  const { data, isLoading, isError, isPlaceholderData, refetch } = useQuery<{
    items: Announcement[];
    total: number;
  }>({
    queryKey: ["admin-announcements", { q, show, page, pageSize }],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/_agent-native/actions/list-announcements`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            search: q || undefined,
            scope: show,
            limit: pageSize,
            offset: (page - 1) * pageSize,
          }),
        },
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
    // The old page stays until the next arrives, so searching or paging never
    // flashes an empty list.
    placeholderData: keepPreviousData,
  });
  if (data && !isPlaceholderData) lastGood.current = data;
  // A failed load is not an empty list: nothing is counted or listed from it.
  const failed = isError && !data;
  const items = data?.items ?? [];
  const knownTotal = data?.total ?? lastGood.current?.total ?? 0;
  // A page past the end (the list shrank) goes back to the last one, once the
  // server has confirmed the total for the page that was asked.
  useEffect(() => {
    if (data && !isPlaceholderData && data.total > 0) {
      const last = Math.max(1, Math.ceil(data.total / pageSize));
      if (page > last) pager.setPage(last);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPlaceholderData, page, pageSize]);

  const selected = items.find((a) => keyOf(a) === openKey) ?? null;

  const { data: classes = [], isLoading: classesLoading } = useQuery<any[]>({
    queryKey: ["admin-classes"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-classes"),
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
  });

  function openNew() {
    setEditing(null);
    setTitle("");
    setContent("");
    setScope("school");
    setClassIds([]);
    setNotifyAgain(false);
    setFormOpen(true);
  }

  function openEdit(a: Announcement) {
    setEditing(a);
    setTitle(a.title);
    setContent(a.content);
    setScope(a.scope);
    setClassIds(a.classes.map((c) => c.id));
    setNotifyAgain(false);
    setFormOpen(true);
  }

  async function handleSave() {
    if (!title || !content) return;
    if (scope === "class" && classIds.length === 0) return;
    setSaving(true);
    try {
      if (editing) {
        await callAction("update-announcement", {
          id: editing.id,
          title,
          content,
          classIds: scope === "class" ? classIds : undefined,
          notifyAgain,
        });
        toast.success("Announcement updated");
        // Its key can change when a single class becomes several.
        setOpenKey(null);
      } else {
        await callAction("create-announcement", {
          title,
          content,
          scope,
          classIds: scope === "class" ? classIds : undefined,
        });
        toast.success("Announcement posted");
      }
      qc.invalidateQueries({ queryKey: ["admin-announcements"] });
      setFormOpen(false);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to save the announcement");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await callAction("delete-announcement", { id: deleteTarget.id });
      qc.invalidateQueries({ queryKey: ["admin-announcements"] });
      toast.success("Announcement deleted");
      setDeleteTarget(null);
      setOpenKey(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete announcement");
    } finally {
      setDeleting(false);
    }
  }

  const filtering = !!q || show !== "all";

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Announcements</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {failed && !lastGood.current
              ? "Could not load"
              : `${knownTotal} ${filtering ? "found" : "total"}`}
          </p>
        </div>
        <Button size="sm" onClick={openNew}>
          <IconPlus size={15} className="mr-1.5" /> New Announcement
        </Button>
      </div>

      <div className="flex gap-2">
        <SearchInput
          className="flex-1"
          placeholder="Search announcements…"
          value={typed}
          onChange={setTyped}
        />
        <Select value={show} onValueChange={setShow}>
          <SelectTrigger className="h-9 w-44 text-sm" aria-label="Audience">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SHOW.map((s) => (
              <SelectItem key={s} value={s}>
                {SHOW_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <ListState loading title="Announcements" />
      ) : failed ? (
        // Saying "nothing" when the list could not be fetched is a lie that
        // looks like lost data. Say what happened, and offer another try.
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm font-medium">Could not load announcements</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Nothing has been lost. Check your connection and try again.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBell size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">
            {filtering ? "No announcements match" : "No announcements yet"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filtering
              ? "Try different words, or another audience."
              : "Post an announcement to notify staff and students."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <button
              key={keyOf(a)}
              type="button"
              onClick={() => setOpenKey(keyOf(a))}
              className="block w-full rounded-lg border p-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {preview(a.content)}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {a.scope === "class"
                    ? a.classes.length > 1
                      ? `${a.classes.length} classes`
                      : "Class"
                    : "School-wide"}
                </Badge>
              </div>
              {/* Who posted it, who it is for, and when: the three things a
                  reader asks before the text. */}
              <p className="mt-1.5 text-xs text-muted-foreground">
                {[
                  a.authorName ? `Posted by ${a.authorName}` : null,
                  audienceOf(a),
                  a.createdAt
                    ? formatDate(a.createdAt, { dateStyle: "medium" })
                    : null,
                  a.edited ? "Edited" : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </button>
          ))}
        </div>
      )}
      <Pagination
        {...pager}
        total={knownTotal}
        pageCount={Math.max(1, Math.ceil(knownTotal / pageSize))}
        noun="announcements"
      />

      {/* The whole announcement: the text as written, with its tables. */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setOpenKey(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {selected ? (
            <>
              <SheetHeader className="pr-6 text-left">
                <SheetTitle>{selected.title}</SheetTitle>
                <SheetDescription>
                  {[
                    selected.authorName
                      ? `Posted by ${selected.authorName}`
                      : null,
                    audienceOf(selected),
                    formatDate(selected.createdAt, { dateStyle: "medium" }),
                    selected.edited ? "Edited" : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </SheetDescription>
              </SheetHeader>
              {selected.scope === "class" && selected.classes.length > 2 ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  {selected.classes.map((c) => c.name).join(", ")}
                </p>
              ) : null}
              <div className="mt-5 overflow-x-auto">
                <Markdown>{selected.content}</Markdown>
              </div>
              <div className="mt-6 flex gap-2 border-t pt-4">
                <Button size="sm" onClick={() => openEdit(selected)}>
                  <IconPencil size={14} className="mr-1.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteTarget(selected)}
                >
                  <IconTrash size={14} className="mr-1.5" /> Delete
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      {/* Write or edit */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Announcement" : "New Announcement"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Changes show for everyone it was sent to. Nobody is told again unless you choose to."
                : "Post an announcement to staff and students."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                placeholder="e.g. End of Term Reminder"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Content</Label>
              <Textarea
                placeholder="Announcement details…"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            {/* Who it goes to is chosen once; changing it later would mean
                telling a different set of people, so only the classes of a
                class announcement can be changed. */}
            {!editing ? (
              <div className="space-y-1.5">
                <Label>Audience</Label>
                <Select
                  value={scope}
                  onValueChange={(v) => setScope(v as "school" | "class")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School-wide</SelectItem>
                    <SelectItem value="class">Specific classes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : null}
            {scope === "class" && (
              <div className="space-y-1.5">
                <Label>Classes</Label>
                <SearchableMultiSelect
                  values={classIds}
                  onValuesChange={setClassIds}
                  aria-label="Classes"
                  noun="classes selected"
                  disabled={classesLoading && classes.length === 0}
                  placeholder={
                    classesLoading && classes.length === 0
                      ? "Loading classes…"
                      : "Select classes"
                  }
                  searchPlaceholder="Search classes…"
                  options={classes.map((c: any) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                />
              </div>
            )}
            {editing && scope === "class" ? (
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={notifyAgain}
                  onCheckedChange={(v) => setNotifyAgain(v === true)}
                />
                Tell them again
              </label>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                saving ||
                !title ||
                !content ||
                (scope === "class" && classIds.length === 0)
              }
            >
              {saving
                ? editing
                  ? "Saving…"
                  : "Posting…"
                : editing
                  ? "Save"
                  : "Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete announcement?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" will be permanently removed
              {deleteTarget && deleteTarget.classes.length > 1
                ? ` from all ${deleteTarget.classes.length} classes`
                : ""}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
