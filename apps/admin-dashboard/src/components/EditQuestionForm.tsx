import { useEffect, useRef, useState } from "react"
import { PiNotePencil, PiX } from "react-icons/pi"
import { useQueryClient } from "@tanstack/react-query"

import apiClient from "../api-client"
import { QuestionSchema } from "api-contract"
import { type Question } from "database"

import { showDefaultNotificationToast } from "../utils/toastUtils"
import { useFormWithSchema } from "../utils/useFormWithSchema"

import { Badge } from "./ui/Badge"
import Button from "./ui/Button"
import Input from "./ui/Input"
import InputErrorMessage from "./ui/InputErrorMessage"
import Label from "./ui/Label"
import Modal from "./ui/Modal"
import ModalHeader from "./ui/ModalHeader"
import Select from "./ui/Select"

type EditQuestionForm = {
  closeModal: () => void
  questionData: Question
}

const EditQuestionForm = ({ closeModal, questionData }: EditQuestionForm) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = apiClient.questions.patch.useMutation({
    onSuccess(data) {
      showDefaultNotificationToast({ title: "Question updated successfully" })
      queryClient.invalidateQueries(["questions.get", questionData.categoryId, questionData.difficulty])
      queryClient.invalidateQueries(["questions.get", data.body.categoryId, data.body.difficulty])
      closeModal()
    },
  })

  const { handleSubmit, register, errors, setValue } = useFormWithSchema({
    schema: QuestionSchema.omit({ id: true }),
    defaultValues: { ...questionData },
  })

  const [incorrectAnswers, setIncorrectAnswers] = useState(questionData.incorrectAnswers)
  const incorrectAnswersRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue("incorrectAnswers", incorrectAnswers)
  }, [incorrectAnswers, setValue])

  return (
    <Modal closeModal={closeModal} modalLabel="Edit question" className="max-w-screen-md">
      <ModalHeader closeModal={closeModal} title="Edit question" />

      <form
        onSubmit={handleSubmit(body => mutate({ body, params: { id: questionData.id } }))}
        className="mt-6 h-full w-full gap-4 space-y-10"
      >
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

        <div className="flex justify-end gap-4">
          <Button disabled={isLoading} type="submit" colorSchema="purple">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

const EditQuestionButton = ({ questionData }: { questionData: Question }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <Button
        aria-label="Edit question"
        title="Edit question"
        variant="ghost"
        size="iconMd"
        className="bg-white"
        colorSchema="purple"
        onClick={() => setShowCreateModal(true)}
      >
        <PiNotePencil />
      </Button>
      {showCreateModal && <EditQuestionForm closeModal={() => setShowCreateModal(false)} questionData={questionData} />}
    </>
  )
}
export default EditQuestionButton
