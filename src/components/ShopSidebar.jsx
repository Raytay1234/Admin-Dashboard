// src/components/ShopSidebar.jsx
export default function ShopSidebar({ categories = [], selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => {
          const isActive = cat === selectedCategory;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                w-full text-left px-4 py-2 rounded-lg font-medium transition 
                ${isActive 
                  ? "bg-green-600 text-white shadow-md" 
                  : "text-gray-200 hover:bg-gray-700 hover:text-green-400"}
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
