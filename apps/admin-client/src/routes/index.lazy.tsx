import { Link, createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/")({
  component: () => (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="rounded-3xl bg-base-200 px-12 py-8">
        <div className="space-x-4 text-center">
          <Link to="/categories">Dashboard</Link>
        </div>
      </section>
    </main>
  ),
})
