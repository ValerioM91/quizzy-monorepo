import { createLazyFileRoute } from "@tanstack/react-router"
import { Difficulty } from "database"
import { useState } from "react"
import Select from "../../components/ui/Select"
import apiClient from "../../api-client"
import QuestionsTable from "../../components/ui/QuestionsTable"
import Label from "../../components/ui/Label"

export const Route = createLazyFileRoute("/_dashboard/questions")({
  component: Questions,
})

function Questions() {
  const { data: categories } = apiClient.category.getAll.useQuery(["category.getAll"])

  const [difficulty, setDifficulty] = useState<Difficulty | "">("")
  const [categoryId, setCategoryId] = useState<number | "">("")

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
      </div>

      <div className="mb-12 flex w-full items-center gap-8">
        <div className="flex-1">
          <Label htmlFor="categoryId">Category</Label>
          <Select value={categoryId} onChange={e => setCategoryId(+e.target.value)} id="categoryId">
            <option value="">Select a category</option>
            {categories?.body?.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex-1">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)} id="difficulty">
            <option value="">Select a difficulty</option>

            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
      </div>

      {!!categoryId && !!difficulty && <QuestionsTable categoryId={categoryId} difficulty={difficulty} />}
    </div>
  )
}
