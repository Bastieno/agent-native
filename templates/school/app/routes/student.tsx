import { Outlet, useNavigate } from "react-router";
import { useEffect, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AgentSidebar,
  AgentToggleButton,
  agentNativePath,
} from "@agent-native/core/client";
import { setAgentWatching } from "@/lib/agent-availability";
import { getSchoolSuggestions } from "@/lib/school-suggestions";
import { SchoolTheme } from "@/components/SchoolTheme";
import { StudentNav } from "@/components/layout/StudentNav";
import { AssistantSetupCard } from "@/components/settings/AssistantKey";
import { useRole } from "@/hooks/use-role";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { DefaultSpinner } from "@agent-native/core/client";

export default function StudentLayout() {
  const { role, isLoading } = useRole();
  const navigate = useNavigate();
  const { command, clearCommand } = useNavigationState();

  useEffect(() => {
    if (!command.data) return;
    const nav = command.data as any;
    clearCommand();
    if (!nav.view) return;
    // A printable is a route of its own, outside the portal shell.
    if (nav.view === "document" && nav.documentId)
      navigate(`/print/${nav.documentId}`);
    else if (nav.view === "dashboard") navigate("/student");
    else if (nav.view === "classes") navigate("/student/classes");
    else if (nav.view === "class" && nav.classId)
      navigate(`/student/classes/${nav.classId}`);
    else if (nav.view === "assessment" && nav.assessmentId)
      navigate(`/student/assessments/${nav.assessmentId}`);
    // Progress is part of My Grades now.
    else if (nav.view === "grades" || nav.view === "progress")
      navigate("/student/grades");
    else if (nav.view === "week") navigate("/student/week");
    else if (nav.view === "help") navigate("/student/help");
    else if (nav.view === "revise" && nav.classId)
      navigate(`/student/revise/${nav.classId}`);
  }, [command.data, clearCommand, navigate]);

  // Whether the school gives this learner the assistant. Until the answer is
  // in, nothing agent-shaped mounts: a learner whose year group has it
  // switched off must not see it flash up, nor start its background polling.
  // A paper being sat or a used-up day still mounts it — the server answers
  // those calmly in the chat, and unmounting mid-paper would reload the page
  // around the learner's answers.
  const { data: access, isPending: accessPending } = useQuery<{
    available: boolean;
    blocked: "off" | "sitting" | "limit" | "school-limit" | null;
  }>({
    queryKey: ["my-agent-access"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-agent-access"),
      );
      if (!res.ok) throw new Error(`agent access unavailable (${res.status})`);
      return res.json();
    },
    enabled: role === "student",
    staleTime: 60_000,
  });
  const agentOn = !!access && access.blocked !== "off";
  useEffect(() => {
    setAgentWatching(agentOn);
    return () => setAgentWatching(true);
  }, [agentOn]);

  useEffect(() => {
    if (!isLoading && role !== "student") {
      navigate("/");
    }
  }, [isLoading, role, navigate]);

  if (isLoading || (role === "student" && accessPending)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DefaultSpinner />
      </div>
    );
  }
  if (!isLoading && role !== "student") {
    return null;
  }

  const page = (
    <>
      <SchoolTheme />
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        <StudentNav agent={agentOn} />
        {/* A measure, not the whole window.
            
            Every student page ran the full width of the screen, so a question
            on a wide monitor stretched to nearly two thousand pixels and the
            eye lost the start of the next line on the way back. Reading is
            the main thing a learner does here, and the comfortable measure
            for that is a column, not a wall. Set once in the layout so each
            page does not have to remember. */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto h-full w-full max-w-4xl">
            <Outlet />
          </div>
        </main>
        {/* Small screens only. Above xl the nav bar carries the toggle, the
            way the admin and teacher sidebars do. */}
        {agentOn ? (
          <AgentToggleButton className="fixed bottom-6 right-6 z-30 h-12 w-12 rounded-full border bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:text-primary-foreground xl:hidden" />
        ) : null}
      </div>
    </>
  );

  if (!agentOn) return page;
  return <StudentAgent>{page}</StudentAgent>;
}

function StudentAgent({ children }: { children: ReactNode }) {
  return (
    <AgentSidebar
      setupCard={<AssistantSetupCard />}
      emptyStateText="Ask me for help with your assignments!"
      dynamicSuggestions={{ getSuggestions: getSchoolSuggestions }}
      // The admin sets each role's model (Settings → Assistant) and the server
      // enforces it, so a picker here would offer a choice it cannot honour.
      // Someone who needs a stronger model asks the admin.
      showModelSelector={false}
      // A learner's panel is the chat alone. Workspace files would be read
      // into their own assistant's instructions, and settings hold the
      // school's engine and keys; the server refuses both as well
      // (server/middleware/learner-limits.ts).
      showWorkspace={false}
      showSettings={false}
      // Side by side only on a large desktop. On a tablet the panel would
      // take half the screen before the student has asked anything, leaving
      // too little room to read a question or write an answer.
      overlayBreakpointPx={1279}
      defaultOpen={
        typeof window !== "undefined" ? window.innerWidth >= 1280 : false
      }
    >
      {children}
    </AgentSidebar>
  );
}
