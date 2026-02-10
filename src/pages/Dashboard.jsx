// src/pages/Dashboard.jsx
import { useContext, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import DashboardContext from "../context/DashboardContext.js";
import useTickets from "../hooks/useTickets.js";
import { ProductContext } from "../context/ProductProvider.jsx";
import { ordersData, getOrdersTotals } from "../data/orders.js";
import { customersData } from "../data/customersData.js";
import { filterIncomeData, getYearlyTotals } from "../data/incomeData.js";

const PERIODS = ["daily", "weekly", "monthly", "yearly"];

export default function Dashboard() {
  const navigate = useNavigate();

  // --- Orders ---
  const totals = getOrdersTotals();

  // --- Tickets ---
  const { tickets } = useTickets();
  const openTickets = tickets?.filter(t => t.status === "Open").length || 0;

  // --- Products ---
  const { products, loading: productsLoading, error: productsError } = useContext(ProductContext);

  // --- Period Filter ---
  const [period, setPeriod] = useState("monthly");
  const filteredChartData = useMemo(() => filterIncomeData(period), [period]);

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

  // --- Customers ---
  const customerStats = useMemo(() => {
    const totalCustomers = customersData.length;
    const topSpender = customersData.reduce(
      (prev, curr) => (curr.totalSpent > prev.totalSpent ? curr : prev),
      customersData[0]
    );
    return { totalCustomers, topSpender };
  }, []);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen text-gray-100">
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
              ${period === p ? "bg-green-500 text-black font-semibold" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title={`Income (${period})`} value={stats.income} change={12} type="currency" />
        <StatCard title={`New Customers (${period})`} value={stats.newCustomers} change={5} type="number" />
        <StatCard title="Orders Today" value={totals.totalOrders} change={0} type="number" />
        <StatCard title="Open Tickets" value={openTickets} change={0} type="number" />
        <StatCard title="Total Customers" value={customerStats.totalCustomers} change={2} type="number" />
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
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Items</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.slice(-5).map((o) => (
                  <tr key={o.id} className="bg-gray-700 hover:bg-gray-600 cursor-pointer">
                    <td className="px-4 py-2">{o.customer}</td>
                    <td className="px-4 py-2">{o.items}</td>
                    <td className="px-4 py-2">{formatCurrency(o.total)}</td>
                    <td className="px-4 py-2">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Popular Products */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-4">Popular Products</h3>
            {productsLoading && <p className="text-gray-300">Loading products...</p>}
            {productsError && <p className="text-red-400">Error: {productsError}</p>}
            {!productsLoading && !productsError && products.length === 0 && (
              <p className="text-gray-300">No products available</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-700 p-3 rounded-xl hover:scale-105 transition cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-white text-sm font-medium truncate">{p.title}</h4>
                  <p className="text-gray-300 text-xs">{p.category}</p>
                  <p className="text-green-400 font-semibold mt-1">
                    ${p.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-96">
            <h3 className="text-lg font-semibold text-white mb-4">Top Customers</h3>
            {customersData.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{c.name}</p>
                  <p className="text-gray-400 text-sm truncate">{c.email}</p>
                </div>
                <p className="text-yellow-400 font-semibold">${c.totalSpent}</p>
              </div>
            ))}
            <button
              onClick={() => navigate("/customers")}
              className="text-green-400 text-sm hover:underline mt-2"
            >
              View all customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
