// src/components/ShopSidebar.jsx
export default function ShopSidebar({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <aside className="w-full lg:w-64 bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">Categories</h2>
      <ul className="flex flex-col gap-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-2 rounded-lg transition
                ${selectedCategory === cat ? "bg-green-600 text-gray-100" : "hover:bg-gray-800 text-gray-200"}`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
