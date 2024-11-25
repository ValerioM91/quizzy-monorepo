import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import commonjs from "@rollup/plugin-commonjs"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  resolve: {
    alias: {
      ".prisma/client/index-browser": "../../node_modules/.prisma/client/index-browser.js",
    },
  },
  optimizeDeps: {
    include: ["api-contract/**/*"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
