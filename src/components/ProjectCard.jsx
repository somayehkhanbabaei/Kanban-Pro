// src/components/ProjectCard.jsx
export default function ProjectCard({ title, description, progress, members }) {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4 shadow-lg">
        {/* Title */}
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <p className="text-white/70 text-sm mb-4">{description}</p>
  
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/60 text-xs mb-4">{progress}% Complete</p>
  
        {/* Members avatars */}
        <div className="flex -space-x-2">
          {members.map((m, idx) => (
            <img
              key={idx}
              src={m}
              alt="member"
              className="w-8 h-8 rounded-full border-2 border-[#0a1f3d]"
            />
          ))}
        </div>
      </div>
    );
  }
  