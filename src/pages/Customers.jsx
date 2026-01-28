import { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";

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

// Summary Card
const SummaryCard = ({ title, value, color }) => (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-start">
        <p className="text-gray-400 text-sm">{title}</p>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
);

export default function Customers() {
    const [customers] = useState(generateCustomers);

    // Summary stats
    const summary = useMemo(() => {
        const total = customers.length;
        const active = customers.filter(c => c.status === "Active").length;
        const inactive = customers.filter(c => c.status === "Inactive").length;
        const totalOrders = customers.reduce((acc, c) => acc + c.totalOrders, 0);
        return { total, active, inactive, totalOrders };
    }, [customers]);

    return (
        <div className="p-6 lg:p-8 bg-gray-900 min-h-screen space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Customers</h1>
                <p className="text-gray-400 mt-1">Overview and management of all customers</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="Total Customers" value={summary.total} color="text-white" />
                <SummaryCard title="Active Customers" value={summary.active} color="text-green-400" />
                <SummaryCard title="Inactive Customers" value={summary.inactive} color="text-red-400" />
                <SummaryCard title="Total Orders" value={summary.totalOrders} color="text-yellow-400" />
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {customers.map((c, idx) => (
                    <Motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="flex flex-col gap-3 rounded-xl p-4
              bg-gray-900 text-gray-100
              shadow-sm transition transform
              hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800
              cursor-pointer"
                        onClick={() => alert(`Viewing customer ${c.name}`)}
                    >
                        {/* Avatar + Info */}
                        <div className="flex items-center gap-3">
                            <img
                                src={c.avatar}
                                alt={c.name}
                                className="w-14 h-14 rounded-full object-cover border border-green-600"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{c.name}</p>
                                <p className="text-sm text-gray-400 truncate">{c.email}</p>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>Joined: {c.joined}</span>
                            <span>Orders: {c.totalOrders}</span>
                        </div>

                        {/* Status */}
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium self-start ${c.status === "Active"
                                    ? "bg-green-900/40 text-green-400"
                                    : "bg-red-900/40 text-red-400"
                                }`}
                        >
                            {c.status}
                        </span>
                    </Motion.div>
                ))}
            </div>
        </div>
    );
}
