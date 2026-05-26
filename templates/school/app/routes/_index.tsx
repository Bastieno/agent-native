import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRole } from "@/hooks/use-role";
import { DefaultSpinner } from "@agent-native/core/client";

export default function Index() {
  const navigate = useNavigate();
  const { role, isLoading, isAuthenticated } = useRole();

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
    } else {
      // Authenticated but no school profile yet — go to admin setup
      navigate("/admin");
    }
  }, [role, isLoading, isAuthenticated, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <DefaultSpinner />
    </div>
  );
}
