import { useEffect, useState, useMemo } from "react";

// -----------------------------
// Detect user currency (IP-based)
// -----------------------------
const getUserCurrency = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.currency || "USD";
  } catch {
    return "USD";
  }
};

// -----------------------------
// Fetch exchange rates (via Vite proxy)
// -----------------------------
const fetchRates = async () => {
  try {
    const res = await fetch("/frankfurter/latest?from=USD");
    return await res.json();
  } catch {
    return null;
  }
};

export default function useCurrency() {
  // -----------------------------
  // Currency state (persisted)
  // -----------------------------
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });

  const [rates, setRates] = useState(null);

  // -----------------------------
  // Detect user currency on first load
  // -----------------------------
  useEffect(() => {
    if (!localStorage.getItem("currency")) {
      getUserCurrency().then(setCurrency);
    }
  }, []);

  // -----------------------------
  // Persist currency
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // -----------------------------
  // Load exchange rates
  // -----------------------------
  useEffect(() => {
    const loadRates = async () => {
      const data = await fetchRates();
      setRates(data);
    };

    loadRates();
  }, []);

  // -----------------------------
  // Convert amount
  // -----------------------------
  const convert = (amount) => {
    if (!rates?.rates || currency === "USD") return amount;

    const rate = rates.rates[currency];
    if (!rate) return amount;

    return amount * rate;
  };

  // -----------------------------
  // Format currency display
  // -----------------------------
  const format = useMemo(() => {
    return (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(value);
  }, [currency]);

  return {
    currency,
    setCurrency,
    convert,
    format,
    rates,
  };
}