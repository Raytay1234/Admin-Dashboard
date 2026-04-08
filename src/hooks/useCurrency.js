import { useEffect, useState, useMemo } from "react";

const getUserCurrency = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.currency || "USD";
  } catch {
    return "USD";
  }
};

const fetchRates = async () => {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?base=USD");
    return await res.json();
  } catch {
    return null;
  }
};

export default function useCurrency() {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });

  const [rates, setRates] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("currency")) {
      getUserCurrency().then(setCurrency);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    fetchRates().then(setRates);
  }, []);

  const convert = (amount) => {
    if (!rates?.rates) return amount;
    const rate = rates.rates[currency] || 1;
    return amount * rate;
  };

  const format = useMemo(() => {
    return (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(value);
  }, [currency]);

  return { currency, setCurrency, convert, format };
}