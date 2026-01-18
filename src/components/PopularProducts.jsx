// src/components/PopularProducts.jsx
import { motion as Motion } from "framer-motion";
import { ChevronRight, ArrowUp, ArrowDown } from "lucide-react";

export default function PopularProducts({ products = [], isLoading = false, topOnly = false }) {
  // Fallback products if none are passed
  const fallbackProducts = [
    { id: "A", name: "Product A", category: "UI Kit", price: 5461, trend: "up" },
    { id: "B", name: "Product B", category: "UX Kit", price: 3240, trend: "down" },
    { id: "C", name: "Product C", category: "Template", price: 4120, trend: "up" },
    { id: "D", name: "Product D", category: "Component", price: 2899, trend: "down" },
    { id: "E", name: "Product E Extra Long Name Example", category: "Plugin", price: 5200, trend: "up" },
    { id: "F", name: "Product F", category: "Template", price: 2980, trend: "up" },
    { id: "G", name: "Product G", category: "UX Kit", price: 4550, trend: "down" },
    { id: "H", name: "Product H", category: "UI Kit", price: 6120, trend: "up" },
  ];

  const displayProducts = products.length ? products : fallbackProducts;
  const productsToShow = topOnly ? displayProducts.slice(0, 4) : displayProducts;

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  return (
    <section className="rounded-xl border shadow-sm flex flex-col transition-colors
      bg-white text-gray-800 border-gray-200
      dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Products</h3>
        <span className="text-sm text-gray-400">{productsToShow.length} items</span>
      </div>

      {/* Grid List */}
      <div className="p-4 overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-[320px]">
          {isLoading
            ? Array.from({ length: topOnly ? 4 : 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse flex items-center gap-3 rounded-lg p-4 bg-gray-200 dark:bg-gray-700"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-300 dark:bg-gray-600" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-500" />
                  </div>
                  <div className="h-4 w-12 rounded bg-gray-300 dark:bg-gray-600" />
                </div>
              ))
            : productsToShow.map((p, idx) => (
                <Motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between gap-3 rounded-lg p-4 transition transform hover:shadow-lg hover:-translate-y-1 cursor-pointer
                    bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => alert(`Go to product ${p.name}`)}
                >
                  <img
                    src={p.image || `https://picsum.photos/seed/${p.id}/48/48`}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-200 dark:bg-gray-600"
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-medium truncate">{p.name}</p>
                    <span className="text-sm text-gray-400 truncate">{p.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold whitespace-nowrap">{formatPrice(p.price)}</p>
                    {p.trend && (
                      <span className={`flex items-center gap-1 text-xs font-medium ${p.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {p.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {p.trend === "up" ? "↑" : "↓"}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Motion.div>
              ))
          }
        </div>
      </div>

      {/* Footer CTA */}
      {!topOnly && (
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-6 py-4 border-t dark:border-gray-700">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition
            border-gray-200 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            View all products
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
