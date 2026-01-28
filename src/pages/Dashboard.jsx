import { useContext, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import { productsData } from "../data/products.js";
import DashboardContext from "../context/DashboardContext.js";

// Helpers
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));

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

export default function Dashboard() {
    const navigate = useNavigate();

    // Consume Dashboard context
    const { customers, income, ordersToday, ticketsOpen, chartData } = useContext(DashboardContext);

    const comments = useMemo(() => generateComments(), []);
    const orders = useMemo(() => generateOrders(), []);

    // Month / Year comparisons (static example)
    const monthIndex = new Date().getMonth();
    const monthComparison = useMemo(() => {
        const thisMonth = chartData[monthIndex];
        const lastMonth = chartData[monthIndex === 0 ? 11 : monthIndex - 1];
        return {
            thisIncome: thisMonth.income,
            thisCustomers: thisMonth.newCustomers,
            incomeChange: ((thisMonth.income - lastMonth.income) / lastMonth.income) * 100,
            customersChange: ((thisMonth.newCustomers - lastMonth.newCustomers) / lastMonth.newCustomers) * 100,
        };
    }, [chartData, monthIndex]);

    const yearComparison = useMemo(() => {
        const currentYearTotal = chartData.reduce((acc, m) => acc + m.income, 0);
        const previousYearTotal = currentYearTotal * 0.95; // 5% growth for simplicity
        const currentCustomers = chartData.reduce((acc, m) => acc + m.newCustomers, 0);
        const previousCustomers = currentCustomers * 0.95;
        return {
            thisIncome: currentYearTotal,
            thisCustomers: currentCustomers,
            incomeChange: ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100,
            customersChange: ((currentCustomers - previousCustomers) / previousCustomers) * 100,
        };
    }, [chartData]);

    const formatCurrency = (val) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

    const changes = useMemo(
        () => ({
            customers: randomInt(2, 12),
            income: randomInt(5, 18),
            ordersToday: randomInt(-3, 10),
            ticketsOpen: randomInt(-5, 5),
        }),
        []
    );

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                <p className="text-gray-400 mt-1">Overview of your store performance</p>
            </div>

            {/* Month / Year Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Income (This Month)"
                    value={formatCurrency(monthComparison.thisIncome)}
                    change={monthComparison.incomeChange}
                    currency="$"
                    animated
                />
                <StatCard
                    title="New Customers (This Month)"
                    value={monthComparison.thisCustomers.toLocaleString()}
                    change={monthComparison.customersChange}
                    animated
                />
                <StatCard
                    title="Income (This Year)"
                    value={formatCurrency(yearComparison.thisIncome)}
                    change={yearComparison.incomeChange}
                    currency="$"
                    animated
                />
                <StatCard
                    title="New Customers (This Year)"
                    value={yearComparison.thisCustomers.toLocaleString()}
                    change={yearComparison.customersChange}
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
                {/* Left Side */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Income Chart */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-96 flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-4">Income (Last 30 Days)</h3>
                        <IncomeChart data={chartData} />
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                            <button onClick={() => navigate("/orders")} className="text-green-400 hover:underline text-sm">
                                View all
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-gray-300 border-separate border-spacing-y-2">
                                <thead className="text-gray-400 uppercase border-b border-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Order ID</th>
                                        <th className="px-4 py-2 text-left">Customer</th>
                                        <th className="px-4 py-2 text-left">Total</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o) => (
                                        <tr
                                            key={o.id}
                                            className="bg-gray-700 hover:bg-gray-600 transition rounded-lg cursor-pointer"
                                            onClick={() => navigate("/orders")}
                                        >
                                            <td className="px-4 py-2">{o.id}</td>
                                            <td className="px-4 py-2">{o.customer}</td>
                                            <td className="px-4 py-2">{formatCurrency(o.total)}</td>
                                            <td
                                                className={`px-4 py-2 font-medium ${o.status === "Delivered"
                                                        ? "text-green-400"
                                                        : o.status === "Shipped"
                                                            ? "text-yellow-400"
                                                            : "text-red-400"
                                                    }`}
                                            >
                                                {o.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Latest Comments */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Latest Comments</h3>
                            <button onClick={() => navigate("/comments")} className="text-green-400 hover:underline text-sm">
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
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => navigate("/comments")}
                                >
                                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-green-500" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{c.name}</p>
                                        <p className="text-gray-300 text-sm truncate">{c.comment}</p>
                                    </div>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${c.status === "Approved" ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Popular Products */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg lg:sticky lg:top-24">
                        <h3 className="text-lg font-semibold mb-4 text-white">Popular Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {productsData.slice(0, 4).map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-700 p-3 rounded-xl flex flex-col items-start hover:scale-105 transition transform shadow-md"
                                >
                                    <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                                    <h4 className="text-white font-medium text-sm truncate">{product.name}</h4>
                                    <p className="text-gray-300 text-xs">{product.category}</p>
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
