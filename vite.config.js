import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensure correct base path
  build: {
    outDir: "dist", // Default output directory
  },
  server: {
    port: 4000, // change to your desired port
  },
});
