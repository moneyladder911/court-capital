import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase inline threshold — small assets get inlined rather than extra requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached forever, almost never changes
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Data/query layer
          "vendor-query": ["@tanstack/react-query"],
          // Supabase SDK
          "vendor-supabase": ["@supabase/supabase-js"],
          // Date utilities
          "vendor-date": ["date-fns"],
        },
      },
    },
  },
}));
