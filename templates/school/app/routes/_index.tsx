import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRole } from "@/hooks/use-role";
import { DefaultSpinner } from "@agent-native/core/client";

export default function Index() {
  const navigate = useNavigate();
  const { role, isLoading, isAuthenticated, accessDenied } = useRole();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (role === "school_admin") {
      navigate("/admin");
    } else if (role === "teacher" || role === "subject_coordinator") {
      navigate("/teacher");
    } else if (role === "student") {
      navigate("/student");
    } else if (accessDenied) {
      // School is already set up — this user has no invite yet
      navigate("/pending-activation");
    } else {
      // No role and school not yet initialized — first admin, go to setup
      navigate("/admin");
    }
  }, [role, isLoading, isAuthenticated, accessDenied, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <DefaultSpinner />
    </div>
  );
}
