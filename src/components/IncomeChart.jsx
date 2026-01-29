// src/components/IncomeChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Props:
 * data = array of objects, e.g. [{ month: "Jan", income: 45000, newCustomers: 35 }]
 * xKey = string key for x-axis (default: "month")
 * yKeys = array of keys for y-axis lines (default: ["income"])
 * colors = array of colors for lines (default: ["#10B981"])
 */
export default function IncomeChart({
  data = [],
  xKey = "month",
  yKeys = ["income"],
  colors = ["#10B981"],
}) {
  if (!data || data.length === 0) {
    return <p className="text-gray-300">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
        <XAxis dataKey={xKey} stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip
          contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }}
        />
        <Legend />
        {yKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index] || "#10B981"}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
