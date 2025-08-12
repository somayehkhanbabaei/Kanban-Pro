import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  // Mobile sidebar state
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      {/* Layout: sidebar + main */}
      <div className="pt-14 md:flex">
        {/* Sidebar (mobile overlay uses 'open') */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        {/* Main content: add left padding on desktop to avoid overlap */}
        <main className="w-full px-4 md:pl-6 md:ml-72 py-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-white text-2xl font-semibold mb-4">Dashboard</h1>
            <p className="text-white/80">
              Sidebar is responsive. On mobile, use the top-left menu button; on desktop it stays pinned.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
