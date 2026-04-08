/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { customersData } from "../data/customersData.js";

const BATCH_SIZE = 8;

// ---------------- SUMMARY CARD ----------------
const SummaryCard = ({ title, value, color }) => (
  <Motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-gray-700 hover:scale-[1.02] transition"
  >
    <p className="text-gray-400 text-sm">{title}</p>
    <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
  </Motion.div>
);

export default function Customers() {
  const [displayed, setDisplayed] = useState(
    customersData.slice(0, BATCH_SIZE)
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const indexRef = useRef(BATCH_SIZE);
  const loaderRef = useRef(null);
  const isLoadingRef = useRef(false);

  // ---------------- FILTER ----------------
  const filteredData = useMemo(() => {
    return customersData.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ? true : c.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  useEffect(() => {
    setDisplayed(filteredData.slice(0, BATCH_SIZE));
    indexRef.current = BATCH_SIZE;
  }, [filteredData]);

  // ---------------- SUMMARY ----------------
  const summary = useMemo(() => {
    const total = filteredData.length;
    const active = filteredData.filter(c => c.status === "Active").length;
    const inactive = filteredData.filter(c => c.status === "Inactive").length;

    const totalOrders = filteredData.reduce(
      (acc, c) => acc + (c.totalOrders || 0),
      0
    );

    const topSpender = filteredData.reduce((max, c) =>
      (c.totalSpent || 0) > (max?.totalSpent || 0) ? c : max,
      filteredData[0]
    );

    return { total, active, inactive, totalOrders, topSpender };
  }, [filteredData]);

  // ---------------- LOAD MORE ----------------
  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    if (indexRef.current >= filteredData.length) return;

    isLoadingRef.current = true;

    const nextIndex = indexRef.current + BATCH_SIZE;
    const nextBatch = filteredData.slice(indexRef.current, nextIndex);

    setDisplayed(prev => [...prev, ...nextBatch]);
    indexRef.current = nextIndex;

    isLoadingRef.current = false;
  }, [filteredData]);

  // ---------------- OBSERVER ----------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "150px" }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [loadMore]);

  const hasMore = displayed.length < filteredData.length;

  return (
    <div className="p-6 lg:p-8 bg-linear-to-br from-gray-950 via-gray-900 to-black min-h-screen space-y-8 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-gray-400 mt-1">
          Manage and analyze your customer base
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full md:w-1/2 p-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-indigo-500 outline-none transition"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-indigo-500"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Customers" value={summary.total} color="text-white" />
        <SummaryCard title="Active" value={summary.active} color="text-green-400" />
        <SummaryCard title="Inactive" value={summary.inactive} color="text-red-400" />
        <SummaryCard title="Total Orders" value={summary.totalOrders} color="text-yellow-400" />
      </div>

      {/* TOP SPENDER */}
      {summary.topSpender && (
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-linear-to-r from-yellow-600/20 to-yellow-400/10 border border-yellow-500/30 p-5 rounded-2xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2 text-yellow-300">
            🏆 Top Customer
          </h2>
          <p className="text-xl font-bold">{summary.topSpender.name}</p>
          <p className="text-yellow-400 text-lg">
            ${summary.topSpender.totalSpent || 0}
          </p>
        </Motion.div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayed.map((c) => (
          <Motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 p-4 rounded-2xl shadow-lg cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={c.avatar}
                className="w-12 h-12 rounded-full ring-2 ring-indigo-500 object-cover"
                alt={c.name}
              />
              <div className="min-w-0">
                <p className="font-medium truncate">{c.name}</p>
                <p className="text-sm text-gray-400 truncate">{c.email}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-400 mt-4">
              <span>Orders: {c.totalOrders}</span>
              <span>{c.joined}</span>
            </div>

            <span
              className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                c.status === "Active"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {c.status}
            </span>
          </Motion.div>
        ))}
      </div>

      {/* LOADER */}
      {hasMore && (
        <div ref={loaderRef} className="text-center text-gray-500">
          Loading more customers...
        </div>
      )}

      {/* EMPTY */}
      {displayed.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No customers found
        </div>
      )}
    </div>
  );
}