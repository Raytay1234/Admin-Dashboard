// src/components/Layout.jsx
import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <main className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
