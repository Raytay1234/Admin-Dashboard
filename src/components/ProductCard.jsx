// src/components/ProductCard.jsx
export default function ProductCard({ product, formatPrice }) {
  return (
    <div
      className="bg-gray-900 text-gray-100 p-4 rounded-xl shadow-sm flex flex-col gap-3
      transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Product Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-semibold text-lg truncate">{product.name}</p>
        <span className="text-sm text-gray-400 truncate">{product.category}</span>
        <span className="font-medium">{formatPrice ? formatPrice(product.price) : `$${product.price}`}</span>
        <span
          className={`text-sm font-medium ${product.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
    </div>
  );
}
