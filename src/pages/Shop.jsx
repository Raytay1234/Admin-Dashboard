// src/pages/Shop.jsx
import { useContext, useState, useMemo, useRef, useEffect } from "react";
import ShopSidebar from "../components/ShopSidebar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import { Search } from "lucide-react";
import { ProductContext } from "../context/ProductProvider.jsx";

const ITEMS_PER_LOAD = 6;

export default function Shop() {
  const { products, loading } = useContext(ProductContext);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const loaderRef = useRef(null);

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (category !== "All") {
      data = data.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      data = data.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : (a.title || "").localeCompare(b.title || "")
    );

    return data;
  }, [products, category, search, sort]);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category?.toLowerCase()).filter(Boolean)),
  ];

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

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen">
      {/* ================= Banner ================= */}
      <div className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-white shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/Duka Banner.png')" }}
        />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Text */}
          <div className="text-center lg:text-left max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-3 drop-shadow-md">
              Welcome to Duka
            </h2>
            <p className="text-white/90 text-base lg:text-lg mb-5 drop-shadow-sm">
              Discover premium products with exceptional UI & UX. Shop now and elevate your experience!
            </p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-shadow shadow-md hover:shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>



      {/* ================= Header ================= */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Shop</h1>
          <p className="text-gray-300 text-sm mt-1">
            Browse our curated collection of premium products
          </p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(ITEMS_PER_LOAD);
              }}
              placeholder="Search products..."
              className="w-full pl-10 py-2 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
            className="bg-gray-800 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* ================= Category Pills ================= */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === c
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ================= Content ================= */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64">
          <ShopSidebar
            categories={categories}
            selectedCategory={category}
            setSelectedCategory={(c) => {
              setCategory(c);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
          />
        </aside>

        {/* Products */}
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
      {visibleCount < filteredProducts.length && (
        <div ref={loaderRef} className="h-12 mt-10" />
      )}
    </div>
  );
}
