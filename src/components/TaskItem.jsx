export default function TaskItem({ title, status }) {
    const statusColors = {
      Completed: "text-green-400",
      "In Progress": "text-yellow-400",
      Pending: "text-red-400",
    };
  
    return (
      <div className="flex items-center justify-between p-3 rounded-lg backdrop-blur-xl bg-white/10 border border-white/15">
        <span className="text-white/90">{title}</span>
        <span className={`text-sm font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    );
  }