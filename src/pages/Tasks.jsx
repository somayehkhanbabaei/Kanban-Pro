import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  CheckSquare,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Filter,
} from "lucide-react";
import TaskItem from "../components/TaskItem";
import Modal from "../components/Modal";
import AddTaskForm from "../components/AddTaskForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function Tasks() {
  const [open, setOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: "",
  });

  // Dynamic tasks state with initial sample data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design new login page",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Fix dashboard sidebar bug",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-01-10",
    },
    {
      id: 3,
      title: "Prepare presentation slides",
      status: "Pending",
      priority: "High",
      dueDate: "2024-01-20",
    },
    {
      id: 4,
      title: "Update project documentation",
      status: "Completed",
      priority: "Low",
      dueDate: "2024-01-08",
    },
    {
      id: 5,
      title: "Review code changes",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2024-01-18",
    },
    {
      id: 6,
      title: "Setup testing environment",
      status: "Pending",
      priority: "High",
      dueDate: "2024-01-25",
    },
  ]);

  // Add new task function
  const addTask = (newTask) => {
    const task = {
      id: Date.now(), // Simple ID generation
      ...newTask,
    };
    setTasks([task, ...tasks]); // Add new task at the beginning
    setIsAddTaskOpen(false);
  };

  // Open delete confirmation modal
  const openDeleteModal = (taskId, taskTitle) => {
    setDeleteModal({ isOpen: true, taskId, taskTitle });
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" });
  };

  // Confirm delete task
  const confirmDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== deleteModal.taskId));
    closeDeleteModal();
  };

  // Filter tasks based on status and priority
  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filter !== "All") {
      filteredTasks = filteredTasks.filter((task) => task.status === filter);
    }

    if (priorityFilter !== "All") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    return filteredTasks;
  };

  const filteredTasks = getFilteredTasks();

  const taskStats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: <CheckSquare size={20} color="#fff" />,
    },
    {
      label: "Pending",
      value: tasks.filter((t) => t.status === "Pending").length,
      icon: <Clock size={20} color="#fff" />,
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
      icon: <AlertCircle size={20} color="#fff" />,
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
      icon: <CheckCircle2 size={20} color="#fff" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="pt-14 md:flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-6xl space-y-8 pb-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold">Tasks</h1>
                <p className="text-white/70 mt-1">
                  Manage all your tasks in one place
                </p>
              </div>
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {taskStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">{stat.label}</p>
                      <p className="text-white text-2xl font-bold">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#22d3ee]">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Controls */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-white/70" />
                  <span className="text-white/70 text-sm font-medium">
                    Filter by Status:
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["All", "Pending", "In Progress", "Completed"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          filter === status
                            ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/15"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <span className="text-white/70 text-sm font-medium">
                    Priority:
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["All", "High", "Medium", "Low"].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setPriorityFilter(priority)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        priorityFilter === priority
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/15"
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">
                  Tasks ({filteredTasks.length})
                </h2>
              </div>

              {filteredTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70">
                    No tasks found matching your filters.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-medium">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                            <span>Due: {task.dueDate}</span>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                task.priority === "High"
                                  ? "bg-red-500/20 text-red-300"
                                  : task.priority === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-green-500/20 text-green-300"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              task.status === "Completed"
                                ? "bg-green-500/20 text-green-300"
                                : task.status === "In Progress"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            {task.status}
                          </span>
                          <button
                            onClick={() => openDeleteModal(task.id, task.title)}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition"
                            title="Delete task"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Task Modal */}
          <Modal
            open={isAddTaskOpen}
            onClose={() => setIsAddTaskOpen(false)}
            title="Add New Task"
          >
            <AddTaskForm
              onSubmit={addTask}
              onCancel={() => setIsAddTaskOpen(false)}
            />
          </Modal>

          {/* Delete Confirmation Modal */}
          <DeleteConfirmModal
            isOpen={deleteModal.isOpen}
            onClose={closeDeleteModal}
            onConfirm={confirmDeleteTask}
            taskTitle={deleteModal.taskTitle}
          />
        </main>
      </div>
    </div>
  );
}
