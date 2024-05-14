import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { z } from "zod"

import { type Difficulty } from "database"
import apiClient from "../../api-client"

import Select from "../../components/ui/Select"
import QuestionsTable from "../../components/ui/QuestionsTable"
import Label from "../../components/ui/Label"
import { difficultySchema } from "api-contract"

export const Route = createFileRoute("/_dashboard/questions")({
  component: Questions,
  validateSearch: z.object({
    category: z.coerce.string().catch(""),
    difficulty: difficultySchema.catch("easy"),
  }),
  onError: () => {},
})

function Questions() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { category, difficulty } = Route.useSearch()

  const { data: categories } = apiClient.category.getAll.useQuery(["category.getAll"])
  const { data } = apiClient.questions.get.useQuery(
    ["questions.get", category, difficulty],
    { query: { categoryId: +category, difficulty, amount: Infinity } },
    { enabled: !!category && +category > 0 && !!difficulty },
  )

  const handleChange = ({
    name,
    value,
  }: { name: "difficulty"; value: Difficulty } | { name: "category"; value: number }) => {
    if (name === "difficulty") {
      navigate({ search: { category, difficulty: value } })
    } else {
      navigate({ search: { category: value, difficulty } })
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
      </div>

      <div className="mb-12 flex w-full items-center gap-8">
        <div className="flex-1">
          <Label htmlFor="categoryId">Category</Label>
          <Select
            value={category || ""}
            onChange={e => handleChange({ name: "category", value: +e.target.value })}
            id="categoryId"
          >
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
          <Select
            value={difficulty || ""}
            onChange={e => handleChange({ name: "difficulty", value: e.target.value as Difficulty })}
            id="difficulty"
          >
            <option value="">Select a difficulty</option>

            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
      </div>

      {data && <QuestionsTable questions={data.body} />}
    </div>
  )
}
