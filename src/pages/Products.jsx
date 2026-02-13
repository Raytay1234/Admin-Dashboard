import { useContext, useState, useMemo, useRef, useEffect } from "react";
import ProductContext from "../context/ProductContext.js";
import { useAuth } from "../context/useAuth.js";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";

const ITEMS_PER_LOAD = 6;

export default function Products() {
  const { products, addProduct, updateProduct, removeProduct, loading } =
    useContext(ProductContext);
  const { isAdmin } = useAuth();

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", price: "", stock: "" });
  const [showAddModal, setShowAddModal] = useState(false);

  const loaderRef = useRef(null);

  // Filter + search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        categoryFilter === "All" ||
        p.category?.toLowerCase() === categoryFilter.toLowerCase();

      const stockMatch =
        stockFilter === "All" ||
        (stockFilter === "InStock" && p.stock > 0) ||
        (stockFilter === "OutOfStock" && p.stock === 0);

      const searchMatch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && stockMatch && searchMatch;
    });
  }, [products, categoryFilter, stockFilter, search]);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length)
          );
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filteredProducts]);

  const categories = ["All", ...new Set(products.map((p) => p.category?.toLowerCase()))];

  if (loading) {
    return (
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-10 bg-gray-950 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-4xl font-bold mb-2">Product Management</h1>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900 p-3 rounded-lg border border-gray-700 w-64"
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="bg-gray-900 p-3 rounded-lg border border-gray-700"
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
          className="bg-gray-900 p-3 rounded-lg border border-gray-700"
        >
          <option value="All">All Stock</option>
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
        </select>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-full max-w-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target;
                addProduct({
                  title: f.title.value,
                  price: Number(f.price.value),
                  category: f.category.value.trim().toLowerCase(),
                  image: f.image.value,
                  stock: Number(f.stock.value),
                });
                f.reset();
                setShowAddModal(false);
              }}
              className="space-y-4"
            >
              <input name="title" required placeholder="Title" className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" />
              <input name="price" type="number" required placeholder="Price" className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" />
              <input name="category" required placeholder="Category" className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" />
              <input name="image" placeholder="Image URL" className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" />
              <input name="stock" type="number" required placeholder="Stock" className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" />

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-semibold">
                  Add Product
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <div key={p.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col">
            <img src={p.image} alt={p.title} className="h-52 w-full object-cover" />

            <div className="p-5 flex flex-col flex-1">
              {editingId === p.id ? (
                <>
                  <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="bg-gray-800 p-2 rounded mb-2" />
                  <input type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} className="bg-gray-800 p-2 rounded mb-2" />
                  <input type="number" value={editData.stock} onChange={(e) => setEditData({ ...editData, stock: e.target.value })} className="bg-gray-800 p-2 rounded mb-3" />

                  <button
                    onClick={() => {
                      updateProduct(p.id, {
                        title: editData.title,
                        price: Number(editData.price),
                        stock: Number(editData.stock),
                      });
                      setEditingId(null);
                    }}
                    className="bg-green-600 hover:bg-green-500 py-2 rounded mb-2"
                  >
                    Save
                  </button>

                  <button onClick={() => setEditingId(null)} className="bg-gray-700 py-2 rounded">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-lg truncate">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{p.category}</p>
                  <p className="font-bold text-xl mb-1">${p.price.toLocaleString()}</p>
                  <p className={`text-sm mb-4 ${p.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </p>

                  {isAdmin && (
                    <div className="mt-auto flex gap-3">
                      <button
                        onClick={() => {
                          setEditingId(p.id);
                          setEditData({
                            title: p.title,
                            price: p.price,
                            stock: p.stock,
                          });
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => removeProduct(p.id)}
                        className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-lg text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && <div ref={loaderRef} className="h-12 mt-10" />}
      <ScrollToTopButton />
    </div>
  );
}
