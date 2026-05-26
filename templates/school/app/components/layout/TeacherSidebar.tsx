import { NavLink } from "react-router";
import {
  IconLayoutDashboard,
  IconSchool,
  IconChartBar,
  IconUsers,
  IconLogout,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AgentToggleButton, agentNativePath } from "@agent-native/core/client";

const navItems = [
  { href: "/teacher", label: "Dashboard", icon: IconLayoutDashboard, end: true },
  { href: "/teacher/classes", label: "My Classes", icon: IconSchool },
  { href: "/teacher/students", label: "Students", icon: IconUsers },
  { href: "/teacher/analytics", label: "Analytics", icon: IconChartBar },
];

export function TeacherSidebar() {
  return (
    <aside className="flex h-full w-56 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4 gap-2">
        <span className="flex-1 text-sm font-semibold text-sidebar-foreground">Teacher Portal</span>
        <AgentToggleButton />
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, end }) => (
          <NavLink
            key={href}
            to={href}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60",
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t p-2">
        <button
          type="button"
          onClick={async () => {
            await fetch(agentNativePath("/_agent-native/auth/logout"), { method: "POST" });
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60"
        >
          <IconLogout size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
