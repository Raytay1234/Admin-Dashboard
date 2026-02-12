import { useState, useEffect } from "react";
import PromoContext from "./PromoContext";

export default function PromotionProvider({ children }) {
  const [promotions, setPromotions] = useState(() => {
    const saved = localStorage.getItem("promotions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("promotions", JSON.stringify(promotions));
  }, [promotions]);

  const addPromotion = (promo) => {
    setPromotions((prev) => [...prev, promo]);
  };

  const togglePromotion = (id) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  };

  const removePromotion = (id) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PromoContext.Provider
      value={{ promotions, addPromotion, togglePromotion, removePromotion }}
    >
      {children}
    </PromoContext.Provider>
  );
}
