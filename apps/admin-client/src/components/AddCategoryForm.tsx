import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import apiClient from "../api-client"
import { useFormWithSchema } from "../utils/useFormWithSchema"
import Input from "./ui/Input"
import Button from "./ui/Button"
import Modal from "./ui/Modal"
import ModalHeader from "./ui/ModalHeader"

type AddCategoryModal = {
  closeModal: () => void
}

const AddCategoryModal = ({ closeModal }: AddCategoryModal) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = apiClient.category.create.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(["category.getAll"])
      closeModal()
    },
  })

  const { handleSubmit, register, errors } = useFormWithSchema({
    schema: z.object({
      name: z.string().min(1, "This field is required"),
    }),
  })

  return (
    <Modal closeModal={closeModal} modalLabel="Add category">
      <ModalHeader closeModal={closeModal} title="Add category" />

      <form onSubmit={handleSubmit(({ name }) => mutate({ body: { name } }))} className="mt-6 flex h-full w-full gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Input
            type="text"
            id="name"
            autoComplete="off"
            required
            placeholder="Enter a stage name"
            isError={!!errors.name}
            {...register("name")}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button disabled={isLoading} type="submit" colorSchema="purple">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  )
}

const AddCategoryModalButton = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <Button onClick={() => setShowCreateModal(true)}>Add Category</Button>
      {showCreateModal && <AddCategoryModal closeModal={() => setShowCreateModal(false)} />}
    </>
  )
}
export default AddCategoryModalButton
