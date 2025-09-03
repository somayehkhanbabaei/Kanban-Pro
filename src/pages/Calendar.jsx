import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Filter,
  X,
} from "lucide-react";

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Standup",
      time: "09:00 AM",
      date: "2024-01-15",
      day: 15,
      type: "meeting",
      attendees: 5,
      color: "blue",
    },
    {
      id: 2,
      title: "Project Review",
      time: "02:00 PM",
      date: "2024-01-15",
      day: 15,
      type: "review",
      attendees: 8,
      color: "purple",
    },
    {
      id: 3,
      title: "Client Presentation",
      time: "10:00 AM",
      date: "2024-01-16",
      day: 16,
      type: "presentation",
      attendees: 12,
      color: "green",
    },
    {
      id: 4,
      title: "Design Workshop",
      time: "03:00 PM",
      date: "2024-01-18",
      day: 18,
      type: "workshop",
      attendees: 6,
      color: "orange",
    },
    {
      id: 5,
      title: "Marketing Meeting",
      time: "11:00 AM",
      date: "2024-01-20",
      day: 20,
      type: "meeting",
      attendees: 4,
      color: "blue",
    },
    {
      id: 6,
      title: "Code Review",
      time: "04:00 PM",
      date: "2024-01-22",
      day: 22,
      type: "review",
      attendees: 3,
      color: "purple",
    },
    {
      id: 7,
      title: "Product Demo",
      time: "01:00 PM",
      date: "2024-01-25",
      day: 25,
      type: "presentation",
      attendees: 15,
      color: "green",
    },
    {
      id: 8,
      title: "UX Workshop",
      time: "02:30 PM",
      date: "2024-01-28",
      day: 28,
      type: "workshop",
      attendees: 8,
      color: "orange",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    day: "",
    type: "meeting",
    attendees: "",
  });

  // Simple calendar grid (showing current month)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = 15; // Mock today's date

  // Filter events based on selected filter
  const filteredEvents =
    selectedFilter === "all"
      ? events
      : events.filter((event) => event.type === selectedFilter);

  // Get upcoming events (show all events sorted by date and time)
  const upcomingEvents = filteredEvents.sort((a, b) => {
    // Sort by day first, then by time
    const dayA = parseInt(a.day);
    const dayB = parseInt(b.day);
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    // If same day, sort by time
    return a.time.localeCompare(b.time);
  });

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return filteredEvents.filter((event) => event.day === day);
  };

  // Get color classes for event types
  const getEventColorClasses = (color, isBackground = false) => {
    const colorMap = {
      blue: isBackground ? "bg-blue-500/20 text-blue-300" : "bg-blue-500",
      purple: isBackground
        ? "bg-purple-500/20 text-purple-300"
        : "bg-purple-500",
      green: isBackground ? "bg-green-500/20 text-green-300" : "bg-green-500",
      orange: isBackground
        ? "bg-orange-500/20 text-orange-300"
        : "bg-orange-500",
    };
    return colorMap[color] || colorMap.blue;
  };

  // Get relative date text
  const getRelativeDateText = (date) => {
    const eventDate = new Date(date);
    const todayDate = new Date("2024-01-15"); // Mock today
    const tomorrow = new Date("2024-01-16");
    const yesterday = new Date("2024-01-14");

    if (eventDate.toDateString() === todayDate.toDateString()) return "Today";
    if (eventDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    if (eventDate.toDateString() === yesterday.toDateString())
      return "Yesterday";

    // For other dates, show if it's past or future
    if (eventDate < todayDate) {
      return (
        eventDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) + " (Past)"
      );
    }

    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "meeting", label: "Meetings" },
    { value: "review", label: "Reviews" },
    { value: "presentation", label: "Presentations" },
    { value: "workshop", label: "Workshops" },
  ];

  const eventTypeColors = {
    meeting: "blue",
    review: "purple",
    presentation: "green",
    workshop: "orange",
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (
      !newEvent.title ||
      !newEvent.time ||
      !newEvent.day ||
      !newEvent.attendees
    ) {
      alert("Please fill in all fields");
      return;
    }

    const eventDay = parseInt(newEvent.day);
    if (eventDay < 1 || eventDay > 31) {
      alert("Please enter a valid day (1-31)");
      return;
    }

    const newEventData = {
      id: Date.now(),
      title: newEvent.title,
      time: newEvent.time,
      date: `2024-01-${eventDay.toString().padStart(2, "0")}`,
      day: eventDay,
      type: newEvent.type,
      attendees: parseInt(newEvent.attendees),
      color: eventTypeColors[newEvent.type],
    };

    setEvents([...events, newEventData]);
    setNewEvent({
      title: "",
      time: "",
      day: "",
      type: "meeting",
      attendees: "",
    });
    setShowAddEventModal(false);
  };

  const handleInputChange = (field, value) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get tooltip background color based on dominant event type
  const getTooltipBackground = (dayEvents) => {
    if (dayEvents.length === 0) return "";

    // Count event types
    const typeCounts = {};
    dayEvents.forEach((event) => {
      typeCounts[event.color] = (typeCounts[event.color] || 0) + 1;
    });

    // Find dominant color
    const dominantColor = Object.keys(typeCounts).reduce((a, b) =>
      typeCounts[a] > typeCounts[b] ? a : b
    );

    const backgroundMap = {
      blue: "bg-blue-600/95 border-blue-400/50",
      purple: "bg-purple-600/95 border-purple-400/50",
      green: "bg-green-600/95 border-green-400/50",
      orange: "bg-orange-600/95 border-orange-400/50",
    };

    return backgroundMap[dominantColor] || backgroundMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="pt-14 md:flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold">Calendar</h1>
                <p className="text-white/70 mt-1">
                  Schedule and track your events
                </p>
              </div>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition cursor-pointer"
              >
                <CalendarIcon size={16} />
                Add Event
              </button>
            </div>

            {/* Event Filter */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/70">
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filter Events:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFilter(option.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        selectedFilter === option.value
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Centered Calendar Grid */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
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
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-3 text-center text-white/70 text-sm font-medium"
                        >
                          {day}
                        </div>
                      )
                    )}
                    {calendarDays.map((day) => {
                      const dayEvents = getEventsForDay(day);
                      return (
                        <div
                          key={day}
                          className={`p-3 text-center text-sm rounded-lg transition cursor-pointer relative min-h-[50px] ${
                            day === today
                              ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white font-bold"
                              : "text-white/80 hover:bg-white/10"
                          }`}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                        >
                          <div className="font-medium">{day}</div>
                          {dayEvents.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {dayEvents.slice(0, 2).map((event, idx) => (
                                <div
                                  key={event.id}
                                  className={`w-full h-1 rounded-full ${getEventColorClasses(
                                    event.color
                                  )}`}
                                />
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-white/60">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}

                          {/* Hover Tooltip */}
                          {hoveredDay === day && dayEvents.length > 0 && (
                            <div
                              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 rounded-lg border backdrop-blur-sm p-3 min-w-[200px] shadow-lg ${getTooltipBackground(
                                dayEvents
                              )}`}
                            >
                              <div className="text-white text-xs space-y-2">
                                {dayEvents.slice(0, 3).map((event, idx) => (
                                  <div
                                    key={event.id}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium truncate">
                                        {event.title}
                                      </div>
                                      <div className="text-white/80 flex items-center gap-1">
                                        <Clock size={10} />
                                        <span>{event.time}</span>
                                        <Users size={10} className="ml-2" />
                                        <span>{event.attendees}</span>
                                      </div>
                                    </div>
                                    <div
                                      className={`w-2 h-2 rounded-full ml-2 ${getEventColorClasses(
                                        event.color
                                      )}`}
                                    ></div>
                                  </div>
                                ))}
                                {dayEvents.length > 3 && (
                                  <div className="text-white/70 text-center pt-1 border-t border-white/20">
                                    +{dayEvents.length - 3} more events
                                  </div>
                                )}
                              </div>
                              {/* Tooltip Arrow */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-current opacity-95"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events - Below Calendar */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-6">
                Upcoming Events
              </h3>
              {/* Four Column Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {upcomingEvents.map((event, idx) => (
                  <div
                    key={event.id}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                  >
                    <h4 className="text-white font-medium mb-2 text-sm truncate">
                      {event.title}
                    </h4>
                    <div className="space-y-2 text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={12} />
                        <span>{getRelativeDateText(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={12} />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getEventColorClasses(
                          event.color,
                          true
                        )}`}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Event Modal */}
      <Modal
        open={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">Add New Event</h2>
          <button
            onClick={() => setShowAddEventModal(false)}
            className="text-white/70 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Event Title
            </label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Time
            </label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Day (1-31)
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={newEvent.day}
              onChange={(e) => handleInputChange("day", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Day of month"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Event Type
            </label>
            <select
              value={newEvent.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 [&>option]:bg-slate-800 [&>option]:text-white"
            >
              <option value="meeting" className="bg-slate-800 text-white">
                Meeting
              </option>
              <option value="review" className="bg-slate-800 text-white">
                Review
              </option>
              <option value="presentation" className="bg-slate-800 text-white">
                Presentation
              </option>
              <option value="workshop" className="bg-slate-800 text-white">
                Workshop
              </option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Number of Attendees
            </label>
            <input
              type="number"
              min="1"
              value={newEvent.attendees}
              onChange={(e) => handleInputChange("attendees", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Number of attendees"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddEventModal(false)}
              className="flex-1 px-4 py-2 rounded-lg text-white/70 bg-white/10 hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
