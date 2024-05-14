import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import apiClient from "../api-client"
import { useFormWithSchema } from "../utils/useFormWithSchema"
import Input from "./ui/Input"
import Button from "./ui/Button"
import Modal from "./ui/Modal"
import { PiNotePencil } from "react-icons/pi"
import ModalHeader from "./ui/ModalHeader"
import { QuestionSchema } from "api-contract"
import { type Question } from "database"
import Label from "./ui/Label"

type EditQuestionForm = {
  closeModal: () => void
  questionData: Question
}

const EditQuestionForm = ({ closeModal, questionData }: EditQuestionForm) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = apiClient.questions.patch.useMutation({
    onSuccess(data) {
      queryClient.invalidateQueries(["questions.get", questionData.categoryId, questionData.difficulty])
      queryClient.invalidateQueries(["questions.get", data.body.categoryId, data.body.difficulty])
      closeModal()
    },
  })

  const { handleSubmit, register, errors } = useFormWithSchema({
    schema: QuestionSchema.omit({ id: true }),
    defaultValues: { ...questionData },
  })

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
          <Input
            type="text"
            id="incorrectAnswers"
            autoComplete="off"
            required
            isError={!!errors.incorrectAnswers}
            errorMessage={errors.incorrectAnswers?.message}
            {...register("incorrectAnswers", {
              setValueAs: value =>
                !Array.isArray(value) ? value.split(",").map((item: string) => item.trim()) : value,
            })}
          />
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
