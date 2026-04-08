import { useParams, useSearchParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import ProductContext from "../context/ProductProvider.jsx";

export default function CategoryDetails() {
  const { category } = useParams();
  const [params] = useSearchParams();

  const range = params.get("range") || "30d";
  const { products } = useContext(ProductContext);

  const decodedCategory = decodeURIComponent(category);

  const filtered = useMemo(() => {
    return (products || []).filter(
      (p) =>
        (p?.category || "uncategorized") === decodedCategory
    );
  }, [products, decodedCategory]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {decodedCategory} ({range})
      </h1>

      <p className="text-gray-400 text-sm">
        Deep analytics synced with filters
      </p>

      <div className="text-gray-300">
        Products: {filtered.length}
      </div>
    </div>
  );
}