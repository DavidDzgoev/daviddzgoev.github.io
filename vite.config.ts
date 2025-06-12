import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: mode === "development", // Карты исходников только для разработки
    // Оптимизация сборки
    minify: "terser",
    cssMinify: true,
    // Предварительная загрузка ресурсов
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
