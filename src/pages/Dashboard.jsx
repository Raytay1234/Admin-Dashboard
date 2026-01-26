// src/pages/Dashboard.jsx
import { useState, useEffect, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import { productsData } from "../data/products.js";
import { incomeData, getYearlyTotals } from "../data/incomeData.js";

// Helpers
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));

// Mock generators
const generateComments = () =>
    Array.from({ length: 5 }).map((_, i) => ({
        id: `CMT${i + 1}`,
        name: `User ${i + 1}`,
        avatar: `https://i.pravatar.cc/100?img=${i + 10}`,
        comment: `This is a preview comment number ${i + 1}.`,
        status: Math.random() > 0.5 ? "Approved" : "Pending",
    }));

const generateOrders = () =>
    Array.from({ length: 5 }).map((_, i) => ({
        id: `ORD${1000 + i}`,
        customer: `Customer ${i + 1}`,
        total: randomInt(50, 500),
        status: ["Pending", "Shipped", "Delivered"][randomInt(0, 2)],
    }));

// Month / Year comparison helpers
const getMonthComparison = () => {
    const now = new Date();
    const monthIndex = now.getMonth(); // 0 = Jan
    const thisMonth = incomeData[monthIndex];
    const lastMonth = incomeData[monthIndex === 0 ? 11 : monthIndex - 1];

    return {
        incomeChange: (((thisMonth.income - lastMonth.income) / lastMonth.income) * 100).toFixed(1),
        customersChange: (((thisMonth.newCustomers - lastMonth.newCustomers) / lastMonth.newCustomers) * 100).toFixed(1),
        thisIncome: thisMonth.income,
        thisCustomers: thisMonth.newCustomers,
    };
};

const getYearComparison = () => {
    const currentYearTotal = incomeData.reduce((acc, m) => acc + m.income, 0);
    const previousYearTotal = currentYearTotal * (0.9 + Math.random() * 0.2); // mock last year ~10% variation
    const currentCustomers = incomeData.reduce((acc, m) => acc + m.newCustomers, 0);
    const previousCustomers = currentCustomers * (0.9 + Math.random() * 0.2);

    return {
        incomeChange: (((currentYearTotal - previousYearTotal) / previousYearTotal) * 100).toFixed(1),
        customersChange: (((currentCustomers - previousCustomers) / previousCustomers) * 100).toFixed(1),
        thisIncome: currentYearTotal,
        thisCustomers: currentCustomers,
    };
};

export default function Dashboard() {
    const navigate = useNavigate();
    const comments = useMemo(() => generateComments(), []);
    const orders = useMemo(() => generateOrders(), []);

    // Yearly totals
    const yearlyTotals = useMemo(() => getYearlyTotals(), []);

    // State for live metrics
    const [customers, setCustomers] = useState(yearlyTotals.newCustomers);
    const [income, setIncome] = useState(yearlyTotals.income);
    const [ordersToday] = useState(randomInt(20, 80));
    const [ticketsOpen] = useState(randomInt(2, 15));

    // Random change percentages
    const changes = useMemo(() => ({
        customers: randomInt(2, 12),
        income: randomInt(5, 18),
        ordersToday: randomInt(-3, 10),
        ticketsOpen: randomInt(-5, 5),
    }), []);

    // Animate live metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setCustomers(prev => prev + randomInt(0, 3));
            setIncome(prev => prev + randomInt(2000, 15000));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Month & Year comparisons
    const monthComparison = useMemo(() => getMonthComparison(), []);
    const yearComparison = useMemo(() => getYearComparison(), []);

    const formatCurrency = val =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
                <p className="text-gray-400">Overview of your store performance</p>
            </div>

            {/* Month / Year Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Income (This Month)"
                    value={formatCurrency(monthComparison.thisIncome)}
                    change={parseFloat(monthComparison.incomeChange)}
                    currency="$"
                    animated
                />
                <StatCard
                    title="New Customers (This Month)"
                    value={monthComparison.thisCustomers.toLocaleString()}
                    change={parseFloat(monthComparison.customersChange)}
                    animated
                />
                <StatCard
                    title="Income (This Year)"
                    value={formatCurrency(yearComparison.thisIncome)}
                    change={parseFloat(yearComparison.incomeChange)}
                    currency="$"
                    animated
                />
                <StatCard
                    title="New Customers (This Year)"
                    value={yearComparison.thisCustomers.toLocaleString()}
                    change={parseFloat(yearComparison.customersChange)}
                    animated
                />
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Customers" value={customers.toLocaleString()} change={changes.customers} animated />
                <StatCard title="Income" value={formatCurrency(income)} change={changes.income} currency="$" animated />
                <StatCard title="Orders Today" value={ordersToday} change={changes.ordersToday} animated />
                <StatCard title="Open Tickets" value={ticketsOpen} change={changes.ticketsOpen} animated />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Income Chart */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md h-96">
                        <h3 className="text-lg font-semibold text-gray-100 mb-4">Income (Last 30 Days)</h3>
                        <IncomeChart />
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-100">Recent Orders</h3>
                            <button onClick={() => navigate("/orders")} className="text-sm text-green-400 hover:underline">
                                View all
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-gray-400 uppercase border-b border-gray-700">
                                    <tr>
                                        <th className="px-3 py-2">Order ID</th>
                                        <th className="px-3 py-2">Customer</th>
                                        <th className="px-3 py-2">Total</th>
                                        <th className="px-3 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {orders.map(o => (
                                        <tr key={o.id} className="hover:bg-gray-800 cursor-pointer" onClick={() => navigate("/orders")}>
                                            <td className="px-3 py-2">{o.id}</td>
                                            <td className="px-3 py-2">{o.customer}</td>
                                            <td className="px-3 py-2">{formatCurrency(o.total)}</td>
                                            <td className={`px-3 py-2 font-medium ${o.status === "Delivered" ? "text-green-400" : o.status === "Shipped" ? "text-yellow-400" : "text-red-400"}`}>
                                                {o.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Latest Comments */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-100">Latest Comments</h3>
                            <button onClick={() => navigate("/comments")} className="text-sm text-green-400 hover:underline">
                                View all
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {comments.map((c, idx) => (
                                <Motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                                    onClick={() => navigate("/comments")}
                                >
                                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-green-600" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-100 font-medium truncate">{c.name}</p>
                                        <p className="text-gray-400 text-sm truncate">{c.comment}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.status === "Approved" ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>
                                        {c.status}
                                    </span>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Popular Products */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md lg:sticky lg:top-24">
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">Popular Products</h3>

                        {/* Grid for products */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {productsData.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-800 p-3 rounded-lg flex flex-col items-start"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-24 object-cover rounded mb-2"
                                    />
                                    <h4 className="text-gray-100 font-medium text-sm truncate">{product.name}</h4>
                                    <p className="text-gray-400 text-xs">{product.category}</p>
                                    <p className="text-green-400 font-semibold mt-1">${product.price.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
