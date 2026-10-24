import { IconLogout, IconSchool } from "@tabler/icons-react";
import { agentNativePath } from "@agent-native/core/client";
import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PendingActivation() {
  // Keeps checking, so the page moves on by itself once an invitation lands.
  const { role, access, schoolName, isLoading } = useRole({ poll: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (role === "school_admin") navigate("/admin");
    else if (role === "teacher" || role === "subject_coordinator")
      navigate("/teacher");
    else if (role === "student") navigate("/student");
    else if (access === "setup") navigate("/admin");
  }, [role, access, isLoading, navigate]);

  const inSchool = access === "waiting";

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="max-w-sm text-center space-y-4 px-6">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <IconSchool size={28} className="text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-xl font-semibold">
          {inSchool
            ? "Waiting for access"
            : "This account isn't part of a school"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {inSchool
            ? `You're signed in to ${schoolName ?? "your school"}. Once your school admin gives you access, this page will take you to the right place by itself.`
            : "Sign in with the address your school invited, or ask your school office."}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await fetch(agentNativePath("/_agent-native/auth/logout"), {
              method: "POST",
            });
            window.location.href = "/login";
          }}
        >
          <IconLogout size={16} />
          Sign out
        </Button>
      </div>
    </div>
  );
}
