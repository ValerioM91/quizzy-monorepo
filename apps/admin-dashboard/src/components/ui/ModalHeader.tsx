import { CgClose } from "react-icons/cg"
import Button from "./Button"

type Props = {
  closeModal: () => void
  title: string
}

const ModalHeader = ({ closeModal, title }: Props) => {
  return (
    <div className="mb-7 flex items-center justify-between">
      <h3 className="text-2xl font-bold">{title}</h3>
      <Button variant="ghost" colorSchema="violet-light" size="iconLg" onClick={closeModal}>
        <CgClose className="text-2xl" />
      </Button>
    </div>
  )
}
export default ModalHeader
