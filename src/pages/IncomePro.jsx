// src/pages/IncomePro.jsx
import { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import * as LucideIcons from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { incomeData } from "../data/incomeData.js";

const PERIODS = ["daily", "weekly", "monthly", "yearly"];

export default function IncomePro() {
  const [period, setPeriod] = useState("monthly");
  const [downloadMenu, setDownloadMenu] = useState(false);

  // Safely get icons
  const ArrowUp = LucideIcons.ArrowUp || (() => <span>↑</span>);
  const ArrowDown = LucideIcons.ArrowDown || (() => <span>↓</span>);

  // Filtered data based on period
  const filteredData = useMemo(() => {
    const lastMonth = incomeData[incomeData.length - 1];

    switch (period) {
      case "daily":
        return Array.from({ length: 7 }).map((_, i) => ({
          month: `Day ${i + 1}`,
          income: Math.round(lastMonth.income / 30),
          orders: Math.round(lastMonth.orders / 30),
          newCustomers: Math.round(lastMonth.newCustomers / 30),
          refunds: Math.round(lastMonth.refunds / 30),
        }));
      case "weekly":
        return Array.from({ length: 4 }).map((_, i) => ({
          month: `Week ${i + 1}`,
          income: Math.round(lastMonth.income / 4),
          orders: Math.round(lastMonth.orders / 4),
          newCustomers: Math.round(lastMonth.newCustomers / 4),
          refunds: Math.round(lastMonth.refunds / 4),
        }));
      case "yearly":
        return [
          {
            month: "This Year",
            income: incomeData.reduce((a, b) => a + b.income, 0),
            orders: incomeData.reduce((a, b) => a + b.orders, 0),
            newCustomers: incomeData.reduce((a, b) => a + b.newCustomers, 0),
            refunds: incomeData.reduce((a, b) => a + b.refunds, 0),
          },
        ];
      default:
        return incomeData; // monthly
    }
  }, [period]);

  const totals = useMemo(
    () =>
      filteredData.reduce(
        (acc, curr) => {
          acc.income += curr.income || 0;
          acc.orders += curr.orders || 0;
          acc.newCustomers += curr.newCustomers || 0;
          acc.refunds += curr.refunds || 0;
          return acc;
        },
        { income: 0, orders: 0, newCustomers: 0, refunds: 0 }
      ),
    [filteredData]
  );

  const metrics = [
    { title: "Total Income", value: totals.income, trend: 12, key: "income", type: "currency" },
    { title: "Orders", value: totals.orders, trend: -5, key: "orders" },
    { title: "New Customers", value: totals.newCustomers, trend: 18, key: "newCustomers" },
    { title: "Refunds", value: totals.refunds, trend: -2, key: "refunds" },
  ];

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const getSparklineData = (key) => filteredData.map((m) => ({ month: m.month, value: m[key] || 0 }));

  // --- Download function ---
  const downloadData = (type) => {
    const data = filteredData.map(d => ({
      Period: d.month,
      Income: d.income,
      Orders: d.orders,
      NewCustomers: d.newCustomers,
      Refunds: d.refunds,
    }));

    if (type === "csv") {
      const csv = [
        Object.keys(data[0]).join(","), // headers
        ...data.map(row => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "income.csv");
      link.click();
    }

    if (type === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "income.json");
      link.click();
    }

    if (type === "pdf") {
      const doc = new jsPDF();
      doc.text("Income Report", 14, 20);

      autoTable(doc, {
        startY: 25,
        head: [["Period", "Income", "Orders", "New Customers", "Refunds"]],
        body: data.map(d => [
          d.Period,
          `$${d.Income.toLocaleString()}`,
          d.Orders,
          d.NewCustomers,
          d.Refunds,
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [34, 197, 94] },
      });

      doc.save("income.pdf");
    }

    setDownloadMenu(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Income Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Overview of your store&apos;s revenue and performance
        </p>
      </div>

      {/* Period Filter + Download */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
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

        {/* Download Dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setDownloadMenu(!downloadMenu)}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            Download ▾
          </button>
          {downloadMenu && (
            <div className="absolute mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-50 flex flex-col">
              {["csv", "json", "pdf"].map(type => (
                <button
                  key={type}
                  onClick={() => downloadData(type)}
                  className="px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 transition text-left"
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <Motion.div
            key={m.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 rounded-2xl shadow-lg flex flex-col gap-3
              bg-gray-800 text-gray-100
              transition transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-700"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400">{m.title}</span>
              <span className={`flex items-center gap-1 text-xs font-semibold ${m.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
                {m.trend >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {Math.abs(m.trend)}%
              </span>
            </div>

            <span className="text-2xl font-bold">
              {m.type === "currency" ? formatCurrency(m.value) : m.value.toLocaleString()}
            </span>

            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getSparklineData(m.key)}>
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Full Chart */}
      <div className="p-6 rounded-2xl shadow-lg bg-gray-800 text-gray-100">
        <h2 className="font-semibold text-lg mb-4">Income Chart ({period})</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={filteredData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={(val) => `$${val.toLocaleString()}`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", color: "#f9fafb" }}
              formatter={(val) => `$${val.toLocaleString()}`}
            />
            <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
