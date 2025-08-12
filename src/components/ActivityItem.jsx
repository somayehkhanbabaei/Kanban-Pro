export default function ActivityItem({ time, title, description }) {
    return (
      <div className="flex gap-4">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full" />
          <div className="flex-1 w-px bg-white/20" />
        </div>
  
        {/* Content */}
        <div className="pb-6">
          <p className="text-white text-sm">{time}</p>
          <h4 className="text-white font-semibold">{title}</h4>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    );
  }