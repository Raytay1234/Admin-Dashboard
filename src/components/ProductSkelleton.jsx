export default function ProductSkeleton() {
  return (
    <div className="p-4 rounded-xl bg-gray-900 animate-pulse flex flex-col gap-3">
      {/* Image */}
      <div className="w-full h-40 bg-gray-800 rounded-lg" />

      {/* Text */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
        <div className="h-4 bg-gray-800 rounded w-1/3" />
        <div className="h-3 bg-gray-800 rounded w-2/5" />
      </div>
    </div>
  );
}
