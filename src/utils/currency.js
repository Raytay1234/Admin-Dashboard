export const getUserCurrency = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    return data.currency || "USD", "KSH";
  } catch {
    return "USD" ,"KSH";
  }
};