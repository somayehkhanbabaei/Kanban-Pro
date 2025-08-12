import { CheckCircle2, Clock4, MessageSquare, PlusCircle } from "lucide-react";

export default function ActivityTimeline({ events }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4 shadow-lg">
      <h3 className="text-white font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-1 text-cyan-400">
              {event.type === "task-created" && <PlusCircle size={20} />}
              {event.type === "task-completed" && <CheckCircle2 size={20} />}
              {event.type === "status-changed" && <Clock4 size={20} />}
              {event.type === "comment-added" && <MessageSquare size={20} />}
            </div>

            {/* Content */}
            <div>
              <p className="text-white/90 text-sm">{event.description}</p>
              <span className="text-xs text-white/50">{event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
