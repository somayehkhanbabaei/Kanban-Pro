export default function SummaryCard({ icon: Icon, title, value }) {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4 flex items-center gap-4 shadow-lg">
        {/* Icon */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
          <Icon className="w-6 h-6 text-white" />
        </div>
  
        {/* Text */}
        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <p className="text-white text-xl font-semibold">{value}</p>
        </div>
      </div>
    );
  }
  