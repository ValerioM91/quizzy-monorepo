import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import commonjs from "@rollup/plugin-commonjs"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

// https://vitejs.dev/config/
// const pwaOptions: Partial<VitePWAOptions> = {
//   mode: "development",
//   base: "/",
//   registerType: "autoUpdate",
//   includeAssets: ["favicon.svg", "offline.htm"],

//   manifest: {
//     name: "Quizzy",
//     short_name: "Quizzy",
//     description: "Quizzy is a quiz app",
//     theme_color: "#3E63DD",
//     icons: [
//       {
//         src: "/32.png",
//         sizes: "32x32",
//         type: "image/png",
//       },
//       {
//         src: "/72.png",
//         sizes: "72x72",
//         type: "image/png",
//       },
//       {
//         src: "/144.png",
//         sizes: "144x144",
//         type: "image/png",
//       },
//       {
//         src: "/192.png",
//         sizes: "192x192",
//         type: "image/png",
//         purpose: "any maskable",
//       },
//       {
//         src: "/256.png",
//         sizes: "256x256",
//         type: "image/png",
//         purpose: "any maskable",
//       },
//       {
//         src: "/512.png",
//         sizes: "512x512",
//         type: "image/png",
//         purpose: "any maskable",
//       },
//       {
//         src: "/1024.png",
//         sizes: "1024x1024",
//         type: "image/png",
//         purpose: "any maskable",
//       },
//     ],
//   },
//   workbox: {},
//   devOptions: {
//     enabled: process.env.SW_DEV === "true",
//     /* when using generateSW the PWA plugin will switch to classic */
//     type: "module",
//     navigateFallback: "index.html",
//   },
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
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
