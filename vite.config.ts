import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/vits/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(),],
  build: {
    outDir: 'build', // change output folder
  },
}));
