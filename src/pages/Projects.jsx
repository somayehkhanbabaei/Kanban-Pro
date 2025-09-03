import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import {
  FolderKanban,
  Plus,
  Filter,
  X,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Website Redesign",
      description: "Updating UI with new brand colors and modern design",
      progress: 75,
      status: "in-progress",
      dueDate: "2024-02-15",
      members: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
      priority: "high",
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Adding new features for iOS and Android platforms",
      progress: 40,
      status: "in-progress",
      dueDate: "2024-03-20",
      members: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
      ],
      priority: "medium",
    },
    {
      id: 3,
      title: "Marketing Campaign",
      description: "Social media and ads launch for Q1",
      progress: 90,
      status: "in-progress",
      dueDate: "2024-01-30",
      members: [
        "https://i.pravatar.cc/40?img=6",
        "https://i.pravatar.cc/40?img=7",
        "https://i.pravatar.cc/40?img=8",
        "https://i.pravatar.cc/40?img=9",
      ],
      priority: "high",
    },
    {
      id: 4,
      title: "Database Migration",
      description: "Migrating from MySQL to PostgreSQL",
      progress: 100,
      status: "completed",
      dueDate: "2024-01-10",
      members: [
        "https://i.pravatar.cc/40?img=10",
        "https://i.pravatar.cc/40?img=11",
      ],
      priority: "high",
    },
    {
      id: 5,
      title: "API Documentation",
      description: "Creating comprehensive API documentation",
      progress: 25,
      status: "pending",
      dueDate: "2024-04-15",
      members: ["https://i.pravatar.cc/40?img=12"],
      priority: "low",
    },
    {
      id: 6,
      title: "User Authentication",
      description: "Implementing OAuth and multi-factor authentication",
      progress: 60,
      status: "in-progress",
      dueDate: "2024-02-28",
      members: [
        "https://i.pravatar.cc/40?img=13",
        "https://i.pravatar.cc/40?img=14",
        "https://i.pravatar.cc/40?img=15",
      ],
      priority: "high",
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    dueDate: "",
    members: [],
    priority: "medium",
  });

  // Filter projects based on selected filter
  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) => project.status === selectedFilter);

  const filterOptions = [
    { value: "all", label: "All Projects" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];

  const priorityColors = {
    high: "red",
    medium: "orange",
    low: "green",
  };

  const statusColors = {
    "in-progress": "blue",
    completed: "green",
    pending: "orange",
  };

  const handleAddProject = (e) => {
    e.preventDefault();

    if (!newProject.title || !newProject.description || !newProject.dueDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newProjectData = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      progress: 0,
      status: "pending",
      dueDate: newProject.dueDate,
      members: [
        // Default member avatar for new projects
        "https://i.pravatar.cc/40?img=" + Math.floor(Math.random() * 50),
      ],
      priority: newProject.priority,
    };

    setProjects([...projects, newProjectData]);
    setNewProject({
      title: "",
      description: "",
      dueDate: "",
      members: [],
      priority: "medium",
    });
    setShowAddProjectModal(false);
  };

  const handleInputChange = (field, value) => {
    setNewProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get project stats
  const projectStats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    pending: projects.filter((p) => p.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="pt-14 md:flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold">Projects</h1>
                <p className="text-white/70 mt-1">
                  Manage and track all your projects
                </p>
              </div>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition cursor-pointer"
              >
                <Plus size={16} />
                New Project
              </button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Projects</p>
                    <p className="text-white text-2xl font-bold">
                      {projectStats.total}
                    </p>
                  </div>
                  <FolderKanban className="text-white/70" size={24} />
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">In Progress</p>
                    <p className="text-white text-2xl font-bold">
                      {projectStats.inProgress}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Completed</p>
                    <p className="text-white text-2xl font-bold">
                      {projectStats.completed}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Pending</p>
                    <p className="text-white text-2xl font-bold">
                      {projectStats.pending}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                </div>
              </div>
            </div>

            {/* Project Filter */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/70">
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filter Projects:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFilter(option.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        selectedFilter === option.value
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
              <h2 className="text-white text-xl font-semibold mb-6">
                {selectedFilter === "all"
                  ? "All Projects"
                  : filterOptions.find((f) => f.value === selectedFilter)
                      ?.label}
                <span className="text-white/70 text-sm font-normal ml-2">
                  ({filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"})
                </span>
              </h2>

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      state={{ project }}
                      className="block transition-transform hover:scale-105"
                    >
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white font-semibold text-lg">
                            {project.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              project.status === "completed"
                                ? "bg-green-500/20 text-green-300"
                                : project.status === "in-progress"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-orange-500/20 text-orange-300"
                            }`}
                          >
                            {project.status.replace("-", " ")}
                          </span>
                        </div>

                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Progress bar */}
                        <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <p className="text-white/60 text-xs mb-4">
                          {project.progress}% Complete
                        </p>

                        {/* Due date and priority */}
                        <div className="flex items-center justify-between mb-4 text-xs text-white/70">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>
                              Due:{" "}
                              {new Date(project.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded font-medium ${
                              project.priority === "high"
                                ? "bg-red-500/20 text-red-300"
                                : project.priority === "medium"
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {project.priority}
                          </span>
                        </div>

                        {/* Members avatars */}
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {project.members.map((member, idx) => (
                              <img
                                key={idx}
                                src={member}
                                alt="member"
                                className="w-8 h-8 rounded-full border-2 border-[#0a1f3d]"
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-white/70 text-xs">
                            <Users size={12} />
                            <span>{project.members.length}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FolderKanban
                    className="mx-auto text-white/30 mb-4"
                    size={48}
                  />
                  <p className="text-white/70 mb-2">No projects found</p>
                  <p className="text-white/50 text-sm">
                    {selectedFilter === "all"
                      ? "Create your first project to get started"
                      : `No projects with status "${selectedFilter.replace(
                          "-",
                          " "
                        )}"`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Project Modal */}
      <Modal
        open={showAddProjectModal}
        onClose={() => setShowAddProjectModal(false)}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">
            Create New Project
          </h2>
          <button
            onClick={() => setShowAddProjectModal(false)}
            className="text-white/70 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleAddProject} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Enter project title"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
              placeholder="Enter project description"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Due Date *
            </label>
            <input
              type="date"
              value={newProject.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Priority
            </label>
            <select
              value={newProject.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 [&>option]:bg-slate-800 [&>option]:text-white"
            >
              <option value="low" className="bg-slate-800 text-white">
                Low Priority
              </option>
              <option value="medium" className="bg-slate-800 text-white">
                Medium Priority
              </option>
              <option value="high" className="bg-slate-800 text-white">
                High Priority
              </option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddProjectModal(false)}
              className="flex-1 px-4 py-2 rounded-lg text-white/70 bg-white/10 hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition"
            >
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
