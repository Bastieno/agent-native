import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IconBell, IconPlus, IconTrash } from "@tabler/icons-react";

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

export default function AdminAnnouncements() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();

  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scope, setScope] = useState<"school" | "class">("school");
  const [classId, setClassId] = useState("");
  const [creating, setCreating] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "announcements" } as any);
  }, [sync]);

  const { data: announcements = [] } = useQuery<any[]>({
    queryKey: ["admin-announcements"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/_agent-native/actions/list-announcements`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        },
      );
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : (data.announcements ?? []);
    },
  });

  const { data: classes = [] } = useQuery<any[]>({
    queryKey: ["admin-classes"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-classes"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  async function handleCreate() {
    if (!title || !content) return;
    setCreating(true);
    try {
      await callAction("create-announcement", {
        title,
        content,
        scope,
        classId: scope === "class" ? classId || undefined : undefined,
      });
      qc.invalidateQueries({ queryKey: ["admin-announcements"] });
      toast.success("Announcement posted");
      setCreateOpen(false);
      setTitle("");
      setContent("");
      setScope("school");
      setClassId("");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to post announcement");
    } finally {
      setCreating(false);
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
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete announcement");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Announcements</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {announcements.length} total
          </p>
        </div>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <IconPlus size={15} className="mr-1.5" /> New Announcement
        </Button>
      </div>

      {announcements.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBell size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No announcements yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Post an announcement to notify staff and students.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a: any) => (
            <div key={a.id} className="rounded-lg border p-4 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {a.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs capitalize">
                    {a.scope === "class" ? `Class` : "School-wide"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteTarget(a)}
                  >
                    <IconTrash size={14} />
                  </Button>
                </div>
              </div>
              {a.createdAt && (
                <p className="text-xs text-muted-foreground">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Announcement Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
            <DialogDescription>
              Post an announcement to staff and students.
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
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
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
                  <SelectItem value="class">Specific class</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {scope === "class" && (
              <div className="space-y-1.5">
                <Label>Class</Label>
                <Select value={classId} onValueChange={setClassId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={creating || !title || !content}
            >
              {creating ? "Posting…" : "Post"}
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
              "{deleteTarget?.title}" will be permanently removed.
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
