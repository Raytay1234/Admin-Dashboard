// src/components/IncomeChart.jsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Line,
  Legend,
} from "recharts";

export default function IncomeChart({ data }) {
  const [viewMode, setViewMode] = useState("monthly"); // "monthly" | "ytd"

  const chartData = useMemo(() => data, [data]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode("monthly")}
          className={`px-3 py-1 rounded ${viewMode === "monthly" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setViewMode("ytd")}
          className={`px-3 py-1 rounded ${viewMode === "ytd" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Year-to-Date
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }} labelStyle={{ color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#ccc" }} />
          {viewMode === "monthly" && <Bar dataKey="income" fill="#22c55e" name="Monthly Income" />}
          {viewMode === "ytd" && <Line type="monotone" dataKey="cumulativeIncome" stroke="#3b82f6" strokeWidth={2} name="Year-to-Date Income" />}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
