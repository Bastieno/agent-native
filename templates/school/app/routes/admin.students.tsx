import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ListState } from "@/components/ListState";
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
import {
  IconSearch,
  IconUsers,
  IconDotsVertical,
  IconUserPlus,
  IconMailForward,
} from "@tabler/icons-react";
import { useCustomFields } from "@/hooks/use-custom-fields";
import {
  CustomFieldInputs,
  fieldValuesOf,
} from "@/components/students/CustomFieldInputs";

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
  const { fields: studentFields } = useCustomFields("student");
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  // Invite dialog
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  // Asked at the one moment somebody has the answer in front of them. Left to
  // afterwards, a year group or a House is a thing to remember, and nobody
  // does.
  const [inviteGradeLevel, setInviteGradeLevel] = useState("");
  const [inviteFields, setInviteFields] = useState<Record<string, unknown>>({});

  // Edit dialog
  const [editTarget, setEditTarget] = useState<any>(null);
  const [editGradeLevel, setEditGradeLevel] = useState("");
  const [editAdmission, setEditAdmission] = useState("");
  // Whatever this school records about a student, as it stands on the record.
  const [editFields, setEditFields] = useState<Record<string, unknown>>({});
  const [editLoading, setEditLoading] = useState(false);

  // Cancelling an invitation is not reversible, so it is confirmed.
  const [cancelInviteTarget, setCancelInviteTarget] = useState<any>(null);

  // Rename dialog — a student's name comes from their invitation or from
  // their email address, and a report card is no place for "student1".
  const [renameTarget, setRenameTarget] = useState<any>(null);
  const [newName, setNewName] = useState("");
  const [renameLoading, setRenameLoading] = useState(false);

  // Suspend dialog
  const [suspendTarget, setSuspendTarget] = useState<any>(null);
  const [suspendLoading, setSuspendLoading] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "students" });
  }, [sync]);

  const { data: students = [], isLoading } = useQuery<any[]>({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-students"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  // What the school records but some records do not have. Shown here because
  // adding a field in month six leaves every earlier student blank, and
  // nothing else in the app would ever mention it.
  const { data: recordGaps } = useQuery<any>({
    queryKey: ["student-record-gaps"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/check-student-records"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const { data: pendingInvites = [] } = useQuery<any[]>({
    queryKey: ["admin-student-invites"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-student-invites"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  async function handleCancelInvite() {
    const target = cancelInviteTarget;
    if (!target) return;
    try {
      await callAction("cancel-student-invite", { email: target.email });
      qc.invalidateQueries({ queryKey: ["admin-student-invites"] });
      toast.success(`Invitation for ${target.name ?? target.email} cancelled`);
      setCancelInviteTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to cancel the invitation");
    }
  }

  // Said in the school's own words, and only when there is something to say.
  const gapSummary = useMemo(() => {
    if (!recordGaps) return null;
    const parts: string[] = [];
    if (recordGaps.withoutYearGroup?.length) {
      parts.push(`${recordGaps.withoutYearGroup.length} with no year group`);
    }
    for (const field of recordGaps.byField ?? []) {
      if (field.missingCount > 0) {
        parts.push(`${field.missingCount} with no ${field.label}`);
      }
    }
    return parts.length
      ? `${parts.join(", ")}. Edit a student to fill it in.`
      : null;
  }, [recordGaps]);

  const gradeLevels = useMemo(
    () =>
      Array.from(
        new Set(students.map((s: any) => s.gradeLevelName).filter(Boolean)),
      ).sort(),
    [students],
  );

  const filtered = students.filter((s: any) => {
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber?.toLowerCase().includes(search.toLowerCase());
    const matchesGrade =
      gradeFilter === "all" || s.gradeLevelName === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  async function handleInvite() {
    if (!inviteName || !inviteEmail) return;
    setInviteLoading(true);
    try {
      await callAction("invite-student", {
        name: inviteName,
        email: inviteEmail,
        gradeLevel: inviteGradeLevel || undefined,
        fields: Object.fromEntries(
          Object.entries(inviteFields).filter(([, v]) => v !== "" && v != null),
        ),
      });
      qc.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success(`Invite sent to ${inviteEmail}`);
      setInviteOpen(false);
      setInviteName("");
      setInviteEmail("");
      setInviteGradeLevel("");
      setInviteFields({});
    } catch (e: any) {
      toast.error(e.message ?? "Failed to send invite");
    } finally {
      setInviteLoading(false);
    }
  }

  async function handleRename() {
    if (!renameTarget || !newName.trim()) return;
    setRenameLoading(true);
    try {
      await callAction("update-person-name", {
        userId: renameTarget.userId,
        name: newName,
      });
      qc.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success("Name updated");
      setRenameTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update the name");
    } finally {
      setRenameLoading(false);
    }
  }

  function openEdit(student: any) {
    setEditTarget(student);
    setEditGradeLevel(student.gradeLevelName ?? "");
    setEditAdmission(student.admissionNumber ?? "");
    setEditFields(fieldValuesOf(student));
  }

  async function handleEdit() {
    if (!editTarget) return;
    setEditLoading(true);
    try {
      await callAction("update-student", {
        id: editTarget.id,
        admissionNumber: editAdmission || undefined,
        // Blanks are sent as empty strings rather than dropped, so clearing a
        // value is possible — the merge on the server keeps whatever it is
        // not told about, which would otherwise make a field one-way.
        customFields: studentFields.length ? editFields : undefined,
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
      await callAction("update-student", {
        id: suspendTarget.id,
        status: "inactive",
      });
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
            {/* "Enrolled" means enrolled in a class here, which is a different
                thing — these are the students on roll. */}
            {students.length} student{students.length === 1 ? "" : "s"}
            {pendingInvites.length > 0
              ? ` · ${pendingInvites.length} invited`
              : ""}
          </p>
        </div>
        <Button size="sm" onClick={() => setInviteOpen(true)}>
          <IconUserPlus size={15} className="mr-1.5" /> Invite Student
        </Button>
      </div>

      {/* One quiet line, not a banner: it is worth knowing and not worth
          interrupting anyone over. */}
      {gapSummary ? (
        <p className="text-xs text-muted-foreground">{gapSummary}</p>
      ) : null}

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

      {isLoading || filtered.length === 0 ? (
        <ListState
          loading={isLoading}
          icon={IconUsers}
          title={
            search || gradeFilter !== "all"
              ? "No students match"
              : pendingInvites.length > 0
                ? "Nobody has signed in yet"
                : "No students yet"
          }
          description={
            search || gradeFilter !== "all"
              ? "Try adjusting your search or filter."
              : pendingInvites.length > 0
                ? // Telling someone to invite a student under a list of three
                  // pending invitations reads as though nothing happened.
                  `${pendingInvites.length} invitation${
                    pendingInvites.length === 1 ? "" : "s"
                  } sent. Each student appears here once they sign in with the address they were invited at.`
                : "Use Invite Student to add your first student."
          }
        />
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
                  {student.admissionNumber
                    ? ` · ${student.admissionNumber}`
                    : null}
                  {student.gradeLevelName
                    ? ` · ${student.gradeLevelName}`
                    : null}
                </p>
              </div>
              <Badge
                variant={student.status === "active" ? "default" : "secondary"}
              >
                {student.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                  >
                    <IconDotsVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setRenameTarget(student);
                      setNewName(student.name ?? "");
                    }}
                  >
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEdit(student)}>
                    Edit
                  </DropdownMenuItem>
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
            Pending invitations ({pendingInvites.length})
          </h2>
          <div className="rounded-lg border divide-y">
            {pendingInvites.map((inv: any) => (
              <div key={inv.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{inv.name}</p>
                  <p className="text-xs text-muted-foreground">{inv.email}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Pending
                </Badge>
                {/* Cancelling cannot be undone — the invitation has to be
                    sent again — and a bare × beside a row is easy to catch
                    with a stylus. Behind a menu, and it asks first. */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      aria-label={`Options for ${inv.name ?? inv.email}`}
                    >
                      <IconDotsVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={() => setCancelInviteTarget(inv)}
                    >
                      Cancel invite
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            {gradeLevels.length > 0 ? (
              <div className="space-y-1.5">
                <Label>
                  Year group
                  <span className="ml-1 text-xs text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Select
                  value={inviteGradeLevel || "—"}
                  onValueChange={(v) => setInviteGradeLevel(v === "—" ? "" : v)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Not decided yet" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* A school may invite before placement is settled, so
                        this cannot be required. */}
                    <SelectItem value="—">Not decided yet</SelectItem>
                    {gradeLevels.map((g: any) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
            <CustomFieldInputs
              fields={studentFields}
              values={inviteFields}
              onChange={(name, value) =>
                setInviteFields((prev) => ({ ...prev, [name]: value }))
              }
            />
            {studentFields.length || gradeLevels.length ? (
              <p className="text-xs text-muted-foreground">
                Anything set here is written onto their record when they first
                sign in.
              </p>
            ) : null}
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
      <Dialog
        open={!!editTarget}
        onOpenChange={(o) => !o && setEditTarget(null)}
      >
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
            {/* The school's own fields, in their own words. Shown here rather
                than on the row: a student has one or two of these, and a list
                is for finding people, not for reading their details. */}
            <CustomFieldInputs
              fields={studentFields}
              values={editFields}
              onChange={(name, value) =>
                setEditFields((prev) => ({ ...prev, [name]: value }))
              }
            />
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
      <AlertDialog
        open={!!cancelInviteTarget}
        onOpenChange={(o) => !o && setCancelInviteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel the invitation for{" "}
              {cancelInviteTarget?.name ?? cancelInviteTarget?.email}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The link they were sent no longer makes them a student here, and
              the invitation cannot be restored — you would invite them again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelInvite}>
              Cancel invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <Dialog
        open={!!renameTarget}
        onOpenChange={(o) => !o && setRenameTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5 py-2">
            <Label>
              Name for {renameTarget?.email ?? "this student"} — shown on class
              lists, the gradebook and report cards. Report cards already issued
              keep the name they were issued with.
            </Label>
            <Input
              value={newName}
              autoFocus
              placeholder="Ada Obi"
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={renameLoading || !newName.trim()}
            >
              {renameLoading ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!suspendTarget}
        onOpenChange={(o) => !o && setSuspendTarget(null)}
      >
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
            <AlertDialogAction
              onClick={handleSuspend}
              disabled={suspendLoading}
            >
              {suspendLoading ? "Suspending…" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
