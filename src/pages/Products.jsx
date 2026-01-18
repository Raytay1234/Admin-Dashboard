// src/pages/Products.jsx
import { useState } from "react";
import Layout from "../components/Layout.jsx";
import useTheme from "../hooks/useTheme.js";
import { productsData } from "../data/products.js";

export default function Products() {
    const { theme } = useTheme();
    const [products] = useState(productsData);

    const formatPrice = (value) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

    return (
        <Layout>
            <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className={`p-4 rounded-xl shadow-sm flex flex-col gap-3 transition transform hover:-translate-y-1 hover:shadow-lg ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
                            }`}
                    >
                        <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold text-lg truncate">{p.name}</p>
                            <span className="text-sm text-gray-400 truncate">{p.category}</span>
                            <span className="font-medium">{formatPrice(p.price)}</span>
                            <span
                                className={`text-sm font-medium ${p.stock > 0 ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
