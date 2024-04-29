import { useState } from "react"
import { PiTrashBold } from "react-icons/pi"
import { Category } from "database"
import apiClient from "../../api-client"
import Button from "./Button"
import DeleteCategoryModal from "../DeleteCategoryModal"
import EditCategoryButton from "../EditCategoryForm"

const CategoriesTable = () => {
  const { data } = apiClient.category.getAll.useQuery(["category.getAll"])

  return (
    <div className="rounded-2xl bg-base-100 px-4 py-12 shadow-sm">
      <table className={tableClasses.table}>
        <thead>
          <tr className={tableClasses.trHead}>
            <th className={tableClasses.thTitle}>name</th>
            <th className={tableClasses.thButton}></th>
            <th className={tableClasses.thButton}></th>
          </tr>
        </thead>
        <tbody className={tableClasses.tBody}>{data?.body.map(cat => <TableRow key={cat.id} {...cat} />)}</tbody>
      </table>
    </div>
  )
}
export default CategoriesTable

const TableRow = (category: Category) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  return (
    <>
      <tr key={category.id} className={tableClasses.trBody}>
        <td className="p-4">{category.name}</td>
        <td className="pr-4">
          <EditCategoryButton category={category} />
        </td>
        <td className="pr-4">
          <Button
            aria-label="Delete Category"
            title="Delete Category"
            variant="solid"
            size="iconMd"
            colorSchema="pink"
            onClick={() => setShowDeleteModal(true)}
          >
            <PiTrashBold />
          </Button>
        </td>
      </tr>
      {showDeleteModal && <DeleteCategoryModal categoryId={category.id} closeModal={() => setShowDeleteModal(false)} />}
    </>
  )
}

const tableClasses = {
  table: "w-full caption-bottom text-sm",
  trHead: "text-left font-medium uppercase transition-colors [&>*]:pb-4",
  thTitle: "px-4",
  thButton: "w-0 pr-4",
  tBody: "[&_tr:last-child]:border-0",
  trBody: "relative border-b border-b-base-200 transition-colors",
}
