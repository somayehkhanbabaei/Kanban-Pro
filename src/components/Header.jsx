import { Menu } from "lucide-react";


export default function Header({onMenuClick}) {
    return(
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
          <a href="#" className="hover:text-white">Dashboard</a>
          <a href="#" className="hover:text-white">Projects</a>
          <a href="#" className="hover:text-white">Tasks</a>
          <a href="#" className="hover:text-white">Settings</a>
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

          {/* User avatar placeholder */}
          <div className="h-9 w-9 rounded-full bg-white/30" title="User" />
        </div>
      </div>
    </header>
    )
}