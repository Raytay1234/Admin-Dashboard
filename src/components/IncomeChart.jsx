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

export default function IncomeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data in format: [{ name: "Jan", income: 5000, expenses: 3000, profit: 2000 }, ...]
    fetchIncomeChart().then(setData);
  }, []);

  const currencyFormatter = (value) => `$${value.toLocaleString()}`;

  // Dark-only colors
  const colors = {
    text: "#E5E7EB", // gray-100
    axis: "#9CA3AF", // gray-400
    grid: "#374151", // gray-700
    income: "#22c55e",
    expenses: "#ef4444",
    profit: "#3b82f6",
    tooltipBg: "#1F2937", // gray-800
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-gray-900 text-gray-100 transition">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Financial Overview
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
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
              backgroundColor: colors.tooltipBg,
              border: "1px solid",
              borderColor: colors.grid,
              color: colors.text,
            }}
          />

          <Legend wrapperStyle={{ color: colors.text }} />

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
