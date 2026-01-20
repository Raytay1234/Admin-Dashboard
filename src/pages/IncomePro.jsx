// src/pages/IncomePro.jsx
import { motion as Motion } from "framer-motion";
import Layout from "../components/Layout.jsx";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import { incomeData, getYearlyTotals } from "../data/incomeData.js";

export default function IncomePro() {
  const totals = getYearlyTotals();

  const metrics = [
    { title: "Total Income", value: totals.income, trend: 12, type: "currency" },
    { title: "Orders", value: totals.orders, trend: -5 },
    { title: "New Customers", value: totals.newCustomers, trend: 18 },
    { title: "Refunds", value: totals.refunds, trend: -2 },
  ];

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6 text-gray-100">
        Income Dashboard
      </h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((m, idx) => (
          <Motion.div
            key={m.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 rounded-xl shadow-sm flex flex-col gap-3
              bg-gray-900 text-gray-100
              transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400">
                {m.title}
              </span>

              <span
                className={`flex items-center gap-1 text-xs font-medium ${m.trend >= 0 ? "text-green-400" : "text-red-400"
                  }`}
              >
                {m.trend >= 0 ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {Math.abs(m.trend)}%
              </span>
            </div>

            <span className="text-xl font-semibold">
              {m.type === "currency"
                ? formatCurrency(m.value)
                : m.value}
            </span>

            {/* Mini Sparkline */}
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeData}>
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Full Monthly Revenue Chart */}
      <div className="p-4 rounded-xl shadow-sm bg-gray-900 text-gray-100">
        <h2 className="font-semibold text-lg mb-4">
          Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={incomeData}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(val) => `$${val.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                color: "#f9fafb",
              }}
              formatter={(val) => `$${val.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}
