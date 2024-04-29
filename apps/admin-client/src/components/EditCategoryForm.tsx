import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { Category } from "database"
import apiClient from "../api-client"
import { useFormWithSchema } from "../utils/useFormWithSchema"
import Input from "./ui/Input"
import Button from "./ui/Button"
import Modal from "./ui/Modal"
import { PiNotePencil } from "react-icons/pi"
import ModalHeader from "./ui/ModalHeader"

type EditCategoryForm = {
  closeModal: () => void
  category: Category
}

const EditCategoryForm = ({ closeModal, category }: EditCategoryForm) => {
  const { id, name } = category
  const queryClient = useQueryClient()
  const { mutate, isLoading } = apiClient.category.patch.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(["category.getAll"])
      closeModal()
    },
  })

  const { handleSubmit, register, errors } = useFormWithSchema({
    schema: z.object({
      name: z.string().min(1, "This field is required"),
      id: z.number(),
    }),
    defaultValues: { id, name },
  })

  return (
    <Modal closeModal={closeModal} modalLabel="Edit Category">
      <ModalHeader closeModal={closeModal} title="Edit Category" />

      <form
        onSubmit={handleSubmit(({ id, name }) => mutate({ body: { name }, params: { id } }))}
        className="mt-6 flex h-full w-full gap-4"
      >
        <div className="flex flex-1 flex-col gap-2">
          <Input
            type="text"
            id="name"
            autoComplete="off"
            required
            placeholder="Enter the category name"
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

const EditCategoryButton = ({ category }: { category: Category }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        aria-label="Edit Category"
        title="Edit Category"
        variant="ghost"
        size="iconMd"
        className="bg-white"
        colorSchema="purple"
        onClick={() => setShowModal(true)}
      >
        <PiNotePencil />
      </Button>
      {showModal && <EditCategoryForm closeModal={() => setShowModal(false)} category={category} />}
    </>
  )
}
export default EditCategoryButton
