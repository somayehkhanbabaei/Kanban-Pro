import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FolderKanban, CheckSquare, MessageSquare, Calendar, ListChecks, Clock4, CheckCircle2, Users } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import TaskItem from "../components/TaskItem";
import TasksChart from "../components/TasksChart";
import ActivityTimeline from "../components/ActivityTimeline";
import StatsCards from "../components/StatsCards";
import KanbanBoard from "../components/KanbanBoard";
import Modal from '../components/Modal';
import AddProjectForm from '../components/AddProjectForm';
import AddTaskForm from '../components/AddTaskForm';
import AddTaskModal from "../components/AddTaskModal";
import AddProjectModal from "../components/AddProjectModal";
import { Link } from "react-router-dom";


export default function Dashboard() {
  // Mobile sidebar state
  const [open, setOpen] = useState(false);
  const [openAddProject, setOpenAddProject] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);


   // Sample projects
   const projects = [
    {
      title: "Website Redesign",
      description: "Updating UI with new brand colors",
      progress: 75,
      members: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
    },
    {
      title: "Mobile App",
      description: "Adding new features for iOS and Android",
      progress: 40,
      members: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
      ],
    },
    {
      title: "Marketing Campaign",
      description: "Social media and ads launch",
      progress: 90,
      members: [
        "https://i.pravatar.cc/40?img=6",
        "https://i.pravatar.cc/40?img=7",
        "https://i.pravatar.cc/40?img=8",
        "https://i.pravatar.cc/40?img=9",
      ],
    },
  ];

  const tasks = [
    { title: "Design new login page", status: "In Progress" },
    { title: "Fix dashboard sidebar bug", status: "Completed" },
    { title: "Prepare presentation slides", status: "Pending" },
    { title: "Update project documentation", status: "Completed" },
  ];

  const activities = [
    { time: "09:00 AM", title: "Meeting with client", description: "Discuss project milestones" },
    { time: "11:30 AM", title: "UI Design Update", description: "Uploaded new mockups for approval" },
    { time: "02:00 PM", title: "Code Review", description: "Reviewed pull requests from dev team" },
    { time: "04:15 PM", title: "Deployed update", description: "Version 1.2 is live on production" },
  ];

  const chartData = [
    { name: "Completed", tasks: 12 },
    { name: "In Progress", tasks: 7 },
    { name: "Pending", tasks: 4 },
  ];

  const recentEvents = [
    { type: "task-created", description: "New task 'UI Design' created", time: "2 hours ago" },
    { type: "status-changed", description: "Task 'Setup Database' moved to In Progress", time: "Yesterday" },
    { type: "comment-added", description: "Alex commented on 'Landing Page'", time: "2 days ago" },
    { type: "task-completed", description: "Task 'Wireframe' marked as complete", time: "3 days ago" },
  ];

  const statsData = [
    { label: "Total Tasks", value: 24, icon: <ListChecks size={20} color="#fff" /> },
    { label: "In Progress", value: 7, icon: <Clock4 size={20} color="#fff" /> },
    { label: "Completed", value: 12, icon: <CheckCircle2 size={20} color="#fff" /> },
    { label: "Team Members", value: 5, icon: <Users size={20} color="#fff" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      {/* Layout: sidebar + main */}
      <div className="pt-14 md:flex">
        {/* Sidebar (mobile overlay uses 'open') */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* 1) Quick Stats - top of the page */}
            <section>
              <StatsCards stats={statsData} />
            </section>

            {/* 2) Chart */}
            <section>
              <h2 className="text-white text-xl font-semibold mb-4">Project Stats</h2>
              <TasksChart data={chartData} />
            </section>


            {/* 3) Projects */}
            <section className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">Projects</h2>
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(true)}
                  className="px-3 h-10 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 active:opacity-90 transition"
                >
                  New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p, idx) => (
                  <Link
                    key={idx}
                    to={`/projects/${idx}`}
                    state={{project: p}}
                    className="block"
                    >
                      <ProjectCard {...p} />
                  </Link>
                ))}
              </div>
            </section>


            {/* Kanban Board Section */}
            <section>
            <h2 className="text-white text-xl font-semibold mt-8 mb-4">Kanban Board</h2>
            <KanbanBoard  onAddTask={() => setOpenAddTask(true)}/>
            </section>

            {/* 4) Recent Tasks */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">Recent Tasks</h2>
                <button
                  type="button"
                  onClick={() => setIsAddTaskOpen(true)}
                  className="px-3 h-10 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 active:opacity-90 transition"
                >
                  Add Task
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((t, idx) => (
                  <TaskItem key={idx} {...t} />
                ))}
              </div>
            </section>

            {/* 5) Activity Timeline */}
            <section>
              <h2 className="text-white text-xl font-semibold mb-4">Activity</h2>
              <ActivityTimeline events={recentEvents} />
            </section>
          </div>
        
        {/*Modal Form*/}
          <Modal open={openAddProject} onClose={() => setOpenAddProject(false)} title="Create Project">
            <AddProjectForm />
          </Modal>

          <Modal open={openAddTask} onClose={() => setOpenAddTask(false)} title="Add Task">
            <AddTaskForm />
          </Modal>

          <AddTaskModal
            isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)}
          />

          <AddProjectModal
            isOpen={isAddProjectOpen} onClose={() => setIsAddProjectOpen(false)}
          />
        </main>
      </div>
    </div>
  );
}
