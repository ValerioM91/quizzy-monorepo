import { createLazyFileRoute } from "@tanstack/react-router"
import CategoriesTable from "../../components/ui/CategoriesTable"
import AddCategoryModalButton from "../../components/AddCategoryForm"

export const Route = createLazyFileRoute("/_dashboard/categories")({
  component: Categories,
})

function Categories() {
  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <AddCategoryModalButton />
      </div>
      <CategoriesTable />
    </div>
  )
}
