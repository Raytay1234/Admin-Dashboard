// src/pages/Promote.jsx
import { useState } from "react";
import { motion as Motion } from "framer-motion";

export default function Promote() {
    // State for promotions
    const [promotions, setPromotions] = useState([
        { title: "Flash Sale", description: "Boost sales with time-limited discounts", color: "bg-red-500" },
        { title: "New Arrival", description: "Highlight new products in your store", color: "bg-blue-500" },
        { title: "Top Deal", description: "Promote your best-selling items", color: "bg-green-500" },
    ]);

    // Form state
    const [form, setForm] = useState({ title: "", discount: "", description: "" });

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.description) return; // simple validation

        // Add new promotion
        setPromotions([
            ...promotions,
            {
                title: form.title,
                description: `${form.description} - Discount: ${form.discount || "N/A"}`,
                color: "bg-purple-500", // default color
            },
        ]);

        // Reset form
        setForm({ title: "", discount: "", description: "" });
    };

    return (
        <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Promote Products</h1>
                <p className="text-gray-400">Create and manage promotional campaigns</p>
            </div>

            {/* Promotion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {promotions.map((p, idx) => (
                    <PromoCard key={idx} {...p} />
                ))}
            </div>

            {/* Create Promotion */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-gray-100">
                <h2 className="text-xl font-semibold mb-4">Create Promotion</h2>

                <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Promotion title"
                        className="bg-gray-700 text-gray-100 border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                    <input
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        type="text"
                        placeholder="Discount (e.g. 20%)"
                        className="bg-gray-700 text-gray-100 border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Promotion description"
                        className="md:col-span-2 h-28 bg-gray-700 text-gray-100 border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />

                    <button
                        type="submit"
                        className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition-transform transform hover:scale-105"
                    >
                        Publish Promotion
                    </button>
                </form>
            </div>
        </div>
    );
}

// Promo Card Component
function PromoCard({ title, description, color }) {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`${color} text-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition transform`}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-white/90 text-sm mt-1">{description}</p>
        </Motion.div>
    );
}
