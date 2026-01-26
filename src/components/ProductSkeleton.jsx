export default function ProductSkeleton() {
  return (
    <div className="bg-gray-900 rounded-xl p-4 animate-pulse space-y-3">
      <div className="h-40 bg-gray-800 rounded" />
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="h-4 bg-gray-800 rounded w-1/2" />
      <div className="h-8 bg-gray-800 rounded" />
    </div>
  );
}
