import { IconSchool, IconMail } from "@tabler/icons-react";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PendingActivation() {
  const { role, isLoading } = useRole();
  const navigate = useNavigate();

  // If the role was just activated (e.g. admin ran finalize-staff-invite),
  // redirect to the right portal automatically.
  useEffect(() => {
    if (isLoading) return;
    if (role === "school_admin") navigate("/admin");
    else if (role === "teacher" || role === "subject_coordinator")
      navigate("/teacher");
    else if (role === "student") navigate("/student");
  }, [role, isLoading, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="max-w-sm text-center space-y-4 px-6">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <IconSchool size={28} className="text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-xl font-semibold">Account pending activation</h1>
        <p className="text-sm text-muted-foreground">
          Your account has been created. The school admin needs to activate your
          account before you can access the portal.
        </p>
        <div className="rounded-lg border border-dashed p-4 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <IconMail size={14} />
            <span>
              Ask your school admin to run{" "}
              <span className="font-mono text-foreground">
                finalize-staff-invite
              </span>{" "}
              with your email address.
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          This page will redirect you automatically once activated.
        </p>
      </div>
    </div>
  );
}
