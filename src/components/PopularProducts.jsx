// src/components/PopularProducts.jsx
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PopularProducts({ products = [] }) {
  const navigate = useNavigate();

  if (!products.length) {
    return (
      <p className="text-gray-400 text-sm">No products available.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((p) => (
        <Motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="relative bg-gray-700 p-3 rounded-xl shadow-md cursor-pointer transition-all"
          onClick={() => navigate(`/products/${p.id}`)}
        >
          {/* Stock Badge */}
          {p.stock <= 5 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              Low Stock
            </span>
          )}

          <img
            src={p.image}
            alt={p.name}
            className="w-full h-24 object-cover rounded-lg mb-2"
          />
          <h4 className="text-white text-sm font-medium truncate">{p.name}</h4>
          <p className="text-gray-300 text-xs">{p.category}</p>
          <p className="text-green-400 font-semibold mt-1">
            ${p.price.toLocaleString()}
          </p>
        </Motion.div>
      ))}
    </div>
  );
}
