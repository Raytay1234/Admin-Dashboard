import { useState, useContext } from "react";
import ProductContext from "../context/ProductContext.js";
import { CartContext } from "../context/CartContext.js";

export default function ProductCard({ product, isAdmin = false, formatPrice }) {
  const { updateProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const handleSave = () => {
    updateProduct(product.id, {
      price: Number(price),
      stock: Number(stock),
    });
    setEditing(false);
  };

  return (
    <div
      className="bg-gray-900 text-gray-100 p-4 rounded-xl shadow-sm flex flex-col gap-3
      transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
    >
      <img
        src={product.imageUrl || `https://via.placeholder.com/300?text=${product.category || "Product"}`}
        alt={product.title || product.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-semibold text-lg truncate">
          {product.title || product.name}
        </p>

        <span className="text-sm text-gray-400 truncate">{product.category}</span>

        {editing ? (
          <>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-800 text-white rounded px-2 py-1 w-full"
            />

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="bg-gray-800 text-white rounded px-2 py-1 w-full"
            />

            <button
              onClick={handleSave}
              className="mt-2 bg-green-600 hover:bg-green-500 py-1 rounded"
            >
              Save
            </button>
          </>
        ) : (
          <>
            {/* Price */}
            <span className="font-medium">
              {formatPrice ? formatPrice(product.price) : `$${product.price}`}
            </span>

            {/* Stock */}
            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>

            {/* USER BUTTON */}
            {!isAdmin && product.stock > 0 && (
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-green-600 hover:bg-green-500 py-1 rounded"
              >
                Add to Cart
              </button>
            )}

            {/* ADMIN BUTTON */}
            {isAdmin && (
              <button
                onClick={() => setEditing(true)}
                className="mt-2 bg-indigo-600 hover:bg-indigo-500 py-1 rounded"
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}