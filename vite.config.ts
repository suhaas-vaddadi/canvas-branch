import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },

  // Add polyfills for Node.js modules
  define: {
    global: "globalThis",
    "process.env": {},
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      util: "util",
      buffer: "buffer",
      process: "process/browser",
      path: "path-browserify",
      os: "os-browserify/browser",
      fs: "browserify-fs",
    },
  },
  optimizeDeps: {
    include: [
      "crypto-browserify",
      "stream-browserify",
      "buffer",
      "process",
      "util",
      "path-browserify",
      "os-browserify",
    ],
  },
  // Force pre-bundle these modules
  build: {
    commonjsOptions: {
      include: [/crypto-browserify/, /node_modules/],
    },
  },
});
