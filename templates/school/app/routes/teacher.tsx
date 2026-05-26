import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AgentSidebar } from "@agent-native/core/client";
import { TeacherSidebar } from "@/components/layout/TeacherSidebar";
import { useRole } from "@/hooks/use-role";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { DefaultSpinner } from "@agent-native/core/client";

export default function TeacherLayout() {
  const { role, isLoading } = useRole();
  const navigate = useNavigate();
  const { command, clearCommand } = useNavigationState();

  useEffect(() => {
    if (!command.data) return;
    const nav = command.data as any;
    clearCommand();
    if (!nav.view) return;
    if (nav.view === "dashboard") navigate("/teacher");
    else if (nav.view === "classes") navigate("/teacher/classes");
    else if (nav.view === "class" && nav.classId) navigate(`/teacher/classes/${nav.classId}`);
    else if (nav.view === "lesson" && nav.lessonId) navigate(`/teacher/lessons/${nav.lessonId}`);
    else if (nav.view === "assessment" && nav.assessmentId) navigate(`/teacher/assessments/${nav.assessmentId}`);
    else if (nav.view === "gradebook" && nav.classId) navigate(`/teacher/gradebook/${nav.classId}`);
    else if (nav.view === "students") navigate("/teacher/students");
    else if (nav.view === "analytics") navigate("/teacher/analytics");
  }, [command.data, clearCommand, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DefaultSpinner />
      </div>
    );
  }
  if (role !== "teacher" && role !== "subject_coordinator") {
    navigate("/");
    return null;
  }

  return (
    <AgentSidebar emptyStateText="How can I help you with your classes?">
      <div className="flex h-screen overflow-hidden bg-background">
        <TeacherSidebar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </AgentSidebar>
  );
}
