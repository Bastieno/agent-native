import { NavLink } from "react-router";
import {
  IconLayoutDashboard,
  IconBook,
  IconUsers,
  IconSchool,
  IconChartBar,
  IconSettings,
  IconPuzzle,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview", icon: IconLayoutDashboard, end: true },
  { href: "/admin/curriculum", label: "Curriculum", icon: IconBook },
  { href: "/admin/staff", label: "Staff", icon: IconUsers },
  { href: "/admin/students", label: "Students", icon: IconUsers },
  { href: "/admin/classes", label: "Classes", icon: IconSchool },
  { href: "/admin/analytics", label: "Analytics", icon: IconChartBar },
  { href: "/admin/extensions", label: "Extensions", icon: IconPuzzle },
  { href: "/admin/settings", label: "Settings", icon: IconSettings },
];

export function AdminSidebar() {
  return (
    <aside className="flex h-full w-56 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-sm font-semibold text-sidebar-foreground">Admin Portal</span>
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
