import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import commonjs from "@rollup/plugin-commonjs"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    base: "/admin",
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
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  }
})
