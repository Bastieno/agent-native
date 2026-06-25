import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IconSearch, IconUsers, IconDotsVertical, IconUserPlus, IconMailForward, IconX } from "@tabler/icons-react";

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

export default function AdminStudents() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  // Invite dialog
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  // Edit dialog
  const [editTarget, setEditTarget] = useState<any>(null);
  const [editGradeLevel, setEditGradeLevel] = useState("");
  const [editAdmission, setEditAdmission] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // Suspend dialog
  const [suspendTarget, setSuspendTarget] = useState<any>(null);
  const [suspendLoading, setSuspendLoading] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "students" });
  }, [sync]);

  const { data: students = [] } = useQuery<any[]>({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/students"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: pendingInvites = [] } = useQuery<any[]>({
    queryKey: ["admin-student-invites"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/students/invitations"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  async function handleCancelInvite(email: string) {
    try {
      await callAction("cancel-student-invite", { email });
      qc.invalidateQueries({ queryKey: ["admin-student-invites"] });
      toast.success(`Invite for ${email} cancelled`);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to cancel invite");
    }
  }

  const gradeLevels = useMemo(
    () => Array.from(new Set(students.map((s: any) => s.gradeLevelName).filter(Boolean))).sort(),
    [students],
  );

  const filtered = students.filter((s: any) => {
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber?.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "all" || s.gradeLevelName === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  async function handleInvite() {
    if (!inviteName || !inviteEmail) return;
    setInviteLoading(true);
    try {
      await callAction("invite-student", { name: inviteName, email: inviteEmail });
      qc.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success(`Invite sent to ${inviteEmail}`);
      setInviteOpen(false);
      setInviteName("");
      setInviteEmail("");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to send invite");
    } finally {
      setInviteLoading(false);
    }
  }

  function openEdit(student: any) {
    setEditTarget(student);
    setEditGradeLevel(student.gradeLevelName ?? "");
    setEditAdmission(student.admissionNumber ?? "");
  }

  async function handleEdit() {
    if (!editTarget) return;
    setEditLoading(true);
    try {
      await callAction("update-student", {
        id: editTarget.id,
        admissionNumber: editAdmission || undefined,
      });
      qc.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success("Student updated");
      setEditTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update student");
    } finally {
      setEditLoading(false);
    }
  }

  async function handleSuspend() {
    if (!suspendTarget) return;
    setSuspendLoading(true);
    try {
      await callAction("update-student", { id: suspendTarget.id, status: "inactive" });
      qc.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success("Student suspended");
      setSuspendTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to suspend student");
    } finally {
      setSuspendLoading(false);
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Students</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {students.length} enrolled
          </p>
        </div>
        <Button size="sm" onClick={() => setInviteOpen(true)}>
          <IconUserPlus size={15} className="mr-1.5" /> Invite Student
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <IconSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search students…"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {gradeLevels.length > 0 && (
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="h-9 w-36 text-sm">
              <SelectValue placeholder="All grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All grades</SelectItem>
              {gradeLevels.map((g: any) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconUsers size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">
            {search || gradeFilter !== "all" ? "No students match" : "No students yet"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {search || gradeFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Click \"Invite Student\" to add your first student."}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border divide-y">
          {filtered.map((student: any) => (
            <div key={student.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {student.name ?? student.email ?? student.userId}
                </p>
                <p className="text-xs text-muted-foreground">
                  {student.email && student.name ? student.email : null}
                  {student.admissionNumber ? ` · ${student.admissionNumber}` : null}
                  {student.gradeLevelName ? ` · ${student.gradeLevelName}` : null}
                </p>
              </div>
              <Badge variant={student.status === "active" ? "default" : "secondary"}>
                {student.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <IconDotsVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEdit(student)}>Edit</DropdownMenuItem>
                  {student.status === "active" && (
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setSuspendTarget(student)}
                    >
                      Suspend
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <IconMailForward size={14} />
            Pending Invitations ({pendingInvites.length})
          </h2>
          <div className="rounded-lg border divide-y">
            {pendingInvites.map((inv: any) => (
              <div key={inv.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{inv.name}</p>
                  <p className="text-xs text-muted-foreground">{inv.email}</p>
                </div>
                <Badge variant="outline" className="text-xs">Pending</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => handleCancelInvite(inv.email)}
                >
                  <IconX size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Student Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                placeholder="John Doe"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              disabled={inviteLoading || !inviteName || !inviteEmail}
            >
              {inviteLoading ? "Sending…" : "Send Invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Admission Number</Label>
              <Input
                placeholder="e.g. JSS1/2024/001"
                value={editAdmission}
                onChange={(e) => setEditAdmission(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={editLoading}>
              {editLoading ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend AlertDialog */}
      <AlertDialog open={!!suspendTarget} onOpenChange={(o) => !o && setSuspendTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Suspend {suspendTarget?.name ?? suspendTarget?.email}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              They will no longer be able to access the student portal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSuspend} disabled={suspendLoading}>
              {suspendLoading ? "Suspending…" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
