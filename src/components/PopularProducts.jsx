import { motion as Motion } from "framer-motion";
import { ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function PopularProducts({
  products = [],
  isLoading = false,
  topOnly = false,
  variant = "grid", // "grid" | "list"
}) {
  const navigate = useNavigate();

  const fallbackProducts = [
    { id: "A", name: "Product A", category: "UI Kit", price: 5461, trend: "up" },
    { id: "B", name: "Product B", category: "UX Kit", price: 3240, trend: "down" },
    { id: "C", name: "Product C", category: "Template", price: 4120, trend: "up" },
    { id: "D", name: "Product D", category: "Component", price: 2899, trend: "down" },
    { id: "E", name: "Product E Extra Long Name Example", category: "Plugin", price: 5200, trend: "up" },
    { id: "F", name: "Product F", category: "Template", price: 2980, trend: "up" },
  ];

  const displayProducts = products.length ? products : fallbackProducts;
  const productsToShow = topOnly ? displayProducts.slice(0, 4) : displayProducts;

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section
      className="rounded-xl border shadow-sm flex flex-col
      bg-white text-gray-800 border-gray-200
      dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between">
        <h3 className="text-lg font-semibold">Products</h3>
        <span className="text-sm text-gray-400">{productsToShow.length} items</span>
      </div>

      {/* Content */}
      <div className={clsx("p-4", variant === "list" && "max-h-105 overflow-y-auto")}>
        <div
          className={clsx(
            variant === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "flex flex-col gap-3"
          )}
        >
          {isLoading
            ? Array.from({ length: topOnly ? 4 : 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
              />
            ))
            : productsToShow.map((p, idx) => (
              <Motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-4 p-3 rounded-lg
                    bg-white hover:bg-gray-50
                    dark:bg-gray-800 dark:hover:bg-gray-700
                    transition cursor-pointer"
                onClick={() => navigate(`/products/${p.id}`)}
              >
                <img
                  src={p.image || `https://picsum.photos/seed/${p.id}/48/48`}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.name}</p>
                  <span className="text-sm text-gray-400 truncate">{p.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold whitespace-nowrap">{formatPrice(p.price)}</span>

                  {p.trend && (
                    <span
                      className={clsx(
                        "flex items-center text-xs font-medium",
                        p.trend === "up" ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {p.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    </span>
                  )}

                  {variant === "list" && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              </Motion.div>
            ))}
        </div>
      </div>

      {/* Footer CTA */}
      {!topOnly && variant === "grid" && (
        <div className="px-6 py-4 border-t dark:border-gray-700">
          <button
            onClick={() => navigate("/products")}
            className="w-full flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium
            border-gray-200 hover:bg-gray-100
            dark:border-gray-700 dark:hover:bg-gray-800"
          >
            View all products
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
