// src/components/Navbar.jsx
import { Sun, Moon, Menu } from "lucide-react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext.js";

export default function Navbar({ toggleSidebar }) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
            {/* Left: Mobile menu */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                    <Menu className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                </button>
                <h1 className="text-2xl font-bold text-green-600 tracking-tight">Duka</h1>
            </div>

            {/* Right: Theme toggle */}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Toggle Dark/Light Mode"
            >
                {theme === "light" ? <Moon className="w-5 h-5 text-gray-800" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
        </nav>
    );
}
