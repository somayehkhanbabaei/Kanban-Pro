import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Monitor,
  Save,
} from "lucide-react";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Settings tabs
  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "general", label: "General", icon: Monitor },
  ];

  // Form states
  const [profileData, setProfileData] = useState({
    name: "Amin Kh",
    email: "amin@example.com",
    role: "Project Manager",
    bio: "Passionate about creating efficient project management solutions.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    projectUpdates: true,
  });

  const renderProfileTab = () => (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Profile Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Role</label>
          <select
            value={profileData.role}
            onChange={(e) =>
              setProfileData({ ...profileData, role: e.target.value })
            }
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
          >
            <option value="Project Manager" className="bg-gray-800">
              Project Manager
            </option>
            <option value="Developer" className="bg-gray-800">
              Developer
            </option>
            <option value="Designer" className="bg-gray-800">
              Designer
            </option>
            <option value="Team Lead" className="bg-gray-800">
              Team Lead
            </option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-white/70 text-sm mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">
        Notification Preferences
      </h3>
      <div className="space-y-4">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
          >
            <div>
              <p className="text-white font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <p className="text-white/60 text-sm">
                {key === "emailNotifications" && "Receive updates via email"}
                {key === "pushNotifications" &&
                  "Get browser push notifications"}
                {key === "taskReminders" && "Reminders for upcoming tasks"}
                {key === "projectUpdates" && "Updates about project changes"}
              </p>
            </div>
            <button
              onClick={() =>
                setNotificationSettings({
                  ...notificationSettings,
                  [key]: !value,
                })
              }
              className={`w-12 h-6 rounded-full transition ${
                value
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#22d3ee]"
                  : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition transform ${
                  value ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Security Settings</h3>
      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-2">Change Password</h4>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50"
            />
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-2">
            Two-Factor Authentication
          </h4>
          <p className="text-white/60 text-sm mb-3">
            Add an extra layer of security to your account
          </p>
          <button className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Appearance Settings</h3>
      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-3">Theme</h4>
          <div className="grid grid-cols-3 gap-3">
            {["Dark", "Light", "Auto"].map((theme) => (
              <button
                key={theme}
                className={`p-3 rounded-lg border transition ${
                  theme === "Dark"
                    ? "border-[#6a5cff] bg-[#6a5cff]/20 text-white"
                    : "border-white/20 text-white/70 hover:border-white/40"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-3">Language</h4>
          <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50">
            <option value="en" className="bg-gray-800">
              English
            </option>
            <option value="es" className="bg-gray-800">
              Spanish
            </option>
            <option value="fr" className="bg-gray-800">
              French
            </option>
            <option value="de" className="bg-gray-800">
              German
            </option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">General Settings</h3>
      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-3">Time Zone</h4>
          <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6a5cff]/50">
            <option value="UTC" className="bg-gray-800">
              UTC
            </option>
            <option value="EST" className="bg-gray-800">
              Eastern Time
            </option>
            <option value="PST" className="bg-gray-800">
              Pacific Time
            </option>
            <option value="CET" className="bg-gray-800">
              Central European Time
            </option>
          </select>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-3">Default Project View</h4>
          <div className="grid grid-cols-2 gap-3">
            {["Kanban", "List", "Calendar", "Timeline"].map((view) => (
              <button
                key={view}
                className={`p-3 rounded-lg border transition ${
                  view === "Kanban"
                    ? "border-[#6a5cff] bg-[#6a5cff]/20 text-white"
                    : "border-white/20 text-white/70 hover:border-white/40"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "notifications":
        return renderNotificationsTab();
      case "security":
        return renderSecurityTab();
      case "appearance":
        return renderAppearanceTab();
      case "general":
        return renderGeneralTab();
      default:
        return renderProfileTab();
    }
  };

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
                <h1 className="text-white text-2xl font-bold">Settings</h1>
                <p className="text-white/70 mt-1">
                  Manage your account and preferences
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#7c3aed] via-[#6a5cff] to-[#22d3ee] hover:opacity-95 transition">
                <Save size={16} />
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-4">
                  <nav className="space-y-2">
                    {settingsTabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-[#7c3aed]/20 to-[#22d3ee]/20 text-white border border-[#6a5cff]/30"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <IconComponent size={18} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
