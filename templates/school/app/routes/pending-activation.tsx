import { IconSchool } from "@tabler/icons-react";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PendingActivation() {
  const { role, isLoading } = useRole();
  const navigate = useNavigate();

  // Redirect automatically once the admin has set up an invite and the user
  // signs back in — the session endpoint auto-activates on the next poll.
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
        <h1 className="text-xl font-semibold">Waiting for access</h1>
        <p className="text-sm text-muted-foreground">
          Your account has been created. Once your school admin sends you an
          invite, you will be redirected to the right portal automatically — no
          action needed on your end.
        </p>
        <p className="text-xs text-muted-foreground">
          If you believe this is a mistake, contact your school administrator.
        </p>
      </div>
    </div>
  );
}
