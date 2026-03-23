import { useState } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";

export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // preview before upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Select an image");

    try {
      setLoading(true);

      const uploaded = await uploadToCloudinary(image);

      // 🔥 send to backend or store
      const product = {
        name: "Sample Product",
        price: 100,
        image: uploaded.public_id, // store ONLY public_id
      };

      console.log("Saved product:", product);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="file" onChange={handleImageChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-40 h-40 object-cover mt-2 rounded"
        />
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}