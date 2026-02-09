import { createContext, useContext } from "react";

const ProductContext = createContext(null);

export default ProductContext;

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
};
