import { NavLink } from "react-router";
import {
  IconLayoutDashboard,
  IconSchool,
  IconChartBar,
  IconUsers,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/teacher", label: "Dashboard", icon: IconLayoutDashboard, end: true },
  { href: "/teacher/classes", label: "My Classes", icon: IconSchool },
  { href: "/teacher/students", label: "Students", icon: IconUsers },
  { href: "/teacher/analytics", label: "Analytics", icon: IconChartBar },
];

export function TeacherSidebar() {
  return (
    <aside className="flex h-full w-56 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-sm font-semibold text-sidebar-foreground">Teacher Portal</span>
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
    </aside>
  );
}
