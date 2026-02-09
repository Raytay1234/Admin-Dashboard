// src/pages/Products.jsx
import { useContext, useState, useMemo, useRef, useEffect } from "react";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import { ProductContext } from "../context/ProductProvider.jsx";
import { useAuth } from "../context/useAuth.js";

const ITEMS_PER_LOAD = 6;

export default function Products() {
  const { products, loading, error, addProduct, removeProduct } =
    useContext(ProductContext);
  const { isAdmin } = useAuth();

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const loaderRef = useRef(null);

  // ✅ Normalized filtering (matches Shop)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        categoryFilter === "All" ||
        p.category?.toLowerCase() === categoryFilter.toLowerCase();

      const stockMatch =
        stockFilter === "All" ||
        (stockFilter === "InStock" && p.stock > 0) ||
        (stockFilter === "OutOfStock" && p.stock === 0);

      return categoryMatch && stockMatch;
    });
  }, [products, categoryFilter, stockFilter]);

  // ✅ Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < filteredProducts.length) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length)
          );
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredProducts]);

  // ✅ Normalized categories (same as Shop)
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category?.toLowerCase())),
  ];

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">
        Product Roster
      </h1>

      {/* ✅ Admin Add Product */}
      {isAdmin && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.target;

            addProduct({
              title: f.title.value,
              price: Number(f.price.value),
              category: f.category.value.trim().toLowerCase(), // 🔥 KEY FIX
              image: f.image.value || "https://via.placeholder.com/300",
              stock: Number(f.stock.value),
            });

            setCategoryFilter("All");
            setVisibleCount(ITEMS_PER_LOAD);
            f.reset();
          }}
          className="bg-gray-800 p-6 rounded-xl mb-8 shadow-md grid gap-4 sm:grid-cols-2"
        >
          <input name="title" placeholder="Product Title" required className="bg-gray-700 p-3 rounded border border-gray-600 focus:ring-2 focus:ring-indigo-500" />
          <input name="price" type="number" placeholder="Price" required className="bg-gray-700 p-3 rounded border border-gray-600 focus:ring-2 focus:ring-indigo-500" />
          <input name="category" placeholder="Category (e.g. electronics)" required className="bg-gray-700 p-3 rounded border border-gray-600 focus:ring-2 focus:ring-indigo-500" />
          <input name="image" placeholder="Image URL" className="bg-gray-700 p-3 rounded border border-gray-600 focus:ring-2 focus:ring-indigo-500" />
          <input name="stock" type="number" placeholder="Stock" required className="bg-gray-700 p-3 rounded border border-gray-600 focus:ring-2 focus:ring-indigo-500" />

          <button className="col-span-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg">
            ➕ Add Product
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="bg-gray-800 p-3 rounded-lg border border-gray-600"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => {
            setStockFilter(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="bg-gray-800 p-3 rounded-lg border border-gray-600"
        >
          <option value="All">All Stock</option>
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <p className="font-bold text-lg truncate">{p.title}</p>
              <p className="text-sm text-gray-400 mb-2">{p.category}</p>
              <p className="font-semibold mb-2">${p.price.toLocaleString()}</p>

              {isAdmin && (
                <button
                  onClick={() => removeProduct(p.id)}
                  className="mt-auto bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div ref={loaderRef} className="h-12 mt-10" />
      )}

      <ScrollToTopButton />
    </div>
  );
}
