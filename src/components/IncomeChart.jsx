import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { useEffect, useState } from "react";
import { fetchIncomeChart } from "../data/api.js";
import useTheme from "../hooks/useTheme.js";

export default function IncomeChart() {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Fetch data in format: [{ name: "Jan", income: 5000, expenses: 3000, profit: 2000 }, ...]
    fetchIncomeChart().then(setData);
  }, []);

  const currencyFormatter = (value) => `$${value.toLocaleString()}`;

  // Adjust colors dynamically based on theme
  const colors = {
    text: theme === "dark" ? "#E5E7EB" : "#1F2937", // gray-100 / gray-800
    axis: theme === "dark" ? "#9CA3AF" : "#6B7280", // gray-400 / gray-500
    grid: theme === "dark" ? "#374151" : "#E5E7EB", // gray-700 / gray-200
    income: "#22c55e",
    expenses: "#ef4444",
    profit: "#3b82f6",
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md transition-colors ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{`Monthly Financial Overview`}</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />

          <XAxis
            dataKey="name"
            stroke={colors.axis}
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.axis }}
          />
          <YAxis
            stroke={colors.axis}
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.axis }}
            tickFormatter={currencyFormatter}
          />

          <Tooltip
            formatter={(value) => currencyFormatter(value)}
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1F2937" : "#fff",
              border: "1px solid",
              borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
              color: theme === "dark" ? "#E5E7EB" : "#1F2937",
            }}
          />

          <Legend
            wrapperStyle={{
              color: theme === "dark" ? "#E5E7EB" : "#1F2937",
            }}
          />

          {/* Income */}
          <Bar dataKey="income" fill={colors.income} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="income" position="top" formatter={currencyFormatter} />
          </Bar>

          {/* Expenses */}
          <Bar dataKey="expenses" fill={colors.expenses} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="expenses" position="top" formatter={currencyFormatter} />
          </Bar>

          {/* Profit */}
          <Bar dataKey="profit" fill={colors.profit} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="profit" position="top" formatter={currencyFormatter} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
