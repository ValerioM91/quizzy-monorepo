import { CgClose } from "react-icons/cg"
import Modal from "./Modal"
import Button from "./Button"

type DeleteModalProps = {
  title?: string
  closeModal: () => void
  deleteHandler: () => void
  isLoading?: boolean
  content?: string
}

const DeleteModal = ({ title, closeModal, deleteHandler, isLoading, content }: DeleteModalProps) => {
  return (
    <Modal closeModal={closeModal} modalLabel="Delete project" className="bg-theme-pink text-white">
      <div className="mb-7 flex justify-between">
        <h3 className="pt-1.5 text-2xl font-bold">{title || "Are you sure?"}</h3>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 focus-visible:outline-white"
          size="iconLg"
          onClick={closeModal}
        >
          <CgClose className="text-2xl" />
        </Button>
      </div>

      <p className="text-lg">{content || "Deleting this item cannot be undone"}</p>

      <Button
        colorSchema="whitePink"
        disabled={isLoading}
        className="text mx-auto mt-12 block focus-visible:outline-white"
        onClick={deleteHandler}
      >
        Yes, Delete it
      </Button>
    </Modal>
  )
}
export default DeleteModal
