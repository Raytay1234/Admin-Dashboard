// src/pages/Dashboard.jsx
import Layout from "../components/Layout.jsx";
import StatCard from "../components/StatCard.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import { productsData } from "../data/products.js";
import { motion as Motion } from "framer-motion";

// Mock comments generator (for preview)
const generateComments = () =>
    Array.from({ length: 5 }).map((_, i) => ({
        id: `CMT${i + 1}`,
        name: `User ${i + 1}`,
        avatar: `https://i.pravatar.cc/100?img=${i + 10}`,
        comment: `This is a preview comment number ${i + 1}.`,
        status: Math.random() > 0.5 ? "Approved" : "Pending",
    }));

export default function Dashboard() {
    const previewComments = generateComments();

    return (
        <Layout>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
                <p className="text-sm text-gray-400">
                    Overview of your store performance
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT: Stats + Charts */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard title="Customers" value="10,243" change={8} animated />
                        <StatCard
                            title="Income"
                            value="39,403,450"
                            change={12}
                            currency="$"
                            animated
                        />
                    </div>

                    {/* Income Chart */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                        <IncomeChart />
                    </div>

                    {/* Top Trending Products */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">
                            Top Trending Products
                        </h3>
                        <PopularProducts products={productsData} topOnly variant="grid" />
                    </div>

                    {/* Latest Comments Preview */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">
                            Latest Comments
                        </h3>

                        <div className="flex flex-col gap-3">
                            {previewComments.map((c, idx) => (
                                <Motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                                >
                                    <img
                                        src={c.avatar}
                                        alt={c.name}
                                        className="w-10 h-10 rounded-full object-cover border border-green-600"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-100 font-medium truncate">
                                            {c.name}
                                        </p>
                                        <p className="text-gray-400 text-sm truncate">
                                            {c.comment}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${c.status === "Approved"
                                                ? "bg-green-900/40 text-green-400"
                                                : "bg-yellow-900/40 text-yellow-400"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Popular Products */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md lg:sticky lg:top-24">
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">
                            Popular Products
                        </h3>
                        <PopularProducts products={productsData} isLoading={false} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
