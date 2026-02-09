// src/context/ProductProvider.jsx
import { createContext, useState, useEffect } from "react";

const ProductContext = createContext(); // ✅ Create context

const API_URL = "https://fakestoreapi.com/products";

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const productsWithStock = data.map((p) => ({
          ...p,
          stock: Math.floor(Math.random() * 20),
        }));
        setProducts(productsWithStock);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      category: product.category?.trim() .toLowerCase(),
      id: Date.now(),
      image: product.image || `https://picsum.photos/300/300?random=${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ NEW: Update product (price, stock, title, etc.)
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct, removeProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext };
