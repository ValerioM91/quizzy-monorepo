import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"
import type { VitePWAOptions } from "vite-plugin-pwa"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import commonjs from "@rollup/plugin-commonjs"

// https://vitejs.dev/config/
const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg", "offline.htm"],

  manifest: {
    name: "Quizzy",
    short_name: "Quizzy",
    description: "Quizzy is a quiz app",
    theme_color: "#3E63DD",
    icons: [
      {
        src: "/32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {},
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), VitePWA(pwaOptions)],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  optimizeDeps: {
    include: ["api-contract/**/*"],
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
