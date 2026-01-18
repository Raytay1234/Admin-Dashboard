// src/pages/Dashboard.jsx
import Layout from "../components/Layout.jsx";
import StatCard from "../components/StatCard.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import { productsData } from "../data/products.js";

export default function Dashboard() {
    return (
        <Layout>
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview of your store performance
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Stats + Charts */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard title="Customers" value="10,243" change={8} animated />
                        <StatCard title="Income" value="39,403,450" change={12} currency="$" animated />
                    </div>

                    {/* Income Chart */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                        <IncomeChart />
                    </div>

                    {/* Top Trending Products */}
                    <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Top Trending Products
                        </h3>
                        <PopularProducts
                            products={productsData.slice(0, 4)}
                            isLoading={false}
                            topOnly
                        />
                    </div>
                </div>

                {/* Right Column: All Popular Products */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Popular Products
                        </h3>
                        <PopularProducts products={productsData} isLoading={false} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
