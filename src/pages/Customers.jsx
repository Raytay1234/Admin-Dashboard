// src/pages/Customers.jsx
import { useState } from "react";
import { motion as Motion } from "framer-motion";
import useTheme from "../hooks/useTheme.js";
import Layout from "../components/Layout"; // Your page wrapper

// Mock customers generator
const generateCustomers = () =>
    Array.from({ length: 20 }).map((_, i) => ({
        id: `C${i + 1}`,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        joined: new Date(
            Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
        ).toLocaleDateString("en-US"),
        totalOrders: Math.floor(Math.random() * 50 + 1),
        status: Math.random() > 0.5 ? "Active" : "Inactive",
        avatar: `https://picsum.photos/seed/customer${i + 1}/100/100`,
    }));

export default function Customers() {
    const { theme } = useTheme();
    const [customers] = useState(generateCustomers);

    return (
        <Layout>
            <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Customers
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {customers.map((c, idx) => (
                    <Motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`flex flex-col gap-3 rounded-xl p-4 shadow-sm transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer ${theme === "dark"
                                ? "bg-gray-900 text-gray-100"
                                : "bg-white text-gray-800"
                            }`}
                        onClick={() => alert(`Viewing customer ${c.name}`)}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={c.avatar}
                                alt={c.name}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{c.name}</p>
                                <p className="text-sm text-gray-400 truncate">{c.email}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>Joined: {c.joined}</span>
                            <span>Orders: {c.totalOrders}</span>
                        </div>

                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium self-start ${c.status === "Active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                }`}
                        >
                            {c.status}
                        </span>
                    </Motion.div>
                ))}
            </div>
        </Layout>
    );
}
