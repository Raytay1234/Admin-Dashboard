import { useState, useEffect, useMemo, useRef } from "react";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { Search } from "lucide-react";

const ITEMS_PER_LOAD = 6;

export default function Shop() {
  const [products, setProducts] = useState([]);       // Products from API
  const [loading, setLoading] = useState(true);       // API loading
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const loaderRef = useRef(null);

  // Categories for filter pills
  const categories = ["All", "UI Kit", "UX Kit", "Template", "Plugin", "Component"];

  // Fetch products from mock API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // Example API - replace with your real endpoint
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        // Map API data to match your ProductCard props
        const formatted = data.map((p, i) => ({
          id: p.id,
          name: p.title || p.name,
          price: Math.floor(p.price || 50) * 100,
          category: p.category || "Template",
          stock: Math.floor(Math.random() * 10), // Random stock for demo
          image: p.image || `https://picsum.photos/seed/${i}/300/200`,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter & search products
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (category !== "All") data = data.filter((p) => p.category === category);
    if (search) data = data.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) =>
      sort === "price" ? a.price - b.price : a.name.localeCompare(b.name)
    );

    return data;
  }, [products, category, search, sort]);

  // Reset visible count when filters/search/sort change
  useEffect(() => {
    const id = setTimeout(() => setVisibleCount(ITEMS_PER_LOAD), 0);
    return () => clearTimeout(id);
  }, [category, search, sort]);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && visibleCount < filteredProducts.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length));
            setLoading(false);
          }, 800);
        }
      },
      { root: null, threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, visibleCount, filteredProducts]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Shop</h1>
          <p className="text-gray-400 text-sm">Premium UI & UX resources</p>
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 py-2 bg-gray-900 rounded focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-900 rounded px-3"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm transition
              ${category === c
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64">
          <ShopSidebar
            categories={categories}
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
        </aside>

        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.slice(0, visibleCount).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

          {loading &&
            Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
        </section>
      </div>

      {/* Infinite scroll trigger */}
      {visibleCount < filteredProducts.length && <div ref={loaderRef} className="h-12 mt-10" />}
    </div>
  );
}
