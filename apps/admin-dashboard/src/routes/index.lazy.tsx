import { createLazyFileRoute } from "@tanstack/react-router"
import LoginForm from "../components/LoginForm"

export const Route = createLazyFileRoute("/")({
  component: () => {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <section className="rounded-3xl bg-base-200 px-12 py-8">
          <div className="space-x-4 text-center">
            <LoginForm />
          </div>
        </section>
      </main>
    )
  },
})
