"use client"

import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import apiClient from "../api-client"
import DeleteModal from "./ui/DeleteModal"
import { Question } from "database"

type DeleteQuestionModalProps = {
  closeModal: () => void
  question: Question
}

const DeleteQuestionModal = ({ closeModal, question }: DeleteQuestionModalProps) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = apiClient.questions.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["questions.get", question.categoryId, question.difficulty])
      closeModal()
    },
  })

  const deleteHandler = useCallback(() => {
    mutate({ params: { id: question.id } })
  }, [mutate, question.id])

  return (
    <DeleteModal
      title="Delete question - are you sure?"
      content="Deleting a question cannot be undone"
      closeModal={closeModal}
      deleteHandler={deleteHandler}
      isLoading={isLoading}
    />
  )
}

export default DeleteQuestionModal
