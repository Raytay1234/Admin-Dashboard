// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue-600
        success: "#16a34a", // green-600
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
