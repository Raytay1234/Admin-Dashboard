import { useContext, useState, useMemo, useRef, useEffect } from "react";
import ProductContext from "../context/ProductContext.js";
import { useAuth } from "../context/useAuth.js";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import { getCloudinaryURL } from "../utils/cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const ITEMS_PER_LOAD = 6;

export default function Products() {
  const { products, removeProduct, updateProduct, addProduct, loading } = useContext(ProductContext);
  const { isAdmin } = useAuth();

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [search, setSearch] = useState("");
  const loaderRef = useRef(null);

  /* =========================
     FILTERING
  ========================== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  /* =========================
     INFINITE SCROLL
  ========================== */
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length)
          );
        }
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filteredProducts]);

  /* =========================
     LOADING UI
  ========================== */
  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  /* =========================
     MAIN UI
  ========================== */
  return (
    <div className="p-6 lg:p-10 space-y-10 bg-gray-950 min-h-screen text-gray-100">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-4xl font-bold">Product Management</h1>

        {isAdmin && (
          <div className="flex gap-4 items-center">
            {/* Add product with empty image */}
            <button
              onClick={() =>
                addProduct({
                  title: `New Product ${Date.now()}`,
                  price: 0,
                  stock: 0,
                  category: "uncategorized",
                  imageId: "",
                  promoted: false,
                })
              }
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold shadow-md"
            >
              + Add Product
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                try {
                  const publicId = await uploadToCloudinary(file);
                  addProduct({
                    title: file.name,
                    price: 0,
                    stock: 0,
                    category: "uncategorized",
                    imageId: publicId,
                    promoted: false,
                  });
                } catch (err) {
                  alert("Image upload failed: " + err.message);
                }
              }}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-100 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Search */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-900 p-3 rounded-lg border border-gray-700 w-64"
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <div
            key={p.id}
            className={`bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col ${
              p.promoted ? "border-2 border-yellow-400" : ""
            }`}
          >
            <img
              src={getCloudinaryURL(p.imageId)}
              alt={p.title}
              loading="lazy"
              className="h-52 w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-lg truncate">{p.title}</h3>
              <p className="font-bold text-xl mb-1">${p.price.toLocaleString()}</p>
              <p className={`text-sm mb-4 ${p.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </p>

              {isAdmin && (
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="bg-red-600 hover:bg-red-500 py-2 rounded-lg text-sm"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => updateProduct(p.id, { promoted: !p.promoted })}
                    className={`py-2 rounded-lg text-sm ${
                      p.promoted
                        ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    {p.promoted ? "Remove Promotion" : "Promote"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && <div ref={loaderRef} className="h-12 mt-10" />}

      <ScrollToTopButton />
    </div>
  );
}