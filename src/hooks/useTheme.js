import { useContext } from "react";
import ThemeContext from "../context/ThemeContext.js"; // ✅ default import

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
