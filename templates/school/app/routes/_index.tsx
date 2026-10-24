import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRole } from "@/hooks/use-role";
import { DefaultSpinner } from "@agent-native/core/client";

export default function Index() {
  const navigate = useNavigate();
  const { role, isLoading, isAuthenticated, access } = useRole();

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
    } else if (access === "setup") {
      // Owner or admin of a school nobody has set up yet
      navigate("/admin");
    } else {
      // Not part of a school, or not given a role in it yet
      navigate("/pending-activation");
    }
  }, [role, isLoading, isAuthenticated, access, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <DefaultSpinner />
    </div>
  );
}
