import { StrictMode } from "react"
import { RouterProvider, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { Toaster } from "react-hot-toast"
import { AudioProvider } from "./components/AudioProvider"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <StrictMode>
      <AudioProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AudioProvider>
    </StrictMode>
  )
}

export default App
