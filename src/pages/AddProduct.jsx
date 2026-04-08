import { useState, useEffect } from "react";

export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -----------------------------
  // CLEANUP MEMORY
  // -----------------------------
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  // -----------------------------
  // ADD IMAGES
  // -----------------------------
  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    const newImages = fileArray.map((file, index) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files allowed");
        return null;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be under 5MB");
        return null;
      }

      return {
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
        isMain: images.length === 0 && index === 0, // first image = main
      };
    }).filter(Boolean);

    setImages((prev) => [...prev, ...newImages]);
    setError("");
  };

  // -----------------------------
  // FILE INPUT
  // -----------------------------
  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  // -----------------------------
  // DROP HANDLER
  // -----------------------------
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // -----------------------------
  // REMOVE IMAGE
  // -----------------------------
  const removeImage = (id) => {
    setImages((prev) => {
      const updated = prev.filter((img) => {
        if (img.id === id) URL.revokeObjectURL(img.url);
        return img.id !== id;
      });

      // ensure at least one main image
      if (!updated.some((img) => img.isMain) && updated.length > 0) {
        updated[0].isMain = true;
      }

      return [...updated];
    });
  };

  // -----------------------------
  // SET MAIN IMAGE
  // -----------------------------
  const setMainImage = (id) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === id,
      }))
    );
  };

  // -----------------------------
  // DRAG REORDER (SHOPIFY STYLE)
  // -----------------------------
  const moveImage = (fromIndex, toIndex) => {
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setError("Add at least one image");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      images.forEach((img) => {
        formData.append("images", img.file);
        formData.append("mainImageId", img.isMain ? img.id : "");
      });

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await res.json();

      setSuccess("Product created successfully!");

      setImages([]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-xl font-semibold text-white">
          Shopify Media System v2
        </h2>

        {/* DROP ZONE */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center"
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="upload"
          />

          <label htmlFor="upload" className="cursor-pointer">
            <p className="text-gray-400">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-500">Multi-image supported</p>
          </label>
        </div>

        {/* IMAGE GRID (SHOPIFY STYLE) */}
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, index) => (
            <div
              key={img.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("index", index)}
              onDrop={(e) => {
                const fromIndex = Number(e.dataTransfer.getData("index"));
                moveImage(fromIndex, index);
              }}
              onDragOver={(e) => e.preventDefault()}
              className={`relative border rounded-lg overflow-hidden ${
                img.isMain ? "border-green-500" : "border-gray-700"
              }`}
            >
              <img
                src={img.url}
                className="h-24 w-full object-cover"
              />

              {/* MAIN BADGE */}
              {img.isMain && (
                <span className="absolute top-1 left-1 bg-green-600 text-xs px-1 rounded">
                  Main
                </span>
              )}

              {/* ACTIONS */}
              <div className="absolute bottom-1 right-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => setMainImage(img.id)}
                  className="bg-blue-600 text-xs px-1 rounded"
                >
                  ★
                </button>

                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="bg-red-600 text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ERROR */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* SUCCESS */}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 py-2.5 rounded-xl"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}