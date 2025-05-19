/* eslint-disable no-undef */
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), commonjs(), tailwindcss()],
  optimizeDeps: {
    include: ["fabric"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
