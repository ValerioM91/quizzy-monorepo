import { useState } from "react"
import { PiTrashBold } from "react-icons/pi"

import { type Question } from "database"

import EditQuestionButton from "../EditQuestionForm"
import DeleteQuestionModal from "../DeleteQuestionModal"
import Button from "./Button"

type QuestionsTable = {
  questions: Question[]
}

const QuestionsTable = ({ questions }: QuestionsTable) => {
  return (
    <div className="rounded-2xl bg-base-100 px-4 py-12 shadow-sm">
      <table className={tableClasses.table}>
        <thead>
          <tr className={tableClasses.trHead}>
            <th className="px-4">Question</th>
            <th className="px-4">correct answer</th>
            <th className="px-4">incorrect answers</th>
            <th className={tableClasses.thButton}></th>
            <th className={tableClasses.thButton}></th>
          </tr>
        </thead>
        <tbody className={tableClasses.tBody}>
          {questions
            .sort((a, b) => a.question.localeCompare(b.question))
            .map(question => (
              <TableRow key={question.id} {...question} />
            ))}
        </tbody>
      </table>
    </div>
  )
}
export default QuestionsTable

const TableRow = (questionData: Question) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  return (
    <>
      <tr key={questionData.id} className={tableClasses.trBody}>
        <td className="p-4">{questionData.question}</td>
        <td className="p-4">{questionData.correctAnswer}</td>
        <td className="p-4">{questionData.incorrectAnswers.join(", ")}</td>
        <td className="pr-4">
          <EditQuestionButton questionData={questionData} />
        </td>
        <td className="pr-4">
          <Button
            aria-label="Delete question"
            title="Delete question"
            variant="solid"
            size="iconMd"
            colorSchema="pink"
            onClick={() => setShowDeleteModal(true)}
          >
            <PiTrashBold />
          </Button>
        </td>
      </tr>
      {showDeleteModal && <DeleteQuestionModal question={questionData} closeModal={() => setShowDeleteModal(false)} />}
    </>
  )
}

const tableClasses = {
  table: "w-full caption-bottom text-sm",
  trHead: "text-left font-medium uppercase transition-colors [&>*]:pb-4",
  thButton: "w-0 pr-4",
  tBody: "[&_tr:last-child]:border-0",
  trBody: "relative border-b border-b-base-200 transition-colors",
}
