import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    target: "esnext",
    sourcemap: false,
    minify: "esbuild",
    cssMinify: "esbuild",
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router")) return "vendor";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("react-hook-form") || id.includes("zod")) return "forms";
            if (id.includes("@emailjs")) return "emailjs";
            if (id.includes("react-icons")) return "icons";
            if (
              id.includes("lucide-react") ||
              id.includes("class-variance-authority") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge")
            )
              return "ui";
            if (id.includes("marked") || id.includes("dompurify")) return "markdown";
          }
        },
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
});
