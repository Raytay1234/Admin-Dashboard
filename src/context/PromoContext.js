// src/context/ProductContext.js
import { createContext } from "react";

const ProductContext = createContext({
  products: [],
  loading: false,
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
});

export default ProductContext; // default export
