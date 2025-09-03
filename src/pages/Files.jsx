import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  Folder,
  File,
  Upload,
  Download,
  Search,
  MoreVertical,
  FileText,
  Image,
  FileVideo,
  Archive,
} from "lucide-react";

export default function Files() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample files data
  const files = [
    {
      name: "Project Presentation.pptx",
      type: "presentation",
      size: "2.4 MB",
      modified: "2 hours ago",
      icon: FileText,
    },
    {
      name: "Design Mockups",
      type: "folder",
      size: "15 items",
      modified: "1 day ago",
      icon: Folder,
    },
    {
      name: "Hero Image.png",
      type: "image",
      size: "1.8 MB",
      modified: "3 days ago",
      icon: Image,
    },
    {
      name: "Demo Video.mp4",
      type: "video",
      size: "45.2 MB",
      modified: "1 week ago",
      icon: FileVideo,
    },
    {
      name: "Project Archive.zip",
      type: "archive",
      size: "12.7 MB",
      modified: "2 weeks ago",
      icon: Archive,
    },
    {
      name: "Requirements.pdf",
      type: "document",
      size: "890 KB",
      modified: "3 weeks ago",
      icon: FileText,
    },
  ];

  const storageStats = [
    { label: "Used Space", value: "78.4 GB", percentage: 65 },
    { label: "Total Files", value: files.length },
    { label: "Shared Files", value: "12" },
    { label: "Recent Uploads", value: "5" },
  ];

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="pt-14 md:flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="px-4 py-6 md:ml-72">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold">Files</h1>
                <p className="text-white/70 mt-1">
                  Manage your project files and documents
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition">
                <Upload size={16} />
                Upload Files
              </button>
            </div>

            {/* Storage Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {storageStats.map((stat, idx) => (
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
                      {stat.percentage && (
                        <div className="mt-2">
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] h-2 rounded-full transition-all"
                              style={{ width: `${stat.percentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
                    Name
                  </button>
                  <button className="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
                    Date
                  </button>
                  <button className="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
                    Size
                  </button>
                </div>
              </div>
            </div>

            {/* Files List */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
              <h2 className="text-white text-xl font-semibold mb-4">
                Files & Folders
              </h2>
              <div className="space-y-2">
                {filteredFiles.map((file, idx) => {
                  const IconComponent = file.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            file.type === "folder"
                              ? "bg-blue-500/20"
                              : file.type === "image"
                              ? "bg-green-500/20"
                              : file.type === "video"
                              ? "bg-purple-500/20"
                              : file.type === "archive"
                              ? "bg-orange-500/20"
                              : "bg-gray-500/20"
                          }`}
                        >
                          <IconComponent
                            size={20}
                            className={`${
                              file.type === "folder"
                                ? "text-blue-300"
                                : file.type === "image"
                                ? "text-green-300"
                                : file.type === "video"
                                ? "text-purple-300"
                                : file.type === "archive"
                                ? "text-orange-300"
                                : "text-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">
                            {file.name}
                          </h3>
                          <p className="text-white/50 text-sm">
                            {file.size} • {file.modified}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition">
                          <Download size={16} />
                        </button>
                        <button className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
