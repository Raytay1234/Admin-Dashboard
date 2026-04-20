import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  server: {
    proxy: {
      "/frankfurter": {
        target: "https://api.frankfurter.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/frankfurter/, ""),
      },
    },
  },
});