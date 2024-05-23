import { createLazyFileRoute } from "@tanstack/react-router"
import { type Difficulty } from "database"
import { useState } from "react"
import { type QuestionFromOpenAi } from "../../types"
import GenerateWithAIForm from "../../components/GenerateWithAIForm"
import SaveQuestionsForm from "../../components/SaveQuestionsForm"

export const Route = createLazyFileRoute("/_dashboard/generate")({
  component: QuestionsGenerate,
})

function QuestionsGenerate() {
  const [openAiResponse, setOpenAiResponse] = useState<{
    questions: QuestionFromOpenAi[]
    categoryId: number
    difficulty: Difficulty
  }>()

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Generate With AI</h1>
      </div>

      {!openAiResponse && <GenerateWithAIForm onGenerate={setOpenAiResponse} />}
      {openAiResponse && <SaveQuestionsForm {...openAiResponse} />}
    </div>
  )
}
