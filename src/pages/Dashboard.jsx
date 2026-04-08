import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";

import {
  getOrdersTotals,
  getMonthlyOrderTrend,
  getMonthlyComparison,
  getChange,
} from "../data/ordersData.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("monthly");

  // -----------------------------
  // SAFE DATA ENGINE (SHOPIFY STYLE)
  // -----------------------------
  const stats = useMemo(() => {
    const totals = getOrdersTotals() || {};
    const trendData = getMonthlyOrderTrend() || [];
    const comparison = getMonthlyComparison() || {};

    const current = comparison.current || {};
    const previous = comparison.previous || {};

    return {
      revenue: totals.totalRevenue || 0,
      orders: totals.totalOrders || 0,
      items: totals.totalItems || 0,
      statusCounts: totals.statusCounts || {},

      trends: {
        revenue: getChange(current.revenue || 0, previous.revenue || 0),
        orders: getChange(current.orders || 0, previous.orders || 0),
        items: getChange(current.items || 0, previous.items || 0),
      },

      sparklines: {
        revenue: trendData.map((d) => d?.revenue || 0),
        orders: trendData.map((d) => d?.orders || 0),
        items: trendData.map((d) => d?.items || 0),
      },

      chartData: trendData,
    };
  }, []); 

  // -----------------------------
  // SAFE TOP STATUS
  // -----------------------------
  const topStatus = useMemo(() => {
    const entries = Object.entries(stats.statusCounts || {});
    if (!entries.length) return null;

    return entries.sort((a, b) => b[1] - a[1])[0];
  }, [stats.statusCounts]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-white p-6 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Enterprise Analytics
          </h1>
          <p className="text-gray-400 text-sm">
            Advanced performance monitoring & insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-sm"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button
            onClick={() => navigate("/orders")}
            className="bg-green-500 hover:bg-green-600 px-5 py-2.5 rounded-xl"
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-xl"
          >
            Reports
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Revenue"
          value={stats.revenue}
          change={stats.trends.revenue}
          sparklineData={stats.sparklines.revenue}
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          type="number"
          change={stats.trends.orders}
          sparklineData={stats.sparklines.orders}
        />

        <StatCard
          title="Items Sold"
          value={stats.items}
          type="number"
          change={stats.trends.items}
          sparklineData={stats.sparklines.items}
        />

        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col justify-between">
          <div>
            <p className="text-gray-400 text-sm">Top Status</p>
            <h2 className="text-xl font-semibold mt-1">
              {topStatus ? topStatus[0] : "No data"}
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {topStatus ? `${topStatus[1]} orders` : "Empty dataset"}
          </p>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InsightCard title="Revenue Insight" value={stats.trends.revenue} />
        <InsightCard title="Orders Insight" value={stats.trends.orders} />
        <InsightCard title="Items Insight" value={stats.trends.items} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">
            Revenue vs Orders
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={stats.chartData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">
            Items Distribution
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.chartData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="items" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center bg-linear-to-r from-green-600/20 to-green-400/10 border border-green-500/20 p-6 rounded-2xl">
        <div>
          <h3 className="font-semibold text-lg">Enterprise Insights</h3>
          <p className="text-gray-400 text-sm">
            Monitor, analyze, and scale your business efficiently
          </p>
        </div>

        <button
          onClick={() => navigate("/reports")}
          className="bg-green-500 hover:bg-green-600 px-5 py-2.5 rounded-xl"
        >
          Explore Reports
        </button>
      </div>

    </div>
  );
}

// -----------------------------
// SAFE INSIGHT CARD
// -----------------------------
function InsightCard({ title, value }) {
  const safeValue = Number(value || 0);
  const isPositive = safeValue >= 0;

  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>

      <p
        className={`text-lg font-semibold mt-2 ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {isPositive ? "▲" : "▼"} {Math.abs(safeValue).toFixed(1)}%
      </p>

      <p className="text-xs text-gray-500 mt-1">
        {isPositive ? "Growth detected" : "Decline detected"}
      </p>
    </div>
  );
}