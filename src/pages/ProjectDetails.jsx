import { useLocation, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Calendar,
  CheckCircle2,
  Users,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import GlassCard from "../components/GlassCard.jsx";
import ButtonLayout from "../components/‌ButtonLayout.jsx";
import Footer from "../components/Footer.jsx";

export default function ProjectDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [open, setOpen] = useState(false); // sidebar (mobile)

  const project = state?.project || {
    title: "Mobile App",
    description:
      "Cross-platform mobile app for iOS and Android focusing on onboarding, offline sync, and push notifications.",
    progress: 40,
    status: "In Progress",
    due: "2025-10-15",
    members: [
      "https://i.pravatar.cc/40?img=11",
      "https://i.pravatar.cc/40?img=22",
      "https://i.pravatar.cc/40?img=33",
    ],
  };

  // Normalize members to { name, avatar }
  const teamMembers = (project.members || []).map((m, i) => {
    if (typeof m === "string") {
      return { name: `Member ${i + 1}`, avatar: m };
    }
    return m;
  });

  const projectTasks = [
    {
      title: "Implement auth (email + OAuth)",
      status: "In Progress",
      priority: "High",
    },
    {
      title: "Design onboarding screens",
      status: "Completed",
      priority: "Medium",
    },
    {
      title: "Offline cache for project list",
      status: "In Progress",
      priority: "High",
    },
    {
      title: "Push notifications (FCM/APNs)",
      status: "Pending",
      priority: "Low",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      {/* Top header */}
      <Header onMenuClick={() => setOpen(true)} />

      {/* Layout: sidebar + main */}
      <div className="pt-14 flex flex-1">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="flex-1 px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform duration-200"
                />
                <span>Back to Dashboard</span>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                  title="Edit project"
                >
                  <span className="inline-flex items-center gap-2">
                    <Pencil size={16} /> Edit Project
                  </span>
                </button>
                <ButtonLayout>
                  <span className="inline-flex items-center gap-2">
                    <Plus size={18} /> Add Task
                  </span>
                </ButtonLayout>
              </div>
            </div>

            {/* Project Hero Section */}
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <h1 className="text-white text-3xl font-bold mb-2">
                      {project.title}
                    </h1>
                    <p className="text-white/80 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] text-white font-semibold shadow-lg">
                      {project.status || "—"}
                    </span>
                    <div className="text-right text-white/70">
                      <div className="text-2xl font-bold text-white">
                        {project.progress ?? 0}%
                      </div>
                      <div className="text-sm">Complete</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-medium">Progress</span>
                    <span className="text-white/60 text-sm">
                      {project.progress ?? 0}% of 100%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 h-3 rounded-full shadow-lg transition-all duration-500 ease-out relative overflow-hidden"
                      style={{ width: `${project.progress ?? 0}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <GlassCard className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                    <Target className="text-blue-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {projectTasks.length}
                  </div>
                  <div className="text-white/70 text-sm">Total Tasks</div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="text-green-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {
                      projectTasks.filter((t) => t.status === "Completed")
                        .length
                    }
                  </div>
                  <div className="text-white/70 text-sm">Completed</div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                    <Clock className="text-yellow-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {
                      projectTasks.filter((t) => t.status === "In Progress")
                        .length
                    }
                  </div>
                  <div className="text-white/70 text-sm">In Progress</div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {teamMembers.length}
                  </div>
                  <div className="text-white/70 text-sm">Team Members</div>
                </div>
              </GlassCard>
            </div>

            {/* Main Content Layout */}
            <div className="space-y-8">
              {/* Row 1: Project Details - Full Width */}
              <div className="w-full ">
                <GlassCard>
                  <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 size={20} />
                    Project Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <Calendar className="text-blue-400" size={18} />
                        <div>
                          <div className="text-white/60 text-sm">Due Date</div>
                          <div className="text-white font-medium">
                            {project.due || "Not set"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <CheckCircle2 className="text-green-400" size={18} />
                        <div>
                          <div className="text-white/60 text-sm">Status</div>
                          <div className="text-white font-medium">
                            {project.status || "—"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <Users className="text-purple-400" size={18} />
                        <div>
                          <div className="text-white/60 text-sm">Team Size</div>
                          <div className="text-white font-medium">
                            {teamMembers.length} members
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <Target className="text-cyan-400" size={18} />
                        <div>
                          <div className="text-white/60 text-sm">Progress</div>
                          <div className="text-white font-medium">
                            {project.progress ?? 0}% complete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Row 2: Tasks and Team Members Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Tasks */}
                <div>
                  <GlassCard>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                        <CheckCircle2 size={20} />
                        Tasks ({projectTasks.length})
                      </h2>
                      <ButtonLayout>
                        <Plus size={16} />
                        Add Task
                      </ButtonLayout>
                    </div>
                    <div className="space-y-3">
                      {projectTasks.map((task, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-white font-medium group-hover:text-white/90">
                                {task.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                                    task.priority === "High"
                                      ? "bg-red-500/20 text-red-400"
                                      : task.priority === "Medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-green-500/20 text-green-400"
                                  }`}
                                >
                                  {task.priority} Priority
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                task.status === "Completed"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : task.status === "In Progress"
                                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* Right Column - Team Members */}
                <div>
                  <GlassCard>
                    <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users size={20} />
                      Team Members ({teamMembers.length})
                    </h2>
                    {teamMembers.length ? (
                      <div className="space-y-3">
                        {teamMembers.map((member, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                          >
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                            />
                            <div className="flex-1">
                              <p className="text-white font-medium">
                                {member.name}
                              </p>
                              <p className="text-white/60 text-sm">
                                Team Member
                              </p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg"></div>
                          </div>
                        ))}
                        <button className="w-full p-3 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-200 flex items-center justify-center gap-2">
                          <Plus size={16} />
                          Add Team Member
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users
                          className="mx-auto text-white/40 mb-3"
                          size={48}
                        />
                        <p className="text-white/70 mb-4">
                          No team members yet
                        </p>
                        <ButtonLayout>
                          <Plus size={16} />
                          Add First Member
                        </ButtonLayout>
                      </div>
                    )}
                  </GlassCard>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
