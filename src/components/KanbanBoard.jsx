import React from "react";
import { ListTodo, Loader2, CheckCircle2, Plus, MoreVertical, Clock4 } from "lucide-react";

// Simple task card used inside columns
function TaskCard({ title, description, tag, due }) {
  return (
    <div className="group rounded-lg p-3 backdrop-blur bg-white/10 border border-white/15 hover:bg-white/15 transition">
      {/* Top row: title + menu */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-white font-medium leading-snug">{title}</h4>
        <button
          type="button"
          aria-label="More"
          className="opacity-0 group-hover:opacity-100 transition text-white/70 hover:text-white"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Description */}
      {description && (
        <p className="text-white/70 text-sm mt-1">
          {description}
        </p>
      )}

      {/* Footer badges */}
      <div className="mt-3 flex items-center gap-2">
        {tag && (
          <span className="text-xs px-2 py-1 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white/95">
            {tag}
          </span>
        )}
        {due && (
          <span className="text-xs text-white/70 inline-flex items-center gap-1">
            <Clock4 size={14} /> {due}
          </span>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard({onAddTask}) {
  // demo data (UI only)
  const data = {
    todo: [
      { title: "Design landing hero", description: "Header + CTA", tag: "UI", due: "Today" },
      { title: "Create color tokens", description: "", tag: "Design", due: "Tomorrow" },
    ],
    inprogress: [
      { title: "Authentication flow", description: "Login / Sign up", tag: "Feature", due: "Fri" },
      { title: "Dashboard charts", description: "Bar chart setup", tag: "Charts", due: "Mon" },
    ],
    done: [
      { title: "Project cards grid", description: "", tag: "UI", due: "Yesterday" },
      { title: "Sidebar responsive", description: "Mobile slide-in", tag: "Layout", due: "Yesterday" },
    ],
  };

  // column meta (icons + header accent)
  const columns = [
    {
      key: "todo",
      title: "To Do",
      Icon: ListTodo,
      // header accent bar matches brand gradient
      accent: "from-[#7c3aed] via-[#6a5cff] to-[#22d3ee]",
    },
    {
      key: "inprogress",
      title: "In Progress",
      Icon: Loader2,
      accent: "from-[#6a5cff] to-[#22d3ee]",
    },
    {
      key: "done",
      title: "Done",
      Icon: CheckCircle2,
      accent: "from-emerald-400 to-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(({ key, title, Icon, accent }) => (
        <section
          key={key}
          className="rounded-xl p-4 backdrop-blur-xl bg-white/10 border border-white/15 shadow-lg"
        >
          {/* Column header */}
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-md grid place-items-center bg-gradient-to-br ${accent}`}>
                  <Icon size={16} className="text-white" />
                </span>
                <h3 className="text-white font-semibold">{title}</h3>
              </div>

              {/* Add task (no logic yet) */}
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md
                           bg-white/10 text-white hover:bg-white/15 transition"
                onClick={() => onAddTask()}
              >
                <Plus size={14} /> Add
              </button>
            </div>

            {/* subtle divider */}
            <div className={`mt-3 h-0.5 rounded bg-gradient-to-r ${accent} opacity-50`} />
          </div>

          {/* Tasks list */}
          <div className="space-y-3">
            {data[key].map((t, i) => (
              <TaskCard key={i} {...t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
