import { useCallback, useEffect, useRef, useState } from "react"
import { PiX } from "react-icons/pi"
import { useQueryClient } from "@tanstack/react-query"

import apiClient from "../api-client"
import { QuestionSchema } from "api-contract"

import { showDefaultNotificationToast } from "../utils/toastUtils"
import { useFormWithSchema } from "../utils/useFormWithSchema"

import { Badge } from "./ui/Badge"
import Button from "./ui/Button"
import Input from "./ui/Input"
import InputErrorMessage from "./ui/InputErrorMessage"
import Label from "./ui/Label"
import Select from "./ui/Select"
import Modal from "./ui/Modal"
import ModalHeader from "./ui/ModalHeader"

const AddQuestionForm = () => {
  const queryClient = useQueryClient()

  const { data: categories } = apiClient.category.getAll.useQuery(["category.getAll"])
  const { mutate, isLoading } = apiClient.questions.create.useMutation({
    onSuccess(data) {
      showDefaultNotificationToast({ title: "Question updated successfully" })
      queryClient.invalidateQueries(["questions.get", data.body.categoryId, data.body.difficulty])
    },
  })

  const { handleSubmit, register, errors, setValue, getValues } = useFormWithSchema({
    schema: QuestionSchema.omit({ id: true }),
  })

  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([])
  const incorrectAnswersRef = useRef<HTMLInputElement>(null)

  const [similarQuestions, setSimilarQuestions] = useState<string[] | null>(null)
  const closeModal = useCallback(() => setSimilarQuestions(null), [])

  useEffect(() => {
    setValue("incorrectAnswers", incorrectAnswers)
  }, [incorrectAnswers, setValue])

  return (
    <form onSubmit={handleSubmit(body => mutate({ body }))} className="mt-6 h-full w-full gap-4 space-y-10">
      <div className="">
        <Label htmlFor="categoryId">Category</Label>
        <Select {...register("categoryId")} id="categoryId">
          <option value="">Select a category</option>
          {categories?.body?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          type="text"
          id="question"
          autoComplete="off"
          required
          placeholder="Enter the question"
          isError={!!errors.question}
          {...register("question")}
        />
      </div>

      <div>
        <Label htmlFor="difficulty">Difficulty</Label>
        <Select
          required
          id="difficulty"
          isError={!!errors.difficulty}
          {...register("difficulty")}
          errorMessage={errors.difficulty?.message}
        >
          <option value="">Select a difficulty</option>

          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="correctAnswer">Correct Answer</Label>
        <Input
          type="text"
          id="correctAnswer"
          autoComplete="off"
          required
          isError={!!errors.correctAnswer}
          {...register("correctAnswer")}
        />
      </div>

      <div>
        <Label htmlFor="incorrectAnswers">Incorrect Answers</Label>

        <div className="relative z-10 flex items-center gap-2 rounded-2xl border border-base-300 bg-white pl-4 outline-blue-500 placeholder:text-content-light focus:border-theme-blue focus:ring-theme-blue">
          {incorrectAnswers.map(answer => (
            <Badge key={answer}>
              {answer}
              <PiX
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={event => {
                  event.stopPropagation()
                  setIncorrectAnswers(incorrectAnswers.filter(item => item !== answer))
                  incorrectAnswersRef.current?.disabled && (incorrectAnswersRef.current.disabled = false)
                  incorrectAnswersRef.current?.focus()
                }}
              />
            </Badge>
          ))}
          <Input
            type="text"
            className="focus:ring-none border-none outline-none focus:border-none focus-visible:outline-none"
            containerClassName="w-auto flex-1"
            id="incorrectAnswers"
            autoComplete="off"
            required
            isError={!!errors.incorrectAnswers}
            disabled={incorrectAnswers.length >= 3}
            ref={incorrectAnswersRef}
            onBlur={e => {
              const value = e.target.value.trim()
              if (!value) return
              setIncorrectAnswers([...incorrectAnswers, value])
              e.target.value = ""
            }}
            onChange={e => {
              const value = e.target.value
              const lastChar = value.slice(-1)
              if (lastChar === ",") {
                setIncorrectAnswers([...incorrectAnswers, value.slice(0, -1).trim()])
                e.target.value = ""
              }
            }}
          />
        </div>
        <p className="my-2 text-xs text-content-neutral">(Comma separated)</p>
        <InputErrorMessage errorMessage={errors.incorrectAnswers?.message} />
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <Button
          type="button"
          onClick={async e => {
            e.stopPropagation()
            const question = getValues("question")
            const categoryId = getValues("categoryId")
            const res = await apiClient.questions.querySimilar.query({ query: { categoryId, text: question } })

            if (res.status === 200) {
              setSimilarQuestions(res.body.map(q => q.question))
            }
          }}
        >
          Check similar questions
        </Button>
        <Button disabled={isLoading} type="submit" colorSchema="purple">
          Save
        </Button>
      </div>

      <SimilarQuestionsModal
        closeModal={closeModal}
        question={getValues("question")}
        similarQuestions={similarQuestions}
      />
    </form>
  )
}

export default AddQuestionForm

const SimilarQuestionsModal = ({
  question,
  similarQuestions,
  closeModal,
}: {
  question: string
  similarQuestions?: string[] | null
  closeModal: () => void
}) => {
  if (!similarQuestions) return null

  return (
    <Modal closeModal={closeModal} modalLabel="Similar Questions">
      <ModalHeader closeModal={closeModal} title="Similar Questions" />
      <Label>Your question</Label>
      <div className="mb-8 rounded-lg bg-base-200 p-2">{question}</div>

      <Label>Similar questions</Label>
      <div className="space-y-4">
        {similarQuestions.length > 0 ? (
          similarQuestions.map(q => (
            <div key={q} className="rounded-lg bg-theme-blue-light px-4 py-2">
              {q}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-theme-green-light px-4 py-2">No similar questions found</div>
        )}
      </div>
    </Modal>
  )
}
