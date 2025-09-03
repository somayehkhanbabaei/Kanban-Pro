import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

export default function Calendar() {
  const [open, setOpen] = useState(false);

  // Sample calendar events
  const upcomingEvents = [
    {
      title: "Team Standup",
      time: "09:00 AM",
      date: "Today",
      type: "meeting",
      attendees: 5,
    },
    {
      title: "Project Review",
      time: "02:00 PM",
      date: "Today",
      type: "review",
      attendees: 8,
    },
    {
      title: "Client Presentation",
      time: "10:00 AM",
      date: "Tomorrow",
      type: "presentation",
      attendees: 12,
    },
    {
      title: "Design Workshop",
      time: "03:00 PM",
      date: "Jan 18",
      type: "workshop",
      attendees: 6,
    },
  ];

  // Simple calendar grid (showing current month)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = 15; // Mock today's date

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="pt-14 md:flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold">Calendar</h1>
                <p className="text-white/70 mt-1">
                  Schedule and track your events
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition">
                <CalendarIcon size={16} />
                Add Event
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Grid */}
              <div className="lg:col-span-2">
                <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-xl font-semibold">
                      January 2024
                    </h2>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
                        ‹
                      </button>
                      <button className="px-3 py-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
                        ›
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-2 text-center text-white/70 text-sm font-medium"
                        >
                          {day}
                        </div>
                      )
                    )}
                    {calendarDays.map((day) => (
                      <div
                        key={day}
                        className={`p-2 text-center text-sm rounded-lg transition cursor-pointer ${
                          day === today
                            ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white font-bold"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4"
                      >
                        <h4 className="text-white font-medium mb-2">
                          {event.title}
                        </h4>
                        <div className="space-y-2 text-sm text-white/70">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon size={14} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} />
                            <span>{event.attendees} attendees</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              event.type === "meeting"
                                ? "bg-blue-500/20 text-blue-300"
                                : event.type === "review"
                                ? "bg-purple-500/20 text-purple-300"
                                : event.type === "presentation"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-orange-500/20 text-orange-300"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
