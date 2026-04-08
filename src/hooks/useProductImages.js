import { useMemo } from "react";
import productsData from "../data/productsData.js"; // your static product list
import { getUnsplashImage } from "../utils/unsplahFixed.js";

export default function useProductImages() {
  return useMemo(() => {
    return productsData.map((p) => ({
      ...p,
      imageUrl: p.imageUrl || getUnsplashImage(p),
    }));
  }, []);
}