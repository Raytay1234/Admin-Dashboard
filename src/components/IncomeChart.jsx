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
import { incomeData } from "../data/incomeData.js";

export default function IncomeChart() {
  const [viewMode, setViewMode] = useState("monthly"); // "monthly" | "ytd"

  // Compute chart data immutably
  const chartData = useMemo(() => {
    return incomeData.reduce((acc, month) => {
      const cumulative = acc.reduce((sum, item) => sum + item.income, 0) + month.income;
      acc.push({
        month: month.month,
        income: month.income,
        orders: month.orders,
        newCustomers: month.newCustomers,
        cumulativeIncome: cumulative,
      });
      return acc;
    }, []);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Toggle buttons */}
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
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#ccc" }} />
          {/* Bars for monthly income */}
          {viewMode === "monthly" && <Bar dataKey="income" fill="#22c55e" name="Monthly Income" />}
          {/* Line for YTD cumulative income */}
          {viewMode === "ytd" && (
            <Line
              type="monotone"
              dataKey="cumulativeIncome"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Year-to-Date Income"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
