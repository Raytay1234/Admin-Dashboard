// src/pages/Shop.jsx
import { useState } from "react";
import ShopSidebar from "../components/ShopSidebar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { productsData } from "../data/products.js";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "UI Kit", "UX Kit", "Template", "Plugin", "Component"];

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-64 w-full">
        <ShopSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
