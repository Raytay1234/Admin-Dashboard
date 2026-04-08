import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext.js";
import { useAuth } from "../context/useAuth.js";
import { getMonthlyRevenue } from "../data/analytics.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function Reports() {
  const { products } = useContext(ProductContext);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [dateFilter, setDateFilter] = useState("30d");

  const safeProducts = useMemo(
    () => (products || []).filter(Boolean),
    [products]
  );

  // -----------------------------
  // DATE FILTER ENGINE
  // -----------------------------
  const revenueData = useMemo(() => {
    const data = getMonthlyRevenue();

    if (dateFilter === "7d") return data.slice(-2);
    if (dateFilter === "30d") return data.slice(-6);

    return data;
  }, [dateFilter]);

  // -----------------------------
  // KPI ENGINE (WITH REVENUE)
  // -----------------------------
  const metrics = useMemo(() => {
    const totalRevenue = revenueData.reduce((s, d) => s + d.income, 0);
    const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);

    const totalProducts = safeProducts.length;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
    };
  }, [revenueData, safeProducts]);

  // -----------------------------
  // CATEGORY DATA (CLICKABLE)
  // -----------------------------
  const categoryData = useMemo(() => {
    const map = {};

    safeProducts.forEach((p) => {
      const cat = p.category || "uncategorized";

      if (!map[cat]) {
        map[cat] = {
          category: cat,
          count: 0,
          stock: 0,
        };
      }

      map[cat].count += 1;
      map[cat].stock += Number(p.stock) || 0;
    });

    return Object.values(map);
  }, [safeProducts]);

  if (!isAdmin) return <div className="p-10 text-red-400">Access denied</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-400 text-sm">Business intelligence</p>
        </div>

        {/* DATE FILTER */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded-lg"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KPI title="Revenue" value={`$${metrics.totalRevenue.toLocaleString()}`} />
        <KPI title="Orders" value={metrics.totalOrders} />
        <KPI title="Products" value={metrics.totalProducts} />
      </div>

      {/* REVENUE CHART */}
      <div className="bg-gray-900 p-5 rounded-xl">
        <h3 className="mb-4 font-semibold">Revenue Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="income" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CATEGORY CHART (CLICKABLE) */}
      <div className="bg-gray-900 p-5 rounded-xl">
        <h3 className="mb-4 font-semibold">Categories</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="count"
              fill="#6366f1"
              onClick={(data) => {
                navigate(`/reports/category/${data.category}`);
              }}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}