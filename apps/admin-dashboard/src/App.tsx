import { StrictMode } from "react"
import { RouterProvider, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { Toaster } from "react-hot-toast"

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
      <RouterProvider router={router} basepath="/admin" />
      <Toaster />
    </StrictMode>
  )
}

export default App
