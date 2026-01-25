// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div
      className="
        bg-gray-900 text-gray-100 rounded-xl shadow-md
        p-4 flex flex-col gap-3
        transition-transform transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl
        cursor-pointer
      "
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover rounded-lg"
      />

      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-semibold text-lg truncate">{product.name}</p>
        <span className="text-sm text-gray-400 truncate">{product.category}</span>
        <span className="font-medium">{formatPrice(product.price)}</span>
        <span
          className={`text-sm font-medium ${
            product.stock > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
    </div>
  );
}
