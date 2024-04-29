"use client"

import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import apiClient from "../api-client"
import DeleteModal from "./ui/DeleteModal"

type DeleteCategoryModalProps = {
  closeModal: () => void
  categoryId: number
}

const DeleteCategoryModal = ({ closeModal, categoryId }: DeleteCategoryModalProps) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = apiClient.category.delete.useMutation({
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries(["category.getAll"])
    },
  })

  const deleteHandler = useCallback(() => {
    mutate({ params: { id: categoryId } })
  }, [categoryId, mutate])

  return (
    <DeleteModal
      title="Delete category - are you sure?"
      content="Deleting a category cannot be undone"
      closeModal={closeModal}
      deleteHandler={deleteHandler}
      isLoading={isLoading}
    />
  )
}

export default DeleteCategoryModal
