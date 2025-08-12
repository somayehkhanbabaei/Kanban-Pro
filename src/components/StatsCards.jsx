import { ListChecks, Clock4, CheckCircle2, Users } from "lucide-react";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4 shadow-lg flex items-center gap-4"
        >
          {/* Icon */}
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500">
            {stat.icon}
          </div>

          {/* Text */}
          <div>
            <p className="text-sm text-white/70">{stat.label}</p>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
