// src/pages/Shop.jsx
import { useContext, useMemo, useRef, useEffect, useState } from "react";
import {ProductContext} from "../context/ProductContext.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import { useAuth } from "../context/useAuth.js"; // ✅ get admin info

const ITEMS_PER_LOAD = 6;

export default function Shop() {
  const { products, loading } = useContext(ProductContext);
  const { isAdmin } = useAuth(); // ✅ check if admin

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const loaderRef = useRef(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = category === "All" || p.category?.toLowerCase() === category.toLowerCase();
      const searchMatch = p.title?.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [products, category, search]);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length));
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <div className="p-6 lg:p-8 bg-gray-900 min-h-screen text-white space-y-8">
      {/* Search & Category Filters */}
      <div className="flex gap-4 flex-wrap">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="bg-gray-800 p-3 rounded-lg w-64"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="bg-gray-800 p-3 rounded-lg"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <ProductCard key={p.id} product={p} isAdmin={isAdmin} />
        ))}

        {loading &&
          Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>

      {/* Infinite Scroll Trigger */}
      {visibleCount < filteredProducts.length && <div ref={loaderRef} className="h-12 mt-10" />}
    </div>
  );
}
