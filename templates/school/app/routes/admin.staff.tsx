import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath, sendToAgentChat } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  IconUsers,
  IconMail,
  IconUser,
  IconDotsVertical,
  IconUserPlus,
} from "@tabler/icons-react";

const roleLabel: Record<string, string> = {
  school_admin: "Admin",
  teacher: "Teacher",
  subject_coordinator: "Coordinator",
};

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

export default function AdminStaff() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();

  // Invite dialog
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("teacher");
  const [inviteLoading, setInviteLoading] = useState(false);

  // Change role dialog
  const [changeRoleTarget, setChangeRoleTarget] = useState<any>(null);
  const [newRole, setNewRole] = useState("");
  const [changeRoleLoading, setChangeRoleLoading] = useState(false);

  // Confirm dialogs
  const [cancelInviteTarget, setCancelInviteTarget] = useState<any>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "staff" });
  }, [sync]);

  const { data } = useQuery<{ active: any[]; pending: any[] }>({
    queryKey: ["admin-staff"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/staff"));
      if (!res.ok) return { active: [], pending: [] };
      return res.json();
    },
  });

  const active = data?.active ?? [];
  const pending = data?.pending ?? [];
  const isEmpty = active.length === 0 && pending.length === 0;

  async function handleInvite() {
    if (!inviteName || !inviteEmail) return;
    setInviteLoading(true);
    try {
      await callAction("invite-staff", {
        name: inviteName,
        email: inviteEmail,
        schoolRole: inviteRole,
      });
      qc.invalidateQueries({ queryKey: ["admin-staff"] });
      toast.success(`Invite sent to ${inviteEmail}`);
      setInviteOpen(false);
      setInviteName("");
      setInviteEmail("");
      setInviteRole("teacher");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to send invite");
    } finally {
      setInviteLoading(false);
    }
  }

  async function handleChangeRole() {
    if (!changeRoleTarget || !newRole) return;
    setChangeRoleLoading(true);
    try {
      await callAction("update-staff-role", {
        userId: changeRoleTarget.userId,
        schoolRole: newRole,
      });
      qc.invalidateQueries({ queryKey: ["admin-staff"] });
      toast.success("Role updated");
      setChangeRoleTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update role");
    } finally {
      setChangeRoleLoading(false);
    }
  }

  async function handleCancelInvite() {
    if (!cancelInviteTarget) return;
    setConfirmLoading(true);
    try {
      await callAction("cancel-staff-invite", {
        email: cancelInviteTarget.email,
      });
      qc.invalidateQueries({ queryKey: ["admin-staff"] });
      toast.success("Invitation cancelled");
      setCancelInviteTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to cancel invite");
    } finally {
      setConfirmLoading(false);
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Staff</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {active.length} active
            {pending.length > 0 ? `, ${pending.length} pending` : ""}
          </p>
        </div>
        <Button size="sm" onClick={() => setInviteOpen(true)}>
          <IconUserPlus size={15} className="mr-1.5" /> Invite Staff
        </Button>
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconUsers size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No staff members yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Click &ldquo;Invite Staff&rdquo; to add your first team member.
          </p>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Active
              </h2>
              <div className="rounded-lg border divide-y">
                {active.map((member: any) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                      <IconUser size={15} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.name ?? member.email ?? member.userId}
                      </p>
                      {member.email && member.name && (
                        <p className="text-xs text-muted-foreground truncate">
                          {member.email}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {roleLabel[member.schoolRole] ?? member.schoolRole}
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
                            setChangeRoleTarget(member);
                            setNewRole(member.schoolRole);
                          }}
                        >
                          Change role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            sendToAgentChat({
                              message: `Suspend ${member.name ?? member.email}`,
                              context: `userId: ${member.userId}`,
                              submit: true,
                              openSidebar: true,
                            })
                          }
                        >
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            sendToAgentChat({
                              message: `Remove ${member.name ?? member.email} from the school`,
                              context: `userId: ${member.userId}`,
                              submit: true,
                              openSidebar: true,
                            })
                          }
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pending.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Pending invitations
              </h2>
              <div className="rounded-lg border divide-y">
                {pending.map((invite: any) => (
                  <div
                    key={invite.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                      <IconMail size={15} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {invite.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {invite.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {roleLabel[invite.schoolRole] ?? invite.schoolRole}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Invite sent
                      </Badge>
                    </div>
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
                          className="text-destructive"
                          onClick={() => setCancelInviteTarget(invite)}
                        >
                          Cancel invite
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Invite Staff Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Staff Member</DialogTitle>
            <DialogDescription>
              Send an email invitation to a new staff member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                placeholder="Ms. Jane Smith"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="jane@school.edu"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="subject_coordinator">
                    Subject Coordinator
                  </SelectItem>
                  <SelectItem value="school_admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Change Role Dialog */}
      <Dialog
        open={!!changeRoleTarget}
        onOpenChange={(o) => !o && setChangeRoleTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>
              Update this staff member's role in the school.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-1.5">
            <Label>
              New role for {changeRoleTarget?.name ?? changeRoleTarget?.email}
            </Label>
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="subject_coordinator">
                  Subject Coordinator
                </SelectItem>
                <SelectItem value="school_admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangeRoleTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleChangeRole} disabled={changeRoleLoading}>
              {changeRoleLoading ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Invite AlertDialog */}
      <AlertDialog
        open={!!cancelInviteTarget}
        onOpenChange={(o) => !o && setCancelInviteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel invite for {cancelInviteTarget?.email}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The invitation link will no longer work. You can send a new invite
              later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep invite</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelInvite}
              disabled={confirmLoading}
            >
              {confirmLoading ? "Cancelling…" : "Cancel invite"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
