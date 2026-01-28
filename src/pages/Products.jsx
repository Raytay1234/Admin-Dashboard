import { useState, useEffect, useRef, useMemo } from "react";
import { productsData } from "../data/products.js";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";

const ITEMS_PER_LOAD = 6;

export default function Products() {
  const scrollRef = useRef(null);
  const loaderRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  // Format price helper
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  // Filtered products (memoized)
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      const categoryMatch =
        categoryFilter === "All" || p.category === categoryFilter;
      const stockMatch =
        stockFilter === "All" ||
        (stockFilter === "InStock" && p.stock > 0) ||
        (stockFilter === "OutOfStock" && p.stock === 0);
      return categoryMatch && stockMatch;
    });
  }, [categoryFilter, stockFilter]);

  // Reset visibleCount asynchronously when filters change (ESLint-friendly)
  useEffect(() => {
    const id = setTimeout(() => {
      setVisibleCount(ITEMS_PER_LOAD);
    }, 0);
    return () => clearTimeout(id);
  }, [categoryFilter, stockFilter]);

  // Infinite scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          visibleCount < filteredProducts.length
        ) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length)
            );
            setLoading(false);
          }, 800);
        }
      },
      { root: scrollRef.current, threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, visibleCount, filteredProducts]);

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto p-6 lg:p-8 relative"
    >
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-800 text-gray-100 px-3 py-2 rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="bg-gray-800 text-gray-100 px-3 py-2 rounded-lg"
        >
          <option value="All">All Stock</option>
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl shadow-sm flex flex-col gap-3
              bg-gray-900 text-gray-100
              transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-semibold text-lg truncate">{p.name}</p>
              <span className="text-sm text-gray-400 truncate">{p.category}</span>
              <span className="font-medium">{formatPrice(p.price)}</span>
              <span
                className={`text-sm font-medium ${p.stock > 0 ? "text-green-400" : "text-red-400"
                  }`}
              >
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>
        ))}

        {/* Skeleton loaders */}
        {loading &&
          Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Infinite scroll trigger */}
      {visibleCount < filteredProducts.length && (
        <div ref={loaderRef} className="h-12 mt-10" />
      )}

      {/* Scroll to top button (top-left) */}
      <ScrollToTopButton scrollRef={scrollRef} />
    </div>
  );
}
