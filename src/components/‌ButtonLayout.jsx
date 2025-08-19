
export default function ButtonLayout({ children, type = "button", onClick }) {
    return (
      // Gradient button (purple → teal) with focus ring
      <button
        type={type}
        onClick={onClick}
        className="
          w-full px-4 h-11 rounded-lg font-semibold text-white
          bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee]
          hover:opacity-95 active:opacity-90
          focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50
          transition
        "
      >
        {children}
      </button>
    );
  }
  