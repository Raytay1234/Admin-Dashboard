import {
  useContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";

import ProductContext from "../context/ProductContext.js";
import { useAuth } from "../context/useAuth.js";

import ProductSkeleton from "../components/ProductSkeleton.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import getProductImage from "../utils/productImages.js";

const PAGE_SIZE = 12;

export default function Products() {
  const { products, updateProduct, addProduct, loading } =
    useContext(ProductContext);

  const { isAdmin } = useAuth();

  const [page, setPage] = useState(1);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: 0,
    stock: 0,
    category: "uncategorized",
    images: [],
  });

  const [hoveredId, setHoveredId] = useState(null);

  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  // PAGINATION
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return (products || []).slice(start, start + PAGE_SIZE);
  }, [products, page]);

  const totalPages = Math.ceil((products || []).length / PAGE_SIZE);

  // IMAGE FALLBACK
  const getSafeImage = (p) =>
    p.images?.[0]?.preview ||
    p.images?.[0] ||
    getProductImage(p?.category);

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setEditForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newImages],
    }));
  };

  // INFINITE SCROLL
  useEffect(() => {
    if (!loaderRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && page < totalPages) {
        setPage((p) => p + 1);
      }
    });

    observerRef.current.observe(loaderRef.current);

    return () => observerRef.current?.disconnect();
  }, [page, totalPages]);

  // EDIT
  const openEdit = (p) => {
    setEditingProduct(p);
    setEditForm({
      title: p?.title || "",
      price: Number(p?.price) || 0,
      stock: Number(p?.stock) || 0,
      category: p?.category || "uncategorized",
      images: p?.images || [],
    });
  };

  const saveEdit = () => {
    if (!editingProduct) return;

    if (editForm.price < 0 || editForm.stock < 0) {
      alert("Price and stock must be positive");
      return;
    }

    updateProduct(editingProduct.id, {
      ...editForm,
      price: Number(editForm.price),
      stock: Number(editForm.stock),
    });

    setEditingProduct(null);
  };

  const addNewProduct = () => {
    addProduct({
      title: `New Product ${Date.now()}`,
      price: 0,
      stock: 0,
      category: "electronics",
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        {isAdmin && (
          <button
            onClick={addNewProduct}
            className="bg-indigo-600 px-4 py-2 rounded-xl"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : paginatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-900 rounded-xl overflow-hidden"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* IMAGE SWAP */}
                <img
                  src={
                    hoveredId === p.id && p.images?.[1]
                      ? p.images[1].preview || p.images[1]
                      : getSafeImage(p)
                  }
                  className="h-48 w-full object-cover transition duration-300"
                />

                <div className="p-4 space-y-2">
                  <h3>{p.title}</h3>
                  <p>${p.price}</p>
                  <p>Stock: {p.stock}</p>

                  {isAdmin && (
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* LOAD MORE */}
      {page < totalPages && <div ref={loaderRef} className="h-10" />}

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-3">
            <h2>Edit Product</h2>

            <input
              className="w-full p-2 bg-gray-800"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />

            {/* PRICE */}
            <input
              type="number"
              className="w-full p-2 bg-gray-800"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  price: Number(e.target.value),
                })
              }
            />

            {/* STOCK */}
            <input
              type="number"
              className="w-full p-2 bg-gray-800"
              value={editForm.stock}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  stock: Number(e.target.value),
                })
              }
            />

            {/* IMAGE UPLOAD */}
            <input type="file" multiple onChange={handleImageUpload} />

            {/* PREVIEW */}
            <div className="flex gap-2 flex-wrap">
              {editForm.images?.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.preview || img}
                    className="w-16 h-16 object-cover"
                  />
                  <button
                    onClick={() =>
                      setEditForm((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, idx) => idx !== i),
                      }))
                    }
                    className="absolute top-0 right-0 bg-red-600 px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={saveEdit}
              className="bg-green-600 w-full py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}