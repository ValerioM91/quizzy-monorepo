import { useQueryClient } from "@tanstack/react-query"
import apiClient from "../api-client"
import { QuestionFromOpenAi } from "../types"
import { Difficulty } from "database"
import { useState } from "react"
import Button from "./ui/Button"
import { cn } from "../utils/cn"
import { Checkbox } from "./ui/Checkbox"
import { showDefaultNotificationToast } from "../utils/toastUtils"
import { useRouter } from "@tanstack/react-router"

type SaveQuestionsForm = {
  questions: QuestionFromOpenAi[]
  difficulty: Difficulty
  categoryId: number
}

const SaveQuestionsForm = ({ questions, categoryId, difficulty }: SaveQuestionsForm) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [selectedQuestions, setSelectedQuestions] = useState([...questions.map(question => question.question)])

  const { mutate, isLoading } = apiClient.questions.createMany.useMutation({
    onSuccess() {
      showDefaultNotificationToast({ title: "Questions saved successfully" })
      queryClient.invalidateQueries(["questions.get", categoryId, difficulty])
      router.navigate({ to: "/questions" })
    },
  })

  const toggleSelection = (question: string) => {
    setSelectedQuestions(prev => {
      if (prev.includes(question)) {
        return prev.filter(q => q !== question)
      }
      return [...prev, question]
    })
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      body: { categoryId, difficulty, questions: questions.filter(q => selectedQuestions.includes(q.question)) },
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="space-y-4">
        {questions.map(question => (
          <Question
            key={question.question}
            question={question}
            checked={selectedQuestions.includes(question.question)}
            onCheckedChange={() => toggleSelection(question.question)}
          />
        ))}
      </div>
      <Button type="submit" disabled={isLoading}>
        Save
      </Button>
    </form>
  )
}
export default SaveQuestionsForm

const Question = ({
  question,
  checked,
  onCheckedChange,
}: {
  question: QuestionFromOpenAi
  checked: boolean
  onCheckedChange: () => void
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-between overflow-hidden rounded-4xl border border-gray-200 bg-white px-8 py-4 shadow-sm transition-all",
        {
          "bg-theme-green-light": checked,
          "bg-theme-pink-light": !checked,
        },
      )}
    >
      <div className="flex-1">
        <h3 className="font-medium">{question.question}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Correct Answer:</span>
          <span className="font-medium">{question.correctAnswer}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Incorrect Answers:</span>
          <span className="font-medium">{question.incorrectAnswers.join(", ")}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          id={question.question}
          className="after:absolute after:inset-0 after:hover:bg-base-200/30"
        />
      </div>
    </div>
  )
}
