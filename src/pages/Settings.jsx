// src/pages/Settings.jsx
import { useContext, useState } from "react";
// ✅ Correct
import { useAuth } from "../context/useAuth.js";
import ThemeContext from "../context/ThemeProvider";

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState({
    marketing: true,
    updates: true,
  });

  if (!user) {
    return (
      <div className="p-6 text-gray-100">
        <p>You are not logged in.</p>
      </div>
    );
  }

  const handleSave = () => {
    const updatedUser = { ...user, name, email, avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Settings saved!");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: Account Settings */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Avatar URL</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Preferences */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>

          <div className="flex flex-col gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-200 font-medium">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </button>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-gray-100 font-medium mb-2">Notifications</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        marketing: !prev.marketing,
                      }))
                    }
                    className="accent-green-600"
                  />
                  Marketing emails
                </label>

                <label className="flex items-center gap-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={notifications.updates}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        updates: !prev.updates,
                      }))
                    }
                    className="accent-green-600"
                  />
                  Product updates
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
