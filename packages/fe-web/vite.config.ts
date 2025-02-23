import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, host: true },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  resolve: {
    alias: {
      src: resolve("src/"),
    },
  },
});
