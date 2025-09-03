import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ onMenuClick }) {
  const { user } = useAuth(); // Get user info from memory box

  // Get only the first name (like "Amin" from "Amin Kh")
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    // Glass top bar
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/15">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center">
        {/* Left: brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-white/20" />
          <span className="text-white font-semibold">Kanban Pro</span>
        </div>
        {/* Center: nav links (hidden on mobile) */}
        <nav className="ml-6 hidden md:flex items-center gap-4 text-white/90 text-sm">
          <Link to="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link to="/dashboard" className="hover:text-white">
            Projects
          </Link>
          <Link to="/tasks" className="hover:text-white">
            Tasks
          </Link>
          <Link to="/settings" className="hover:text-white">
            Settings
          </Link>
        </nav>
        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/15"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* User info - show first name and avatar */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* User first name only (hidden on mobile) */}
              <span className="hidden sm:block text-white/90 text-sm font-medium">
                {firstName}
              </span>
              {/* User avatar */}
              <img
                src={user.avatar}
                alt={firstName}
                className="h-9 w-9 rounded-full border-2 border-white/20 object-cover"
                title={user.name} // Full name on hover
              />
            </div>
          ) : (
            /* Fallback if no user logged in */
            <div className="h-9 w-9 rounded-full bg-white/30" title="User" />
          )}
        </div>
      </div>
    </header>
  );
}
