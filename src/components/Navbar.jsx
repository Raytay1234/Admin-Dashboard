// src/components/Navbar.jsx
import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4
      bg-gray-950 border-b border-gray-800 text-gray-100"
    >
      {/* Left: Menu + Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-bold tracking-tight text-green-500">
          Duka
        </h1>
      </div>

      {/* Right: Optional future actions */}
      {/* Example: Notifications / Profile */}
    </nav>
  );
}
