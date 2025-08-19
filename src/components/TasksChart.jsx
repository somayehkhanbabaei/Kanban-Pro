import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TasksChart({ data }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4 shadow-lg">
      <h3 className="text-white font-semibold mb-4">Tasks Overview</h3>

      {/* Responsive container keeps chart fluid */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            {/* light grid matching glass theme */}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />

            {/* axes styled for dark background */}
            <XAxis dataKey="name" stroke="#ffffffcc" tick={{ fontSize: 12 }} />
            <YAxis stroke="#ffffffcc" tick={{ fontSize: 12 }} />

            {/* dark tooltip with no border */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(2,6,23,0.9)", // slate-900-ish
                border: "none",
                borderRadius: 12,
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />

            {/* gradient fill to match brand (purple -> cyan) */}
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />  {/* purple-500 */}
                <stop offset="100%" stopColor="#06b6d4" /> {/* cyan-500 */}
              </linearGradient>
            </defs>

            <Bar
              dataKey="tasks"
              fill="url(#barFill)"
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
