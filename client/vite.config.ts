import "dotenv/config";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  server: {
    host: process.env.VITE_HOST,
    port: parseInt(process.env.VITE_PORT),
    proxy: {
      "/api": {
        target: process.env.VITE_PROXY,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
        javascriptEnabled: true,
      },
    },
  },
});
