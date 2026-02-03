// src/components/ProductSkeleton.jsx
export default function ProductSkeleton() {
  return (
    <div className="bg-gray-800 animate-pulse p-4 rounded-xl flex flex-col gap-3">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-gray-700 rounded-lg"></div>

      {/* Text placeholders */}
      <div className="flex flex-col gap-2">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div> {/* Name */}
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>   {/* Category */}
        <div className="h-5 bg-gray-700 rounded w-1/4"></div>   {/* Price */}
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>   {/* Stock */}
      </div>
    </div>
  );
}
