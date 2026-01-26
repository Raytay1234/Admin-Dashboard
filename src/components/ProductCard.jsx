import useCart from "../hooks/useCart.js";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-900 rounded-xl shadow hover:shadow-lg transition overflow-hidden group">
      <div className="h-40 bg-gray-800 flex items-center justify-center text-gray-500">
        Image
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-gray-100 font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>

        <div className="flex items-center justify-between">
          <span className="text-green-500 font-bold">${product.price}</span>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm transition"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
