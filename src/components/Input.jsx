// src/components/Input.jsx
export default function Input({ type = "text", placeholder, icon: Icon }) {
    return (
      <div
        className="flex items-center gap-2 w-full h-11 px-3 rounded-lg
                   bg-white/10 border border-white/20
                   text-white placeholder-white/70
                   focus-within:border-indigo-400 transition"
      >
        {/* Icon */}
        {Icon && <Icon className="w-5 h-5 text-white/70" />}
  
        {/* Input field */}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none placeholder-white/70"
        />
      </div>
    );
  }
  