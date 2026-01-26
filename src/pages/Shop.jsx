import { useMemo, useState } from "react";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { productsData } from "../data/products";
import { Search } from "lucide-react";

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [loading] = useState(false);

  const categories = [
    "All",
    "UI Kit",
    "UX Kit",
    "Template",
    "Plugin",
    "Component",
  ];

  const products = useMemo(() => {
    let data = [...productsData];

    if (category !== "All") {
      data = data.filter((p) => p.category === category);
    }

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price") {
      data.sort((a, b) => a.price - b.price);
    } else {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [category, search, sort]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Shop</h1>
          <p className="text-gray-400 text-sm">
            Premium UI & UX resources
          </p>
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
      <div className="flex gap-2 overflow-x-auto">
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

      {/* Layout */}
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64">
          <ShopSidebar
            categories={categories}
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
        </aside>

        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
            : products.map((p) => (
              <div
                key={p.id}
                className="hover:-translate-y-1 transition-transform"
              >
                <ProductCard product={p} />
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}
