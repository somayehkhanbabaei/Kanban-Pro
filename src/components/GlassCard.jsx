export default function GlassCard({ children }) {
  return (
    <div className="w-full max-w-md rounded-2xl p-6
                      backdrop-blur-xl bg-white/10
                      border border-white/20 shadow-2xl">
      {children}
    </div>
  );
}