// src/pages/Dashboard.jsx
import { useContext, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import { filterIncomeData, getYearlyTotals } from "../data/incomeData.js";
import { productsData } from "../data/products.js";
import DashboardContext from "../context/DashboardContext.js";
import useTickets from "../hooks/useTickets.js"; // ✅ use shared tickets hook

const PERIODS = ["daily", "weekly", "monthly", "yearly"];

export default function Dashboard() {
    const navigate = useNavigate();
    const { ordersToday } = useContext(DashboardContext);

    const { tickets } = useTickets(); // ✅ get tickets
    const openTickets = tickets.filter((t) => t.status === "Open").length;

    const [period, setPeriod] = useState("monthly");

    // Filtered chart data
    const filteredChartData = useMemo(() => filterIncomeData(period), [period]);

    // Stats calculation
    const stats = useMemo(() => {
        if (period === "yearly") return getYearlyTotals();

        return filteredChartData.reduce(
            (acc, curr) => {
                acc.income += curr.income || 0;
                acc.newCustomers += curr.newCustomers || 0;
                acc.orders += curr.orders || 0;
                return acc;
            },
            { income: 0, newCustomers: 0, orders: 0 }
        );
    }, [filteredChartData, period]);

    const formatCurrency = (val) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(val);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Overview of your store performance</p>
            </div>

            {/* Period Filter */}
            <div className="flex gap-2">
                {PERIODS.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-4 py-1 rounded-full text-sm capitalize transition
              ${period === p
                                ? "bg-green-500 text-black font-semibold"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title={`Income (${period})`}
                    value={stats.income}
                    change={12} // Optional trend
                />
                <StatCard
                    title={`New Customers (${period})`}
                    value={stats.newCustomers}
                    change={5} // Optional trend
                />
                <StatCard title="Orders Today" value={ordersToday} change={0} />
                <StatCard title="Open Tickets" value={openTickets} change={0} /> {/* live tickets */}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Motion.div
                        key={period}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 p-6 rounded-2xl shadow-lg h-96"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Income & Customers ({period})
                        </h3>
                        <IncomeChart data={filteredChartData} />
                    </Motion.div>

                    {/* Recent Orders Table */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg overflow-x-auto">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                            <button
                                onClick={() => navigate("/orders")}
                                className="text-green-400 text-sm hover:underline"
                            >
                                View all
                            </button>
                        </div>
                        <table className="w-full text-sm text-gray-300 border-separate border-spacing-y-2">
                            <thead className="text-gray-400">
                                <tr>
                                    <th className="px-4 py-2 text-left">Month</th>
                                    <th className="px-4 py-2 text-left">Orders</th>
                                    <th className="px-4 py-2 text-left">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredChartData.slice(-5).map((m) => (
                                    <tr
                                        key={m.month}
                                        className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
                                    >
                                        <td className="px-4 py-2">{m.month}</td>
                                        <td className="px-4 py-2">{m.orders}</td>
                                        <td className="px-4 py-2">{formatCurrency(m.income)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg lg:sticky lg:top-24">
                    <h3 className="text-lg font-semibold text-white mb-4">Popular Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {productsData.slice(0, 4).map((p) => (
                            <div
                                key={p.id}
                                className="bg-gray-700 p-3 rounded-xl hover:scale-105 transition"
                            >
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-24 object-cover rounded-lg mb-2"
                                />
                                <h4 className="text-white text-sm font-medium truncate">{p.name}</h4>
                                <p className="text-gray-300 text-xs">{p.category}</p>
                                <p className="text-green-400 font-semibold mt-1">
                                    ${p.price.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
