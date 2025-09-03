// src/components/Sidebar.jsx
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Folder,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: FolderKanban, label: "Projects", to: "/projects" },
  { icon: CheckSquare, label: "Tasks", to: "/tasks" },
  { icon: Calendar, label: "Calendar", to: "/calendar" },
  { icon: Folder, label: "Files", to: "/files" },
  { icon: User, label: "Profile", to: "/profile" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed z-50 left-0 top-14 bottom-0 w-72
          backdrop-blur-xl bg-white/10 border-r border-white/15
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="h-14 flex items-center px-4 border-b border-white/10">
          <span className="text-white font-semibold">Navigation</span>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                         text-white/90 hover:bg-white/10 transition"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
