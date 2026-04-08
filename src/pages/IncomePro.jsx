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
  Legend,
} from "recharts";
import * as Icons from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { getMonthlyRevenue } from "../data/analytics.js";
import useCurrency from "../hooks/useCurrency.js";

export default function IncomePro() {
  const [downloadMenu, setDownloadMenu] = useState(false);

  const { format, convert } = useCurrency();

  const ArrowUp = Icons.ArrowUp;
  const ArrowDown = Icons.ArrowDown;

  // -----------------------------
  // DATA SOURCE
  // -----------------------------
  const rawData = useMemo(() => getMonthlyRevenue(), []);

  // -----------------------------
  // NORMALIZED DATA
  // -----------------------------
  const data = useMemo(() => {
    return rawData.map((d) => ({
      ...d,
      income: convert(d.income),
      newCustomers: Math.round(d.orders * 0.3),
      refunds: Math.round(d.orders * 0.05),
    }));
  }, [rawData, convert]);

  // -----------------------------
  // TOTALS
  // -----------------------------
  const totals = useMemo(() => {
    return data.reduce(
      (acc, c) => ({
        income: acc.income + c.income,
        orders: acc.orders + c.orders,
        customers: acc.customers + c.newCustomers,
        refunds: acc.refunds + c.refunds,
      }),
      { income: 0, orders: 0, customers: 0, refunds: 0 }
    );
  }, [data]);

  // -----------------------------
  // PREVIOUS PERIOD (FOR GROWTH)
  // -----------------------------
  const prevTotals = useMemo(() => {
    const prev = rawData.slice(0, -1);
    return prev.reduce(
      (acc, c) => ({
        income: acc.income + convert(c.income),
        orders: acc.orders + c.orders,
        customers: acc.customers + Math.round(c.orders * 0.3),
        refunds: acc.refunds + Math.round(c.orders * 0.05),
      }),
      { income: 0, orders: 0, customers: 0, refunds: 0 }
    );
  }, [rawData, convert]);

  // -----------------------------
  // GROWTH CALC
  // -----------------------------
  const getGrowth = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  // -----------------------------
  // DOWNLOAD
  // -----------------------------
  const downloadData = (type) => {
    const rows = data.map((d) => ({
      Period: d.month,
      Income: format(d.income),
      Orders: d.orders,
    }));

    if (type === "csv") {
      const csv = [
        Object.keys(rows[0]).join(","),
        ...rows.map((r) => Object.values(r).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "income.csv";
      link.click();
    }

    if (type === "json") {
      const blob = new Blob([JSON.stringify(rows, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "income.json";
      link.click();
    }

    if (type === "pdf") {
      const doc = new jsPDF();
      doc.text("Income Report", 14, 20);

      autoTable(doc, {
        startY: 25,
        head: [["Period", "Income", "Orders"]],
        body: rows.map((r) => [r.Period, r.Income, r.Orders]),
      });

      doc.save("income.pdf");
    }

    setDownloadMenu(false);
  };

  // -----------------------------
  // KPI CARDS
  // -----------------------------
  const kpis = [
    {
      title: "Revenue",
      value: totals.income,
      prev: prevTotals.income,
      type: "currency",
    },
    {
      title: "Orders",
      value: totals.orders,
      prev: prevTotals.orders,
    },
    {
      title: "Customers",
      value: totals.customers,
      prev: prevTotals.customers,
    },
    {
      title: "Refunds",
      value: totals.refunds,
      prev: prevTotals.refunds,
    },
  ];

  // -----------------------------
  // INSIGHTS
  // -----------------------------
  const insights = useMemo(() => {
    const avgOrderValue =
      totals.orders > 0 ? totals.income / totals.orders : 0;

    return {
      avgOrderValue,
      refundRate:
        totals.orders > 0 ? (totals.refunds / totals.orders) * 100 : 0,
    };
  }, [totals]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="p-6 space-y-8 bg-linear-to-b from-gray-950 to-gray-900 min-h-screen text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Revenue Intelligence</h1>
          <p className="text-gray-400 text-sm">
            Enterprise-grade income analytics
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setDownloadMenu(!downloadMenu)}
            className="px-4 py-2 bg-green-500 text-black rounded-lg"
          >
            Export
          </button>

          {downloadMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow">
              {["csv", "json", "pdf"].map((t) => (
                <button
                  key={t}
                  onClick={() => downloadData(t)}
                  className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const growth = getGrowth(k.value, k.prev);
          const positive = growth >= 0;

          return (
            <Motion.div
              key={k.title}
              className="p-5 bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-800"
            >
              <p className="text-gray-400 text-sm">{k.title}</p>

              <h2 className="text-2xl font-bold mt-1">
                {k.type === "currency"
                  ? format(k.value)
                  : k.value.toLocaleString()}
              </h2>

              <div
                className={`flex items-center gap-1 text-sm mt-1 ${
                  positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {positive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(growth).toFixed(1)}%
              </div>
            </Motion.div>
          );
        })}
      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Avg Order Value</p>
          <h3 className="text-xl font-bold">
            {format(insights.avgOrderValue)}
          </h3>
        </div>

        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Refund Rate</p>
          <h3 className="text-xl font-bold text-yellow-400">
            {insights.refundRate.toFixed(2)}%
          </h3>
        </div>
      </div>

      {/* CHART */}
      <div className="p-5 bg-gray-900/60 rounded-2xl border border-gray-800">
        <h2 className="mb-4 font-semibold">Revenue Trend</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}